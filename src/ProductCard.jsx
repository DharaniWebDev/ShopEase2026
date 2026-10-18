import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({
  id,
  name,
  price,
  originalPrice,
  discount,
  wishlist = [],
  onToggleWishlist,
  onBuy,
}) {
  const navigate = useNavigate();

  return (
    <div className="product-card">
      <button
        className="wishlist-button"
        onClick={() => onToggleWishlist(name)}
      >
        {wishlist.includes(name)
          ? "❤️ Wishlisted"
          : "🤍 Add to Wishlist"}
      </button>

      <h3>{name}</h3>

      <p className="original-price">₹{originalPrice}</p>

      <p className="current-price">₹{price}</p>

      <span className="discount-label">
        🔥 {discount}% OFF
      </span>

      <button
        className="buy-button"
        onClick={() => onBuy(1)}
      >
        Add to Cart
      </button>

      <button
        className="details-button"
        onClick={() =>
          navigate(`/product-details/${encodeURIComponent(name)}`)
        }
      >
        View Details
      </button>
    </div>
  );
}

export default ProductCard;