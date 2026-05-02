import { createContext, useContext, useReducer, useMemo } from "react"

// ─── Discount Rules ────────────────────────────────────────────────────────────
function calculateDiscount(subtotal, totalQuantity) {
  if (totalQuantity >= 50) return { rate: 0.10, label: "10% (50+ items)" }
  if (totalQuantity >= 10) return { rate: 0.05, label: "5% (10+ items)" }
  return { rate: 0, label: "None" }
}

// ─── Reducer ───────────────────────────────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {

    case "ADD_TO_CART": {
      const existing = state.find((item) => item.id === action.product.id)
      if (existing) {
        return state.map((item) =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [
        ...state,
        {
          id:       action.product.id,
          name:     action.product.name,
          price:    action.product.price,
          quantity: 1,
          category: action.product.category,
          image:    action.product.image,
        },
      ]
    }

    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.productId)

    case "INCREASE_QUANTITY":
      return state.map((item) =>
        item.id === action.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )

    case "DECREASE_QUANTITY": {
      const target = state.find((item) => item.id === action.productId)
      if (!target) return state
      if (target.quantity <= 1) {
        return state.filter((item) => item.id !== action.productId)
      }
      return state.map((item) =>
        item.id === action.productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    }

    case "CLEAR_CART":
      return []

    default:
      return state
  }
}

// ─── Context ───────────────────────────────────────────────────────────────────
const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, dispatch] = useReducer(cartReducer, [])

  // ── Reactive calculations — never set manually ──────────────────────────────
  const { subtotal, totalQuantity, discount, finalTotal } = useMemo(() => {
    const subtotal       = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const totalQuantity  = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    const { rate, label } = calculateDiscount(subtotal, totalQuantity)
    const discountAmount = subtotal * rate
    const finalTotal     = subtotal - discountAmount

    return {
      subtotal,
      totalQuantity,
      discount: { rate, label, amount: discountAmount },
      finalTotal,
    }
  }, [cartItems])

  // ── Action creators ─────────────────────────────────────────────────────────
  const addToCart       = (product)   => dispatch({ type: "ADD_TO_CART",       product })
  const removeFromCart  = (productId) => dispatch({ type: "REMOVE_FROM_CART",  productId })
  const increaseQuantity= (productId) => dispatch({ type: "INCREASE_QUANTITY", productId })
  const decreaseQuantity= (productId) => dispatch({ type: "DECREASE_QUANTITY", productId })
  const clearCart       = ()          => dispatch({ type: "CLEAR_CART" })

  const value = {
    cartItems,
    totalQuantity,
    subtotal,
    discount,
    finalTotal,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// ─── Custom hook ───────────────────────────────────────────────────────────────
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used inside <CartProvider>")
  }
  return context
}
