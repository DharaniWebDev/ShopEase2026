import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>🛍️ ShopEase</h2>
          <p>Your happiness, our priority!</p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Shopping Cart</Link>
          <Link to="/my-orders">My Orders</Link>
        </div>

        <div className="footer-support">
          <h3>Customer Support</h3>
          <p>Quality Products</p>
          <p>Great Offers</p>
          <p>Happy Shopping!</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ShopEase. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;