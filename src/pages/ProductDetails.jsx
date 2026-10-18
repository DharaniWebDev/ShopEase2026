import { useParams, useNavigate } from "react-router-dom";

function ProductDetails({ products, onAddToCart }) {
  const { name } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (item) => item.name === decodeURIComponent(name)
  );

  if (!product) {
    return (
      <div className="product-details">
        <h2>Product not found!</h2>
        <button onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="product-details">
      <h2>{product.name}</h2>

      <p className="original-price">
        Original Price: ₹{product.originalPrice}
      </p>

      <h3 className="current-price">
        Offer Price: ₹{product.price}
      </h3>

      <p className="discount-label">
        🔥 {product.discount}% OFF
      </p>

      <p>
        Enjoy shopping with amazing offers at ShopEase!
      </p>

      <button
        className="buy-button"
        onClick={() => {
          onAddToCart(product, 1);
          navigate("/cart");
        }}
      >
        Add to Cart 🛒
      </button>

      <button
        className="details-button"
        onClick={() => navigate("/")}
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default ProductDetails;