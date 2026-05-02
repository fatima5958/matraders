import { useState } from "react"

const INITIAL_FORM = { name: "", phone: "", address: "" }
const INITIAL_ERRORS = { name: "", phone: "", address: "", cart: "" }

/**
 * Manages controlled checkout form state and validation.
 * Keeps all form logic out of the page component.
 */
export function useCheckoutForm() {
  const [form, setForm]     = useState(INITIAL_FORM)
  const [errors, setErrors] = useState(INITIAL_ERRORS)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Clear field error on change
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  /**
   * Validates form and cart.
   * @param {number} cartItemCount - Number of items currently in cart
   * @returns {boolean} true if valid
   */
  function validate(cartItemCount) {
    const next = { name: "", phone: "", address: "", cart: "" }
    let valid = true

    if (cartItemCount === 0) {
      next.cart = "Your cart is empty. Add products before placing an order."
      valid = false
    }

    if (!form.name.trim()) {
      next.name = "Customer name is required."
      valid = false
    }

    const phoneClean = form.phone.trim().replace(/\s+/g, "")
    if (!phoneClean) {
      next.phone = "Phone number is required."
      valid = false
    } else if (!/^[0-9+\-()]{7,15}$/.test(phoneClean)) {
      next.phone = "Enter a valid phone number."
      valid = false
    }

    if (!form.address.trim()) {
      next.address = "Delivery address is required."
      valid = false
    }

    setErrors(next)
    return valid
  }

  function resetForm() {
    setForm(INITIAL_FORM)
    setErrors(INITIAL_ERRORS)
  }

  return { form, errors, handleChange, validate, resetForm }
}
