import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function Wishlist({ wishlist, toggleWishlist, addToCart }) {
  return (
    <main className="products-section page-container">
      <h1>My Wishlist ♥</h1>

      {wishlist.length === 0 ? (
        <div className="empty-card">
          <p>Your wishlist is empty.</p>
          <Link to="/" className="button button-primary">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="product-grid">
          {wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      )}
    </main>
  );
}