import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

function CartPage() {
  const {
    cartItems,
    subtotal,
    discount,
    finalTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="container">
          <div className="cart-empty">
            <div className="cart-empty__icon">🛒</div>
            <h1 className="page-title">Your Cart is Empty</h1>
            <p className="cart-empty__msg">Looks like you haven't added anything yet.</p>
            <Link to="/products" className="btn btn--primary">Browse Products</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="page-title">Your Cart</h1>

        <div className="cart-layout">
          {/* Cart Items */}
          <div className="cart-items-section">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={() => increaseQuantity(item.id)}
                onDecrease={() => decreaseQuantity(item.id)}
                onRemove={() => removeFromCart(item.id)}
              />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <h2 className="cart-summary__title">Order Summary</h2>

            <div className="cart-summary__row">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary__row">
              <span>Discount ({discount.label})</span>
              <span style={{ color: "var(--clr-primary)" }}>− Rs. {discount.amount.toFixed(2)}</span>
            </div>

            <div className="cart-summary__divider" />

            <div className="cart-summary__total">
              <span>Total</span>
              <span>Rs. {finalTotal.toFixed(2)}</span>
            </div>

            <div className="cart-summary__actions">
              <Link to="/checkout" className="btn btn--primary btn--full">
                Proceed to Checkout
              </Link>
              <button
                className="btn btn--ghost btn--full"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const itemSubtotal = item.price * item.quantity

  return (
    <div className="cart-item">
      <img
        className="cart-item__thumb"
        src={item.image || "https://placehold.co/72x72/e0f5f2/2a9d8f?text=Item"}
        alt={item.name}
      />
      <div className="cart-item__info">
        <p className="cart-item__name">{item.name}</p>
        <p className="cart-item__meta">{item.category}</p>
        <p className="cart-item__price">Rs. {item.price} each</p>
      </div>

      <div className="cart-item__qty">
        <button className="qty-btn" onClick={onDecrease}>−</button>
        <span className="qty-value">{item.quantity}</span>
        <button className="qty-btn" onClick={onIncrease}>+</button>
      </div>

      <div className="cart-item__subtotal">
        Rs. {itemSubtotal.toFixed(2)}
      </div>

      <button className="btn btn--danger" onClick={onRemove}>Remove</button>
    </div>
  )
}

export default CartPage
