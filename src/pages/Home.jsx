import { useState, useMemo } from 'react';
import { 
  ArrowRight, 
  Building2, 
  Compass, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Calendar,
  Award,
  Landmark,
  BadgeCheck,
  CirclePlay,
  Star,
  TrendingUp,
  Check,
  X,
  Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Eyebrow, PlayMark, Reveal, VideoModal } from '../components/common/UI';
import PropertyCard from '../components/property/PropertyCard';
import { plots } from '../data/plotsData';
import { projects } from '../data/projectsData';
import { videos } from '../data/properties';
import AIPlotFinder from '../components/ai/AIPlotFinder';
import MasterPlanExplorer from '../components/masterplan/MasterPlanExplorer';

function Hero() {
  const [corridor, setCorridor] = useState('ALL');
  const [sizeGaj, setSizeGaj] = useState('ALL');
  const [budget, setBudget] = useState('ALL');

  const handleSearch = (e) => {
    e.preventDefault();
    let queryParams = [];
    if (corridor !== 'ALL') queryParams.push(`project=${corridor}`);
    if (sizeGaj !== 'ALL') queryParams.push(`size=${sizeGaj}`);
    if (budget !== 'ALL') queryParams.push(`budget=${budget}`);
    window.location.href = `/plots${queryParams.length ? `?${queryParams.join('&')}` : ''}`;
  };

  const triggerAi = () => {
    const event = new CustomEvent('open-ai-chat');
    window.dispatchEvent(event);
  };

  const triggerSiteVisit = () => {
    const event = new CustomEvent('open-site-visit');
    window.dispatchEvent(event);
  };

  const setPreset = (corr, size, bg) => {
    if (corr) setCorridor(corr);
    if (size) setSizeGaj(size);
    if (bg) setBudget(bg);
  };

  return (
    <section className="sovereign-hero-section">
      <div className="sovereign-hero-ambient" />
      <div className="grid-overlay" />

      <div className="container sovereign-hero-content">
        {/* Royal Crest Monogram Authority Badge */}
        <div className="imperial-crest-medallion">
          <div className="crest-icon-badge">
            <ShieldCheck size={16} className="sparkle-gold" />
          </div>
          <div className="crest-text">
            <span>GOVERNMENT JDA APPROVED • 100% REGISTRATION PATTA</span>
            <strong>AVM TALKS BY AVNISH • JAIPUR PLOTTED LAND AUTHORITY</strong>
          </div>
        </div>

        {/* Grand Sovereign Title */}
        <h1 className="sovereign-grand-title">
          Own The Soil.<br />
          <em className="gold-leaf-text">Build The Dynasty.</em>
        </h1>

        <p className="sovereign-lead-text">
          Forensic-verified residential & villa estates on 60ft–80ft master avenues across Ajmer Road, Ring Road & Mahindra SEZ. 
          Zero builder lock-in. 100% freehold individual Patta deed with direct Sub-Registrar transfer.
        </p>

        {/* The Sovereign Concierge Search Console */}
        <form className="royal-concierge-console royal-leather-card" onSubmit={handleSearch}>
          <div className="gold-corner-bracket top-left" />
          <div className="gold-corner-bracket top-right" />
          <div className="gold-corner-bracket bottom-left" />
          <div className="gold-corner-bracket bottom-right" />

          <div className="concierge-inputs-grid">
            {/* Field 1: Growth Corridor */}
            <div className="concierge-field">
              <label><MapPin size={12} /> Strategic Corridor</label>
              <select value={corridor} onChange={e => setCorridor(e.target.value)}>
                <option value="ALL">All Prime Corridors (Jaipur)</option>
                <option value="avm-emerald-greens">Ajmer Road Express (DPS Axis)</option>
                <option value="avm-grand-meadows">Ring Road Logistics (80ft Road)</option>
                <option value="avm-solitaire-enclave">Mahindra World City SEZ Hub</option>
              </select>
            </div>

            <div className="concierge-divider" />

            {/* Field 2: Plot Footprint */}
            <div className="concierge-field">
              <label><Compass size={12} /> Demarcated Footprint</label>
              <select value={sizeGaj} onChange={e => setSizeGaj(e.target.value)}>
                <option value="ALL">Any Size in Gaj</option>
                <option value="111-150">111 – 150 Gaj (Compact Villa)</option>
                <option value="150-200">150 – 200 Gaj (Most Popular)</option>
                <option value="200-300">200 – 300 Gaj (Grand Duplex)</option>
                <option value="300-500">300+ Gaj (Estate Parcel)</option>
              </select>
            </div>

            <div className="concierge-divider" />

            {/* Field 3: Investment Budget */}
            <div className="concierge-field">
              <label><Landmark size={12} /> Total Budget</label>
              <select value={budget} onChange={e => setBudget(e.target.value)}>
                <option value="ALL">All Price Segments</option>
                <option value="under-25">Under ₹25 Lakh</option>
                <option value="25-35">₹25 – ₹35 Lakh</option>
                <option value="35-50">₹35 – ₹50 Lakh</option>
                <option value="50-plus">₹50 Lakh & Above</option>
              </select>
            </div>

            {/* Action Button */}
            <div className="concierge-action-group">
              <button type="submit" className="concierge-search-btn">
                <span>Explore Plots</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Quick-Preset Recommendation Pills */}
          <div className="concierge-quick-presets">
            <span className="preset-label">Quick Suggestions:</span>
            <button
              type="button"
              className="preset-pill"
              onClick={() => setPreset('avm-emerald-greens', '150-200', '25-35')}
            >
              ⚡ Ajmer Road (150–200 Gaj)
            </button>
            <button
              type="button"
              className="preset-pill"
              onClick={() => setPreset('avm-grand-meadows', 'ALL', 'under-25')}
            >
              ⚡ Ring Road (Under ₹25 Lakh)
            </button>
            <button
              type="button"
              className="preset-pill"
              onClick={() => setPreset('avm-solitaire-enclave', '200-300', '35-50')}
            >
              ⚡ Mahindra SEZ Villa Parcel
            </button>
          </div>

          {/* Bottom helper bar inside console */}
          <div className="concierge-sub-bar">
            <div className="sub-bar-left">
              <span className="live-pulse-dot" />
              <span><strong>{plots.length} Demarcated Plots</strong> Active • 100% Freehold Patta</span>
            </div>
            <div className="sub-bar-right">
              <button type="button" className="concierge-link-btn" onClick={triggerAi}>
                <Sparkles size={14} className="gold-sparkle" />
                <span>Search with AI Concierge</span>
              </button>
              <button type="button" className="concierge-link-btn primary" onClick={triggerSiteVisit}>
                <Calendar size={14} />
                <span>Book VIP Site Visit</span>
              </button>
            </div>
          </div>
        </form>

        {/* 4 Sovereign Trust Pillars with Real-time Metrics */}
        <div className="sovereign-trust-ribbon">
          <div className="sovereign-trust-pillar">
            <ShieldCheck size={22} className="pillar-icon" />
            <div>
              <strong>100% Individual JDA Patta</strong>
              <span>Immediate Sub-Registrar Freehold Transfer</span>
            </div>
          </div>

          <div className="pillar-sep" />

          <div className="sovereign-trust-pillar">
            <Compass size={22} className="pillar-icon" />
            <div>
              <strong>60ft & 80ft Blacktop Avenues</strong>
              <span>Underground Utilities & Demarcation Stones</span>
            </div>
          </div>

          <div className="pillar-sep" />

          <div className="sovereign-trust-pillar">
            <Award size={22} className="pillar-icon" />
            <div>
              <strong>0% Brokerage • 80% Loan</strong>
              <span>Pre-Approved by SBI, HDFC & ICICI Bank</span>
            </div>
          </div>

          <div className="pillar-sep" />

          <div className="sovereign-trust-pillar">
            <BadgeCheck size={22} className="pillar-icon" />
            <div>
              <strong>100K+ Investor Trust</strong>
              <span>Forensic Land Reviews by Avnish Jain</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RoyalFiligreeDivider() {
  return (
    <div className="royal-filigree-divider container">
      <span className="filigree-line" />
      <div className="filigree-crest">
        <span className="filigree-star">✦</span>
        <span className="filigree-monogram">AVM SOVEREIGN PLOTS</span>
        <span className="filigree-star">✦</span>
      </div>
      <span className="filigree-line" />
    </div>
  );
}

function Home() {
  const [video, setVideo] = useState(null);
  const [activeCorridorTab, setActiveCorridorTab] = useState('ALL');

  // Filter featured plots based on selected corridor tab
  const displayedPlots = useMemo(() => {
    if (activeCorridorTab === 'ALL') {
      return plots.filter(p => p.isFeatured).slice(0, 3);
    }
    const matching = plots.filter(p => p.projectSlug === activeCorridorTab);
    return matching.length ? matching.slice(0, 3) : plots.filter(p => p.isFeatured).slice(0, 3);
  }, [activeCorridorTab]);

  return (
    <main className="royal-leather-main">
      <Hero />

      {/* Featured Plotted Inventory (The Crown Collection) - Right below Hero */}
      <section id="plots" className="section crown-collection-section" style={{ padding: '85px 0 60px', background: 'transparent' }}>
        <div className="container">
          <Reveal className="section-heading">
            <div>
              <Eyebrow light>THE CROWN COLLECTION</Eyebrow>
              <h2 style={{ color: '#fff', fontSize: 'clamp(34px, 4.2vw, 50px)' }}>
                Featured <em className="gold-leaf-text">sovereign plots.</em>
              </h2>
            </div>
            <p style={{ color: '#cbd5e1' }}>
              Physical boundary demarcated plots ready for immediate possession and villa construction. Zero builder lock-in.
            </p>
          </Reveal>

          {/* Interactive Corridor Filter Tabs */}
          <div className="crown-tabs-wrapper">
            <button
              className={`crown-tab-btn ${activeCorridorTab === 'ALL' ? 'active' : ''}`}
              onClick={() => setActiveCorridorTab('ALL')}
            >
              <span>All Prime Corridors</span>
              <span className="tab-count-pill">{plots.filter(p => p.isFeatured).length}</span>
            </button>
            <button
              className={`crown-tab-btn ${activeCorridorTab === 'avm-emerald-greens' ? 'active' : ''}`}
              onClick={() => setActiveCorridorTab('avm-emerald-greens')}
            >
              <span>Ajmer Road Express</span>
            </button>
            <button
              className={`crown-tab-btn ${activeCorridorTab === 'avm-grand-meadows' ? 'active' : ''}`}
              onClick={() => setActiveCorridorTab('avm-grand-meadows')}
            >
              <span>Ring Road Logistics</span>
            </button>
            <button
              className={`crown-tab-btn ${activeCorridorTab === 'avm-solitaire-enclave' ? 'active' : ''}`}
              onClick={() => setActiveCorridorTab('avm-solitaire-enclave')}
            >
              <span>Mahindra SEZ Tech Hub</span>
            </button>
          </div>

          <div className="property-grid">
            {displayedPlots.map(plot => (
              <Reveal key={plot.id} className="property-grid-item">
                <PropertyCard property={plot} royal={true} />
              </Reveal>
            ))}
          </div>

          <div className="center-link" style={{ marginTop: '45px' }}>
            <Link to="/plots" className="plain-link" style={{ color: '#dfba73', fontSize: '15px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '8px', borderBottom: '2px solid #dfba73' }}>
              Explore all {plots.length} verified plots with live filters <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <RoyalFiligreeDivider />

      {/* Interactive Master Plan Explorer Section */}
      <section className="section masterplan-section" style={{ background: 'transparent', padding: '85px 0' }}>
        <div className="container">
          <Reveal className="section-heading">
            <div>
              <Eyebrow light>CADASTRAL VECTOR EXPLORER</Eyebrow>
              <h2 style={{ color: '#fff', fontSize: 'clamp(34px, 4.2vw, 48px)' }}>
                Explore project <em style={{ background: 'linear-gradient(135deg, #fff3d1 0%, #dfba73 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>master layouts.</em>
              </h2>
            </div>
            <p style={{ color: '#cbd5e1' }}>Click any demarcated plot to inspect JDA dimensions, facing, sector road width, and live availability status.</p>
          </Reveal>

          <div style={{ position: 'relative' }}>
            <MasterPlanExplorer />
          </div>
        </div>
      </section>

      <RoyalFiligreeDivider />

      {/* AI Plot Finder Wizard Section with Royal Frame */}
      <section id="finder" className="section finder-ai-section" style={{ background: 'transparent', padding: '85px 0' }}>
        <div className="container">
          <AIPlotFinder />
        </div>
      </section>

      <RoyalFiligreeDivider />

      {/* High-Impact Forensic Comparison: Plotted Land vs Apartments */}
      <section id="why" className="section why-section" style={{ background: 'transparent', padding: '85px 0' }}>
        <div className="container">
          <Reveal className="section-heading">
            <div>
              <Eyebrow light>THE FORENSIC LAND ADVANTAGE</Eyebrow>
              <h2 style={{ color: '#fff', fontSize: 'clamp(34px, 4.2vw, 48px)' }}>
                Why plotted land destroys <em style={{ background: 'linear-gradient(135deg, #fff3d1 0%, #dfba73 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>apartments.</em>
              </h2>
            </div>
            <p style={{ color: '#cbd5e1' }}>No depreciating concrete slabs. 100% ownership of the soil beneath your feet with individual Patta.</p>
          </Reveal>

          {/* Forensic Comparison Matrix Table */}
          <div className="forensic-comparison-table royal-leather-card">
            <div className="gold-corner-bracket top-left" />
            <div className="gold-corner-bracket top-right" />
            <div className="gold-corner-bracket bottom-left" />
            <div className="gold-corner-bracket bottom-right" />

            <div className="comparison-table-header">
              <div className="col-metric">Comparison Parameter</div>
              <div className="col-avm">
                <span className="avm-badge">✦ AVM Plotted Estates</span>
                <strong>Individual JDA Land Patta</strong>
              </div>
              <div className="col-flat">
                <span className="flat-badge">Standard High-Rise Flats</span>
                <strong>Apartments / Group Housing</strong>
              </div>
            </div>

            <div className="comparison-row">
              <div className="col-metric">
                <strong>Soil & Title Ownership</strong>
                <span>Legal deed security at Sub-Registrar</span>
              </div>
              <div className="col-avm">
                <div className="check-text">
                  <Check size={16} className="text-gold" />
                  <span><strong>100% Freehold Patta</strong> directly in your name. Zero builder mortgage lien.</span>
                </div>
              </div>
              <div className="col-flat">
                <div className="cross-text">
                  <X size={16} className="text-red" />
                  <span>Undivided Land Share (UDS) fractional rights only. High legal dispute risk.</span>
                </div>
              </div>
            </div>

            <div className="comparison-row">
              <div className="col-metric">
                <strong>Capital Appreciation Rate</strong>
                <span>Historical 5-year Jaipur CAGR</span>
              </div>
              <div className="col-avm">
                <div className="check-text">
                  <Check size={16} className="text-gold" />
                  <span><strong>18% – 24% Annual Growth</strong> as land supply is permanently finite.</span>
                </div>
              </div>
              <div className="col-flat">
                <div className="cross-text">
                  <X size={16} className="text-red" />
                  <span>4% – 6% slow appreciation; building structure depreciates after 8-10 years.</span>
                </div>
              </div>
            </div>

            <div className="comparison-row">
              <div className="col-metric">
                <strong>Construction Freedom</strong>
                <span>Architecture, duplex height & terraces</span>
              </div>
              <div className="col-avm">
                <div className="check-text">
                  <Check size={16} className="text-gold" />
                  <span><strong>Build your dream Duplex/Villa</strong> anytime with private garden & independent terrace.</span>
                </div>
              </div>
              <div className="col-flat">
                <div className="cross-text">
                  <X size={16} className="text-red" />
                  <span>Rigid box floorplan; no terrace rights; strict RWA association interference.</span>
                </div>
              </div>
            </div>

            <div className="comparison-row">
              <div className="col-metric">
                <strong>Monthly Maintenance Leakage</strong>
                <span>Recurring lifetime cash outflows</span>
              </div>
              <div className="col-avm">
                <div className="check-text">
                  <Check size={16} className="text-gold" />
                  <span><strong>₹0 Lifetime Builder Maintenance</strong>. Direct public utility meters.</span>
                </div>
              </div>
              <div className="col-flat">
                <div className="cross-text">
                  <X size={16} className="text-red" />
                  <span>₹4,000 – ₹8,000/month recurring maintenance fees increasing every year.</span>
                </div>
              </div>
            </div>

            <div className="comparison-row">
              <div className="col-metric">
                <strong>Demarcated Road Access</strong>
                <span>Master plan avenues vs internal lanes</span>
              </div>
              <div className="col-avm">
                <div className="check-text">
                  <Check size={16} className="text-gold" />
                  <span><strong>60ft & 80ft Demarcated Avenues</strong> with underground electric & water lines.</span>
                </div>
              </div>
              <div className="col-flat">
                <div className="cross-text">
                  <X size={16} className="text-red" />
                  <span>Crowded internal driveways; constant parking basement bottlenecks.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RoyalFiligreeDivider />

      {/* Growth Corridors in Context */}
      <section className="section locations" style={{ background: 'transparent', padding: '85px 0' }}>
        <div className="container">
          <Reveal className="section-heading">
            <div>
              <Eyebrow light>JAIPUR CORRIDOR INTELLIGENCE</Eyebrow>
              <h2 style={{ color: '#fff', fontSize: 'clamp(34px, 4.2vw, 48px)' }}>
                Growth corridors, <em style={{ background: 'linear-gradient(135deg, #fff3d1 0%, #dfba73 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>in context.</em>
              </h2>
            </div>
            <p style={{ color: '#cbd5e1' }}>Focus your capital on high-velocity infrastructure belts in Jaipur with confirmed master plans.</p>
          </Reveal>

          <div className="location-grid">
            {[
              { 
                name: 'Ajmer Road Express', 
                desc: '12 Mins from Vaishali Nagar • Near DPS Jaipur • 200ft Highway', 
                bg: 'loc-0', 
                rate: '₹17.5k / Gaj',
                growth: '+26% YoY Growth'
              },
              { 
                name: 'Ring Road Logistics Hub', 
                desc: '80ft Master Sector Road • 5 Mins to Sanganer Interchange', 
                bg: 'loc-1', 
                rate: '₹15.2k / Gaj',
                growth: '+22% YoY Growth'
              },
              { 
                name: 'Mahindra World City SEZ', 
                desc: 'Opposite Infosys & Tech Hub • 40,000+ High-Income IT Workforce', 
                bg: 'loc-2', 
                rate: '₹19.8k / Gaj',
                growth: '+31% YoY Growth'
              },
              { 
                name: 'Sirsi-Bindayaka Axis', 
                desc: 'Fastest growing residential plotted expansion • Direct Ring Connectivity', 
                bg: 'loc-3', 
                rate: '₹14.0k / Gaj',
                growth: '+19% YoY Growth'
              },
            ].map((area, index) => (
              <Reveal key={area.name} className="property-grid-item">
                <article className={`location-card royal-leather-card ${area.bg}`}>
                  <div className="gold-corner-bracket top-left" />
                  <div className="gold-corner-bracket top-right" />
                  <div className="gold-corner-bracket bottom-left" />
                  <div className="gold-corner-bracket bottom-right" />

                  <div className="location-header-row">
                    <span className="location-num">0{index + 1}</span>
                    <span className="location-growth-pill"><TrendingUp size={11} /> {area.growth}</span>
                  </div>

                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif' }}>{area.name}</h3>
                  <p className="loc-desc">{area.desc}</p>
                  
                  <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid rgba(223, 186, 115, 0.35)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#dfba73', fontWeight: 700 }}>Avg: {area.rate}</span>
                    <Link to="/plots" style={{ color: '#dfba73', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 700 }}>
                      Plots <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <RoyalFiligreeDivider />

      {/* Latest from AVM Talks by Avnish — Media Studio Showcase */}
      <section id="talks" className="section talks-studio-section" style={{ background: 'transparent', padding: '95px 0' }}>
        <div className="container">
          <Reveal className="section-heading">
            <div>
              <Eyebrow light>FORENSIC LAND INTELLIGENCE • HOSTED BY AVNISH JAIN</Eyebrow>
              <h2 style={{ color: '#fff', fontSize: 'clamp(36px, 4.4vw, 52px)' }}>
                Latest from <em className="gold-leaf-text">AVM Talks by Avnish.</em>
              </h2>
            </div>
            <div className="channel-action-box">
              <a 
                className="youtube-channel-badge" 
                href="https://www.youtube.com/@Avmtalksbyavnish" 
                target="_blank" 
                rel="noreferrer"
              >
                <div className="yt-icon-box">
                  <CirclePlay size={18} />
                </div>
                <div>
                  <strong>@Avmtalksbyavnish</strong>
                  <span>100K+ Land Investors</span>
                </div>
                <ArrowRight size={15} />
              </a>
            </div>
          </Reveal>

          {/* Channel Credibility Strip */}
          <div className="talks-trust-strip">
            <div className="trust-pill">
              <Sparkles size={14} style={{ color: '#dfba73' }} />
              <span>100% Ground Reality • Zero Paid Builder Bias</span>
            </div>
            <div className="trust-pill">
              <ShieldCheck size={14} style={{ color: '#dfba73' }} />
              <span>10+ Years Forensic JDA Land Title Experience</span>
            </div>
            <div className="trust-pill">
              <BadgeCheck size={14} style={{ color: '#dfba73' }} />
              <span>500+ Rajasthan Land Deeds Audited</span>
            </div>
          </div>

          {/* Master Studio Dual-Panel Showcase */}
          <div className="talks-studio-grid">
            {/* Left Column: Featured Flagship Episode */}
            <div className="featured-episode-panel royal-leather-card">
              <div className="gold-corner-bracket top-left" />
              <div className="gold-corner-bracket top-right" />
              <div className="gold-corner-bracket bottom-left" />
              <div className="gold-corner-bracket bottom-right" />

              <div className="featured-video-preview" onClick={() => setVideo(videos[0])}>
                <img
                  src={`https://i.ytimg.com/vi/${videos[0].id}/hqdefault.jpg`}
                  alt={videos[0].title}
                  loading="lazy"
                />
                <div className="video-shade-lux" />
                <div className="royal-play-btn">
                  <PlayMark />
                </div>
                <div className="video-meta-ribbon">
                  <span className="live-ep-badge">FEATURED MASTERCLASS</span>
                  <span className="ep-duration-pill">{videos[0].duration}</span>
                </div>
              </div>

              <div className="featured-episode-info">
                <div className="ep-category-row">
                  <span className="ep-cat">{videos[0].category} • COMPLIANCE AUDIT</span>
                  <span className="ep-views-badge">48K+ Views</span>
                </div>
                <h3>{videos[0].title}</h3>
                <p>
                  A complete forensic ground checklist: How to examine individual JDA Patta certificates, 90A revenue conversion orders, Khasra Naksha alignment, and demarcated road widths before paying token advances.
                </p>
                <div className="ep-cta-row">
                  <button className="button gold" onClick={() => setVideo(videos[0])} style={{ padding: '12px 24px', fontSize: '12px' }}>
                    <CirclePlay size={16} /> Watch Full Episode
                  </button>
                  <a
                    href="https://www.youtube.com/@Avmtalksbyavnish"
                    target="_blank"
                    rel="noreferrer"
                    className="button outline"
                    style={{ padding: '12px 20px', fontSize: '12px' }}
                  >
                    All Episodes <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Playlist & Founder Authority Dossier */}
            <div className="studio-sidebar-col">
              {/* Episodes 2 & 3 */}
              <div className="playlist-episodes-wrap">
                {videos.slice(1).map((item, idx) => (
                  <div key={item.id} className="playlist-ep-card royal-leather-card" onClick={() => setVideo(item)}>
                    <div className="gold-corner-bracket top-left" />
                    <div className="gold-corner-bracket top-right" />
                    <div className="gold-corner-bracket bottom-left" />
                    <div className="gold-corner-bracket bottom-right" />

                    <div className="playlist-thumb-box">
                      <img
                        src={`https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`}
                        alt={item.title}
                        loading="lazy"
                      />
                      <div className="playlist-play-icon">
                        <PlayMark />
                      </div>
                      <span className="thumb-duration">{item.duration}</span>
                    </div>

                    <div className="playlist-info-box">
                      <span className="playlist-cat">{item.category} • EPISODE 0{idx + 2}</span>
                      <h4>{item.title}</h4>
                      <span className="watch-now-tag">Click to Watch ▶</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Avnish Authority Quote Plaque */}
              <div className="avnish-quote-card royal-leather-card">
                <div className="gold-corner-bracket top-left" />
                <div className="gold-corner-bracket top-right" />
                <div className="gold-corner-bracket bottom-left" />
                <div className="gold-corner-bracket bottom-right" />

                <div className="quote-badge-row">
                  <div className="founder-initials-badge">
                    <span>AJ</span>
                  </div>
                  <div>
                    <strong>Avnish Jain</strong>
                    <small>Founder • AVM Talks by Avnish</small>
                  </div>
                </div>

                <blockquote className="founder-quote">
                  "In land, paper doesn't lie — people do. Always insist on the original Section 90A order, physical boundary stones, and individual registered Patta before handing over a single rupee."
                </blockquote>

                <div className="quote-footer-actions">
                  <button
                    className="button gold"
                    style={{ flex: 1, padding: '10px 16px', fontSize: '11px', fontWeight: 800 }}
                    onClick={() => {
                      const event = new CustomEvent('open-site-visit');
                      window.dispatchEvent(event);
                    }}
                  >
                    <Calendar size={13} /> Book On-Ground Visit
                  </button>
                  <a
                    href="https://www.youtube.com/@Avmtalksbyavnish"
                    target="_blank"
                    rel="noreferrer"
                    className="button outline"
                    style={{ flex: 1, padding: '10px 16px', fontSize: '11px', textAlign: 'center' }}
                  >
                    YouTube Desk
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RoyalFiligreeDivider />

      {/* [NEW] Verified Investor Testimonials & Patta Handover Dossier */}
      <section className="section testimonials-section" style={{ background: 'transparent', padding: '90px 0' }}>
        <div className="container">
          <Reveal className="section-heading">
            <div>
              <Eyebrow light>VERIFIED INVESTOR PERSPECTIVES</Eyebrow>
              <h2 style={{ color: '#fff', fontSize: 'clamp(34px, 4.2vw, 48px)' }}>
                Real deeds. <em className="gold-leaf-text">Real land owners.</em>
              </h2>
            </div>
            <p style={{ color: '#cbd5e1' }}>Direct feedback from doctors, defense officers, and NRI investors who acquired clear title plots in Jaipur through AVM.</p>
          </Reveal>

          <div className="testimonials-grid">
            {[
              {
                name: 'Dr. R. K. Sharma',
                role: 'Senior Physician, SMS Hospital Jaipur',
                plot: '200 Gaj Villa Plot • Ajmer Road Express',
                quote: '“Having seen multiple delayed apartment projects in Jaipur, buying a freehold JDA-approved plot through Avnishji was the best financial decision. The original Patta was transferred directly at the Sub-Registrar within 7 days. Uncompromising legal clarity.”',
                rating: 5,
                verifiedPatta: 'JDA Patta #AJM-2024-884',
                initials: 'RS'
              },
              {
                name: 'Col. Virendra Rathore',
                role: 'Retd. Indian Armed Forces',
                plot: '250 Gaj Corner Parcel • Ring Road Logistics Hub',
                quote: '“What impressed me most was physical demarcation. Demarcation boundary pillars were physically installed, the 80ft sector avenue was paved, and SBI pre-approved the plot loan with zero hassle. Zero broker spam calls.”',
                rating: 5,
                verifiedPatta: 'JDA Patta #RNG-2025-102',
                initials: 'VR'
              },
              {
                name: 'Priya & Amit Singhal',
                role: 'NRI Tech Director, Dubai (UAE)',
                plot: '300 Gaj Duplex Footprint • Mahindra SEZ Tech Corridor',
                quote: '“Managing property from Dubai is always stressful, but watching AVM Talks on YouTube convinced us. We sent a representative for the physical site visit in their VIP car, verified the cadastral map, and registered the registry deed smoothly.”',
                rating: 5,
                verifiedPatta: 'JDA Patta #SEZ-2025-449',
                initials: 'PS'
              }
            ].map((t, idx) => (
              <Reveal key={idx} className="property-grid-item">
                <div className="testimonial-card royal-leather-card">
                  <div className="gold-corner-bracket top-left" />
                  <div className="gold-corner-bracket top-right" />
                  <div className="gold-corner-bracket bottom-left" />
                  <div className="gold-corner-bracket bottom-right" />

                  <div className="testimonial-top-row">
                    <div className="star-rating-row">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={15} className="star-gold-fill" fill="#dfba73" color="#dfba73" />
                      ))}
                    </div>
                    <span className="verified-patta-chip">
                      <ShieldCheck size={12} /> {t.verifiedPatta}
                    </span>
                  </div>

                  <p className="testimonial-quote-text">{t.quote}</p>

                  <div className="testimonial-author-box">
                    <div className="author-avatar-crest">
                      {t.initials}
                    </div>
                    <div className="author-details">
                      <strong>{t.name}</strong>
                      <span>{t.role}</span>
                      <span className="author-plot-tag">
                        <ShieldCheck size={11} /> {t.plot}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <RoyalFiligreeDivider />

      {/* Royal VIP Site Visit Pass (Boarding Pass Card) */}
      <section id="contact" className="section contact" style={{ background: 'transparent', padding: '95px 0' }}>
        <div className="container">
          <div className="vip-pass-card leather-tufted-surface">
            <div className="gold-corner-bracket top-left" />
            <div className="gold-corner-bracket top-right" />
            <div className="gold-corner-bracket bottom-left" />
            <div className="gold-corner-bracket bottom-right" />

            <div className="vip-pass-main">
              <div className="vip-pass-seal-icon">
                <ShieldCheck size={28} style={{ color: '#dfba73' }} />
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#dfba73', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 700 }}>
                <span>ROYAL BOARDING PASS • JAIPUR PLOTTED CORRIDORS</span>
              </div>
              <h2>Schedule an On-Ground<br /><em style={{ color: '#dfba73' }}>VIP Site Visit.</em></h2>
              <p>
                Experience our plotted developments in person. Inspect physical boundary demarcation stones, wide black-top avenues, underground utilities, and original JDA Patta files before making any commitment.
              </p>

              <div className="vip-perks-list">
                <div className="vip-perk-item">
                  <CheckCircle2 size={16} style={{ color: '#dfba73' }} />
                  <span>Private Chauffeur Pickup from Jaipur City (Home / Airport)</span>
                </div>
                <div className="vip-perk-item">
                  <CheckCircle2 size={16} style={{ color: '#dfba73' }} />
                  <span>On-Table Legal Title, Section 90A & Patta File Review</span>
                </div>
                <div className="vip-perk-item">
                  <CheckCircle2 size={16} style={{ color: '#dfba73' }} />
                  <span>Physical Cadastral Demarcation Stone On-Ground Check</span>
                </div>
                <div className="vip-perk-item">
                  <CheckCircle2 size={16} style={{ color: '#dfba73' }} />
                  <span>Zero-Pressure Forensic Advisory Consultation with Avnish Jain's Team</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', marginTop: '24px', flexWrap: 'wrap' }}>
                <button
                  className="button gold"
                  onClick={() => {
                    const event = new CustomEvent('open-site-visit');
                    window.dispatchEvent(event);
                  }}
                  style={{ background: 'linear-gradient(135deg, #dfba73 0%, #b45309 100%)', color: '#06111c', fontWeight: 700 }}
                >
                  <Calendar size={16} /> Book Private VIP Visit
                </button>
                <a
                  href="tel:+919829012345"
                  className="button outline"
                  style={{ borderColor: '#dfba73', color: '#dfba73' }}
                >
                  <Phone size={15} /> VIP Desk: +91 98290 12345
                </a>
              </div>
            </div>

            <div className="vip-pass-stub">
              <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: '#dfba73', fontWeight: 700 }}>
                PASS IDENTIFIER
              </span>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', color: '#fff', margin: '6px 0', fontWeight: 700 }}>
                #AVM-VIP-2026
              </div>
              <div className="barcode-line">||| | |||| | ||||| || | |||</div>
              <span style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 16px' }}>
                Valid for: 2 Adults + Family
              </span>
              <button
                className="button gold"
                style={{ width: '100%', fontSize: '12px', padding: '10px 16px', background: 'linear-gradient(135deg, #dfba73 0%, #b45309 100%)', color: '#06111c', fontWeight: 700 }}
                onClick={() => {
                  const event = new CustomEvent('open-site-visit');
                  window.dispatchEvent(event);
                }}
              >
                Claim VIP Pass
              </button>
            </div>
          </div>
        </div>
      </section>

      <VideoModal video={video} onClose={() => setVideo(null)} />
    </main>
  );
}

export default Home;
