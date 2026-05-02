import { useState, useRef } from "react"
import { useProducts } from "../context/ProductContext"
import { getBrands } from "../utils/filterProducts"

// ─── Constants ────────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = "admin123"

const CATEGORIES = [
  "Biscuits", "Snacks", "Cakes", "Candies", "Wafers", "Chocolates", "Miscellaneous",
]

const STATIC_BRANDS = ["Donal", "Gibb's", "Tastemaker"]

const EMPTY_FORM = { name: "", price: "", brand: "Donal", category: "Biscuits", image: "" }

// ─── Main Page ────────────────────────────────────────────────────────────────
function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  if (!authenticated) return <LoginGate onAuthenticate={() => setAuthenticated(true)} />
  return <AdminDashboard onLogout={() => setAuthenticated(false)} />
}

// ─── Login Gate ───────────────────────────────────────────────────────────────
function LoginGate({ onAuthenticate }) {
  const [input, setInput] = useState("")
  const [error, setError] = useState("")

  function handleLogin() {
    if (input === ADMIN_PASSWORD) { setError(""); onAuthenticate() }
    else setError("Incorrect password. Please try again.")
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-card__logo">MA Traders</div>
        <p className="login-card__subtitle">Admin Panel — Secure Access</p>
        <div className="form-group">
          <label className="form-label" htmlFor="admin-password">Password</label>
          <input
            id="admin-password" type="password" className="form-input" value={input}
            onChange={(e) => { setInput(e.target.value); setError("") }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Enter admin password" autoFocus
          />
          {error && <p className="form-error">⚠ {error}</p>}
        </div>
        <button className="btn btn--primary btn--full" onClick={handleLogin}>Sign In</button>
      </div>
    </div>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function AdminDashboard({ onLogout }) {
  const { products, addProduct, deleteProduct, updateProduct } = useProducts()
  const allBrands = [...new Set([...STATIC_BRANDS, ...getBrands(products)])]

  const [mode, setMode]             = useState(null)
  const [editTarget, setEditTarget] = useState(null)
  const [addForm, setAddForm]       = useState(EMPTY_FORM)
  const [addErrors, setAddErrors]   = useState({})
  const [editForm, setEditForm]     = useState(EMPTY_FORM)
  const [editErrors, setEditErrors] = useState({})

  function validateForm(form) {
    const errs = {}
    if (!form.name.trim())                               errs.name     = "Name is required."
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) errs.price = "Enter a valid positive price."
    if (!form.category.trim())                           errs.category = "Category is required."
    if (!form.brand || !form.brand.trim())               errs.brand    = "Brand is required."
    return errs
  }

  function handleAddChange(e) {
    const { name, value } = e.target
    setAddForm((prev) => ({ ...prev, [name]: value }))
    setAddErrors((prev) => ({ ...prev, [name]: "" }))
  }

  function handleAddSubmit() {
    const errs = validateForm(addForm)
    if (Object.keys(errs).length > 0) { setAddErrors(errs); return }
    addProduct(addForm)
    setAddForm(EMPTY_FORM)
    setAddErrors({})
    setMode(null)
  }

  function startEdit(product) {
    setEditTarget(product.id)
    setEditForm({ name: product.name, price: String(product.price), brand: product.brand || "Donal", category: product.category, image: product.image || "" })
    setEditErrors({})
    setMode("edit")
  }

  function handleEditChange(e) {
    const { name, value } = e.target
    setEditForm((prev) => ({ ...prev, [name]: value }))
    setEditErrors((prev) => ({ ...prev, [name]: "" }))
  }

  function handleEditSubmit() {
    const errs = validateForm(editForm)
    if (Object.keys(errs).length > 0) { setEditErrors(errs); return }
    updateProduct({ id: editTarget, ...editForm })
    setMode(null)
    setEditTarget(null)
  }

  function cancelEdit() { setMode(null); setEditTarget(null); setEditErrors({}) }

  function handleDelete(id) {
    if (window.confirm("Delete this product? This cannot be undone.")) {
      deleteProduct(id)
      if (editTarget === id) cancelEdit()
    }
  }

  const showAddForm  = mode === "add"
  const showEditForm = mode === "edit"

  const byCategory = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = products.filter((p) => p.category === cat).length
    return acc
  }, {})

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Header */}
        <div className="admin-header">
          <div>
            <h1 className="admin-header__title">Admin Dashboard</h1>
            <p className="admin-header__sub">{products.length} product{products.length !== 1 ? "s" : ""} in catalogue</p>
          </div>
          <button className="btn btn--ghost" onClick={onLogout}>Sign Out</button>
        </div>

        {/* Quick Stats */}
        <div className="admin-stats">
          {[
            { label: "Total Products", value: products.length },
            { label: "Brands",         value: getBrands(products).length },
            { label: "Categories",     value: Object.values(byCategory).filter((v) => v > 0).length },
            { label: "Top Category",   value: Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0]?.[0] || "—" },
          ].map((s) => (
            <div key={s.label} className="admin-stat-card">
              <p className="admin-stat-card__value">{s.value}</p>
              <p className="admin-stat-card__label">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="admin-layout">
          {/* Left: Product Table */}
          <div>
            <div className="admin-panel">
              <div className="admin-panel__header">
                <span className="admin-panel__title">All Products</span>
                {mode !== "edit" && mode !== "add" && (
                  <button className="btn btn--primary btn--sm" onClick={() => setMode("add")}>+ Add Product</button>
                )}
                {mode === "add" && (
                  <button className="btn btn--ghost btn--sm" onClick={() => { setMode(null); setAddForm(EMPTY_FORM); setAddErrors({}) }}>Cancel</button>
                )}
              </div>

              <div style={{ overflowX: "auto" }}>
                {products.length === 0 ? (
                  <p style={{ padding: "var(--sp-8)", color: "var(--clr-text-muted)", textAlign: "center" }}>
                    No products yet. Use <strong>+ Add Product</strong> to get started.
                  </p>
                ) : (
                  <table className="product-table">
                    <thead>
                      <tr>
                        <th>#</th><th>Image</th><th>Name</th><th>Brand</th>
                        <th>Category</th><th>Price (Rs.)</th><th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <ProductRow
                          key={product.id} product={product}
                          isEditing={editTarget === product.id}
                          onEdit={() => startEdit(product)}
                          onDelete={() => handleDelete(product.id)}
                        />
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          {/* Right: Form Panel */}
          <div>
            {showAddForm && (
              <ProductFormPanel
                title="Add New Product" form={addForm} errors={addErrors} brands={allBrands}
                onChange={handleAddChange}
                onImageChange={(base64) => setAddForm((prev) => ({ ...prev, image: base64 }))}
                onSubmit={handleAddSubmit}
                onCancel={() => { setMode(null); setAddForm(EMPTY_FORM); setAddErrors({}) }}
                submitLabel="Save Product"
              />
            )}

            {showEditForm && (
              <ProductFormPanel
                title="Edit Product" form={editForm} errors={editErrors} brands={allBrands}
                onChange={handleEditChange}
                onImageChange={(base64) => setEditForm((prev) => ({ ...prev, image: base64 }))}
                onSubmit={handleEditSubmit}
                onCancel={cancelEdit}
                submitLabel="Update Product"
              />
            )}

            {!showAddForm && !showEditForm && (
              <div className="admin-form-panel">
                <div className="admin-form-panel__header">
                  <p className="admin-form-panel__title">Product Management</p>
                </div>
                <div className="admin-form-panel__body">
                  <p style={{ color: "var(--clr-text-muted)", fontSize: "var(--font-size-sm)", lineHeight: 1.7 }}>
                    Use <strong>+ Add Product</strong> to add a new item, or click <strong>Edit</strong> on any row to update it.
                    All changes reflect instantly in the Products page.
                  </p>
                  <div style={{ marginTop: "var(--sp-6)" }}>
                    <p style={{ fontWeight: 700, fontSize: "var(--font-size-sm)", marginBottom: "var(--sp-3)", color: "var(--clr-text-primary)" }}>
                      Products by Category
                    </p>
                    {CATEGORIES.map((cat) => (
                      <div key={cat} style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--font-size-sm)", padding: "var(--sp-2) 0", borderBottom: "1px solid var(--clr-zinc-100)", color: "var(--clr-text-secondary)" }}>
                        <span>{cat}</span>
                        <span style={{ fontWeight: 700, color: "var(--clr-primary)" }}>{byCategory[cat]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Product Table Row ────────────────────────────────────────────────────────
function ProductRow({ product, isEditing, onEdit, onDelete }) {
  return (
    <tr className={isEditing ? "is-editing" : ""}>
      <td style={{ color: "var(--clr-text-muted)", fontSize: "var(--font-size-xs)" }}>{product.id}</td>
      <td>
        <img
          className="product-table__img"
          src={product.image || `https://placehold.co/42x42/e0f5f2/2a9d8f?text=${encodeURIComponent(product.brand || "•")}`}
          alt={product.name}
        />
      </td>
      <td style={{ fontWeight: 600 }}>{product.name}</td>
      <td>
        <span style={{ display: "inline-block", padding: "2px 8px", background: "var(--clr-primary-light)", color: "var(--clr-primary-dark)", borderRadius: "var(--radius-full)", fontSize: "var(--font-size-xs)", fontWeight: 600 }}>
          {product.brand || "—"}
        </span>
      </td>
      <td style={{ color: "var(--clr-text-secondary)", fontSize: "var(--font-size-xs)" }}>{product.category}</td>
      <td style={{ fontWeight: 700 }}>Rs. {product.price}</td>
      <td>
        <div className="action-pills">
          <button className="pill-edit" onClick={onEdit} disabled={isEditing}>Edit</button>
          <button className="pill-delete" onClick={onDelete}>Delete</button>
        </div>
      </td>
    </tr>
  )
}

// ─── Image Upload Field ───────────────────────────────────────────────────────
function ImageUploadField({ currentImage, onImageChange }) {
  const fileRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)
  const [urlInput, setUrlInput] = useState("")
  const [tab, setTab] = useState("upload") // "upload" | "url"

  function processFile(file) {
    if (!file || !file.type.startsWith("image/")) return
    const reader = new FileReader()
    reader.onload = (e) => onImageChange(e.target.result)
    reader.readAsDataURL(file)
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    processFile(file)
  }

  function handleUrlApply() {
    if (urlInput.trim()) {
      onImageChange(urlInput.trim())
      setUrlInput("")
    }
  }

  const preview = currentImage

  return (
    <div className="form-group">
      <label className="form-label">
        Product Image{" "}
        <span style={{ fontWeight: 400, color: "var(--clr-text-muted)" }}>(optional)</span>
      </label>

      {/* Tab switcher */}
      <div className="img-tab-row">
        <button
          type="button"
          className={`img-tab ${tab === "upload" ? "img-tab--active" : ""}`}
          onClick={() => setTab("upload")}
        >
          📁 Upload File
        </button>
        <button
          type="button"
          className={`img-tab ${tab === "url" ? "img-tab--active" : ""}`}
          onClick={() => setTab("url")}
        >
          🔗 Paste URL
        </button>
      </div>

      {tab === "upload" && (
        <div
          className={`img-dropzone ${dragOver ? "img-dropzone--over" : ""}`}
          onClick={() => fileRef.current.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          {preview ? (
            <img src={preview} alt="preview" className="img-dropzone__preview" />
          ) : (
            <div className="img-dropzone__placeholder">
              <span className="img-dropzone__icon">🖼️</span>
              <p className="img-dropzone__hint">Click to browse or drag & drop</p>
              <p className="img-dropzone__hint2">JPG, PNG, WEBP supported</p>
            </div>
          )}
          <input
            ref={fileRef} type="file" accept="image/*" style={{ display: "none" }}
            onChange={(e) => processFile(e.target.files[0])}
          />
        </div>
      )}

      {tab === "url" && (
        <div style={{ display: "flex", gap: "var(--sp-2)" }}>
          <input
            className="form-input"
            placeholder="https://example.com/image.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUrlApply()}
            style={{ flex: 1 }}
          />
          <button type="button" className="btn btn--primary btn--sm" onClick={handleUrlApply}>Apply</button>
        </div>
      )}

      {/* Preview strip below URL tab */}
      {tab === "url" && preview && (
        <div style={{ marginTop: "var(--sp-2)" }}>
          <img src={preview} alt="preview" className="img-dropzone__preview" style={{ borderRadius: "var(--radius-md)", border: "2px solid var(--clr-primary-light)", maxHeight: 100, maxWidth: "100%", objectFit: "contain" }} />
        </div>
      )}

      {preview && (
        <button
          type="button"
          onClick={() => { onImageChange(""); setUrlInput("") }}
          style={{ marginTop: "var(--sp-2)", fontSize: "var(--font-size-xs)", color: "var(--clr-danger, #e63946)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          ✕ Remove image
        </button>
      )}
    </div>
  )
}

// ─── Shared Product Form Panel ────────────────────────────────────────────────
function ProductFormPanel({ title, form, errors, brands, onChange, onImageChange, onSubmit, onCancel, submitLabel }) {
  return (
    <div className="admin-form-panel">
      <div className="admin-form-panel__header">
        <p className="admin-form-panel__title">{title}</p>
      </div>
      <div className="admin-form-panel__body">
        <div className="form-group">
          <label className="form-label">Product Name *</label>
          <input name="name" className="form-input" value={form.name} onChange={onChange} placeholder="e.g. Donal Butter Biscuits" />
          {errors.name && <p className="form-error">⚠ {errors.name}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Brand *</label>
          <select name="brand" className="form-select" value={form.brand} onChange={onChange}>
            {brands.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          {errors.brand && <p className="form-error">⚠ {errors.brand}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Price (Rs.) *</label>
          <input name="price" type="number" min="1" className="form-input" value={form.price} onChange={onChange} placeholder="0" />
          {errors.price && <p className="form-error">⚠ {errors.price}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Category *</label>
          <select name="category" className="form-select" value={form.category} onChange={onChange}>
            {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          {errors.category && <p className="form-error">⚠ {errors.category}</p>}
        </div>

        {/* Image Upload */}
        <ImageUploadField currentImage={form.image} onImageChange={onImageChange} />

        <div style={{ display: "flex", gap: "var(--sp-3)", marginTop: "var(--sp-2)" }}>
          <button className="btn btn--primary" style={{ flex: 1 }} onClick={onSubmit}>{submitLabel}</button>
          <button className="btn btn--ghost" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
