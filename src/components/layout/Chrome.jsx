import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles, Phone, ArrowUpRight, CirclePlay, Camera, MapPin, ShieldCheck, Calendar, ChevronRight } from 'lucide-react';
import avmLogo from '../../assets/avm-logo.jpg';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About AVM' },
  { path: '/plots', label: 'Verified Plots', badge: 'JDA' },
  { path: '/corridors', label: 'Growth Corridors' },
  { path: '/master-plan', label: 'Master Plan' },
  { path: '/buyer-guide', label: 'Buyer Guide' },
  { path: '/faq', label: 'FAQ' },
];

export function Brand({ inFooter = false }) {
  return (
    <Link 
      to="/" 
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
      className={`brand royal-brand ${inFooter ? 'royal-brand-footer' : ''}`}
    >
      <div className="brand-logo-medallion">
        <div className="medallion-outer-halo" />
        <div className="medallion-bezel-rim">
          <img
            src={avmLogo}
            alt="AVM Talks by Avnish - Jaipur Plotted Land Estates"
            className="medallion-logo-img"
            onError={(e) => {
              e.currentTarget.src = '/avm-logo.jpg';
            }}
          />
          <div className="medallion-specular-sheen" />
        </div>
      </div>
      <div className="brand-titles">
        <div className="brand-primary-row">
          <span className="brand-name">AVM</span>
          <span className="brand-sep" />
          <span className="brand-sub">TALKS BY AVNISH</span>
        </div>
      </div>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (item, e) => {
    if (item.path === '/#talks') {
      e.preventDefault();
      if (location.pathname === '/') {
        const el = document.getElementById('talks');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/#talks');
      }
    } else if (item.path === location.pathname) {
      e.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const triggerAi = () => {
    const event = new CustomEvent('open-ai-chat');
    window.dispatchEvent(event);
  };

  const triggerSiteVisit = () => {
    const event = new CustomEvent('open-site-visit');
    window.dispatchEvent(event);
  };

  return (
    <header className={`nav royal-nav-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      {/* Main Glassmorphic Navigation Bar */}
      <div className="nav-inner">
        <Brand />

        {/* Center Floating Glass Capsule Navigation */}
        <nav className="nav-links-capsule" aria-label="Main Navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={(e) => handleNavClick(item, e)}
              className={({ isActive }) => `nav-link-item ${isActive && item.path !== '/#talks' ? 'active' : ''}`}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className={`nav-micro-badge ${item.badge.toLowerCase()}`}>
                  {item.isVideo && <span className="media-pulse-dot" />}
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right Luxury Action Cluster */}
        <div className="nav-actions">
          {/* Quick VIP Phone Call */}
          <a
            href="tel:+919829012345"
            className="nav-quick-call-btn"
            title="Direct VIP Concierge: +91 98290 12345"
            aria-label="Call VIP Desk"
          >
            <Phone size={14} />
            <span className="quick-call-label">VIP Desk</span>
          </a>

          {/* AI Advisor Button */}
          <button
            className="ai-nav-btn royal-glow"
            onClick={triggerAi}
            title="Ask AI Land & Plot Advisor"
          >
            <Sparkles size={13} className="sparkle-spin" />
            <span>Ask AI</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className={`mobile-toggle ${open ? 'is-open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Luxury Royal Mobile Menu Drawer */}
      {open && (
        <div className="mobile-menu-backdrop" onClick={() => setOpen(false)}>
          <nav className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <div className="mobile-brand-preview">
                <div className="mobile-menu-logo-ring">
                  <img src={avmLogo} alt="AVM Logo" className="mobile-menu-logo" />
                </div>
                <div>
                  <strong>AVM TALKS BY AVNISH</strong>
                  <small>100% JDA & RERA Approved Land</small>
                </div>
              </div>
              <button
                className="mobile-close-btn"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Category 1: Plotted Inventory & Corridors */}
            <div className="mobile-category-label">Plotted Estates & Corridors</div>
            <div className="mobile-menu-links">
              {navItems.slice(0, 4).map((item) => (
                <NavLink
                  onClick={(e) => {
                    setOpen(false);
                    handleNavClick(item, e);
                  }}
                  key={item.label}
                  to={item.path}
                  className="mobile-nav-link"
                >
                  <div className="mobile-link-left">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`nav-micro-badge ${item.badge.toLowerCase()}`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <ChevronRight size={15} className="mobile-link-arrow" />
                </NavLink>
              ))}
            </div>

            {/* Category 2: Due Diligence & Cadastral Tools */}
            <div className="mobile-category-label" style={{ marginTop: '16px' }}>Due Diligence & Master Plan</div>
            <div className="mobile-menu-links">
              {navItems.slice(4).map((item) => (
                <NavLink
                  onClick={(e) => {
                    setOpen(false);
                    handleNavClick(item, e);
                  }}
                  key={item.label}
                  to={item.path}
                  className="mobile-nav-link"
                >
                  <div className="mobile-link-left">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`nav-micro-badge ${item.badge.toLowerCase()}`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <ChevronRight size={15} className="mobile-link-arrow" />
                </NavLink>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="mobile-menu-actions">
              <button
                className="mobile-action-btn visit-action"
                onClick={() => {
                  setOpen(false);
                  triggerSiteVisit();
                }}
              >
                <Calendar size={15} />
                <span>Book VIP Site Visit (Chauffeur Included)</span>
                <ArrowUpRight size={15} />
              </button>
              <button
                className="mobile-action-btn ai-action"
                onClick={() => {
                  setOpen(false);
                  triggerAi();
                }}
              >
                <Sparkles size={15} />
                <span>Ask AI Land & Plot Advisor</span>
              </button>
              <a href="tel:+919829012345" className="mobile-action-btn phone-action">
                <Phone size={15} />
                <span>Direct VIP Desk: +91 98290 12345</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="royal-luxury-footer">
      <div className="container footer-grid">
        <div className="footer-brand-column">
          <Brand inFooter={true} />
          <p className="footer-tag">Where Land Meets Perspective & Clear Title Security.</p>
          <div className="footer-rera-info">
            <ShieldCheck size={16} color="#c6a15b" />
            <span>Exclusively 100% JDA-approved & RERA-certified plotted land developments in Jaipur growth corridors.</span>
          </div>
          <div className="footer-patta-pledge">
            <span>Direct Sub-Registrar freehold Patta deed. Zero builder debt, zero mortgage lien.</span>
          </div>
        </div>

        <div className="footer-col">
          <h4>Growth Corridors</h4>
          <Link to="/corridors">Jaipur Growth Corridors Blueprint</Link>
          <Link to="/plots">Ajmer Road Express Plots</Link>
          <Link to="/plots">Ring Road Logistics Sector Plots</Link>
          <Link to="/plots">Mahindra SEZ Tech Hub Plots</Link>
          <Link to="/about">About AVM & Avnish Jain</Link>
          <Link to="/master-plan">Cadastral Master Layout</Link>
        </div>

        <div className="footer-col">
          <h4>PropTech Tools</h4>
          <Link to="/#finder">AI Match Finder</Link>
          <button
            className="footer-link-btn"
            onClick={() => {
              const event = new CustomEvent('open-plot-calc');
              window.dispatchEvent(event);
            }}
          >
            Rajasthan Stamp Duty Calc
          </button>
          <button
            className="footer-link-btn"
            onClick={() => {
              const event = new CustomEvent('open-ai-chat');
              window.dispatchEvent(event);
            }}
          >
            Ask AI Land Assistant
          </button>
          <Link to="/buyer-guide">Legal Due Diligence Guide</Link>
          <Link to="/faq">Direct FAQ Dossier</Link>
        </div>

        <div className="footer-col">
          <h4>Official Concierge</h4>
          <a href="https://www.youtube.com/@Avmtalksbyavnish" target="_blank" rel="noreferrer">
            <CirclePlay size={15} /> AVM Talks YouTube Channel
          </a>
          <a href="https://www.instagram.com/avmproperty/" target="_blank" rel="noreferrer">
            <Camera size={15} /> Instagram Official
          </a>
          <a href="tel:+919829012345" className="footer-phone-highlight">
            <Phone size={14} /> VIP Hotline: +91 98290 12345
          </a>
          <p className="muted">Corporate Desk: Vaishali Nagar, Jaipur, Rajasthan</p>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} AVM Plots & Land Estates by Avnish Jain. All Rights Reserved.</span>
        <span className="footer-disclaimer-highlight">
          Strictly Plotted Land & Estates Only. We do not deal in apartments, flats, or rental properties.
        </span>
      </div>
    </footer>
  );
}
