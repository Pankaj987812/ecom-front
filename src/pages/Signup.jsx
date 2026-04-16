import { useState } from "react";
import api from "../api/axios";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/signup", form);
      setMsg(response.data.message || "Account Created 🎉");
    } catch (err) {
      setMsg(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* LEFT SIDE IMAGE SECTION */}
      <div className="lg:w-1/2 w-full relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
          alt="electronics"
          className="w-full h-full object-cover"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-10">
          <h1 className="text-white text-4xl font-bold">
            Join Tech Store ⚡
          </h1>
          <p className="text-gray-200 mt-3">
            Create account & explore mobiles, laptops, cameras & more
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 text-white/80 text-sm">
            <span>📱 Mobiles</span>
            <span>💻 Laptops</span>
            <span>📷 Cameras</span>
            <span>🎧 Audio</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="lg:w-1/2 w-full flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-blue-50 p-6">

        <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-orange-200 shadow-2xl rounded-2xl p-8">

          {/* HEADER */}
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Create Account 
          </h2>

          <p className="text-center text-sm text-gray-500 mt-1 mb-5">
            Sign up to start shopping
          </p>

          {/* MESSAGE */}
          {msg && (
            <div className="mb-4 text-center text-sm font-medium text-orange-600 bg-orange-50 p-2 rounded-lg">
              {msg}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition shadow-md"
            >
              Sign Up
            </button>
          </form>

           <p className="text-xs text-center text-gray-400 mt-5">
            By signing up, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}