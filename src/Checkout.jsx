import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function Checkout({ cart, user, onPlaceOrder }) {
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (cart.length === 0) {
    return (
      <main className="page-container empty-card">
        <h1>Your cart is empty</h1>
        <Link to="/" className="button button-primary">
          Shop Now
        </Link>
      </main>
    );
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handleSubmit(event) {
    event.preventDefault();

    if (!address.trim()) {
      setError("Please enter your delivery address.");
      return;
    }

    if (
      paymentMethod === "CARD" &&
      (!cardName.trim() ||
        cardNumber.replace(/\s/g, "").length < 12 ||
        !expiry.trim() ||
        cvv.length < 3)
    ) {
      setError("Please check your card details.");
      return;
    }

    setError("");

    // Demo checkout only: no actual payment is processed.
    onPlaceOrder({ address, paymentMethod });
  }

  return (
    <main className="auth-page checkout-page">
      <form className="auth-card checkout-card" onSubmit={handleSubmit}>
        <span className="category">ALMOST THERE</span>
        <h1>Checkout</h1>
        <p>Signed in as {user.email}</p>

        <label>Delivery address</label>
        <textarea
          required
          rows="3"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          placeholder="Enter your full delivery address"
        />

        <h2>Payment Method</h2>

        <label className="payment-option">
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
          />
          Cash on Delivery
        </label>

        <label className="payment-option">
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === "UPI"}
            onChange={() => setPaymentMethod("UPI")}
          />
          UPI (demo only)
        </label>

        <label className="payment-option">
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === "CARD"}
            onChange={() => setPaymentMethod("CARD")}
          />
          Debit / Credit Card (demo only)
        </label>

        {paymentMethod === "CARD" && (
          <div className="card-fields">
            <label>Name on card</label>
            <input
              value={cardName}
              onChange={(event) => setCardName(event.target.value)}
              autoComplete="cc-name"
              placeholder="Cardholder name"
              required
            />

            <label>Card number</label>
            <input
              inputMode="numeric"
              autoComplete="cc-number"
              value={cardNumber}
              onChange={(event) =>
                setCardNumber(
                  event.target.value.replace(/\D/g, "").slice(0, 19)
                )
              }
              placeholder="Card number"
              required
            />

            <div className="card-row">
              <div>
                <label>Expiry</label>
                <input
                  autoComplete="cc-exp"
                  value={expiry}
                  onChange={(event) => setExpiry(event.target.value)}
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <label>CVV</label>
                <input
                  type="password"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  value={cvv}
                  onChange={(event) =>
                    setCvv(event.target.value.replace(/\D/g, "").slice(0, 4))
                  }
                  placeholder="CVV"
                  required
                />
              </div>
            </div>

            <p className="demo-notice">
              Demo only: no money is charged. Never enter real card details
              into this demo form.
            </p>
          </div>
        )}

        <div className="checkout-total">
          <span>Order total</span>
          <strong>₹{total.toLocaleString("en-IN")}</strong>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="button button-primary full-width">
          Place Demo Order
        </button>
      </form>
    </main>
  );
}