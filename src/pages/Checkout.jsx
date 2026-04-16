 import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function Checkout() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (!userId) return;

    api.get(`/cart/${userId}`).then((res) => setCart(res.data));

    api.get(`/address/${userId}`).then((res) => {
      setAddresses(res.data);
      setSelectedAddress(res.data?.[0] || null);
    });
  }, []);

  if (!cart) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading checkout...
      </div>
    );
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (!selectedAddress) {
      alert("Please select address");
      return;
    }

    const res = await api.post("/order/place", {
      userId,
      address: selectedAddress,
    });

    navigate(`/order-success/${res.data.orderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Checkout 🛒
        </h1>
        <p className="text-gray-500 text-sm">
          Confirm address & place your order
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SIDE - ADDRESS */}
        <div className="lg:col-span-2 space-y-4">

          <h2 className="text-lg font-semibold text-gray-800">
            Select Delivery Address
          </h2>

          {addresses.length === 0 ? (
            <div className="bg-white p-4 rounded-xl shadow text-gray-500">
              No address found
            </div>
          ) : (
            addresses.map((addr) => (
              <label
                key={addr._id}
                className={`block bg-white p-4 rounded-xl shadow cursor-pointer border-2 transition
                ${
                  selectedAddress?._id === addr._id
                    ? "border-orange-500"
                    : "border-transparent"
                }`}
              >
                <div className="flex items-start gap-3">

                  <input
                    type="radio"
                    name="address"
                    checked={selectedAddress?._id === addr._id}
                    onChange={() => setSelectedAddress(addr)}
                    className="mt-1 accent-orange-500"
                  />

                  <div>
                    <p className="font-semibold text-gray-800">
                      {addr.fullName}
                    </p>

                    <p className="text-sm text-gray-600">
                      {addr.addressLine}, {addr.city}, {addr.state} -{" "}
                      {addr.pincode}
                    </p>

                    <p className="text-sm text-gray-500">
                      📞 {addr.phone}
                    </p>
                  </div>
                </div>
              </label>
            ))
          )}
        </div>

        {/* RIGHT SIDE - SUMMARY (STICKY) */}
        <div className="bg-white p-5 rounded-xl shadow h-fit sticky top-6">

          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Order Summary
          </h2>

          <div className="space-y-2 text-gray-600 text-sm">
            {cart.items.map((item) => (
              <div
                key={item.productId._id}
                className="flex justify-between"
              >
                <span>
                  {item.productId.title} × {item.quantity}
                </span>
                <span>
                  ₹{item.productId.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-lg font-bold mb-5">
            <span>Total</span>
            <span className="text-orange-600">₹{total}</span>
          </div>

          <button
            onClick={placeOrder}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Place Order (COD)
          </button>

          <p className="text-xs text-gray-400 text-center mt-3">
            Secure checkout powered by Tech Store
          </p>
        </div>
      </div>
    </div>
  );
}