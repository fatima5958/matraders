import { Link } from "react-router-dom"

function AboutPage() {
  const stats = [
    { number: "3", label: "Premium Brands", icon: "🏆" },
    { number: "500+", label: "Happy Customers", icon: "😊" },
    { number: "50+", label: "Products Available", icon: "🍬" },
    { number: "100%", label: "Genuine Products", icon: "✅" },
  ]

  const values = [
    { icon: "✅", title: "Authenticity Guaranteed", body: "Every product comes directly from authorised brand channels. Zero counterfeits — we stake our reputation on it." },
    { icon: "🚚", title: "Fast & Reliable Delivery", body: "We move quickly. Bulk orders get priority dispatch, and we keep you updated every step of the way." },
    { icon: "💬", title: "WhatsApp-First Service", body: "Skip the forms. Just message us directly on WhatsApp for orders, questions, or wholesale pricing — we respond fast." },
    { icon: "💰", title: "Volume Discounts", body: "Buy more, save more. 5% off on 10+ items and 10% off on 50+ items. Perfect for retailers and bulk buyers." },
    { icon: "🤝", title: "Family Business Values", body: "We treat every customer like a partner, not a transaction. Long-term relationships matter more to us than quick sales." },
    { icon: "🌟", title: "Curated Selection", body: "We don't carry everything — we carry the best. Donal, Gibb's, and Tastemaker represent the finest in confectionery." },
  ]

  const brands = [
    { name: "Donal", emoji: "🍭", desc: "Classic confectionery loved by kids and adults across Pakistan. Known for bold flavours and colourful packaging." },
    { name: "Gibbs", emoji: "🍬", desc: "A household name for quality sweets and snacks. Gibb's products are a staple in Pakistani homes for generations." },
    { name: "Tastemaker", emoji: "✨", desc: "Premium snacks crafted for the discerning palate. Every bite is designed to deliver an unforgettable experience." },
  ]

  return (
    <div className="page-wrapper">
      <div className="container" style={{ maxWidth: 900 }}>

        {/* Hero */}
        <div className="about-hero">
          <div className="about-hero__badge">🏪 Our Story</div>
          <h1 className="page-title about-hero__title">
            We're MA Traders —{" "}
            <span style={{ color: "var(--clr-primary)" }}>Your Trusted Sweet Shop</span>
          </h1>
          <p className="about-hero__sub">
            A family-run confectionery business rooted in Basirpur Road, delivering
            premium snacks and sweets to families and retailers across Pakistan.
          </p>
        </div>

        {/* Stats */}
        <div className="about-stats-bar">
          {stats.map((s) => (
            <div key={s.label} className="about-stat">
              <span className="about-stat__icon">{s.icon}</span>
              <span className="about-stat__number">{s.number}</span>
              <span className="about-stat__label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Story + Location Card */}
        <div className="about-section about-story">
          <div className="about-story__text">
            <h2 className="about-section__title">How It All Started</h2>
            <p className="about-section__text">
              MA Traders was born from a simple belief: every family deserves access to
              quality confectionery at honest prices. What started as a small distribution
              outlet in Moh. Bilal Nagar grew organically — driven by word of mouth,
              repeat customers, and an uncompromising commitment to freshness.
            </p>
            <p className="about-section__text">
              Today we're a proud partner for local retailers, kirana stores, and
              individual families who know the difference between genuine products and
              imitations. Our location on Basirpur Road keeps us at the heart of the
              community we serve.
            </p>
            <p className="about-section__text">
              We exclusively carry three premium brands — <strong>Donal</strong>,{" "}
              <strong>Gibb's</strong>, and <strong>Tastemaker</strong> — because focus
              beats variety when it comes to quality control.
            </p>
          </div>
          <div className="about-story__visual">
            <div className="about-story__card">
              <div className="about-story__location-pin">📍</div>
              <p className="about-story__location-name">MA Traders</p>
              <p className="about-story__location-addr">Moh. Bilal Nagar, Churasta Mian Khan</p>
              <p className="about-story__location-addr">Basirpur Road, Pakistan</p>
              <div className="about-story__divider" />
              <p className="about-story__hours-label">Business Hours</p>
              <p className="about-story__hours">Mon – Sat · 9:00 AM – 7:00 PM</p>
              <a href="https://wa.me/923426360300" target="_blank" rel="noopener noreferrer" className="about-story__whatsapp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L.057 23.428a.5.5 0 0 0 .609.61l5.733-1.502A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.956 9.956 0 0 1-5.031-1.36l-.36-.214-3.734.979.995-3.636-.234-.374A9.958 9.958 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                +92 342 636 0300
              </a>
            </div>
          </div>
        </div>

        {/* Brands */}
        <div className="about-section">
          <h2 className="about-section__title" style={{ textAlign: "center" }}>Brands We're Proud to Carry</h2>
          <p style={{ textAlign: "center", color: "var(--clr-text-muted)", marginBottom: "var(--sp-8)" }}>
            We partner only with brands that meet our quality standards.
          </p>
          <div className="about-brands-grid">
            {brands.map((b) => (
              <Link to={`/category/${b.name}`} key={b.name} className="about-brand-card">
                <span className="about-brand-card__emoji">{b.emoji}</span>
                <h3 className="about-brand-card__name">{b.name}</h3>
                <p className="about-brand-card__desc">{b.desc}</p>
                <span className="about-brand-card__cta">View Products →</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="about-section">
          <h2 className="about-section__title" style={{ textAlign: "center" }}>What We Stand For</h2>
          <div className="about-values">
            {values.map((v) => (
              <div key={v.title} className="value-card">
                <span className="value-card__icon" style={{ fontSize: "2rem" }}>{v.icon}</span>
                <h3 className="value-card__title">{v.title}</h3>
                <p className="value-card__body">{v.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="about-cta-block">
          <h2 className="about-cta-block__title">Ready to place an order?</h2>
          <p className="about-cta-block__sub">Browse our full range or drop us a message on WhatsApp for bulk pricing.</p>
          <div className="about-cta-block__btns">
            <Link to="/products" className="btn btn--primary" style={{ padding: "var(--sp-3) var(--sp-10)" }}>Browse Products</Link>
            <a href="https://wa.me/923426360300" target="_blank" rel="noopener noreferrer" className="btn btn--ghost" style={{ padding: "var(--sp-3) var(--sp-10)" }}>
              💬 WhatsApp Us
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AboutPage
