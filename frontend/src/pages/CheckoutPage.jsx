import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];

  const handlePlaceOrder = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/orders", {
        items: cartItems,
        totalAmount: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      });
      navigate("/payment", { state: { orderId: data._id, amount: data.totalAmount } });
    } catch (err) {
      console.error("Order failed", err);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <ul>
        {cartItems.map((item, i) => (
          <li key={i}>{item.name} x {item.quantity} - ₹{item.price * item.quantity}</li>
        ))}
      </ul>
      <button onClick={handlePlaceOrder}>Proceed to Payment</button>
    </div>
  );
}

export default CheckoutPage;
