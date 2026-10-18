import { Link } from "react-router-dom";

export default function Navbar({
  user,
  cartCount,
  wishlistCount,
  onLogout,
}) {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        ShopEase<span>.</span>
      </Link>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/wishlist">Wishlist ({wishlistCount})</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
        <Link to="/orders">My Orders</Link>

        {user ? (
          <>
            <span className="user-email">{user.email}</span>
            <button className="nav-button" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="signup-link">
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}