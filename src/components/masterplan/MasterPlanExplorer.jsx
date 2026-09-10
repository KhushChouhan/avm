import { useState, useMemo } from 'react';
import { Compass, Eye, Filter, CheckCircle2, AlertCircle, XCircle, Sparkles, MapPin } from 'lucide-react';
import { plots } from '../../data/plotsData';
import { projects } from '../../data/projectsData';

export default function MasterPlanExplorer({
  initialProjectSlug = 'avm-emerald-greens',
  highlightFilter = null,
  onSelectPlot = null
}) {
  const [selectedProject, setSelectedProject] = useState(initialProjectSlug);
  const [activePlot, setActivePlot] = useState(null);
  const [facingFilter, setFacingFilter] = useState('ALL');
  const [cornerOnly, setCornerOnly] = useState(false);
  const [minRoadWidth, setMinRoadWidth] = useState(0);

  const currentProject = useMemo(() => {
    return projects.find(p => p.slug === selectedProject) || projects[0];
  }, [selectedProject]);

  const projectPlots = useMemo(() => {
    return plots.filter(p => p.projectSlug === selectedProject);
  }, [selectedProject]);

  // Determine if a plot matches the visual highlight criteria
  const isPlotHighlighted = (plot) => {
    if (highlightFilter) {
      if (highlightFilter.facing && !plot.facing.toLowerCase().includes(highlightFilter.facing.toLowerCase())) return false;
      if (highlightFilter.isCorner && !plot.isCorner) return false;
      if (highlightFilter.budgetMax && plot.totalPrice > highlightFilter.budgetMax) return false;
      if (highlightFilter.minGaj && plot.areaGaj < highlightFilter.minGaj) return false;
      return true;
    }
    if (facingFilter !== 'ALL' && !plot.facing.includes(facingFilter)) return false;
    if (cornerOnly && !plot.isCorner) return false;
    if (minRoadWidth > 0 && plot.roadWidthFt < minRoadWidth) return false;
    return true;
  };

  const getStatusColor = (status, isHighlighted) => {
    if (!isHighlighted) return '#334155'; // dimmed if not matching filter
    switch (status) {
      case 'AVAILABLE': return '#10b981'; // bright green
      case 'HOLD': return '#f59e0b'; // amber
      case 'BOOKED':
      case 'SOLD': return '#ef4444'; // red
      default: return '#64748b';
    }
  };

  return (
    <div className="master-plan-container">
      {/* Top Header & Project Tabs */}
      <div className="mp-header">
        <div>
          <div className="mp-badge">
            <Sparkles size={14} /> JDA Approved Vector Cadastral Master Plan
          </div>
          <h2>{currentProject.name} — Master Layout</h2>
          <p className="mp-location"><MapPin size={14} /> {currentProject.location} • RERA: <strong>{currentProject.reraNumber}</strong></p>
        </div>

        <div className="project-pill-selector">
          {projects.map(p => (
            <button
              key={p.slug}
              className={`project-pill ${selectedProject === p.slug ? 'active' : ''}`}
              onClick={() => {
                setSelectedProject(p.slug);
                setActivePlot(null);
              }}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Toolbar */}
      <div className="mp-toolbar">
        <div className="mp-filters">
          <div className="filter-group">
            <Filter size={14} />
            <span>Facing:</span>
            {['ALL', 'North', 'East', 'West'].map(dir => (
              <button
                key={dir}
                className={`tag-btn ${facingFilter === dir ? 'active' : ''}`}
                onClick={() => setFacingFilter(dir)}
              >
                {dir}
              </button>
            ))}
          </div>

          <label className="toggle-label">
            <input
              type="checkbox"
              checked={cornerOnly}
              onChange={e => setCornerOnly(e.target.checked)}
            />
            <span>Corner Plots Only</span>
          </label>

          <div className="filter-group">
            <span>Road Width:</span>
            <button
              className={`tag-btn ${minRoadWidth === 0 ? 'active' : ''}`}
              onClick={() => setMinRoadWidth(0)}
            >
              All Roads
            </button>
            <button
              className={`tag-btn ${minRoadWidth === 60 ? 'active' : ''}`}
              onClick={() => setMinRoadWidth(60)}
            >
              60ft+ Avenues
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="mp-legend">
          <span className="legend-item"><i style={{ background: '#10b981' }} /> Available</span>
          <span className="legend-item"><i style={{ background: '#f59e0b' }} /> Hold (48h Token)</span>
          <span className="legend-item"><i style={{ background: '#ef4444' }} /> Sold / Booked</span>
        </div>
      </div>

      {/* Interactive Vector Canvas */}
      <div className="mp-canvas-wrapper">
        <div className="compass-rose">
          <Compass size={32} />
          <span>N</span>
        </div>

        <svg
          viewBox="0 0 400 370"
          className="mp-svg-canvas"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base Layout Background */}
          <rect x="0" y="0" width="400" height="370" fill="#081522" rx="12" />

          {/* Grand Central Boulevard (60ft Road) */}
          <rect x="20" y="112" width="360" height="11" fill="#1e293b" />
          <line x1="20" y1="117" x2="380" y2="117" stroke="#c6a15b" strokeWidth="1" strokeDasharray="4 4" />
          <text x="200" y="120.5" fill="#c6a15b" fontSize="6" fontWeight="bold" textAnchor="middle" letterSpacing="1">
            60 FT GRAND BOULEVARD (MAIN AVENUE)
          </text>

          {/* 80ft Master Sector Road for Grand Meadows */}
          <rect x="20" y="187" width="360" height="11" fill="#1e293b" />
          <line x1="20" y1="192" x2="380" y2="192" stroke="#60a5fa" strokeWidth="1" strokeDasharray="4 4" />
          <text x="200" y="195.5" fill="#93c5fd" fontSize="6" fontWeight="bold" textAnchor="middle" letterSpacing="1">
            80 FT MASTER SECTOR HIGHWAY
          </text>

          {/* Cross connecting streets */}
          <rect x="142" y="30" width="8" height="310" fill="#172333" />
          <rect x="264" y="30" width="8" height="310" fill="#172333" />

          {/* Central Park / Green Buffer */}
          <rect x="344" y="45" width="40" height="290" fill="#064e3b" rx="6" opacity="0.8" />
          <text x="364" y="190" fill="#34d399" fontSize="7" fontWeight="bold" textAnchor="middle" transform="rotate(90 364 190)" letterSpacing="1.5">
            CENTRAL LANDSCAPED PARK & JOGGING TRACK
          </text>

          {/* Entrance Archway Gate */}
          <rect x="15" y="105" width="6" height="25" fill="#c6a15b" rx="2" />
          <text x="18" y="99" fill="#c6a15b" fontSize="5" fontWeight="bold" textAnchor="middle">
            MAIN GATE
          </text>

          {/* Render Vector Plots */}
          {projectPlots.map(plot => {
            const { x, y, width, height } = plot.coordinates;
            const isHighlighted = isPlotHighlighted(plot);
            const isSelected = activePlot?.id === plot.id;
            const fillColor = getStatusColor(plot.status, isHighlighted);

            return (
              <g
                key={plot.id}
                className={`plot-svg-group ${isSelected ? 'selected' : ''} ${!isHighlighted ? 'dimmed' : ''}`}
                onClick={() => {
                  setActivePlot(plot);
                  if (onSelectPlot) onSelectPlot(plot);
                }}
                style={{ cursor: 'pointer' }}
              >
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={fillColor}
                  fillOpacity={isSelected ? 0.95 : isHighlighted ? 0.75 : 0.25}
                  stroke={isSelected ? '#ffffff' : isHighlighted ? '#c6a15b' : '#475569'}
                  strokeWidth={isSelected ? 2 : 1}
                  rx="4"
                  className="plot-rect"
                />
                <text
                  x={x + width / 2}
                  y={y + height / 2 - 2}
                  fill="#ffffff"
                  fontSize="7"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  P-{plot.plotNumber}
                </text>
                <text
                  x={x + width / 2}
                  y={y + height / 2 + 7}
                  fill="#f1f5f9"
                  fontSize="5.5"
                  textAnchor="middle"
                >
                  {plot.areaGaj} Gaj
                </text>
                {plot.isCorner && (
                  <circle
                    cx={x + width - 5}
                    cy={y + 5}
                    r="2.5"
                    fill="#fbbf24"
                    title="Corner Plot"
                  />
                )}
              </g>
            );
          })}
        </svg>

        <div className="canvas-footnote">
          <span>* Click on any demarcated plot to inspect JDA dimensions, facing, and pricing.</span>
          <span>Demarcations are legally registered under RERA Act 2016.</span>
        </div>
      </div>

      {/* Selected Plot Inspection HUD Card */}
      {activePlot && (
        <div className="plot-hud-card">
          <div className="hud-top">
            <div>
              <span className={`status-pill ${activePlot.status.toLowerCase()}`}>
                {activePlot.status === 'AVAILABLE' && <CheckCircle2 size={12} />}
                {activePlot.status === 'HOLD' && <AlertCircle size={12} />}
                {activePlot.status === 'SOLD' && <XCircle size={12} />}
                {activePlot.status}
              </span>
              <h3>Plot #{activePlot.plotNumber} — {activePlot.projectName}</h3>
              <p className="hud-block">{activePlot.block} • {activePlot.location}</p>
            </div>
            <div className="hud-price-box">
              <span className="price-label">All-Inclusive Land Price</span>
              <strong className="hud-price">{activePlot.priceDisplay}</strong>
              <small>₹{activePlot.pricePerGaj.toLocaleString('en-IN')}/Gaj</small>
            </div>
          </div>

          <div className="hud-grid">
            <div className="hud-item">
              <span>Plot Area (Gaj)</span>
              <strong>{activePlot.areaGaj} Sq. Yd. ({activePlot.areaSqFt} sq ft)</strong>
            </div>
            <div className="hud-item">
              <span>Dimensions</span>
              <strong>{activePlot.dimensions}</strong>
            </div>
            <div className="hud-item">
              <span>Facing</span>
              <strong>{activePlot.facing} Facing</strong>
            </div>
            <div className="hud-item">
              <span>Road Frontage</span>
              <strong>{activePlot.roadWidthFt} Feet Wide</strong>
            </div>
            <div className="hud-item">
              <span>Corner Plot</span>
              <strong>{activePlot.isCorner ? 'YES (Dual Frontage)' : 'No (Standard Single Side)'}</strong>
            </div>
            <div className="hud-item">
              <span>RERA Reg. Number</span>
              <strong>{activePlot.reraNumber}</strong>
            </div>
          </div>

          <p className="hud-highlights">
            <Sparkles size={15} color="#c6a15b" />
            {activePlot.highlights}
          </p>

          <div className="hud-actions">
            {activePlot.status === 'AVAILABLE' ? (
              <a
                href="#site-visit"
                className="button gold"
                onClick={() => {
                  const event = new CustomEvent('open-site-visit', { detail: { plot: activePlot } });
                  window.dispatchEvent(event);
                }}
              >
                Schedule Site Visit for Plot {activePlot.plotNumber}
              </a>
            ) : (
              <button className="button outline" disabled>
                Plot Currently {activePlot.status}
              </button>
            )}
            <button
              className="button outline"
              onClick={() => {
                const event = new CustomEvent('open-ai-chat', {
                  detail: {
                    initialPrompt: `Is Plot ${activePlot.plotNumber} in ${activePlot.projectName} available and what are its payment milestones?`
                  }
                });
                window.dispatchEvent(event);
              }}
            >
              Ask AI Assistant About Plot {activePlot.plotNumber}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
