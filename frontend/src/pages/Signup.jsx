import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const handleSignup = async (e) => {
  e.preventDefault();
  try {
    const { data } = await API.post("/auth/signup", { name, email, password });
    localStorage.setItem("token", data.token);
    navigate("/home");
  } catch (error) {
    alert("Signup failed");
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-yellow-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-96 transform transition duration-300 hover:shadow-2xl hover:-translate-y-1">
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-gray-800 text-center">
          Create Account
        </h2>
        <p className="text-gray-500 text-sm text-center mt-1 mb-6">
          Sign up to taste your favorite food 🍔
        </p>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-400 focus:border-red-400 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-400 focus:border-red-400 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-400 focus:border-red-400 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 rounded-lg font-semibold hover:from-red-600 hover:to-pink-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="mt-5 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-red-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
