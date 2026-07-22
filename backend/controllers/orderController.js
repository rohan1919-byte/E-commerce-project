import orderModel from "../models/Order.js";
import cartModel from "../models/Cart.js";
import productModel from "../models/Product.js";

export const placeOrder = async (req, res) => {
  try {
    const { userId, address } = req.body;

    //get cart
    const cart = await cartModel
      .findOne({ userId })
      .populate("items.productId");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "cart is empty",
      });
    }

    //prepare order items
    const orderItems = cart.items.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price,
    }));

    //calculate total amount
    const totalAmount = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    //deduct stock from products
    for(let item of cart.items){
        await productModel.findByIdAndUpdate(item.productId._id,{$inc:{stock:-item.quantity}})
    }


    //create order

    const newOrder = await orderModel.create({
        userId,
        items:orderItems,
        address,
        totalAmount,
        paymentMethod:"COD"
    })

    //clear cart
    await cartModel.findOneAndUpdate({userId},{items:[]});
    res.status(201).json({
      success:true,
        message:"order places successfully",
        newOrder
    })
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error,
    });
  }
};
