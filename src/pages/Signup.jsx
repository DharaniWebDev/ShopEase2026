import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup({ onSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !email.trim() || password.length < 6) {
      setError("Enter your name, a valid email and a password of at least 6 characters.");
      return;
    }

    onSignup(email.trim());
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <span className="category">JOIN SHOPEASE</span>
        <h1>Create Account</h1>
        <p>Set up an account to get started.</p>

        <label>Full name</label>
        <input
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
        />

        <label>Email address</label>
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
        />

        <label>Password (minimum 6 characters)</label>
        <input
          type="password"
          minLength={6}
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Create password"
        />

        {error && <p className="error-message">{error}</p>}

        <button className="button button-primary full-width" type="submit">
          Create Account
        </button>

        <p className="auth-switch">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
}