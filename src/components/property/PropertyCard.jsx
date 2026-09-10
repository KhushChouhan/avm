import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

export default function PropertyCard({ property, royal = true }) {
  const isPlot = property.plotNumber !== undefined;

  return (
    <article className={`property-card plot-card-styled ${royal ? 'royal-leather-card' : ''}`}>
      {royal && (
        <>
          <div className="gold-corner-bracket top-left" />
          <div className="gold-corner-bracket top-right" />
          <div className="gold-corner-bracket bottom-left" />
          <div className="gold-corner-bracket bottom-right" />
        </>
      )}
      <Link to={isPlot ? `/plots/${property.id}` : `/properties`} className="property-image">
        <img
          src={
            property.image ||
            (property.projectSlug === 'avm-grand-meadows'
              ? 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
              : 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80')
          }
          alt={property.title || `Plot ${property.plotNumber}`}
          loading="lazy"
        />
        {property.status && (
          <span className={`status-tag ${property.status.toLowerCase()}`}>
            {property.status === 'AVAILABLE' && <CheckCircle2 size={11} />}
            {property.status === 'HOLD' && <AlertCircle size={11} />}
            {property.status === 'SOLD' && <XCircle size={11} />}
            {property.status}
          </span>
        )}
        {property.isCorner && <span className="corner-tag-card">Corner Plot</span>}
        <i><ArrowUpRight size={18} /></i>
      </Link>

      <div className="property-body" style={{ padding: '22px 20px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <p className="location" style={{ margin: 0, color: '#dfba73', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}>
            <MapPin size={13} style={{ color: '#dfba73' }} /> {property.projectName || property.location}
          </p>
          {isPlot && property.pricePerGaj && (
            <span style={{ fontSize: '10px', color: '#f3df95', background: 'rgba(223, 186, 115, 0.15)', border: '1px solid rgba(223, 186, 115, 0.35)', padding: '2px 8px', borderRadius: '3px', fontWeight: 700 }}>
              ₹{(property.pricePerGaj / 1000).toFixed(1)}k / Gaj
            </span>
          )}
        </div>

        <h3 style={{ color: '#ffffff', fontSize: '22px', fontFamily: 'Cormorant Garamond, Georgia, serif', margin: '4px 0 10px', fontWeight: 600 }}>
          {isPlot ? `Plot #${property.plotNumber} — ${property.areaGaj} Gaj` : property.title}
        </h3>

        {isPlot && (
          <div className="plot-attribute-row" style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(223, 186, 115, 0.25)', color: '#cbd5e1', padding: '3px 9px', borderRadius: '3px', fontSize: '11px' }}>
              {plotDimensionsOrFacing(property)}
            </span>
            <span style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(223, 186, 115, 0.25)', color: '#cbd5e1', padding: '3px 9px', borderRadius: '3px', fontSize: '11px' }}>
              {property.roadWidthFt}ft Sector Road
            </span>
            <span style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#6ee7b7', padding: '3px 8px', borderRadius: '3px', fontSize: '10px', fontWeight: 700 }}>
              JDA Patta
            </span>
          </div>
        )}

        <div className="property-meta" style={{ borderTop: '1px solid rgba(223, 186, 115, 0.25)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ color: '#cbd5e1', fontSize: '12px' }}>
            {isPlot ? `${property.areaGaj} Gaj (${property.dimensions})` : property.size}
          </span>
          <b style={{ color: '#dfba73', fontSize: '20px', fontFamily: 'Cormorant Garamond, Georgia, serif', fontWeight: 700, textShadow: '0 0 12px rgba(223, 186, 115, 0.3)' }}>
            {property.priceDisplay || property.price}
          </b>
        </div>

        <div className="plot-card-buttons" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <Link to={isPlot ? `/plots/${property.id}` : `/properties`} className="plain-link" style={{ color: '#dfba73', fontSize: '12px', borderBottom: '1px solid #dfba73', textDecoration: 'none' }}>
            Inspect Details <ArrowUpRight size={14} />
          </Link>
          {isPlot && property.status === 'AVAILABLE' && (
            <button
              className="visit-quick-btn"
              onClick={() => {
                const event = new CustomEvent('open-site-visit', { detail: { plot: property } });
                window.dispatchEvent(event);
              }}
              style={{ background: 'linear-gradient(135deg, #dfba73 0%, #b45309 100%)', color: '#06111c', fontWeight: 800, padding: '7px 14px', borderRadius: '4px', border: '1px solid #ffe8aa', cursor: 'pointer', fontSize: '11px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
            >
              Book VIP Visit
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function plotDimensionsOrFacing(property) {
  if (property.facing) return `${property.facing} Facing`;
  return property.dimensions || 'Demarcated';
}
