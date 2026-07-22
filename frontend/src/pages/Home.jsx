import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Search, ShoppingCart } from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const loadProducts = async () => {
    try {
      const response = await api.get(
        `/products?search=${search}&category=${category}`,
      );
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [search, category]);

  const addToCard = async (productId) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    const res = await api.post(`/cart/add`, { userId, productId });

    const total = res.data.cart.items.reduce((sum, item) => {
      return sum + item.productId.price * item.quantity;
    }, 0);

    localStorage.setItem("cartCount", total);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Discover Products
          </h1>
          <p className="mt-2 text-slate-500">
            Browse our latest collection and find what you love.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 md:w-56"
            >
              <option value="">All Categories</option>
              <option value="Beauty">Beauty</option>
              <option value="Fragrances">Fragrances</option>
              <option value="Furniture">Furniture</option>
              <option value="Groceries">Groceries</option>
              <option value="Electronics">Electronics</option>
            </select>
          </div>
        </div>

        {/* Products */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-slate-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7l9-4 9 4m-18 0v10l9 4m-9-14l9 4m9-4v10l-9 4m0-10v10"
              />
            </svg>

            <h2 className="mt-5 text-xl font-semibold text-slate-800">
              No Products Found
            </h2>

            <p className="mt-2 text-slate-500">
              Try another search or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <Link to={`/product/${product._id}`}>
                  <div className="overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <h2 className="line-clamp-2 min-h-[56px] text-lg font-semibold text-slate-800">
                      {product.title}
                    </h2>

                    <p className="mt-4 text-2xl font-bold text-blue-600">
                      ₹{product.price}
                    </p>
                  </div>
                </Link>

                <div className="px-5 pb-5">
                  <button
                    onClick={() => addToCard(product._id)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-700 active:scale-95"
                  >
                    <ShoppingCart size={18} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
