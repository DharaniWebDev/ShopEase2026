import { Link } from "react-router-dom";

export default function ProductCard({
  product,
  addToCart,
  wishlist,
  toggleWishlist,
}) {
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  function buyNow() {
    addToCart(product);
    window.location.href = "/cart";
  }

  return (
    <article className="product-card">
      <button
        className={`heart-button ${isWishlisted ? "active" : ""}`}
        onClick={() => toggleWishlist(product)}
        aria-label="Toggle wishlist"
      >
        {isWishlisted ? "♥" : "♡"}
      </button>

      <Link to="/" className="product-image-link">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      </Link>

      <div className="product-info">
        <span className="category">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">₹{product.price.toLocaleString("en-IN")}</p>

        <div className="product-actions">
          <button
            className="button button-light"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

          <button className="button button-primary" onClick={buyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}