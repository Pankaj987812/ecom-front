 import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const loadProducts = async () => {
    const res = await api.get(`/products?search=${search}&category=${category}`);

    // agar backend {products:[...]} return kare
    setProducts(res.data.products || res.data);
    console.log("API RESPONSE:", response.data);
  };

  useEffect(() => {
    loadProducts();
  }, [search, category]);

  const addToCart = async (productId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return alert("Please log in first");
    alert("Adding to cart...");

    const res = await api.post("/cart/add", { userId, productId });

    const total = res.data.cart.items.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0
    );

    localStorage.setItem("cartCount", total);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <div className="sticky top-0 z-10 bg-white shadow-sm p-4 flex flex-col md:flex-row gap-3 items-center">

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border rounded-lg"
        >
          <option value="">All Categories</option>
          <option value="Mobile">Mobile</option>
          <option value="Laptop">Laptop</option>
          <option value="Tablet">Tablet</option>
          <option value="Camera">Camera</option>
          <option value="Earphone">Earphone</option>
          <option value="LED TV">LED TV</option>
          <option value="Digital Watch">Smart Watch</option>
        </select>
      </div>

      {/* PRODUCT GRID */}
      <div className="p-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">

        {Array.isArray(products) && products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-sm hover:shadow-xl transition overflow-hidden flex flex-col"
          >

            <Link to={`/product/${product._id}`}>
              <div className="h-44 bg-white flex items-center justify-center p-3">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full object-contain hover:scale-105 transition"
                />
              </div>
            </Link>

            <div className="p-3 flex flex-col gap-2 flex-1">

              <h2 className="text-sm font-semibold line-clamp-2">
                {product.title}
              </h2>

              <p className="text-green-700 font-bold">
                ₹{product.price}
              </p>

              <p className="text-xs text-gray-500">
                {product.category}
              </p>

              <button
                onClick={() => addToCart(product._id)}
                className="mt-auto bg-orange-400 hover:bg-orange-500 cursor-pointer text-white py-1.5 rounded-lg text-sm font-medium transition"
              >
                Add to Cart
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}