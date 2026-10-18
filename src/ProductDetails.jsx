import { useParams, useNavigate } from "react-router-dom";

function ProductDetails({ onAddToCart }) {
  const { name } = useParams();
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Headphones",
      price: 999,
      description: "High-quality headphones with clear sound.",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 1999,
      description: "Stylish smartwatch for your daily activities.",
    },
  ];

  const product = products.find(
    (item) =>
      item.name.toLowerCase() ===
      decodeURIComponent(name || "").toLowerCase()
  );

  if (!product) {
    return <h2>Product not found!</h2>;
  }

  return (
    <div className="product-details">
      <h2>{product.name}</h2>

      <h3>Price: ₹{product.price}</h3>

      <p>{product.description}</p>

      <button
        onClick={() => {
          onAddToCart(product);
          navigate("/cart");
        }}
      >
        Add to Cart
      </button>

      <button onClick={() => navigate("/")}>
        Continue Shopping
      </button>
    </div>
  );
}

export default ProductDetails;