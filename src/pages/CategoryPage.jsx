import { useParams, Link } from "react-router-dom"
import { useMemo } from "react"
import { useProducts } from "../context/ProductContext"
import ProductCard from "../components/ProductCard"

function CategoryPage() {
  const { name } = useParams()
  const { products } = useProducts()

  const filtered = useMemo(
    () => products.filter((p) => p.category.toLowerCase() === name.toLowerCase()),
    [products, name]
  )

  return (
    <div className="page-wrapper">
      <div className="container">
        <div style={{ marginBottom: "var(--sp-2)" }}>
          <Link
            to="/products"
            style={{
              fontSize: "var(--font-size-sm)",
              color: "var(--clr-text-muted)",
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--sp-1)",
            }}
          >
            ← All Products
          </Link>
        </div>
        <h1 className="page-title">{name}</h1>
        <p className="results-count">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""}
        </p>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state__icon">📦</p>
            <p className="empty-state__msg">No products in this category yet.</p>
            <Link to="/products" className="btn btn--ghost">Browse All Products</Link>
          </div>
        ) : (
          <div className="product-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryPage
