import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router";
import toast from "react-hot-toast";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const response = await api.get("/products");
    setProducts(response.data);
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/delete/${id}`);
      toast.success("product deleted successfully");
      loadProducts();
    } catch (error) {
      console.log("error deleting product:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Product List</h2>

        <Link
          to="/admin/products/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
        >
          + Add Product
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Stock</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">{product.title}</td>

                <td className="px-6 py-4 font-semibold text-green-600">
                  ₹{product.price}
                </td>

                <td className="px-6 py-4">{product.category}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.stock > 10
                        ? "bg-green-100 text-green-700"
                        : product.stock > 0
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <Link
                      to={`/admin/products/update/${product._id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
