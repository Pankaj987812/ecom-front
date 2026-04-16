 import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function Cart() {
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  const loadCart = async () => {
    if (!userId) return;
    const res = await api.get(`/cart/${userId}`);
    setCart(res.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (productId) => {
    await api.post(`/cart/remove`, { userId, productId });
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateQty = async (productId, quantity) => {
    if (quantity === 0) {
      await removeItem(productId);
      return;
    }

    await api.post(`/cart/update`, { userId, productId, quantity });
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (!cart) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading your cart...
      </div>
    );
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Shopping Cart 🛒
        </h1>
        <p className="text-gray-500 text-sm">
          Review your items before checkout
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT: ITEMS */}
        <div className="lg:col-span-2 space-y-4">

          {cart.items.length === 0 ? (
            <div className="bg-white p-6 rounded-xl shadow text-gray-500">
              Your cart is empty.
            </div>
          ) : (
            cart.items.map((item) => (
              <div
                key={item.productId._id}
                className="bg-white p-4 rounded-xl shadow flex flex-col sm:flex-row items-center justify-between gap-4 hover:shadow-md transition"
              >

                {/* IMAGE + INFO */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.productId.image}
                    alt={item.productId.title}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />

                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.productId.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      ₹{item.productId.price}
                    </p>
                  </div>
                </div>

                {/* QTY */}
                <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-lg">
                  <button
                    onClick={() =>
                      updateQty(item.productId._id, item.quantity - 1)
                    }
                    className="px-3 py-1 text-lg hover:text-orange-500"
                  >
                    −
                  </button>

                  <span className="font-semibold">{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQty(item.productId._id, item.quantity + 1)
                    }
                    className="px-3 py-1 text-lg hover:text-orange-500"
                  >
                    +
                  </button>
                </div>

                {/* PRICE */}
                <div className="font-bold text-gray-800">
                  ₹{(item.productId.price * item.quantity).toFixed(0)}
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeItem(item.productId._id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* RIGHT: SUMMARY CARD */}
        <div className="bg-white p-5 rounded-xl shadow h-fit">

          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Order Summary
          </h2>

          <div className="flex justify-between mb-2 text-gray-600">
            <span>Subtotal</span>
            <span>₹{total.toFixed(0)}</span>
          </div>

          <div className="flex justify-between mb-2 text-gray-600">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between text-lg font-bold mb-4">
            <span>Total</span>
            <span>₹{total.toFixed(0)}</span>
          </div>

          <button
            onClick={() => navigate("/checkout-address")}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Proceed to Checkout
          </button>

          <p className="text-xs text-gray-400 text-center mt-3">
            Secure checkout powered by Tech Store
          </p>
        </div>
      </div>
    </div>
  );
}