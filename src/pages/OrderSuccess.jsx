 import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import api from "../api/axios";

export default function OrderSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load order dynamically
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/order/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  // Auto redirect after 10 sec (optional)
  useEffect(() => {
    const timer = setTimeout(() => {
      // navigate("/")  // uncomment if you want auto redirect
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg animate-pulse text-gray-500">
          Loading order details...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-orange-50 flex items-center justify-center p-6">

      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8 border border-green-100">

        {/* SUCCESS ICON */}
        <div className="text-center">
          <div className="text-6xl animate-bounce">🎉</div>

          <h1 className="text-2xl font-bold text-green-600 mt-2">
            Order Placed Successfully
          </h1>

          <p className="text-gray-500 mt-1">
            Thank you for shopping with us
          </p>
        </div>

        {/* ORDER ID */}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-bold text-gray-800">{id}</p>
        </div>

        {/* ORDER DETAILS */}
        {order && (
          <div className="mt-6 space-y-3">

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Items</span>
              <span className="font-medium">{order.items?.length || 0}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total Amount</span>
              <span className="font-bold text-orange-500">
                ₹{order.total || 0}
              </span>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg text-sm">
              <p className="text-gray-500 mb-1">Delivery Address</p>
              <p className="font-medium">
                {order.address?.fullName}
              </p>
              <p>
                {order.address?.addressLine}, {order.address?.city}
              </p>
            </div>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="mt-8 flex flex-col gap-3">

          <button
            onClick={() => navigate("/")}
            className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
          >
            🛍 Continue Shopping
          </button>

          <button
            onClick={() => navigate(`/track-order/${id}`)}
            className="border border-green-500 text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
          >
            📦 Track Order
          </button>

          <button
            onClick={() => alert("Receipt sent to email (UI only)")}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            📧 Send Receipt
          </button>
        </div>

        {/* FOOTER NOTE */}
        <p className="text-xs text-center text-gray-400 mt-6">
          Your order will be delivered soon 🚚
        </p>
      </div>
    </div>
  );
}