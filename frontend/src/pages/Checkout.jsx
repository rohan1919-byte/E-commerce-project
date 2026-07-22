import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";
import {
  MapPin,
  ShoppingBag,
  Truck,
  ShieldCheck,
  BadgeIndianRupee,
} from "lucide-react";

import toast from "react-hot-toast";

export default function Checkout() {
  const userId = localStorage.getItem("userId");

  const [address, setAddress] = useState([]);
  const [selectAddress, setSelectAddress] = useState(null);
  const [cart, setCart] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }

    api.get(`/cart/${userId}`).then((res) => {
      setCart(res.data);
    });

    api.get(`/address/${userId}`).then((res) => {
      setAddress(res.data);
      setSelectAddress(res.data[0]);
    });
  }, [userId, navigate]);

  if (!cart) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-lg font-medium text-slate-600">
        Loading...
      </div>
    );
  }

  const total = cart.items.reduce((sum, i) => {
    return sum + i.quantity * i.productId.price;
  }, 0);

  const placeOrder = async () => {
    if (!selectAddress) {
      toast.error("Please select an address.");
      return;
    }

    try {
      const res = await api.post("/order/place", {
        userId,
        address: selectAddress,
      });

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
      navigate(`/order-success/${res.data.newOrder._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-3 gap-8">
        {/* Address */}

        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <MapPin className="text-blue-600" />
              <h1 className="text-2xl font-bold text-slate-800">
                Select Delivery Address
              </h1>
            </div>

            <button
              onClick={() => navigate("/checkout-address")}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
            >
              + Add Address
            </button>
          </div>

          <div className="space-y-4">
            {address.length === 0 ? (
              <div className="text-center py-14">
                <MapPin size={60} className="mx-auto text-slate-300 mb-4" />

                <h2 className="text-xl font-semibold text-slate-700">
                  No Saved Address
                </h2>

                <p className="text-slate-500 mt-2">
                  Please add your delivery address.
                </p>

                <button
                  onClick={() => navigate("/checkout-address")}
                  className="mt-6 rounded-md bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                >
                  Add New Address
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {address.map((item) => (
                  <label
                    key={item._id}
                    className={`block cursor-pointer rounded-xl border p-5 transition ${
                      selectAddress?._id === item._id
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="flex gap-4">
                      <input
                        type="radio"
                        checked={selectAddress?._id === item._id}
                        onChange={() => setSelectAddress(item)}
                        className="mt-1"
                      />

                      <div>
                        <h2 className="font-semibold text-slate-800">
                          {item.fullname}
                        </h2>

                        <p className="text-slate-500 mt-1">{item.phone}</p>

                        <p className="text-slate-600 mt-2">
                          {item.addressLine}
                        </p>

                        <p className="text-slate-600">
                          {item.city}, {item.state} - {item.pincode}
                        </p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Summary */}

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 h-fit sticky top-24">
          <div className="flex items-center gap-3 mb-6">
            <ShoppingBag className="text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-800">Order Summary</h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Delivery</span>
              <span className="text-green-600 font-medium">FREE</span>
            </div>

            <hr />

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>

              <span className="text-blue-600">₹{total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={placeOrder}
            disabled={!selectAddress}
            className={`mt-7 flex w-full items-center justify-center gap-2 rounded-md py-3 font-semibold text-white transition
  ${
    selectAddress
      ? "bg-blue-600 hover:bg-blue-700"
      : "bg-slate-400 cursor-not-allowed"
  }`}
          >
            <BadgeIndianRupee size={20} />
            Place Order
          </button>

          <div className="mt-6 space-y-3 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-green-600" />
              Secure Checkout
            </div>

            <div className="flex items-center gap-2">
              <Truck size={18} className="text-green-600" />
              Free Delivery
            </div>

            <div className="flex items-center gap-2">
              <BadgeIndianRupee size={18} className="text-green-600" />
              Cash on Delivery
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
