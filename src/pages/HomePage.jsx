import { Link } from "react-router-dom"
import { useMemo } from "react"
import { useProducts } from "../context/ProductContext"
import { getCategories } from "../utils/filterProducts"

/* ── Real Unsplash images per category ── */
const CATEGORY_DATA = {
  Biscuits:      { image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", icon: <BiscuitIcon /> },
  Snacks:        { image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=800&q=80", icon: <SnackIcon /> },
  Cakes:         { image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80", icon: <CakeIcon /> },
  Candies:       { image: "https://images.unsplash.com/photo-1582058091597-5b63b46a30f9?w=800&q=80", icon: <CandyIcon /> },
  Wafers:        { image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80", icon: <WaferIcon /> },
  Chocolates:    { image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&q=80", icon: <ChocolateIcon /> },
  Miscellaneous: { image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800&q=80", icon: <BoxIcon /> },
}

const PRODUCT_IMAGES = {
  Biscuits:      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80",
  Snacks:        "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80",
  Cakes:         "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80",
  Candies:       "https://images.unsplash.com/photo-1582058091597-5b63b46a30f9?w=400&q=80",
  Wafers:        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80",
  Chocolates:    "https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&q=80",
  Miscellaneous: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&q=80",
}

function HomePage() {
  const { products } = useProducts()
  const categories = useMemo(() => getCategories(products).filter((c) => c !== "All"), [products])
  const stats = useMemo(() => ({
    products: products.length,
    categories: categories.length,
    brands: [...new Set(products.map((p) => p.brand).filter(Boolean))].length,
  }), [products, categories])
  const featured = useMemo(() => products.slice(0, 6), [products])

  return (
    <div className="home">

      {/* ── HERO ── */}
      <section className="hero" aria-label="Hero">
        <div className="hero__bg" aria-hidden="true" />
        <div className="hero__overlay" aria-hidden="true" />
        <div className="hero__content container">
          <div className="hero__text">
            <p className="hero__eyebrow">
              <span className="hero__eyebrow-dot" />
              Pakistan's Favourite Confectionery
            </p>
            <h1 className="hero__headline">
              Quality Snacks &amp;<br /><em>Confectionery.</em>
            </h1>
            <p className="hero__sub">
              Donal, Gibb's and Tastemaker — three beloved brands,<br />
              one trusted wholesale destination.
            </p>
            <div className="hero__actions">
              <Link to="/products" className="btn btn-hero-primary">Shop All Products</Link>
              <Link to="/about"    className="btn btn-hero-ghost">Our Story</Link>
            </div>
          </div>
          <div className="hero__stats">
            <div className="hero__stat"><span className="hero__stat-num">{stats.products}+</span><span className="hero__stat-label">Products</span></div>
            <div className="hero__stat-divider" />
            <div className="hero__stat"><span className="hero__stat-num">{stats.brands}</span><span className="hero__stat-label">Brands</span></div>
            <div className="hero__stat-divider" />
            <div className="hero__stat"><span className="hero__stat-num">{stats.categories}</span><span className="hero__stat-label">Categories</span></div>
          </div>
        </div>
        <div className="hero__scroll" aria-hidden="true"><span /></div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="trust-bar">
        <div className="container trust-bar__inner">
          {[
            { icon: <TruckIcon />,  label: "Nationwide Delivery" },
            { icon: <ShieldIcon />, label: "100% Genuine Brands" },
            { icon: <StarIcon />,   label: "Bulk Order Discounts" },
            { icon: <PkgIcon />,    label: "500+ SKUs Available" },
          ].map(({ icon, label }) => (
            <div key={label} className="trust-item">
              <span className="trust-item__icon">{icon}</span>
              <span className="trust-item__label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section className="section categories-section" aria-labelledby="cat-heading">
        <div className="container">
          <SectionHeader eyebrow="Browse by Category" title="Curated Collections" id="cat-heading" />
          <div className="categories__grid">
            {categories.map((cat) => {
              const count = products.filter((p) => p.category === cat).length
              const data = CATEGORY_DATA[cat] || { image: PRODUCT_IMAGES.Miscellaneous, icon: <BoxIcon /> }
              return (
                <Link key={cat} to={`/category/${encodeURIComponent(cat)}`} className="cat-card" aria-label={`Browse ${cat}`}>
                  <div className="cat-card__img-wrap">
                    <img src={data.image} alt="" className="cat-card__img" loading="lazy" />
                    <div className="cat-card__overlay" />
                  </div>
                  <div className="cat-card__body">
                    <span className="cat-card__icon">{data.icon}</span>
                    <span className="cat-card__name">{cat}</span>
                    <span className="cat-card__count">{count} items</span>
                    <span className="cat-card__arrow"><ArrowRightIcon /></span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="section featured-products" aria-labelledby="prod-heading">
        <div className="featured-products__band" />
        <div className="container">
          <SectionHeader eyebrow="Handpicked for You" title="Featured Products" id="prod-heading" align="left" />
          <div className="products-grid-home">
            {featured.map((p) => (
              <FeaturedProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="featured-products__cta">
            <Link to="/products" className="btn btn-outline-teal">View All Products</Link>
          </div>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <section className="section brands-section" aria-labelledby="brands-heading">
        <div className="container">
          <SectionHeader eyebrow="Our Portfolio" title="Trusted Brands" id="brands-heading" />
          <div className="brands__grid">
            {[
              { name: "Donal",      tagline: "Classic Confectionery",    desc: "Crafted with care for generations — Pakistan's most-loved biscuits and sweets.", img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=700&q=80" },
              { name: "Gibb's",     tagline: "Premium Biscuits & Wafers", desc: "Trusted by families across Pakistan for premium biscuits, wafers and cream treats.", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=700&q=80" },
              { name: "Tastemaker", tagline: "Modern Snacks",             desc: "Innovative chocolates and snacks for the contemporary Pakistani palate.", img: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=700&q=80" },
            ].map((brand) => (
              <Link key={brand.name} to="/products" className="brand-card">
                <div className="brand-card__img-wrap">
                  <img src={brand.img} alt={brand.name} className="brand-card__img" loading="lazy" />
                  <div className="brand-card__img-overlay" />
                </div>
                <div className="brand-card__body">
                  <p className="brand-card__tagline">{brand.tagline}</p>
                  <h3 className="brand-card__name">{brand.name}</h3>
                  <p className="brand-card__desc">{brand.desc}</p>
                  <span className="brand-card__cta">{products.filter((p) => p.brand === brand.name).length} products <ArrowRightIcon /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="section why-us" aria-labelledby="why-heading">
        <div className="container">
          <SectionHeader eyebrow="Why MA Traders" title="Built on Trust" id="why-heading" />
          <div className="why-us__grid">
            {[
              { icon: <StarIcon />,   title: "Genuine Products",  body: "Every brand is sourced directly. Zero counterfeits, zero compromise on quality." },
              { icon: <TruckIcon />,  title: "Nationwide Delivery", body: "We deliver to all major cities across Pakistan, reliably and on time." },
              { icon: <BulkIcon />,   title: "Bulk Discounts",    body: "Order 10+ for 5% off. Order 50+ for 10% off. Discounts applied automatically." },
              { icon: <ShieldIcon />, title: "Trusted Since Day One", body: "Years of service to retailers and resellers. Our reputation speaks for itself." },
            ].map(({ icon, title, body }) => (
              <div key={title} className="why-card">
                <div className="why-card__icon">{icon}</div>
                <h3 className="why-card__title">{title}</h3>
                <p className="why-card__body">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND STORY ── */}
      <section className="section brand-story" aria-labelledby="story-heading">
        <div className="container">
          <div className="brand-story__inner">
            <div className="brand-story__text">
              <p className="brand-story__eyebrow text-eyebrow">Our Story</p>
              <div className="story-divider" />
              <h2 className="brand-story__title" id="story-heading">
                Crafted for those<br />who love great snacks.
              </h2>
              <p className="brand-story__body">
                MA Traders was founded with a single belief: quality confectionery
                should be accessible to every retailer and household across Pakistan.
                We bring Donal, Gibb's, and Tastemaker together under one roof —
                making bulk ordering simple, reliable, and rewarding.
              </p>
              <blockquote className="brand-story__quote">
                "Great snacks bring people together. We make that possible."
              </blockquote>
              <Link to="/about" className="btn btn-outline-teal brand-story__btn">Read Our Story</Link>
            </div>
            <div className="brand-story__img-wrap">
              <img
                src="https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=900&q=80"
                alt="Assorted confectionery products"
                className="brand-story__img"
                loading="lazy"
              />
              <div className="brand-story__frame" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="final-cta">
        <div className="final-cta__bg" />
        <div className="container final-cta__inner">
          <div className="final-cta__text">
            <p className="text-eyebrow final-cta__eyebrow">Ready to Order?</p>
            <h2 className="final-cta__title">Elevate Your Shelves Today.</h2>
            <p className="final-cta__sub">Bulk orders welcome · Discounts auto-applied · Fast nationwide delivery</p>
          </div>
          <div className="final-cta__actions">
            <Link to="/products" className="btn btn-cta-primary">Shop the Collection</Link>
            <Link to="/contact"  className="btn btn-cta-ghost">Contact Us</Link>
          </div>
        </div>
      </section>

    </div>
  )
}

/* ── Featured Product Card ── */
function FeaturedProductCard({ product }) {
  const img = (!product.image || product.image.includes("placehold"))
    ? (PRODUCT_IMAGES[product.category] || PRODUCT_IMAGES.Miscellaneous)
    : product.image
  return (
    <div className="fp-card">
      <div className="fp-card__img-wrap">
        <img src={img} alt={product.name} className="fp-card__img" loading="lazy" />
        {product.brand && <span className="fp-card__brand">{product.brand}</span>}
      </div>
      <div className="fp-card__body">
        <p className="fp-card__category">{product.category}</p>
        <h3 className="fp-card__name">{product.name}</h3>
        <div className="fp-card__footer">
          <span className="fp-card__price">Rs. {product.price}</span>
        </div>
      </div>
    </div>
  )
}

/* ── Section Header ── */
function SectionHeader({ eyebrow, title, id, align = "center" }) {
  return (
    <div className={`section-header section-header--${align}`}>
      <p className="text-eyebrow section-header__eyebrow">{eyebrow}</p>
      <div className="sh-divider" />
      <h2 className="section-header__title" id={id}>{title}</h2>
    </div>
  )
}

/* ── SVG Icons ── */
function BiscuitIcon()   { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/><circle cx="9" cy="9" r="1" fill="currentColor"/><circle cx="15" cy="15" r="1" fill="currentColor"/></svg> }
function SnackIcon()     { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/><path d="M8 3v18M16 3v18"/></svg> }
function CakeIcon()      { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-8a2 2 0 00-2-2H6a2 2 0 00-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2 1 2 1"/><path d="M2 21h20M7 8v3M12 8v3M17 8v3"/></svg> }
function CandyIcon()     { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="7"/><path d="M12 5V3M12 21v-2M5 12H3M21 12h-2"/></svg> }
function WaferIcon()     { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg> }
function ChocolateIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 10h20M8 4v6M14 4v6M8 14h8"/></svg> }
function BoxIcon()       { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg> }
function TruckIcon()     { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> }
function ShieldIcon()    { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg> }
function StarIcon()      { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> }
function BulkIcon()      { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg> }
function PkgIcon()       { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg> }
function ArrowRightIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg> }

export default HomePage
