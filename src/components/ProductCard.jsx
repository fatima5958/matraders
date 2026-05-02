import { useCart } from "../context/CartContext"

/* Real Unsplash images per category */
const CATEGORY_IMAGES = {
  Biscuits:      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80",
  Snacks:        "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80",
  Cakes:         "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80",
  Candies:       "https://images.unsplash.com/photo-1582058091597-5b63b46a30f9?w=400&q=80",
  Wafers:        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80",
  Chocolates:    "https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&q=80",
  Miscellaneous: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&q=80",
}

function ProductCard({ product }) {
  const { addToCart } = useCart()

  /* Replace boring placeholder with real Unsplash image */
  const img =
    !product.image || product.image.includes("placehold")
      ? CATEGORY_IMAGES[product.category] || CATEGORY_IMAGES.Miscellaneous
      : product.image

  return (
    <div className="product-card">
      <div className="product-card__img-wrap">
        <img
          className="product-card__img"
          src={img}
          alt={product.name}
          loading="lazy"
        />
        {product.brand && (
          <span className="product-card__brand-badge">{product.brand}</span>
        )}
      </div>
      <div className="product-card__body">
        {product.category && (
          <p className="product-card__category">{product.category}</p>
        )}
        <h2 className="product-card__name">{product.name}</h2>
        <p className="product-card__price">Rs. {product.price}</p>
      </div>
      <div className="product-card__footer">
        <button
          className="btn btn--primary btn--full"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
