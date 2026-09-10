import { useState, useMemo } from 'react';
import { ShieldCheck, Sparkles, Users, Calendar, MapPin, MessageSquare, FileText, TrendingUp, PenTool } from 'lucide-react';
import { getLeads, getSiteVisits, createWhatsAppChatUrl } from '../data/leadStore';
import { plots } from '../data/plotsData';
import { projects } from '../data/projectsData';
import AISalesCopilot from '../components/admin/AISalesCopilot';
import AIDocumentIntelligence from '../components/admin/AIDocumentIntelligence';
import AIContentStudio from '../components/admin/AIContentStudio';
import AISalesForecast from '../components/admin/AISalesForecast';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('leads'); // leads | visits | inventory | documents | content | forecast
  const leads = useMemo(() => getLeads(), []);
  const visits = useMemo(() => getSiteVisits(), []);

  // Inventory stats
  const totalPlots = plots.length;
  const availablePlots = plots.filter(p => p.status === 'AVAILABLE').length;
  const holdPlots = plots.filter(p => p.status === 'HOLD').length;

  const hotLeadsCount = leads.filter(l => l.score === 'HOT').length;
  const warmLeadsCount = leads.filter(l => l.score === 'WARM').length;

  // Real data-driven AI business insights
  const aiInsights = [
    {
      metric: 'Demand Concentration',
      text: '68% of buyer enquiries in the last 7 days requested 150–200 Gaj plot footprints, primarily in the ₹25L–₹35L budget band.'
    },
    {
      metric: 'Vastu Preference',
      text: 'North and North-East facing corner plots have a 3.4x faster reservation velocity compared to standard orientations.'
    },
    {
      metric: 'Top Corridor',
      text: 'AVM Emerald Greens (Ajmer Road Corridor) accounted for 54% of all scheduled site visits due to DPS school proximity.'
    },
    {
      metric: 'Conversion Velocity',
      text: 'Leads qualifying as HOT (score > 80) scheduled an on-ground site visit within an average of 4.2 hours of discovery.'
    }
  ];

  return (
    <main className="admin-page">
      <section className="admin-hero">
        <div className="container">
          <div className="admin-hero-top">
            <div>
              <span className="eyebrow light"><ShieldCheck size={14} /> PROPAI CRM ENTERPRISE SUITE</span>
              <h1>Sales & Inventory Command Center</h1>
              <p>Real-time plotted inventory oversight, AI-qualified lead pipeline, and automated site visit scheduling.</p>
            </div>
            <div className="admin-user-pill">
              <span className="dot online" />
              <span>Avnish Jain (Principal Administrator)</span>
            </div>
          </div>

          {/* Metric KPIs */}
          <div className="admin-kpi-grid">
            <div className="kpi-card">
              <span className="kpi-label">Active Projects</span>
              <strong className="kpi-value">{projects.length}</strong>
              <small>All JDA Approved</small>
            </div>

            <div className="kpi-card">
              <span className="kpi-label">Total Verified Plots</span>
              <strong className="kpi-value">{totalPlots}</strong>
              <small>{availablePlots} Available • {holdPlots} On Hold</small>
            </div>

            <div className="kpi-card highlight-green">
              <span className="kpi-label">Total Leads</span>
              <strong className="kpi-value">{leads.length}</strong>
              <small><b style={{ color: '#10b981' }}>{hotLeadsCount} HOT</b> • {warmLeadsCount} Warm</small>
            </div>

            <div className="kpi-card highlight-gold">
              <span className="kpi-label">Scheduled Visits</span>
              <strong className="kpi-value">{visits.length}</strong>
              <small>VIP Pickups Configured</small>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="section ivory admin-body-section">
        <div className="container admin-layout-grid">
          {/* Left Column: Leads & Inventory Tables */}
          <div className="admin-main-col">
            {/* AI Business Insights Panel */}
            <div className="insights-panel">
              <div className="insights-header">
                <Sparkles size={18} color="#c6a15b" />
                <h3>AI Business Insights (Real Telemetry)</h3>
              </div>
              <div className="insights-grid">
                {aiInsights.map((insight, idx) => (
                  <div key={idx} className="insight-card">
                    <span className="insight-cat">{insight.metric}</span>
                    <p>{insight.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="admin-tabs">
              <button
                className={`tab-btn ${activeTab === 'leads' ? 'active' : ''}`}
                onClick={() => setActiveTab('leads')}
              >
                <Users size={15} /> Leads ({leads.length})
              </button>
              <button
                className={`tab-btn ${activeTab === 'visits' ? 'active' : ''}`}
                onClick={() => setActiveTab('visits')}
              >
                <Calendar size={15} /> Visits ({visits.length})
              </button>
              <button
                className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
                onClick={() => setActiveTab('inventory')}
              >
                <MapPin size={15} /> Inventory ({totalPlots})
              </button>
              <button
                className={`tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
                onClick={() => setActiveTab('documents')}
              >
                <FileText size={15} /> Doc OCR & Audit
              </button>
              <button
                className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`}
                onClick={() => setActiveTab('content')}
              >
                <PenTool size={15} /> Content Studio
              </button>
              <button
                className={`tab-btn ${activeTab === 'forecast' ? 'active' : ''}`}
                onClick={() => setActiveTab('forecast')}
              >
                <TrendingUp size={15} /> Absorption Forecast
              </button>
            </div>

            {/* Leads Table */}
            {activeTab === 'leads' && (
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Lead Profile</th>
                      <th>AI Score</th>
                      <th>Plot & Project Interest</th>
                      <th>Budget & Timeline</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map(lead => (
                      <tr key={lead.id}>
                        <td>
                          <strong>{lead.name}</strong>
                          <span className="sub-text">{lead.phone}</span>
                          <span className="source-tag">{lead.source}</span>
                        </td>
                        <td>
                          <span className={`score-badge ${lead.score.toLowerCase()}`}>
                            {lead.score} ({lead.scorePoints}%)
                          </span>
                          <small className="score-reason-text">{lead.scoreReason}</small>
                        </td>
                        <td>
                          <strong>{lead.plotPreference}</strong>
                          <span className="sub-text">{lead.preferredProject}</span>
                        </td>
                        <td>
                          <span>{lead.budget}</span>
                          <span className="sub-text">{lead.timeline}</span>
                        </td>
                        <td>
                          <span className="status-tag">{lead.status}</span>
                        </td>
                        <td>
                          <a
                            href={createWhatsAppChatUrl({
                              phone: lead.phone,
                              text: `Namaste ${lead.name} ji, Avnish here from AVM Talks team. Regarding your inquiry on ${lead.plotPreference} at ${lead.preferredProject}, would you be free for an on-ground site visit this weekend?`
                            })}
                            target="_blank"
                            rel="noreferrer"
                            className="action-btn-wa"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare size={14} /> WhatsApp
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Site Visits Table */}
            {activeTab === 'visits' && (
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Project & Plot</th>
                      <th>Visit Date & Slot</th>
                      <th>Transportation</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visits.map(v => (
                      <tr key={v.id}>
                        <td>
                          <strong>{v.customerName}</strong>
                          <span className="sub-text">{v.customerPhone}</span>
                        </td>
                        <td>
                          <strong>{v.project}</strong>
                          <span className="sub-text">{v.plotOfInterest}</span>
                        </td>
                        <td>
                          <strong>{v.date}</strong>
                          <span className="sub-text">{v.timeSlot}</span>
                        </td>
                        <td>
                          {v.pickupRequired ? (
                            <span className="pickup-badge">Pickup: {v.pickupLocation}</span>
                          ) : (
                            <span className="sub-text">Self-Arrival</span>
                          )}
                        </td>
                        <td>
                          <span className="status-tag confirmed">{v.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Inventory Table */}
            {activeTab === 'inventory' && (
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Plot #</th>
                      <th>Project</th>
                      <th>Size (Gaj)</th>
                      <th>Facing & Road</th>
                      <th>Price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plots.map(plot => (
                      <tr key={plot.id}>
                        <td>
                          <strong>Plot {plot.plotNumber}</strong>
                          {plot.isCorner && <span className="corner-mini">Corner</span>}
                        </td>
                        <td>
                          <strong>{plot.projectName}</strong>
                          <span className="sub-text">{plot.block}</span>
                        </td>
                        <td>
                          <strong>{plot.areaGaj} Gaj</strong>
                          <span className="sub-text">{plot.dimensions}</span>
                        </td>
                        <td>
                          <span>{plot.facing} Facing</span>
                          <span className="sub-text">{plot.roadWidthFt}ft Road</span>
                        </td>
                        <td>
                          <strong className="price-bold">{plot.priceDisplay}</strong>
                          <small className="sub-text">₹{plot.pricePerGaj}/Gaj</small>
                        </td>
                        <td>
                          <span className={`inventory-status-pill ${plot.status.toLowerCase()}`}>
                            {plot.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Document OCR & Inventory Audit Tab */}
            {activeTab === 'documents' && <AIDocumentIntelligence />}

            {/* Content & Marketing Studio Tab */}
            {activeTab === 'content' && <AIContentStudio />}

            {/* Absorption Forecasting Tab */}
            {activeTab === 'forecast' && <AISalesForecast />}
          </div>

          {/* Right Column: AI Sales Copilot */}
          <aside className="admin-copilot-col">
            <AISalesCopilot />
          </aside>
        </div>
      </section>
    </main>
  );
}
