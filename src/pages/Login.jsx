import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function Login({ user, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user) return <Navigate to="/" replace />;

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setError("");
    onLogin(email.trim());
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <span className="category">WELCOME BACK</span>
        <h1>Login</h1>
        <p>Sign in to continue shopping.</p>

        <label>Email address</label>
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
        />

        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter password"
        />

        {error && <p className="error-message">{error}</p>}

        <button className="button button-primary full-width" type="submit">
          Login
        </button>

        <p className="auth-switch">
          New to ShopEase? <Link to="/signup">Create an account</Link>
        </p>
      </form>
    </main>
  );
}