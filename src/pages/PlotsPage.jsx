import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Search, Sparkles, MapPin, CheckCircle2, AlertCircle, XCircle, ArrowUpRight, Compass } from 'lucide-react';
import { plots } from '../data/plotsData';
import { projects } from '../data/projectsData';
import { Eyebrow, Reveal } from '../components/common/UI';
import PropertyCard from '../components/property/PropertyCard';

export default function PlotsPage() {
  const [selectedProject, setSelectedProject] = useState('ALL');
  const [selectedFacing, setSelectedFacing] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [cornerOnly, setCornerOnly] = useState(false);
  const [maxBudget, setMaxBudget] = useState(9000000);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlots = useMemo(() => {
    return plots.filter(plot => {
      if (selectedProject !== 'ALL' && plot.projectSlug !== selectedProject) return false;
      if (selectedFacing !== 'ALL' && !plot.facing.includes(selectedFacing)) return false;
      if (selectedStatus !== 'ALL' && plot.status !== selectedStatus) return false;
      if (cornerOnly && !plot.isCorner) return false;
      if (plot.totalPrice > maxBudget) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchNumber = String(plot.plotNumber).toLowerCase().includes(q);
        const matchProject = String(plot.projectName).toLowerCase().includes(q);
        const matchLocation = String(plot.location).toLowerCase().includes(q);
        const matchGaj = `${plot.areaGaj}`.includes(q);
        if (!matchNumber && !matchProject && !matchLocation && !matchGaj) return false;
      }
      return true;
    });
  }, [selectedProject, selectedFacing, selectedStatus, cornerOnly, maxBudget, searchQuery]);

  return (
    <main className="listing-page royal-leather-main">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <Eyebrow light>100% CLEAR-TITLE PLOTTED INVENTORY</Eyebrow>
          <h1>Explore Verified <em>Plots.</em></h1>
          <p>Browse individual demarcated plots across Jaipur with transparent pricing, Vastu orientations, and RERA certifications.</p>
        </div>
      </section>

      {/* Filter and Inventory Section */}
      <section className="section" style={{ background: 'transparent', padding: '60px 0 90px' }}>
        <div className="container">
          {/* Main Filter Bar */}
          <div className="plots-filter-panel royal-leather-card">
            <div className="gold-corner-bracket top-left" />
            <div className="gold-corner-bracket top-right" />
            <div className="gold-corner-bracket bottom-left" />
            <div className="gold-corner-bracket bottom-right" />
            <div className="search-bar-wrap">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search by plot number (e.g. 102), project, or gaj..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="filters-row">
              {/* Project Filter */}
              <div className="filter-select-wrap">
                <label>Project Corridor</label>
                <select value={selectedProject} onChange={e => setSelectedProject(e.target.value)}>
                  <option value="ALL">All Projects (Jaipur)</option>
                  {projects.map(p => (
                    <option key={p.slug} value={p.slug}>{p.name}</option>
                  ))}
                </select>
              </div>

              {/* Facing Filter */}
              <div className="filter-select-wrap">
                <label>Vastu Facing</label>
                <select value={selectedFacing} onChange={e => setSelectedFacing(e.target.value)}>
                  <option value="ALL">Any Orientation</option>
                  <option value="North">North Facing</option>
                  <option value="East">East Facing</option>
                  <option value="West">West Facing</option>
                  <option value="South">South Facing</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="filter-select-wrap">
                <label>Plot Status</label>
                <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
                  <option value="ALL">All Statuses</option>
                  <option value="AVAILABLE">Available Only</option>
                  <option value="HOLD">On Hold</option>
                  <option value="SOLD">Sold Out</option>
                </select>
              </div>

              {/* Corner Toggle */}
              <div className="corner-checkbox-wrap">
                <label>
                  <input
                    type="checkbox"
                    checked={cornerOnly}
                    onChange={e => setCornerOnly(e.target.checked)}
                  />
                  <span>Corner Plots Only</span>
                </label>
              </div>
            </div>

            {/* Quick Helper Actions */}
            <div className="filter-quick-bar">
              <span className="results-count">Showing <strong>{filteredPlots.length}</strong> verified plots</span>
              <div className="quick-action-links">
                <Link to="/master-plan" className="quick-link">
                  <Compass size={14} /> Open Master Plan Explorer
                </Link>
                <button
                  className="quick-link"
                  onClick={() => {
                    const event = new CustomEvent('open-plot-calc');
                    window.dispatchEvent(event);
                  }}
                >
                  <Sparkles size={14} /> Rajasthan Registry Calculator
                </button>
              </div>
            </div>
          </div>

          {/* Plots Grid */}
          <div className="property-grid">
            {filteredPlots.map(plot => (
              <Reveal key={plot.id} className="property-grid-item">
                <PropertyCard property={plot} royal={true} />
              </Reveal>
            ))}
          </div>

          <p className="listing-disclaimer">
            * All plots listed are exclusively plotted land with individual registered Patta guarantees under the Rajasthan RERA Act 2016. Prices are all-inclusive of development charges.
          </p>
        </div>
      </section>
    </main>
  );
}
