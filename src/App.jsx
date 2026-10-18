import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Wishlist from "./pages/Wishlist";

// These files are directly inside src/
import Cart from "./Cart";
import Checkout from "./Checkout";
import MyOrders from "./MyOrders";

import "./App.css";

const PRODUCTS = [
  {
    id: 1,
    name: "Smart Watch",
    price: 1999,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    description: "Stylish smartwatch for everyday use.",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 1499,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    description: "Enjoy your favourite music wirelessly.",
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 1799,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    description: "Comfortable shoes for everyday adventures.",
  },
  {
    id: 4,
    name: "Backpack",
    price: 999,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    description: "A practical backpack for work and travel.",
  },
  {
    id: 5,
    name: "Sunglasses",
    price: 799,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
    description: "Classic sunglasses with a modern look.",
  },
  {
    id: 6,
    name: "Travel Bottle",
    price: 499,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600",
    description: "Reusable bottle for daily hydration.",
  },
];

function getSavedData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() =>
    getSavedData("shopease_cart", [])
  );

  const [wishlist, setWishlist] = useState(() =>
    getSavedData("shopease_wishlist", [])
  );

  const [user, setUser] = useState(() =>
    getSavedData("shopease_user", null)
  );

  const [orders, setOrders] = useState(() =>
    getSavedData("shopease_orders", [])
  );

  useEffect(() => {
    localStorage.setItem("shopease_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("shopease_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("shopease_orders", JSON.stringify(orders));
  }, [orders]);

  function addToCart(product) {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  }

  function changeQuantity(id, amount) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function toggleWishlist(product) {
    setWishlist((currentWishlist) =>
      currentWishlist.some((item) => item.id === product.id)
        ? currentWishlist.filter((item) => item.id !== product.id)
        : [...currentWishlist, product]
    );
  }

  function login(email) {
    const loggedInUser = { email };

    localStorage.setItem(
      "shopease_user",
      JSON.stringify(loggedInUser)
    );

    setUser(loggedInUser);
    navigate("/");
  }

  function logout() {
    localStorage.removeItem("shopease_user");
    setUser(null);
    navigate("/");
  }

  function placeOrder(details) {
    if (!user) {
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      navigate("/");
      return;
    }

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: cart,
      total,
      customer: user.email,
      address: details.address,
      paymentMethod: details.paymentMethod,
    };

    setOrders((currentOrders) => [newOrder, ...currentOrders]);
    setCart([]);
    navigate("/orders");
  }

  return (
    <>
      <Navbar
        user={user}
        cartCount={cart.reduce(
          (sum, item) => sum + item.quantity,
          0
        )}
        wishlistCount={wishlist.length}
        onLogout={logout}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={PRODUCTS}
              addToCart={addToCart}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          }
        />

        <Route
          path="/login"
          element={<Login user={user} onLogin={login} />}
        />

        <Route
          path="/signup"
          element={<Signup onSignup={login} />}
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              changeQuantity={changeQuantity}
            />
          }
        />

        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              user={user}
              onPlaceOrder={placeOrder}
            />
          }
        />

        <Route
          path="/orders"
          element={<MyOrders orders={orders} />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>

      <footer className="footer">
        <p>© 2026 ShopEase — Shopping made simple.</p>
      </footer>
    </>
  );
}