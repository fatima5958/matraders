import { useState, useMemo } from "react"
import { filterProducts, getCategories } from "../utils/filterProducts"
import { useProducts } from "../context/ProductContext"
import ProductCard from "../components/ProductCard"

function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const { products } = useProducts()

  const categories = useMemo(() => getCategories(products), [products])
  const filteredProducts = useMemo(
    () => filterProducts(products, activeCategory, searchQuery),
    [products, activeCategory, searchQuery]
  )

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="page-title">Products</h1>

        {/* Search */}
        <div className="products-toolbar">
          <input
            type="text"
            className="products-search"
            placeholder="Search by name, brand or category…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search products"
          />
        </div>

        {/* Category Filters */}
        <div className="category-filters" role="group" aria-label="Filter by category">
          {categories.map((category) => (
            <button
              key={category}
              className={
                "category-btn" +
                (activeCategory === category ? " category-btn--active" : "")
              }
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="results-count">
          Showing {filteredProducts.length} of {products.length} products
        </p>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state__icon">🔍</p>
            <p className="empty-state__msg">No products match your search.</p>
            {(searchQuery || activeCategory !== "All") && (
              <button
                className="btn btn--ghost"
                onClick={() => { setSearchQuery(""); setActiveCategory("All") }}
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsPage
