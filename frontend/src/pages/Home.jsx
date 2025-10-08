import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";

const Home = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: restaurantData } = await API.get("/restaurants");
        setRestaurants(restaurantData);

        const { data: itemData } = await API.get("/items");
        setItems(itemData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

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
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-red-500">🍴 Yummy Spot</h1>
        <button
          onClick={() => navigate("/login")}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      {/* Restaurants */}
      <h2 className="text-xl font-semibold mb-4">Popular Restaurants</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={restaurant.image || "https://via.placeholder.com/400x300"}
              alt={restaurant.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{restaurant.name}</h3>
              <p className="text-gray-500">{restaurant.city}</p>
              <button
                onClick={() => navigate(`/menu/${restaurant._id}`)}
                className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
              >
                View Menu
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Items */}
      <h2 className="text-xl font-semibold mb-4">Popular Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={item.image || "https://via.placeholder.com/300x200"}
              alt={item.name}
              className="w-full h-36 object-cover"
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

export default Home;
