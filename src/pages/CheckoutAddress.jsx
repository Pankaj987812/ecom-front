 import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function CheckoutAddress() {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveAddress = async () => {
    await api.post("/address/add", {
      ...form,
      userId,
    });

    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">

      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 border border-gray-100">

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Delivery Address 📦
        </h1>

        <p className="text-sm text-gray-500 text-center mb-6">
          Add your shipping details
        </p>

        {/* FORM */}
        <div className="space-y-4">

          <input
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            name="addressLine"
            placeholder="Address Line"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <div className="grid grid-cols-2 gap-4">

            <input
              name="city"
              placeholder="City"
              onChange={handleChange}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <input
              name="state"
              placeholder="State"
              onChange={handleChange}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <input
            name="pincode"
            placeholder="Pincode"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          {/* BUTTON */}
          <button
            onClick={saveAddress}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition shadow-md"
          >
            Save Address & Continue
          </button>
        </div>

        {/* FOOTER NOTE */}
        <p className="text-xs text-gray-400 text-center mt-4">
          Securely stored for fast checkout
        </p>

      </div>
    </div>
  );
}