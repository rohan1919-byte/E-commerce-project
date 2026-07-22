import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";

export default function Cart() {
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  const loadCart = async () => {
    if (!userId) return;

    const res = await api.get(`/cart/${userId}`);
    setCart(res.data);
  };

 useEffect(() => {
  if (!userId) {
    navigate("/login");
    return;
  }

  loadCart();
}, [userId]);




  const removeItems = async (productId) => {
    await api.post(`/cart/remove`, { userId, productId });
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateQty = async (productId, quantity) => {
    if (quantity === 0) {
      await removeItems(productId);
      return;
    }

    await api.post(`/cart/update`, {
      userId,
      productId,
      quantity,
    });

    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (!cart) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-lg font-medium text-slate-600">
        Loading Cart...
      </div>
    );
  }

  

  const total = cart.items.reduce((sum, item) => {
    return sum + item.productId.price * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4">

        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className="text-blue-600" />
          <h1 className="text-3xl font-bold text-slate-800">
            Shopping Cart
          </h1>
        </div>

        {cart.items.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-12 text-center">
            <ShoppingCart
              size={60}
              className="mx-auto text-slate-300 mb-4"
            />

            <h2 className="text-2xl font-semibold text-slate-700">
              Your cart is empty
            </h2>

            <p className="text-slate-500 mt-2">
              Add some products to continue shopping.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-5">

              {cart.items.map((item) => (
                <div
                  key={item.productId._id}
                  className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 flex flex-col md:flex-row gap-5 items-center"
                >
                  {/* Image */}

                  <img
                    src={item.productId.image}
                    alt={item.productId.title}
                    className="w-28 h-28 object-contain rounded-lg border"
                  />

                  {/* Details */}

                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-slate-800">
                      {item.productId.title}
                    </h2>

                    <p className="mt-2 text-xl font-bold text-blue-600">
                      ₹{item.productId.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity */}

                  <div className="flex items-center border rounded-lg overflow-hidden">

                    <button
                      onClick={() =>
                        updateQty(item.productId._id, item.quantity - 1)
                      }
                      className="p-3 hover:bg-slate-100 transition"
                    >
                      <Minus size={18} />
                    </button>

                    <span className="px-5 font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQty(item.productId._id, item.quantity + 1)
                      }
                      className="p-3 hover:bg-slate-100 transition"
                    >
                      <Plus size={18} />
                    </button>

                  </div>

                  {/* Total */}

                  <div className="w-28 text-center">
                    <p className="text-lg font-bold text-slate-800">
                      ₹
                      {(
                        item.productId.price * item.quantity
                      ).toFixed(2)}
                    </p>
                  </div>

                  {/* Remove */}

                  <button
                    onClick={() => removeItems(item.productId._id)}
                    className="flex items-center gap-2 rounded-md bg-red-50 text-red-600 border border-red-200 px-4 py-2 hover:bg-red-100 transition"
                  >
                    <Trash2 size={18} />
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}

            <div className="mt-8 bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col md:flex-row justify-between items-center gap-5">

              <div>
                <p className="text-slate-500">
                  Cart Total
                </p>

                <h2 className="text-3xl font-bold text-blue-600">
                  ₹{total.toFixed(2)}
                </h2>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition"
              >
                Proceed to Checkout
                <ArrowRight size={18} />
              </button>

            </div>
          </>
        )}
      </div>
    </div>
  );
}