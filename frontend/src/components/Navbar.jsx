// src/components/Navbar.jsx
import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useContext(CartContext);

  // Count total items
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Hide navbar on login/signup
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  return (
    <nav className="flex justify-between items-center bg-red-500 text-white px-6 py-3 shadow-md">
      {/* Logo */}
      <h1
        onClick={() => navigate("/home")}
        className="text-xl font-bold cursor-pointer"
      >
        🍔 Yummy Spot
      </h1>

      {/* Links */}
      <div className="flex items-center gap-6">
        <button onClick={() => navigate("/home")} className="hover:underline">
          Home
        </button>
        <button onClick={() => navigate("/orders")} className="hover:underline">
          My Orders
        </button>
        <button onClick={() => navigate("/cart")} className="relative">
          <FaShoppingCart size={22} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-yellow-400 text-black text-xs font-bold px-2 rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
