import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Home({
  products,
  addToCart,
  wishlist,
  toggleWishlist,
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  return (
    <main>
      <section className="hero">
        <div>
          <span className="hero-label">WELCOME TO SHOPEASE</span>
          <h1>Find your next<br />favourite thing.</h1>
          <p>Discover everyday essentials, smart gadgets and fresh styles.</p>
          <a href="#products" className="button button-primary hero-button">
            Explore Products
          </a>
        </div>
        <div className="hero-decoration">S.</div>
      </section>

      <section className="products-section" id="products">
        <div className="section-heading">
          <div>
            <span className="category">OUR COLLECTION</span>
            <h2>Popular Products</h2>
          </div>

          <input
            className="search-input"
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="category-filters">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`filter-button ${category === item ? "selected" : ""}`}
            >
              {item}
            </button>
          ))}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        ) : (
          <p className="empty-state">No products found. Try another search.</p>
        )}
      </section>
    </main>
  );
}