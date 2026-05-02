import { Link } from "react-router-dom"
import { WHATSAPP_NUMBER } from "../utils/orderUtils"

function Footer() {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}`
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-inner">

        {/* Brand col */}
        <div className="footer-col footer-col--brand">
          <Link to="/" className="footer-brand">MA Traders</Link>
          <p className="footer-tagline">
            Premium confectionery & snacks delivered across Pakistan.
            Trusted by families and retailers since day one.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-whatsapp-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L.057 23.428a.5.5 0 0 0 .609.61l5.733-1.502A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.956 9.956 0 0 1-5.031-1.36l-.36-.214-3.734.979.995-3.636-.234-.374A9.958 9.958 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>

        {/* Quick links */}
        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/category/Donal">Donal</Link></li>
            <li><Link to="/category/Gibbs">Gibb's</Link></li>
            <li><Link to="/category/Tastemaker">Tastemaker</Link></li>
            <li><Link to="/cart">My Cart</Link></li>
          </ul>
        </div>

        {/* Info */}
        <div className="footer-col">
          <h4 className="footer-heading">Company</h4>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact info */}
        <div className="footer-col">
          <h4 className="footer-heading">Contact Us</h4>
          <ul className="footer-contact-list">
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L.057 23.428a.5.5 0 0 0 .609.61l5.733-1.502A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.956 9.956 0 0 1-5.031-1.36l-.36-.214-3.734.979.995-3.636-.234-.374A9.958 9.958 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">+92 342 636 0300</a>
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <span>Moh. Bilal Nagar, Churasta Mian Khan,<br />Basirpur Road, Pakistan</span>
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>Mon – Sat: 9:00 AM – 7:00 PM</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {year} MA Traders · All rights reserved · Premium Confectionery & Snacks</p>
        <p className="footer-bottom__brands">Official distributor of <strong>Donal</strong> · <strong>Gibb's</strong> · <strong>Tastemaker</strong></p>
      </div>
    </footer>
  )
}

export default Footer
