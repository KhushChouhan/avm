import { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Calendar, 
  Sparkles, 
  Car, 
  Building, 
  Crown,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eyebrow } from '../components/common/UI';
import { projects } from '../data/projectsData';

export default function CorridorsPage() {
  const [activeCorridorId, setActiveCorridorId] = useState('ajmer-road');

  const corridorData = [
    {
      id: 'ajmer-road',
      name: 'Ajmer Road Express Corridor',
      subtitle: 'The Education, Luxury Living & Institutional Super-Artery',
      tag: 'FLAGSHIP GROWTH AXIS',
      avgRate: '₹16,500 – ₹24,000 / Gaj',
      fiveYearCAGR: '16.8% p.a.',
      jdaroadWidths: '60ft, 80ft & 200ft Master Sector Roads',
      description: 'Ajmer Road (NH-48) is the most prestigious and rapidly appreciating plotted residential belt in western Jaipur. Powered by premier educational institutions (Delhi Public School, Neerja Modi, Manipal University) and seamless access to the 47-km operational Ring Road, this corridor commands highest buyer demand for immediate villa construction.',
      catalysts: [
        'Direct 8-Lane Expressway connecting Jaipur to NCR & Delhi-Mumbai Industrial Corridor (DMIC)',
        'Fully Operational Ring Road Cloverleaf Interchanges cutting travel time to Airport by 25 mins',
        'High-density residential villa communities with 100% functional underground utilities',
        'Over 15,000+ families already residing in sanctioned master-planned townships'
      ],
      linkedProjectIds: ['avm-emerald-greens'],
      bannerImg: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=85'
    },
    {
      id: 'ring-road',
      name: 'Ring Road 360° Growth Belt',
      subtitle: 'Jaipur Development Authority’s Multi-Modal High-Speed Peripheral Hub',
      tag: 'FASTEST APPRECIATING',
      avgRate: '₹14,000 – ₹19,500 / Gaj',
      fiveYearCAGR: '18.4% p.a.',
      jdaroadWidths: '90m Master Right-of-Way with 80ft Sector Service Roads',
      description: 'Jaipur Ring Road is Rajasthan’s most ambitious infrastructure marvel — a 360-degree orbital corridor encircling the city. Sectors flanking the Ring Road south-west axis benefit from dedicated service lanes, institutional zones, and high-density commercial allotments, making it the top choice for smart 3-to-5 year capital growth.',
      catalysts: [
        '90-Meter Master Development Corridor with dedicated high-speed transit and service avenues',
        'Seamless interconnection bridging Ajmer Road, Diggi Malpura, Tonk Road, and Agra Road',
        'Strictly planned by JDA with zero unorganized developments allowed on arterial linkages',
        'Heavy government push for state-of-the-art warehousing and sports city hubs'
      ],
      linkedProjectIds: ['avm-grand-meadows'],
      bannerImg: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85'
    },
    {
      id: 'mwc-sez',
      name: 'Mahindra World City & Tech SEZ',
      subtitle: 'Rajasthan’s Premier Global Employment & IT Enterprise Corridor',
      tag: 'HIGH RENTAL YIELD',
      avgRate: '₹18,500 – ₹26,000 / Gaj',
      fiveYearCAGR: '15.2% p.a.',
      jdaroadWidths: '60ft & 100ft Planned Industrial & Residential Grid',
      description: 'Spanning over 3,000 acres, Mahindra World City (MWC) is North India’s largest operational special economic zone. Home to tech giants like Infosys, Tech Mahindra, Deutsche Bank, Wipro, and JCB, the SEZ employs over 45,000 engineers and corporate professionals. Plotted land here generates immediate high rental yield for duplex and villa rentals.',
      catalysts: [
        'Host to 100+ Multinational Conglomerates including Infosys, JCB, Deutsche Bank, and MetLife',
        'Direct employment base of 45,000+ corporate professionals seeking residential housing nearby',
        'World-class private municipal infrastructure: 24x7 water security, dual electric substations',
        'Immediate high demand for build-to-lease duplexes and luxury corporate stay villas'
      ],
      linkedProjectIds: ['avm-solitaire-enclave'],
      bannerImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85'
    },
    {
      id: 'tonk-road',
      name: 'Tonk Road & Airport Growth Axis',
      subtitle: 'The Established Commercial Gateway to Southern Jaipur',
      tag: 'ESTABLISHED PRIME SOIL',
      avgRate: '₹17,000 – ₹25,500 / Gaj',
      fiveYearCAGR: '14.5% p.a.',
      jdaroadWidths: '60ft & 80ft Municipal Roads',
      description: 'Tonk Road remains the classic high-prestige southward trajectory of Jaipur, anchoring key junctions like Sitapura Industrial Area, Mahatma Gandhi Hospital & Medical University, and direct proximity to Jaipur International Airport. Greenfield plotted schemes here offer premier residential living with mature civic ecosystems.',
      catalysts: [
        'Minutes away from Jaipur International Airport Terminal 2 & Cargo Hub',
        'Hub for renowned healthcare and medical universities (MGH, JNU Hospital)',
        'Sitapura & Ramchandrapura Industrial hubs generating consistent local housing demand',
        'Upcoming high-speed southern suburban train and extended Metro Phase connectivity'
      ],
      linkedProjectIds: ['avm-grand-meadows'],
      bannerImg: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1600&q=85'
    }
  ];

  const activeCorridor = corridorData.find(c => c.id === activeCorridorId) || corridorData[0];
  const linkedProjects = projects.filter(p => activeCorridor.linkedProjectIds.includes(p.id));

  return (
    <main className="corridors-page royal-leather-main">
      {/* Imperial Corridors Hero */}
      <section className="corridors-hero-section">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="corridors-hero-center"
          >
            <div className="royal-crest-pill">
              <Compass size={14} className="sparkle-gold" />
              <span>JAIPUR MASTER PLAN 2026 INFRASTRUCTURE INTELLIGENCE</span>
            </div>
            <h1>
              Strategic Plotted <em className="gold-leaf-text">Growth Corridors.</em>
            </h1>
            <p className="corridors-hero-subtitle">
              Detailed market data, 5-year capital appreciation trends, road demarcations, and economic catalysts across Jaipur’s 4 primary master-planned development belts.
            </p>

            {/* Interactive Corridor Switcher Tabs */}
            <div className="corridor-nav-tabs">
              {corridorData.map(c => (
                <button
                  key={c.id}
                  className={`corridor-nav-btn ${activeCorridorId === c.id ? 'active' : ''}`}
                  onClick={() => setActiveCorridorId(c.id)}
                >
                  <MapPin size={15} />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Active Corridor Deep-Dive Showcase */}
      <section className="section active-corridor-section">
        <div className="container">
          <motion.div 
            key={activeCorridor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="corridor-master-card royal-leather-card"
          >
            <div className="gold-corner-bracket top-left" />
            <div className="gold-corner-bracket top-right" />
            <div className="gold-corner-bracket bottom-left" />
            <div className="gold-corner-bracket bottom-right" />

            <div className="corridor-header-row">
              <div>
                <span className="corridor-status-tag">{activeCorridor.tag}</span>
                <h2>{activeCorridor.name}</h2>
                <p className="corridor-subhead">{activeCorridor.subtitle}</p>
              </div>

              <div className="corridor-hero-stats">
                <div className="corridor-stat-box">
                  <span>Current Base Rate</span>
                  <strong>{activeCorridor.avgRate}</strong>
                </div>
                <div className="corridor-stat-box highlight">
                  <span>5-Yr Historical CAGR</span>
                  <strong><TrendingUp size={16} /> {activeCorridor.fiveYearCAGR}</strong>
                </div>
              </div>
            </div>

            {/* Corridor Visual Banner & Road Standards */}
            <div className="corridor-media-banner">
              <img src={activeCorridor.bannerImg} alt={activeCorridor.name} />
              <div className="corridor-media-shade" />
              <div className="corridor-road-specs">
                <ShieldCheck size={18} className="sparkle-gold" />
                <span><strong>JDA Road Benchmark:</strong> {activeCorridor.jdaroadWidths}</span>
              </div>
            </div>

            {/* Narrative & Economic Catalysts Grid */}
            <div className="corridor-body-grid">
              <div className="corridor-overview-col">
                <h3>Corridor Profile & Investment Thesis</h3>
                <p>{activeCorridor.description}</p>

                <div className="catalysts-box">
                  <h4>Key Infrastructure & Growth Catalysts</h4>
                  <ul>
                    {activeCorridor.catalysts.map((cat, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={16} className="sparkle-gold" />
                        <span>{cat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Linked Townships in this Corridor */}
              <div className="corridor-projects-col">
                <h3>Sanctioned Plotted Estates in this Belt</h3>
                <div className="corridor-projects-list">
                  {linkedProjects.map(project => (
                    <div key={project.id} className="linked-project-card">
                      <div className="lp-img-wrap">
                        <img src={project.heroImage} alt={project.name} />
                      </div>
                      <div className="lp-content">
                        <span className="lp-authority">{project.authority}</span>
                        <h4>{project.name}</h4>
                        <p className="lp-loc"><MapPin size={12} /> {project.location}</p>
                        <div className="lp-meta-row">
                          <span className="lp-price">From ₹{(project.baseRatePerGaj).toLocaleString('en-IN')}/Gaj</span>
                          <span className="lp-plots">{project.availablePlots} Plots Left</span>
                        </div>
                        <div className="lp-action-row">
                          <Link to="/plots" className="button gold" style={{ padding: '8px 14px', fontSize: '11px' }}>
                            View Demarcated Plots <ArrowRight size={13} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Corridor Action Bar */}
            <div className="corridor-action-bar">
              <div className="action-bar-left">
                <Car size={20} className="sparkle-gold" />
                <div>
                  <strong>Want an On-Ground Corridor Inspection Tour?</strong>
                  <span>We provide complimentary VIP chauffeur pickup from Jaipur to inspect boundary stones and road works.</span>
                </div>
              </div>
              <button 
                className="button gold"
                onClick={() => {
                  const event = new CustomEvent('open-site-visit');
                  window.dispatchEvent(event);
                }}
              >
                <Calendar size={15} /> Book VIP Corridor Tour
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comprehensive Corridor Comparison Matrix */}
      <section className="section matrix-section">
        <div className="container">
          <div className="section-title-center">
            <Eyebrow light>FORENSIC METRICS COMPARISON</Eyebrow>
            <h2>
              Jaipur Growth Corridors <em className="gold-leaf-text">Decision Matrix.</em>
            </h2>
            <p>Compare land price points, historical returns, and infrastructure timelines side-by-side.</p>
          </div>

          <div className="matrix-table-wrap royal-leather-card">
            <div className="gold-corner-bracket top-left" />
            <div className="gold-corner-bracket top-right" />
            <div className="gold-corner-bracket bottom-left" />
            <div className="gold-corner-bracket bottom-right" />

            <table className="corridor-matrix-table">
              <thead>
                <tr>
                  <th>Growth Corridor</th>
                  <th>Rate / Sq. Yard (Gaj)</th>
                  <th>5-Year CAGR</th>
                  <th>Master Road Widths</th>
                  <th>Primary Driver</th>
                  <th>Recommended Horizon</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {corridorData.map(c => (
                  <tr key={c.id}>
                    <td>
                      <strong>{c.name}</strong>
                      <small>{c.tag}</small>
                    </td>
                    <td><span className="gold-price-text">{c.avgRate}</span></td>
                    <td><strong>{c.fiveYearCAGR}</strong></td>
                    <td>{c.jdaroadWidths.split(' ')[0]} to {c.jdaroadWidths.split(' ')[2] || '80ft'}</td>
                    <td>{c.subtitle.split(' ')[0]} {c.subtitle.split(' ')[1]} Hub</td>
                    <td><span className="horizon-badge">3 to 5 Years</span></td>
                    <td>
                      <button 
                        className="matrix-inspect-btn"
                        onClick={() => {
                          setActiveCorridorId(c.id);
                          window.scrollTo({ top: 400, behavior: 'smooth' });
                        }}
                      >
                        Inspect Belt →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
