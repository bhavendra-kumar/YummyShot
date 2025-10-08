import { useLocation } from "react-router-dom";

function PaymentPage() {
  const location = useLocation();
  const { orderId, amount } = location.state || {};

  const handlePayment = () => {
    // Here you integrate Razorpay / Stripe / PayPal
    alert(`Payment of ₹${amount} for order ${orderId} successful!`);
    // Then redirect to Order Confirmation
    window.location.href = "/order-confirmation";
  };

  return (
    <div>
      <h1>Payment</h1>
      <p>Order ID: {orderId}</p>
      <p>Total: ₹{amount}</p>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}

export default PaymentPage;
