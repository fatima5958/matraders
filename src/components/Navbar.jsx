import { Link, useLocation } from "react-router-dom"
import { useCart } from "../context/CartContext"

function Navbar() {
  const { totalQuantity } = useCart()
  const { pathname } = useLocation()

  const links = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ]

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          MA Traders
        </Link>

        <div className="navbar__links">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={
                "navbar__link" +
                (pathname === to ? " navbar__link--active" : "")
              }
            >
              {label}
            </Link>
          ))}

          <Link to="/cart" className="navbar__cart">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            Cart
            {totalQuantity > 0 && (
              <span className="navbar__cart-badge">{totalQuantity}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
