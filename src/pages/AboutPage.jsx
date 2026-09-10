import { useState } from 'react';
import { 
  ShieldCheck, 
  Crown, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  FileText, 
  MapPin, 
  Phone, 
  CirclePlay,
  Layers,
  Scale,
  Building2,
  Compass
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eyebrow, Reveal, VideoModal } from '../components/common/UI';
import { videos } from '../data/properties';

export default function AboutPage() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const protocolSteps = [
    {
      num: '01',
      title: 'Section 90A Revenue Conversion Verification',
      authority: 'Rajasthan Revenue Dept. & JDA',
      desc: 'We verify the original gazette order converting agricultural land to residential plotted status under Section 90A of the Rajasthan Land Revenue Act 1956, ensuring zero pending farm tenancy claims.',
      icon: <FileText size={20} />
    },
    {
      num: '02',
      title: 'Khasra Naksha & Physical Boundary Superimposition',
      authority: 'Revenue Patwari & Cadastral Surveyors',
      desc: 'Digital superimposition of government Khasra maps over physical drone demarcations. We verify that road alignments, corner plots, and park lands conform precisely to government sanctioned blueprints.',
      icon: <Layers size={20} />
    },
    {
      num: '03',
      title: '60ft & 80ft Demarcated Master Sector Avenues',
      authority: 'Jaipur Development Authority (JDA)',
      desc: 'Every colony layout features black-top tar macadam roads (minimum 40ft inner lanes, 60ft to 80ft sector connectors) with underground storm water drainage, electricity cables, and LED avenue illumination.',
      icon: <Compass size={20} />
    },
    {
      num: '04',
      title: 'RERA Rajasthan Statutory Compliance & Escrow Audit',
      authority: 'RERA Rajasthan (rera.rajasthan.gov.in)',
      desc: 'Zero financial diversion. All projects operate under official RERA-designated escrow bank accounts with registered quarterly progress filings and statutory development guarantees.',
      icon: <ShieldCheck size={20} />
    },
    {
      num: '05',
      title: 'Physical On-Ground Stone Demarcation Check',
      authority: 'Licensed Chartered Engineers',
      desc: 'Individual cement-mortar demarcation pillars installed on all four corners of every single plot before inventory release. You physically measure your plot dimensions in Gaj / Sq. Yards on site.',
      icon: <Scale size={20} />
    },
    {
      num: '06',
      title: 'Sub-Registrar Freehold Patta Handover',
      authority: 'Jaipur Sub-Registrar Office',
      desc: 'Direct sub-registrar registry with official stamp duty payment. Buyers receive the sovereign Individual JDA Freehold Patta in their own name, conferring absolute hereditary ownership rights.',
      icon: <Award size={20} />
    }
  ];

  const milestones = [
    {
      year: '2014',
      title: 'Foundations of Forensic Land Due Diligence',
      desc: 'Avnish Jain commenced ground-zero title investigations in the Ajmer Road growth corridor, establishing a strict 100% JDA-compliance audit standard.'
    },
    {
      year: '2018',
      title: 'First Sovereign Plotted Township Delivered',
      desc: 'Completed and handed over a landmark 42-acre master-planned plotted enclave with individual JDA patta certificates and 60ft landscaped boulevards.'
    },
    {
      year: '2021',
      title: 'Launch of "AVM Talks by Avnish" Media Initiative',
      desc: 'Created Rajasthan’s most watched educational YouTube channel to demystify 90A orders, patta verification, and safeguard common citizens against unregulated land fraud.'
    },
    {
      year: '2024',
      title: '500+ Land Deeds Audited & 1,200+ Families Settled',
      desc: 'Reached the historic milestone of ₹450+ Crores worth of plotted land delivered with zero litigation and 100% on-time demarcation handovers.'
    },
    {
      year: '2026',
      title: 'Launch of Sovereign Digital Cadastral Tech Platform',
      desc: 'Integrated AI Plot Advisory, live GIS layout vector maps, and white-glove VIP chauffeur inspections across all four primary Jaipur expansion corridors.'
    }
  ];

  const coreTenets = [
    {
      title: 'Soil Over Concrete',
      desc: 'Apartment flats depreciate while building maintenance mounts. Plotted soil is a perpetual, appreciating sovereign asset that belongs to your generations.',
      badge: 'Dynastic Wealth'
    },
    {
      title: 'Paper Never Lies',
      desc: 'We never accept token booking advances without placing original 90A conversion deeds, JDA maps, and RERA certificates on the review table.',
      badge: 'Forensic Integrity'
    },
    {
      title: 'Zero Brokerage Registry',
      desc: 'Direct developer pricing with complete transparency. No hidden commission charges or fabricated price inflations across any sector.',
      badge: 'Direct Value'
    },
    {
      title: 'Triple-A Bank Loans',
      desc: 'Pre-sanctioned plot purchase and home construction credit up to 80% with leading institutional lenders including SBI, HDFC, and ICICI Bank.',
      badge: 'Institutional Trust'
    }
  ];

  return (
    <main className="about-page royal-leather-main">
      {/* Imperial Hero Header */}
      <section className="about-hero-section">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="about-hero-center"
          >
            <div className="royal-crest-pill">
              <Crown size={14} className="sparkle-gold" />
              <span>THE SOVEREIGN HERITAGE OF AVM LAND ESTATES</span>
            </div>
            <h1>
              Custodians of <em className="gold-leaf-text">Freehold Sovereign Soil.</em>
            </h1>
            <p className="about-hero-subtitle">
              Founded on unyielding forensic due diligence, AVM Land Estates stands as Jaipur’s premier authority in 100% JDA-approved and RERA-registered plotted developments.
            </p>

            <div className="about-quick-stats-strip">
              <div className="quick-stat-box">
                <strong>10+ Years</strong>
                <span>Forensic Land Auditing</span>
              </div>
              <div className="quick-stat-sep" />
              <div className="quick-stat-box">
                <strong>500+</strong>
                <span>Title Deeds Audited</span>
              </div>
              <div className="quick-stat-sep" />
              <div className="quick-stat-box">
                <strong>100K+</strong>
                <span>AVM Talks Community</span>
              </div>
              <div className="quick-stat-sep" />
              <div className="quick-stat-box">
                <strong>100%</strong>
                <span>Individual JDA Patta</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Avnish Jain Founder Spotlight Dossier */}
      <section className="section founder-spotlight-section">
        <div className="container">
          <div className="founder-dossier-card royal-leather-card">
            <div className="gold-corner-bracket top-left" />
            <div className="gold-corner-bracket top-right" />
            <div className="gold-corner-bracket bottom-left" />
            <div className="gold-corner-bracket bottom-right" />

            <div className="founder-dossier-grid">
              {/* Left Column: Portrait & YouTube Badge */}
              <div className="founder-media-col">
                <div className="founder-portrait-frame">
                  <img 
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80" 
                    alt="Avnish Jain - Founder AVM Land Estates" 
                  />
                  <div className="founder-portrait-overlay" />
                  <div className="founder-seal-badge">
                    <Crown size={22} color="#06111c" />
                  </div>
                  <div className="founder-caption-plaque">
                    <strong>Avnish Jain</strong>
                    <span>Founder • Land Title Forensic Expert</span>
                  </div>
                </div>

                <div className="founder-yt-card">
                  <div className="yt-mark-circle">
                    <CirclePlay size={20} />
                  </div>
                  <div className="yt-info">
                    <strong>AVM Talks by Avnish</strong>
                    <span>100K+ Subscribers • YouTube Official</span>
                  </div>
                  <a 
                    href="https://www.youtube.com/@Avmtalksbyavnish" 
                    target="_blank" 
                    rel="noreferrer"
                    className="yt-visit-btn"
                  >
                    View Desk <ArrowRight size={13} />
                  </a>
                </div>
              </div>

              {/* Right Column: Founder Manifesto */}
              <div className="founder-content-col">
                <Eyebrow light>THE FOUNDER’S MANIFESTO</Eyebrow>
                <h2>
                  "In Real Estate, Land Is The Only <em className="gold-leaf-text">Absolute Truth."</em>
                </h2>

                <blockquote className="royal-manifesto-quote">
                  "Over a decade of walking the ground in Jaipur taught me one universal lesson: Concrete towers age and decay, but the soil beneath our feet only deepens in value. Yet, 90% of buyers walk into land deals blindfolded by misleading brochures. At AVM, our mission is straightforward — we forensic-audit every millimeter of paper, demystify Section 90A, and ensure that when you invest your hard-earned life savings, your family receives absolute, unchallengeable freehold ownership."
                </blockquote>

                <div className="founder-credentials-grid">
                  <div className="cred-item">
                    <CheckCircle2 size={16} className="sparkle-gold" />
                    <span>Rajasthan Land Revenue Act Specialist</span>
                  </div>
                  <div className="cred-item">
                    <CheckCircle2 size={16} className="sparkle-gold" />
                    <span>Zero Tolerance on Unsanctioned Colonies</span>
                  </div>
                  <div className="cred-item">
                    <CheckCircle2 size={16} className="sparkle-gold" />
                    <span>500+ Khasra Boundary Verifications Completed</span>
                  </div>
                  <div className="cred-item">
                    <CheckCircle2 size={16} className="sparkle-gold" />
                    <span>Advisor to 1,200+ HNI & Salaried Land Families</span>
                  </div>
                </div>

                <div className="founder-action-row">
                  <button 
                    className="button gold"
                    onClick={() => {
                      const event = new CustomEvent('open-site-visit');
                      window.dispatchEvent(event);
                    }}
                  >
                    <Calendar size={15} /> Book VIP Ground Meeting
                  </button>

                  <a 
                    href="https://wa.me/919829012345?text=Namaste%20Avnish%20ji,%20I%20want%20to%20consult%20regarding%20plotted%20land%20in%20Jaipur."
                    target="_blank" 
                    rel="noreferrer"
                    className="button outline"
                  >
                    <Phone size={14} /> Direct Advisory Desk
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7-Step Sovereign Land Due Diligence Protocol */}
      <section className="section protocol-section">
        <div className="container">
          <div className="section-title-center">
            <Eyebrow light>THE AVM GOLD STANDARD</Eyebrow>
            <h2>
              The 6-Tier <em className="gold-leaf-text">Sovereign Audit Protocol.</em>
            </h2>
            <p>
              How we scrutinize every square yard before granting the AVM Stamp of Title Security.
            </p>
          </div>

          <div className="protocol-cards-grid">
            {protocolSteps.map((step) => (
              <div key={step.num} className="protocol-card royal-leather-card">
                <div className="gold-corner-bracket top-left" />
                <div className="gold-corner-bracket top-right" />
                <div className="gold-corner-bracket bottom-left" />
                <div className="gold-corner-bracket bottom-right" />

                <div className="protocol-header">
                  <div className="protocol-icon-circle">
                    {step.icon}
                  </div>
                  <span className="protocol-step-num">{step.num}</span>
                </div>

                <span className="protocol-authority-tag">{step.authority}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Tenets */}
      <section className="section tenets-section">
        <div className="container">
          <div className="section-title-center">
            <Eyebrow light>UNCOMPROMISING PRINCIPLES</Eyebrow>
            <h2>
              The Pillars of <em className="gold-leaf-text">Sovereign Land Ownership.</em>
            </h2>
          </div>

          <div className="tenets-grid">
            {coreTenets.map((tenet, idx) => (
              <div key={idx} className="tenet-card royal-leather-card">
                <div className="gold-corner-bracket top-left" />
                <div className="gold-corner-bracket top-right" />
                <div className="gold-corner-bracket bottom-left" />
                <div className="gold-corner-bracket bottom-right" />

                <span className="tenet-badge">{tenet.badge}</span>
                <h3>{tenet.title}</h3>
                <p>{tenet.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Milestones Timeline */}
      <section className="section milestones-section">
        <div className="container">
          <div className="section-title-center">
            <Eyebrow light>THE CHRONICLE OF EXCELLENCE</Eyebrow>
            <h2>
              A Decade of <em className="gold-leaf-text">Guarding Jaipur Soil.</em>
            </h2>
          </div>

          <div className="milestones-timeline-wrap">
            <div className="timeline-spine-line" />
            {milestones.map((item, idx) => (
              <div key={idx} className={`timeline-milestone-row ${idx % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-marker">
                  <span>{item.year}</span>
                </div>
                <div className="timeline-card royal-leather-card">
                  <div className="gold-corner-bracket top-left" />
                  <div className="gold-corner-bracket top-right" />
                  <div className="gold-corner-bracket bottom-left" />
                  <div className="gold-corner-bracket bottom-right" />
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Headquarters & VIP Visit Enclosure */}
      <section className="section office-plaque-section">
        <div className="container">
          <div className="hq-plaque-card royal-leather-card">
            <div className="gold-corner-bracket top-left" />
            <div className="gold-corner-bracket top-right" />
            <div className="gold-corner-bracket bottom-left" />
            <div className="gold-corner-bracket bottom-right" />

            <div className="hq-plaque-inner">
              <div className="hq-text-col">
                <div className="hq-badge">
                  <Building2 size={15} />
                  <span>CORPORATE HEADQUARTERS • JAIPUR</span>
                </div>
                <h2>Experience Land Verification in Person.</h2>
                <p>
                  Visit our Jaipur headquarters to inspect original cadastral revenue master maps, Section 90A orders, and individual Patta archives over complimentary Rajasthani tea.
                </p>

                <div className="hq-details-list">
                  <div className="hq-detail-item">
                    <MapPin size={18} className="sparkle-gold" />
                    <div>
                      <strong>AVM Land Estates Corporate House</strong>
                      <span>Main Ajmer Road / Vaishali Nagar Corridor, Jaipur, Rajasthan 302021</span>
                    </div>
                  </div>
                  <div className="hq-detail-item">
                    <Phone size={18} className="sparkle-gold" />
                    <div>
                      <strong>VIP Chauffeur & Desk Hotline</strong>
                      <span>+91 98290 12345 • Open 7 Days (9:30 AM – 7:30 PM)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hq-action-box">
                <div className="hq-action-card">
                  <Crown size={32} className="sparkle-gold" style={{ margin: '0 auto 14px', display: 'block' }} />
                  <h3>Schedule Your Consultation</h3>
                  <p>Private chauffeur pickup provided from anywhere in Jaipur city.</p>
                  <button 
                    className="button gold full-width"
                    onClick={() => {
                      const event = new CustomEvent('open-site-visit');
                      window.dispatchEvent(event);
                    }}
                  >
                    <Calendar size={15} /> Book VIP Office Visit
                  </button>
                  <Link to="/plots" className="button outline full-width" style={{ marginTop: '10px' }}>
                    Browse Verified Plots <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </main>
  );
}
