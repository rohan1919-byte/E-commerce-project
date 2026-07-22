import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { ShoppingCart, LogOut } from "lucide-react";
import api from "../api/axios";

export default function Navbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const loadCart = async () => {
      if (!userId) {
        return setCartCount(0);
      }

      try {
        const res = await api.get(`/cart/${userId}`);

        const total = res.data.items.reduce((sum, item) => {
          return sum + item.quantity;
        }, 0);

        setCartCount(total);
      } catch (error) {
        console.log(error);
      }
    };

    loadCart();

    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, [userId]);

  const logout = () => {
    localStorage.clear();
    setCartCount(0);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 tracking-wide"
        >
          EliteMart
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {!userId ? (
            <>
              <Link
                to="/login"
                className="text-slate-700 font-medium hover:text-blue-600 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {/* Cart */}
              <Link
                to="/cart"
                className="relative flex items-center gap-2 text-slate-700 hover:text-blue-600 transition"
              >
                <ShoppingCart size={22} />

                <span className="font-medium mr-4 ">Cart</span>

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-semibold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Logout */}
              <button
                onClick={logout}
                className="flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}