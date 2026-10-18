import { Link } from "react-router-dom";

export default function Cart({ cart, removeFromCart, changeQuantity }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <main className="page-container">
        <div className="empty-card">
          <h1>Your cart is empty</h1>
          <p>Find something you love and add it to your cart.</p>
          <Link to="/" className="button button-primary">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container">
      <h1>Your Shopping Cart</h1>

      <div className="cart-layout">
        <div className="cart-list">
          {cart.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>₹{item.price.toLocaleString("en-IN")}</p>

                <div className="quantity-control">
                  <button onClick={() => changeQuantity(item.id, -1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => changeQuantity(item.id, 1)}>+</button>
                </div>
              </div>

              <button
                className="remove-button"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </article>
          ))}
        </div>

        <aside className="summary-card">
          <h2>Order Summary</h2>
          <p>
            Items ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            <strong>₹{total.toLocaleString("en-IN")}</strong>
          </p>
          <p>
            Delivery <strong>Free</strong>
          </p>
          <hr />
          <p className="total-row">
            Total <strong>₹{total.toLocaleString("en-IN")}</strong>
          </p>
          <Link to="/checkout" className="button button-primary full-width">
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </main>
  );
}