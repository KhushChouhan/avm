import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, MapPin, ShieldCheck, Sparkles, Compass, Calculator, MessageCircle } from 'lucide-react';
import { plots } from '../data/plotsData';
import { projects } from '../data/projectsData';
import { Eyebrow } from '../components/common/UI';

export default function PlotDetailPage() {
  const { id } = useParams();
  const plot = plots.find(p => p.id === id) || plots[0];
  const project = projects.find(p => p.slug === plot.projectSlug) || projects[0];

  // Rajasthan Registry estimations
  const stampDuty = Math.round(plot.totalPrice * 0.06);
  const regFee = Math.round(plot.totalPrice * 0.01);
  const totalOutflow = plot.totalPrice + stampDuty + regFee;

  return (
    <main className="detail royal-leather-main">
      {/* Detail Hero */}
      <section className="detail-hero">
        <img
          src={
            plot.image ||
            (plot.projectSlug === 'avm-emerald-greens'
              ? 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=85'
              : plot.projectSlug === 'avm-grand-meadows'
              ? 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85'
              : 'https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=1600&q=85')
          }
          alt={`Plot ${plot.plotNumber} Dossier`}
        />
        <div className="detail-shade" />
        <div className="container detail-copy">
          <Link to="/plots" className="back">
            <ArrowLeft size={16} /> All Verified Plots
          </Link>
          <div className="detail-hero-badge">
            <span className={`status-tag ${plot.status.toLowerCase()}`}>{plot.status}</span>
            {plot.isCorner && <span className="corner-tag-hero">Corner Plot</span>}
            <span className="rera-hero-badge"><ShieldCheck size={12} /> {plot.reraNumber}</span>
          </div>
          <h1>Plot #{plot.plotNumber} — {plot.areaGaj} Gaj</h1>
          <p><MapPin size={16} /> {plot.projectName} • {plot.block}, {plot.location}</p>

          <div className="hero-buttons">
            {plot.status === 'AVAILABLE' && (
              <button
                className="button gold"
                onClick={() => {
                  const event = new CustomEvent('open-site-visit', { detail: { plot } });
                  window.dispatchEvent(event);
                }}
              >
                Schedule Site Visit
              </button>
            )}
            <button
              className="button outline"
              onClick={() => {
                const event = new CustomEvent('open-ai-chat', {
                  detail: {
                    initialPrompt: `Give me a full compliance and pricing summary for Plot ${plot.plotNumber} at ${plot.projectName}.`
                  }
                });
                window.dispatchEvent(event);
              }}
            >
              Consult AI Advisor <Sparkles size={14} />
            </button>
            <Link to="/master-plan" className="button outline">
              View on Master Plan <Compass size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Overview & Granular Specifications Grid */}
      <section id="overview" className="section" style={{ background: 'transparent' }}>
        <div className="container detail-grid">
          <div>
            <Eyebrow light>VERIFIED LAND DOSSIER</Eyebrow>
            <h2>Architectural & <em>Legal Profile.</em></h2>
            <p className="plot-lead-desc">{plot.highlights}</p>

            {/* Rajasthan Registry Outflow Breakdown */}
            <div className="registry-box">
              <div className="reg-title">
                <Calculator size={16} color="#c6a15b" />
                <h4>Transparent Rajasthan Acquisition Outflow</h4>
              </div>
              <div className="reg-row">
                <span>Base Land Agreement Value ({plot.areaGaj} Gaj @ ₹{plot.pricePerGaj}/Gaj)</span>
                <strong>{plot.priceDisplay}</strong>
              </div>
              <div className="reg-row">
                <span>Rajasthan Stamp Duty (6% Standard Male / 5% Female)</span>
                <strong>₹{stampDuty.toLocaleString('en-IN')}</strong>
              </div>
              <div className="reg-row">
                <span>Government Registration Fee (1%)</span>
                <strong>₹{regFee.toLocaleString('en-IN')}</strong>
              </div>
              <div className="reg-total">
                <div>
                  <span>Total Estimated Outflow</span>
                  <small>Zero hidden brokerages or development surprises</small>
                </div>
                <strong>₹{totalOutflow.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            {/* Neighborhood Connectivity & Landmark Distances */}
            <div className="connectivity-box">
              <h4>Infrastructure & Travel Benchmarks</h4>
              <div className="conn-grid">
                {project.connectivity.map((conn, i) => (
                  <div key={i} className="conn-item">
                    <span>{conn.landmark}</span>
                    <strong>{conn.distance}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Plot Specs Card */}
          <aside className="spec-card royal-leather-card">
            <div className="gold-corner-bracket top-left" />
            <div className="gold-corner-bracket top-right" />
            <div className="gold-corner-bracket bottom-left" />
            <div className="gold-corner-bracket bottom-right" />
            <span>OFFICIAL DEMARCATED METRICS</span>
            <div>
              <b>Plot Number</b>
              <p>Plot #{plot.plotNumber}</p>
            </div>
            <div>
              <b>Plot Footprint</b>
              <p>{plot.areaGaj} Gaj (Sq. Yd.) = <strong>{plot.areaSqFt} Sq. Ft.</strong></p>
            </div>
            <div>
              <b>Demarcated Dimensions</b>
              <p>{plot.dimensions}</p>
            </div>
            <div>
              <b>Vastu Facing</b>
              <p>{plot.facing} Facing</p>
            </div>
            <div>
              <b>Front Road Width</b>
              <p>{plot.roadWidthFt} Feet Wide Avenue</p>
            </div>
            <div>
              <b>Corner Advantage</b>
              <p>{plot.isCorner ? 'YES (Dual Road Frontage)' : 'No (Standard Single Side)'}</p>
            </div>
            <div>
              <b>RERA Registration</b>
              <p>{plot.reraNumber}</p>
            </div>
            <div>
              <b>JDA Approval Status</b>
              <p>Approved 90A with Individual Patta</p>
            </div>
            <div>
              <b>Total Price</b>
              <p className="price-highlight">{plot.priceDisplay}</p>
            </div>
          </aside>
        </div>
      </section>

      {/* Township Amenities */}
      <section className="section dark">
        <div className="container">
          <Eyebrow light>INFRASTRUCTURE ASSURANCE</Eyebrow>
          <h2>Township amenities &<br/><em>development benchmarks.</em></h2>
          <div className="feature-row">
            {plot.amenities.map(item => (
              <p key={item}><Check size={17} />{item}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section id="contact" className="section contact">
        <div className="container contact-inner">
          <Eyebrow light>SEE IT ON GROUND</Eyebrow>
          <h2>Inspect Plot #{plot.plotNumber}<br/><em>in person this week.</em></h2>
          <p>We arrange private chauffeured site visits with complete title documents and demarcations presented on ground.</p>
          <div className="hero-buttons">
            <button
              className="button gold"
              onClick={() => {
                const event = new CustomEvent('open-site-visit', { detail: { plot } });
                window.dispatchEvent(event);
              }}
            >
              Schedule Free Site Visit
            </button>
            <a
              href={`https://wa.me/919829012345?text=${encodeURIComponent(`Namaste, I am interested in Plot ${plot.plotNumber} (${plot.areaGaj} Gaj) at ${plot.projectName}. Please send official brochure and Khasra map.`)}`}
              target="_blank"
              rel="noreferrer"
              className="button outline"
            >
              <MessageCircle size={16} /> WhatsApp Land Desk
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
