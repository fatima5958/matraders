// ─── WhatsApp Business Number ──────────────────────────────────────────────────
// Replace with actual number in international format (no +, no spaces)
export const WHATSAPP_NUMBER = "923426360300"

/**
 * Formats cart data and customer details into a structured WhatsApp message.
 *
 * @param {Array}  cartItems   - Items from CartContext
 * @param {number} subtotal    - Raw subtotal from CartContext
 * @param {Object} discount    - { label, amount } from CartContext
 * @param {number} finalTotal  - Final total after discount from CartContext
 * @param {Object} customer    - { name, phone, address }
 * @returns {string} Plain-text order message
 */
export function generateOrderMessage(cartItems, subtotal, discount, finalTotal, customer) {
  const itemLines = cartItems
    .map((item) => {
      const lineTotal = item.price * item.quantity
      return `- ${item.name} x${item.quantity} = Rs. ${lineTotal.toFixed(2)}`
    })
    .join("\n")

  const discountLine =
    discount.amount > 0
      ? `Discount (${discount.label}): -Rs. ${discount.amount.toFixed(2)}`
      : "Discount: None"

  const message = [
    "================================",
    "        *MA Traders Order*",
    "================================",
    "",
    "*Items Ordered:*",
    itemLines,
    "",
    "--------------------------------",
    `Subtotal:    Rs. ${subtotal.toFixed(2)}`,
    discountLine,
    `*Final Total: Rs. ${finalTotal.toFixed(2)}*`,
    "--------------------------------",
    "",
    "*Customer Details:*",
    `Name:    ${customer.name}`,
    `Phone:   ${customer.phone}`,
    `Address: ${customer.address}`,
    "================================",
  ].join("\n")

  return message
}

/**
 * Opens WhatsApp in a new tab with a pre-filled encoded message.
 *
 * @param {string} message - Plain-text message from generateOrderMessage()
 */
export function openWhatsApp(message) {
  const encoded = encodeURIComponent(message)
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
  window.open(url, "_blank", "noopener,noreferrer")
}
