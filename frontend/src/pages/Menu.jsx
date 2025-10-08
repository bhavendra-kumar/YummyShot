import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

const Menu = () => {
  const { id } = useParams(); // restaurant id
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const { data } = await API.get(`/restaurants/${id}/menu`);
        setMenu(data);
      } catch (error) {
        console.error("Failed to fetch menu:", error);
      }
    };
    fetchMenu();
  }, [id]);

  // 👉 Add to Cart handler
  const handleAddToCart = async (itemId) => {
    try {
      await API.post("/cart", { productId: itemId, quantity: 1 });
      alert("Item added to cart!");
      navigate("/cart");
    } catch (error) {
      console.error("Add to cart failed:", error);
      alert("Failed to add item. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-red-500">🍴 Yummy Spot</h1>
        <button
          onClick={() => navigate("/cart")}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          View Cart
        </button>
      </header>

      <h2 className="text-xl font-semibold mb-4">Menu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {menu.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={item.image || "https://via.placeholder.com/300x200"}
              alt={item.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-500">₹{item.price}</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleAddToCart(item._id)}
                  className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => navigate(`/item/${item._id}`)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
