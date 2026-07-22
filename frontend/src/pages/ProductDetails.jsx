import React from "react";
import { useState, useEffect } from "react";
import api from "../api/axios";
import { useParams } from "react-router";
function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const loadProduct = async () => {
    const response = await api.get(`/products/`);
    const p = response.data.find((item) => {
      return item._id === id;
    });
    setProduct(p);
  };

  useEffect(() => {
    loadProduct();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
  <div className="grid md:grid-cols-2 gap-10 bg-white shadow-xl rounded-2xl overflow-hidden">

    {/* Product Image */}
    <div className="flex items-center justify-center bg-gray-100 p-6">
      <img
        src={product.image}
        alt={product.title}
        className="w-full max-w-md h-96 object-contain hover:scale-105 transition duration-300"
      />
    </div>

    {/* Product Details */}
    <div className="flex flex-col justify-center p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        {product.title}
      </h1>

      <p className="text-gray-600 leading-7 text-lg mb-6">
        {product.description}
      </p>

      <h2 className="text-3xl font-bold text-blue-600 mb-8">
        ₹{product.price}
      </h2>

      {/* <button className="w-full md:w-fit bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition duration-300 shadow-lg hover:shadow-xl">
         Add to Cart
      </button> */}
    </div>

  </div>
</div>
  );
}

export default ProductDetails;
