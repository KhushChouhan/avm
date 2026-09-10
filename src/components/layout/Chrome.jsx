import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Sparkles, Phone, ArrowUpRight, CirclePlay, Camera, MapPin, ShieldCheck, Calendar, Crown } from 'lucide-react';

const nav = [
  ['/', 'Home'],
  ['/about', 'About AVM'],
  ['/plots', 'Verified Plots'],
  ['/corridors', 'Corridors'],
  ['/master-plan', 'Master Plan'],
  ['/buyer-guide', 'Buyer Guide'],
  ['/#talks', 'AVM Talks'],
  ['/faq', 'FAQ'],
];

export function Brand() {
  return (
    <Link to="/" className="brand royal-brand">
      <div className="brand-crest-medallion">
        <div className="crest-ring-inner">
          <Crown size={18} className="brand-crown-icon" />
        </div>
      </div>
      <div className="brand-titles">
        <div className="brand-primary-row">
          <span className="brand-name">AVM</span>
          <span className="brand-sep" />
          <span className="brand-sub">LAND ESTATES</span>
        </div>
        <small className="brand-tagline">✦ 100% JDA APPROVED • JAIPUR ✦</small>
      </div>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  const triggerAi = () => {
    const event = new CustomEvent('open-ai-chat');
    window.dispatchEvent(event);
  };

  const triggerSiteVisit = () => {
    const event = new CustomEvent('open-site-visit');
    window.dispatchEvent(event);
  };

  return (
    <header className="nav royal-nav-header">
      {/* Top Royal Micro Ticker */}
      <div className="royal-top-ticker">
        <div className="ticker-content">
          <span>❖ 100% GOVT. JDA & RERA SANCTIONED PLOTTED LIVING</span>
          <span className="ticker-dot">✦</span>
          <span>INDIVIDUAL FREEHOLD PATTA GUARANTEED</span>
          <span className="ticker-dot">✦</span>
          <span>60FT & 80FT DEMARCATED MASTER AVENUES</span>
          <span className="ticker-dot">✦</span>
          <span>DIRECT SUB-REGISTRAR TITLE REGISTRATION</span>
          <span className="ticker-dot">✦</span>
          <span>ZERO BROKERAGE COMMISSION</span>
          <span className="ticker-dot">✦</span>
          <span>VIP PRIVATE CHAUFFEUR PICKUP: +91 98290 12345</span>
        </div>
      </div>

      <div className="nav-inner">
        <Brand />
        <nav className="nav-links">
          {nav.map(([path, label]) => (
            <NavLink key={label} to={path}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="ai-nav-btn royal-glow"
            onClick={triggerAi}
            title="Ask AI Land Advisor"
          >
            <Sparkles size={15} />
            <span>Ask AI</span>
          </button>

          <button
            className="visit-button royal-visit-btn"
            onClick={triggerSiteVisit}
          >
            <Calendar size={14} />
            <span>Book VIP Visit</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

        <button
          className="mobile-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="mobile-menu">
          {nav.map(([path, label]) => (
            <NavLink onClick={() => setOpen(false)} key={label} to={path}>
              {label}
              <ArrowUpRight size={18} />
            </NavLink>
          ))}
          <button
            className="mobile-menu-action"
            onClick={() => {
              setOpen(false);
              triggerAi();
            }}
          >
            <Sparkles size={16} /> Ask AI Plot Advisor
          </button>
          <button
            className="mobile-menu-action primary"
            onClick={() => {
              setOpen(false);
              triggerSiteVisit();
            }}
          >
            <Calendar size={16} /> Book On-Ground Site Visit
          </button>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Brand />
          <p className="footer-tag">Where Land Meets Perspective & Clear Title Security.</p>
          <div className="footer-rera-info">
            <ShieldCheck size={16} color="#c6a15b" />
            <span>Exclusively JDA-approved & RERA-certified plotted developments in Jaipur growth corridors.</span>
          </div>
        </div>

        <div>
          <h4>Explore Corridors</h4>
          <Link to="/corridors">Jaipur Growth Corridors Blueprint</Link>
          <Link to="/plots">Ajmer Road Express Plots</Link>
          <Link to="/plots">Ring Road Sector Plots</Link>
          <Link to="/plots">MWC SEZ Tech Hub Plots</Link>
          <Link to="/about">About AVM & Avnish Jain</Link>
          <Link to="/master-plan">Interactive Master Layout</Link>
        </div>

        <div>
          <h4>PropTech Tools</h4>
          <a href="#finder">AI Match Finder</a>
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
          <Link to="/admin">Sales CRM Copilot</Link>
        </div>

        <div>
          <h4>Follow Avnish</h4>
          <a href="https://www.youtube.com/@Avmtalksbyavnish" target="_blank" rel="noreferrer">
            <CirclePlay size={15} /> YouTube Channel
          </a>
          <a href="https://www.instagram.com/avmproperty/" target="_blank" rel="noreferrer">
            <Camera size={15} /> Instagram Official
          </a>
          <p className="muted">Support: +91 98290 12345 • Vaishali Nagar, Jaipur</p>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} AVM Plots & Land Estates by Avnish Jain. All Rights Reserved.</span>
        <span>Strictly Plotted Land only. We do not deal in apartments, flats, or rental properties.</span>
      </div>
    </footer>
  );
}
