// ─────────────────────────────────────────────────────────────────────────────
// MA Traders — Official Product Catalogue
// Approved brands ONLY: Donal | Gibb's | Tastemaker
// ─────────────────────────────────────────────────────────────────────────────

const products = [

  // ── Biscuits ────────────────────────────────────────────────────────────────
  {
    id: 1,
    name: "Donal Butter Biscuits",
    brand: "Donal",
    category: "Biscuits",
    price: 55,
    image: "https://placehold.co/300x300/e0f5f2/2a9d8f?text=Donal"
  },
  {
    id: 2,
    name: "Gibb's Classic Cream Biscuits",
    brand: "Gibb's",
    category: "Biscuits",
    price: 70,
    image: "https://placehold.co/300x300/e0f5f2/1f7a6e?text=Gibb%27s"
  },
  {
    id: 3,
    name: "Tastemaker Digestive Biscuits",
    brand: "Tastemaker",
    category: "Biscuits",
    price: 65,
    image: "https://placehold.co/300x300/e0f5f2/2a9d8f?text=Tastemaker"
  },

  // ── Snacks ──────────────────────────────────────────────────────────────────
  {
    id: 4,
    name: "Donal Masala Puffs",
    brand: "Donal",
    category: "Snacks",
    price: 35,
    image: "https://placehold.co/300x300/e0f5f2/2a9d8f?text=Donal"
  },
  {
    id: 5,
    name: "Gibb's Salted Crisps",
    brand: "Gibb's",
    category: "Snacks",
    price: 45,
    image: "https://placehold.co/300x300/e0f5f2/1f7a6e?text=Gibb%27s"
  },
  {
    id: 6,
    name: "Tastemaker Nimko Mix",
    brand: "Tastemaker",
    category: "Snacks",
    price: 60,
    image: "https://placehold.co/300x300/e0f5f2/2a9d8f?text=Tastemaker"
  },

  // ── Cakes ───────────────────────────────────────────────────────────────────
  {
    id: 7,
    name: "Donal Vanilla Sponge Cake",
    brand: "Donal",
    category: "Cakes",
    price: 90,
    image: "https://placehold.co/300x300/e0f5f2/2a9d8f?text=Donal"
  },
  {
    id: 8,
    name: "Gibb's Chocolate Swiss Roll",
    brand: "Gibb's",
    category: "Cakes",
    price: 125,
    image: "https://placehold.co/300x300/e0f5f2/1f7a6e?text=Gibb%27s"
  },
  {
    id: 9,
    name: "Tastemaker Mini Cupcakes",
    brand: "Tastemaker",
    category: "Cakes",
    price: 110,
    image: "https://placehold.co/300x300/e0f5f2/2a9d8f?text=Tastemaker"
  },

  // ── Candies ─────────────────────────────────────────────────────────────────
  {
    id: 10,
    name: "Donal Fruit Toffees",
    brand: "Donal",
    category: "Candies",
    price: 25,
    image: "https://placehold.co/300x300/e0f5f2/2a9d8f?text=Donal"
  },
  {
    id: 11,
    name: "Gibb's Sour Chilli Candy",
    brand: "Gibb's",
    category: "Candies",
    price: 20,
    image: "https://placehold.co/300x300/e0f5f2/1f7a6e?text=Gibb%27s"
  },
  {
    id: 12,
    name: "Tastemaker Milk Caramels",
    brand: "Tastemaker",
    category: "Candies",
    price: 30,
    image: "https://placehold.co/300x300/e0f5f2/2a9d8f?text=Tastemaker"
  },

  // ── Wafers ──────────────────────────────────────────────────────────────────
  {
    id: 13,
    name: "Donal Crispy Wafer Rolls",
    brand: "Donal",
    category: "Wafers",
    price: 55,
    image: "https://placehold.co/300x300/e0f5f2/2a9d8f?text=Donal"
  },
  {
    id: 14,
    name: "Gibb's Cream Wafer Fingers",
    brand: "Gibb's",
    category: "Wafers",
    price: 70,
    image: "https://placehold.co/300x300/e0f5f2/1f7a6e?text=Gibb%27s"
  },
  {
    id: 15,
    name: "Tastemaker Chocolate Wafer Bar",
    brand: "Tastemaker",
    category: "Wafers",
    price: 80,
    image: "https://placehold.co/300x300/e0f5f2/2a9d8f?text=Tastemaker"
  },

  // ── Chocolates ──────────────────────────────────────────────────────────────
  {
    id: 16,
    name: "Donal Milk Chocolate Slab",
    brand: "Donal",
    category: "Chocolates",
    price: 150,
    image: "https://placehold.co/300x300/e0f5f2/2a9d8f?text=Donal"
  },
  {
    id: 17,
    name: "Gibb's Dark Chocolate Bar",
    brand: "Gibb's",
    category: "Chocolates",
    price: 175,
    image: "https://placehold.co/300x300/e0f5f2/1f7a6e?text=Gibb%27s"
  },
  {
    id: 18,
    name: "Tastemaker Hazelnut Chocolate",
    brand: "Tastemaker",
    category: "Chocolates",
    price: 195,
    image: "https://placehold.co/300x300/e0f5f2/2a9d8f?text=Tastemaker"
  },

  // ── Miscellaneous ───────────────────────────────────────────────────────────
  {
    id: 19,
    name: "Donal Sherbet Sachets",
    brand: "Donal",
    category: "Miscellaneous",
    price: 20,
    image: "https://placehold.co/300x300/e0f5f2/2a9d8f?text=Donal"
  },
  {
    id: 20,
    name: "Gibb's Bubble Gum Assorted",
    brand: "Gibb's",
    category: "Miscellaneous",
    price: 15,
    image: "https://placehold.co/300x300/e0f5f2/1f7a6e?text=Gibb%27s"
  },
  {
    id: 21,
    name: "Tastemaker Mixed Candy Jar",
    brand: "Tastemaker",
    category: "Miscellaneous",
    price: 40,
    image: "https://placehold.co/300x300/e0f5f2/2a9d8f?text=Tastemaker"
  },

]

export default products
