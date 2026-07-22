import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const allowedFields = [
    "title",
    "description",
    "price",
    "category",
    "image",
    "stock",
  ];

  const loadProduct = async () => {
    const res = await api.get(`/products`);
    const product = res.data.find((p) => {
      return p._id === id;
    });
    setForm(product);
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/products/update/${id}`, form);
    toast.success("product updated successfully");
    navigate("/admin/products");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-3xl font-bold text-center mb-6">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {allowedFields.map((key) => (
          <div key={key}>
            <label
              htmlFor={key}
              className="block text-gray-700 font-medium mb-2 capitalize"
            >
              {key}
            </label>

            {key === "description" ? (
              <textarea
                id={key}
                name={key}
                value={form[key]}
                onChange={handleChange}
                rows={4}
                placeholder={`Enter ${key}`}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <input
                id={key}
                type={key === "price" || key === "stock" ? "number" : "text"}
                name={key}
                value={form[key]}
                onChange={handleChange}
                placeholder={`Enter ${key}`}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
