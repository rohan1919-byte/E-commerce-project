import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: Number,
        price: Number,
      },
    ],
    address: {
      fullname: String,
      phone: String,
      addressLine: String,
      city: String,
      state: String,
      pincode: String,
    },
    totalAmount: Number,
    paymentMethod: {
      type: String,
      default: "COD",
    },
    status: {
        type:String,
      default: "placed",
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
