 import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);

      setMsg("Login Successful ");

      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* LEFT IMAGE */}
      <div className="lg:w-1/2 w-full relative">
        <img
          src="https://5.imimg.com/data5/SELLER/Default/2022/9/LF/UY/FD/131144733/1-500x500.png"
          className="w-full h-64 lg:h-full object-cover p-10" 
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl font-bold">Tech Store ⚡</h1>

          <p className="mt-2 text-gray-200">Electronics shopping platform</p>
           
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="lg:w-1/2 w-full min-h-screen flex flex-col bg-linear-to-br from-white to-orange-50 p-6">

        {/* CENTER LOGIN CARD */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-orange-100">

            <h2 className="text-2xl font-bold text-center">Welcome Back</h2>

            {msg && (
              <div className="mt-3 text-center text-sm text-orange-600 bg-orange-50 p-2 rounded">
                {msg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">

              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
              />

              <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 cursor-pointer">
                Login
              </button>
            </form>
          </div>
        </div>
 
         

      </div>
    </div>
  );
}