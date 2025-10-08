import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // 🔹 Fetch cart from backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await API.get("/cart");
        setCart(data.items || []);
        setTotal(data.total || 0);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };
    fetchCart();
  }, []);

  // 🔹 Remove item
  const handleRemove = async (itemId) => {
    try {
      await API.delete(`/cart/${itemId}`);
      setCart(cart.filter((item) => item._id !== itemId));
      setTotal(cart.reduce((sum, i) => sum + i.price * i.quantity, 0));
    } catch (error) {
      console.error("Remove failed:", error);
    }
  };

  // 🔹 Proceed to checkout
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-red-500 mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image || "https://via.placeholder.com/100x80"}
                  alt={item.name}
                  className="w-20 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-500">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item._id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total Section */}
          <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total:</h2>
            <span className="text-xl font-bold text-green-600">₹{total}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
