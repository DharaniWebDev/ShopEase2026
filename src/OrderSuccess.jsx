import { Link } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {
  return (
    <div className="order-success-page">
      <div className="success-card">
        <div className="success-icon">✅</div>

        <h1>Order Placed Successfully!</h1>

        <p>
          Thank you for shopping with ShopEase!
        </p>

        <p className="success-message">
          Your order has been placed successfully.
          You can check your order details in My Orders.
        </p>

        <div className="success-buttons">
          <Link to="/my-orders" className="orders-button">
            📦 View My Orders
          </Link>

          <Link to="/" className="continue-button">
            🛍️ Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;