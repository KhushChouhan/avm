import { Phone, MessageCircle, Calendar, Sparkles, Map } from 'lucide-react';
import { Link } from 'react-router-dom';
import { companyKnowledge } from '../../data/ragKnowledge';

export default function MobileBottomBar() {
  const triggerAi = () => {
    const event = new CustomEvent('open-ai-chat');
    window.dispatchEvent(event);
  };

  const triggerSiteVisit = () => {
    const event = new CustomEvent('open-site-visit');
    window.dispatchEvent(event);
  };

  return (
    <div className="mobile-bottom-dock">
      <a
        href={`tel:${companyKnowledge.supportPhone.replace(/[^0-9+]/g, '')}`}
        className="dock-item"
        aria-label="Call Sales"
      >
        <Phone size={18} />
        <span>Call</span>
      </a>

      <a
        href={`https://wa.me/${companyKnowledge.officialWhatsApp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi AVM Talks team, I am interested in exploring JDA approved plots in Jaipur.')}`}
        target="_blank"
        rel="noreferrer"
        className="dock-item"
        aria-label="WhatsApp Agent"
      >
        <MessageCircle size={18} />
        <span>WhatsApp</span>
      </a>

      <button
        onClick={triggerAi}
        className="dock-item highlight"
        aria-label="Ask AI Assistant"
      >
        <Sparkles size={20} />
        <span>AI Advisor</span>
      </button>

      <Link to="/master-plan" className="dock-item" aria-label="Master Plan">
        <Map size={18} />
        <span>Layout</span>
      </Link>

      <button
        onClick={triggerSiteVisit}
        className="dock-item book-btn"
        aria-label="Book Site Visit"
      >
        <Calendar size={18} />
        <span>Visit</span>
      </button>
    </div>
  );
}
