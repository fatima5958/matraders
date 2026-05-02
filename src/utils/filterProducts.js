/**
 * Returns a filtered copy of the products array.
 * Does NOT mutate the original dataset.
 *
 * @param {Array}  products     - Full product list from ProductContext
 * @param {string} category     - Active category filter ("All" skips filter)
 * @param {string} searchQuery  - Search string matched against name, brand, category (case-insensitive)
 * @returns {Array} Filtered product list
 */
export function filterProducts(products, category, searchQuery) {
  let result = [...products]

  if (category && category !== "All") {
    result = result.filter((product) => product.category === category)
  }

  if (searchQuery && searchQuery.trim() !== "") {
    const query = searchQuery.trim().toLowerCase()
    result = result.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        (product.brand && product.brand.toLowerCase().includes(query)) ||
        product.category.toLowerCase().includes(query)
    )
  }

  return result
}

/**
 * Extracts unique category names from a product list.
 * Always prepends "All" as the first option.
 *
 * @param {Array} products - Full product list
 * @returns {Array<string>} List of unique category names with "All" first
 */
export function getCategories(products) {
  const unique = [...new Set(products.map((p) => p.category))]
  return ["All", ...unique]
}

/**
 * Extracts unique brand names from a product list.
 *
 * @param {Array} products - Full product list
 * @returns {Array<string>} List of unique brand names
 */
export function getBrands(products) {
  return [...new Set(products.map((p) => p.brand).filter(Boolean))]
}
