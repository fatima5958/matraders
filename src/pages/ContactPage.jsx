import { WHATSAPP_NUMBER } from "../utils/orderUtils"

function ContactPage() {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}`

  const faqs = [
    { q: "How do I place a bulk order?", a: "Simply message us on WhatsApp with your product list and quantities. We'll confirm availability and share pricing within minutes." },
    { q: "Do you deliver outside Basirpur?", a: "Yes! We deliver across Pakistan. Shipping charges depend on your location. Message us for details." },
    { q: "Are volume discounts available?", a: "Absolutely. Get 5% off on 10+ items and 10% off on 50+ items. Larger orders may qualify for additional discounts — just ask." },
    { q: "How do I know products are genuine?", a: "We source directly from authorised distributors. Every product is 100% authentic — no second-hand or counterfeit items, ever." },
  ]

  return (
    <div className="page-wrapper">
      <div className="container" style={{ maxWidth: 780 }}>

        {/* Hero */}
        <div className="about-hero">
          <div className="about-hero__badge">📞 Get in Touch</div>
          <h1 className="page-title about-hero__title">
            We're Always{" "}
            <span style={{ color: "var(--clr-primary)" }}>Here For You</span>
          </h1>
          <p className="about-hero__sub">
            Questions about an order? Need bulk pricing? Want to visit us?
            Reach out — we're fast, friendly, and ready to help.
          </p>
        </div>

        {/* Primary WhatsApp CTA */}
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="contact-whatsapp-hero">
          <div className="contact-whatsapp-hero__icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L.057 23.428a.5.5 0 0 0 .609.61l5.733-1.502A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.956 9.956 0 0 1-5.031-1.36l-.36-.214-3.734.979.995-3.636-.234-.374A9.958 9.958 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
          </div>
          <div className="contact-whatsapp-hero__text">
            <p className="contact-whatsapp-hero__label">Our Fastest Channel</p>
            <p className="contact-whatsapp-hero__number">+92 342 636 0300</p>
            <p className="contact-whatsapp-hero__hint">Tap to open WhatsApp chat →</p>
          </div>
          <div className="contact-whatsapp-hero__pulse" />
        </a>

        {/* Contact Cards */}
        <div className="contact-cards">
          {/* Location */}
          <div className="contact-card">
            <span className="contact-card__icon">📍</span>
            <div>
              <p className="contact-card__title">Find Our Store</p>
              <p className="contact-card__sub">Come visit us in person</p>
              <p className="contact-card__value">Moh. Bilal Nagar</p>
              <p style={{ fontSize: "var(--font-size-xs)", color: "var(--clr-text-muted)", marginTop: 2 }}>
                Churasta Mian Khan, Basirpur Road
              </p>
            </div>
          </div>

          {/* Hours */}
          <div className="contact-card">
            <span className="contact-card__icon">🕐</span>
            <div>
              <p className="contact-card__title">Business Hours</p>
              <p className="contact-card__sub">We're open 6 days a week</p>
              <p className="contact-card__value">Mon – Sat</p>
              <p style={{ fontSize: "var(--font-size-xs)", color: "var(--clr-text-muted)", marginTop: 2 }}>9:00 AM – 7:00 PM</p>
            </div>
          </div>

          {/* Bulk orders */}
          <div className="contact-card">
            <span className="contact-card__icon">📦</span>
            <div>
              <p className="contact-card__title">Bulk & Wholesale</p>
              <p className="contact-card__sub">Special rates for volume buyers</p>
              <p className="contact-card__value">10% off 50+ items</p>
              <p style={{ fontSize: "var(--font-size-xs)", color: "var(--clr-text-muted)", marginTop: 2 }}>Message us for a custom quote</p>
            </div>
          </div>

          {/* Response time */}
          <div className="contact-card">
            <span className="contact-card__icon">⚡</span>
            <div>
              <p className="contact-card__title">Fast Response</p>
              <p className="contact-card__sub">We don't leave you waiting</p>
              <p className="contact-card__value">Usually within minutes</p>
              <p style={{ fontSize: "var(--font-size-xs)", color: "var(--clr-text-muted)", marginTop: 2 }}>During business hours</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="about-section">
          <h2 className="about-section__title" style={{ textAlign: "center" }}>Frequently Asked Questions</h2>
          <div className="contact-faq">
            {faqs.map((faq) => (
              <div key={faq.q} className="contact-faq__item">
                <p className="contact-faq__q">❓ {faq.q}</p>
                <p className="contact-faq__a">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div style={{ textAlign: "center", marginTop: "var(--sp-10)", paddingBottom: "var(--sp-10)" }}>
          <p style={{ color: "var(--clr-text-muted)", marginBottom: "var(--sp-4)" }}>
            Still have a question? We're just one message away.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
            style={{ padding: "var(--sp-3) var(--sp-10)", fontSize: "var(--font-size-base)" }}
          >
            💬 Open WhatsApp
          </a>
        </div>

      </div>
    </div>
  )
}

export default ContactPage
