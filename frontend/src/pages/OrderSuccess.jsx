import { useParams } from "react-router";
import { CheckCircle2, ShoppingBag, BadgeCheck } from "lucide-react";

export default function OrderSuccess() {
  const { id } = useParams();

  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white shadow-lg p-8 text-center">

        {/* Success Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 size={48} className="text-green-600" />
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-3xl font-bold text-slate-800">
          Order Placed Successfully
        </h1>

        <p className="mt-3 text-slate-500 leading-6">
          Thank you for shopping with us. Your order has been received and
          will be processed shortly.
        </p>

        {/* Order ID */}
        <div className="mt-7 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            Order ID
          </p>

          <p className="mt-1 break-all font-semibold text-blue-600">
            {id}
          </p>
        </div>

        {/* Status */}
        <div className="mt-5 flex justify-center">
          <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
            <BadgeCheck size={18} />
            Order Confirmed
          </div>
        </div>

        {/* Button */}
        <button
          onClick={goHome}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <ShoppingBag size={20} />
          Continue Shopping
        </button>

      </div>
    </div>
  );
}