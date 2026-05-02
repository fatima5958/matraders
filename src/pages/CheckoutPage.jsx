import { useNavigate, Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useCheckoutForm } from "../utils/useCheckoutForm"
import { generateOrderMessage, openWhatsApp } from "../utils/orderUtils"

function CheckoutPage() {
  const { cartItems, subtotal, discount, finalTotal, clearCart } = useCart()
  const { form, errors, handleChange, validate, resetForm } = useCheckoutForm()
  const navigate = useNavigate()

  function handlePlaceOrder() {
    const isValid = validate(cartItems.length)
    if (!isValid) return

    const message = generateOrderMessage(
      cartItems,
      subtotal,
      discount,
      finalTotal,
      { name: form.name.trim(), phone: form.phone.trim(), address: form.address.trim() }
    )

    openWhatsApp(message)
    clearCart()
    resetForm()
    navigate("/")
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="page-title">Checkout</h1>

        {errors.cart && (
          <div className="alert alert--error">
            {errors.cart}{" "}
            <Link to="/products" style={{ fontWeight: 700, textDecoration: "underline" }}>
              Browse Products
            </Link>
          </div>
        )}

        <div className="checkout-layout">
          {/* Left column: Customer form */}
          <div>
            <div className="checkout-section">
              <h2 className="checkout-section__title">
                <span className="checkout-section__num">1</span>
                Customer Details
              </h2>

              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-input"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="form-error">⚠ {errors.name}</p>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone Number *</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="form-input"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="e.g. 03001234567"
                />
                {errors.phone && <p className="form-error">⚠ {errors.phone}</p>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="address">Delivery Address *</label>
                <textarea
                  id="address"
                  name="address"
                  className="form-textarea"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Enter your full delivery address"
                  rows={3}
                />
                {errors.address && <p className="form-error">⚠ {errors.address}</p>}
              </div>
            </div>

            <div className="checkout-actions">
              <Link to="/cart" className="btn btn--outline btn--full">
                ← Back to Cart
              </Link>
            </div>
          </div>

          {/* Right column: Order summary + place order */}
          <div>
            <div className="checkout-section">
              <h2 className="checkout-section__title">
                <span className="checkout-section__num">2</span>
                Order Summary
              </h2>

              {cartItems.length === 0 ? (
                <p style={{ color: "var(--clr-text-muted)", fontSize: "var(--font-size-sm)" }}>
                  No items in cart.
                </p>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <OrderSummaryRow key={item.id} item={item} />
                  ))}

                  <div className="order-totals">
                    <div className="order-totals__row">
                      <span>Subtotal</span>
                      <span>Rs. {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="order-totals__row">
                      <span>Discount ({discount.label})</span>
                      <span style={{ color: "var(--clr-primary)" }}>
                        − Rs. {discount.amount.toFixed(2)}
                      </span>
                    </div>
                    <div className="order-totals__final">
                      <span>Total</span>
                      <span>Rs. {finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              className="btn btn--primary btn--full btn--whatsapp"
              onClick={handlePlaceOrder}
              style={{ fontSize: "var(--font-size-base)", padding: "var(--sp-4) var(--sp-6)" }}
            >
              📲 Place Order via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function OrderSummaryRow({ item }) {
  const lineTotal = item.price * item.quantity
  return (
    <div className="order-row">
      <span className="order-row__name">{item.name}</span>
      <span className="order-row__qty">×{item.quantity}</span>
      <span className="order-row__line">Rs. {lineTotal.toFixed(2)}</span>
    </div>
  )
}

export default CheckoutPage
