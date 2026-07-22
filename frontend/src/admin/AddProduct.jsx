import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/products/create", form);
      toast.success("Product added successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.log("error adding product:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Add Product</h2>

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium mb-2">
            Product Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter product title"
            className="w-full border rounded-md p-3"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter product description"
            rows="3"
            className="w-full border rounded-md p-3"
          ></textarea>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="block font-medium mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full border rounded-md p-3"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="block font-medium mb-2">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Enter category"
            className="w-full border rounded-md p-3"
          />
        </div>

        {/* Image */}
        <div className="mb-4">
          <label htmlFor="image" className="block font-medium mb-2">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="w-full border rounded-md p-3"
          />
        </div>

        {/* Stock */}
        <div className="mb-6">
          <label htmlFor="stock" className="block font-medium mb-2">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Enter stock quantity"
            className="w-full border rounded-md p-3"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
