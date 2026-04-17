import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const loadProduct = async () => {
    const res = await api.get("/products/");
    const p = res.data.find((item) => item._id === id);
    setProduct(p);
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const addToCart = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login first");
      return;
    }
    alert("Adding to cart...");

    const res = await api.post("/cart/add", {
      userId,
      productId: product._id,
    });

    const total = res.data.cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    localStorage.setItem("cartCount", total);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

  <div className="p-6 max-w-xl w-full bg-white rounded-xl shadow-lg text-center">

    {/* Product Image */}
    <img
      src={product.image}
      alt={product.title}
      className="w-full h-60 object-contain mx-auto"
    />

    {/* Title */}
    <h1 className="text-2xl font-bold mt-4">
      {product.title}
    </h1>

    {/* Description */}
    <p className="text-gray-700 mt-2">
      {product.description}
    </p>

    {/* Price */}
    <p className="text-xl font-semibold mt-4 text-green-600">
      ${product.price}
    </p>

    {/* Button */}
    <button
      onClick={addToCart}
      className="mt-6 w-full md:w-1/2 bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition cursor-pointer"
    >
      Add to Cart
    </button>

  </div>
</div>
  );
}
