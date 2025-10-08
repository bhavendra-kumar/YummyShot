// src/pages/OrdersPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-red-500">📦 My Orders</h1>
        <button
          onClick={() => navigate("/home")}
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
        >
          Back
        </button>
      </header>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders yet. Place your first order 🎉</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h2 className="text-lg font-bold mb-2">Order #{index + 1}</h2>
              <p className="text-sm text-gray-500 mb-3">
                Date: {new Date(order.date).toLocaleString()}
              </p>

              {/* Items */}
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <p>
                    {item.name} × {item.quantity}
                  </p>
                  <p>₹{item.price * item.quantity}</p>
                </div>
              ))}

              <h3 className="text-lg font-bold mt-3">
                Total: ₹{order.totalPrice}
              </h3>
              <p className="text-green-600 font-semibold mt-1">
                ✅ Status: {order.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
