import cartModel from "../models/Cart.js";

//ADD ITEM TO CART
export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      cart = new cartModel({
        userId,
        items: [{ productId, quantity: 1 }],
      });
    } else {
      const item = cart.items.find(
        (i) => i.productId.toString() === productId
      );

      if (item) {
        item.quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
    }

    await cart.save();

    res.status(200).json({
      message: "Item added to cart",
      cart,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

//remove item from cart

export const removeItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = await cartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        message: "cart not found",
      });
    }
    cart.items = cart.items.filter((i) => i.productId.toString() !== productId);

    await cart.save();
    res.json({
      message: "item removed from cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error,
    });
  }
};

//update item quantity in cart
export const updateQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cart = await cartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        message: "cart not found",
      });
    }

    const item = cart.items.find((i) => i.productId.toString() === productId);

    if (!item) {
      return res.status(404).json({
        message: "item not found",
      });
    }

    item.quantity = quantity;
    await cart.save();
    res.json({
      message: "item quantity updated",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error,
    });
  }
};

//get cart by user id
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await cartModel
      .findOne({ userId })
      .populate(`items.productId`); //populate se Mongoose Product collection me jaake us ID ka pura data lekar aata hai.
    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error,
    });
  }
};
