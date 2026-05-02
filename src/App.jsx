import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ProductProvider } from './context/ProductContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import CategoryPage from './pages/CategoryPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/category/:name" element={<CategoryPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </ProductProvider>
  )
}

export default App
