const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Restaurant = require("./models/Restaurant");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected for seeding...");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Restaurant.deleteMany();

    const restaurants = [
      {
        name: "Spicy Villa",
        city: "Delhi",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
        menu: [
          { name: "Paneer Tikka", price: 200, image: "https://source.unsplash.com/400x300/?paneer-tikka" },
          { name: "Butter Naan", price: 40, image: "https://source.unsplash.com/400x300/?naan" },
          { name: "Dal Makhani", price: 150, image: "https://source.unsplash.com/400x300/?dal" }
        ]
      },
      {
        name: "Sushi World",
        city: "Tokyo",
        image: "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=400&q=80",
        menu: [
          { name: "Salmon Sushi", price: 300, image: "https://source.unsplash.com/400x300/?salmon-sushi" },
          { name: "Tuna Roll", price: 250, image: "https://source.unsplash.com/400x300/?tuna-sushi" },
          { name: "Miso Soup", price: 100, image: "https://source.unsplash.com/400x300/?miso-soup" }
        ]
      },
      {
        name: "Pizza Palace",
        city: "Rome",
        image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
        menu: [
          { name: "Margherita Pizza", price: 250, image: "https://source.unsplash.com/400x300/?margherita-pizza" },
          { name: "Pepperoni Pizza", price: 350, image: "https://source.unsplash.com/400x300/?pepperoni-pizza" },
          { name: "Garlic Breadsticks", price: 120, image: "https://source.unsplash.com/400x300/?garlic-bread" }
        ]
      }
    ];

    await Restaurant.insertMany(restaurants);
    console.log("Data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedData();
