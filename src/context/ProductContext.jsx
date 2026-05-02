import { createContext, useContext, useReducer } from "react"
import seedProducts from "../data/products"

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Generate a safe numeric ID that never collides with existing IDs */
function nextId(products) {
  if (products.length === 0) return 1
  return Math.max(...products.map((p) => p.id)) + 1
}

// ─── Reducer ──────────────────────────────────────────────────────────────────

function productReducer(state, action) {
  switch (action.type) {

    case "ADD_PRODUCT":
      return [
        ...state,
        {
          id:       nextId(state),
          name:     action.product.name.trim(),
          brand:    (action.product.brand || "Donal").trim(),
          category: action.product.category.trim(),
          price:    Number(action.product.price),
          image:    action.product.image.trim() ||
                    `https://placehold.co/300x300/e0f5f2/2a9d8f?text=${encodeURIComponent((action.product.brand || "Donal").trim())}`,
        },
      ]

    case "DELETE_PRODUCT":
      return state.filter((p) => p.id !== action.id)

    case "UPDATE_PRODUCT":
      return state.map((p) =>
        p.id === action.product.id
          ? {
              ...p,
              name:     action.product.name.trim(),
              brand:    (action.product.brand || p.brand || "Donal").trim(),
              category: action.product.category.trim(),
              price:    Number(action.product.price),
              image:    action.product.image.trim() ||
                        `https://placehold.co/300x300/e0f5f2/2a9d8f?text=${encodeURIComponent((action.product.brand || p.brand || "Donal").trim())}`,
            }
          : p
      )

    default:
      return state
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ProductContext = createContext(null)

export function ProductProvider({ children }) {
  // Seed from static data file — single source of initial truth
  const [products, dispatch] = useReducer(productReducer, seedProducts)

  const addProduct    = (product)        => dispatch({ type: "ADD_PRODUCT",    product })
  const deleteProduct = (id)             => dispatch({ type: "DELETE_PRODUCT", id })
  const updateProduct = (product)        => dispatch({ type: "UPDATE_PRODUCT", product })

  const value = { products, addProduct, deleteProduct, updateProduct }

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  )
}

// ─── Custom hook ──────────────────────────────────────────────────────────────

export function useProducts() {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error("useProducts must be used inside <ProductProvider>")
  }
  return context
}
