import { TrendingUp, AlertCircle, BarChart3, PieChart, Sparkles } from 'lucide-react';
import { plots } from '../../data/plotsData';

export default function AISalesForecast() {
  const totalPlots = plots.length;
  const availableCount = plots.filter(p => p.status === 'AVAILABLE').length;

  return (
    <div className="forecast-panel">
      <div className="forecast-header">
        <div>
          <span className="eyebrow"><Sparkles size={14} /> PROBABILISTIC PREDICTIVE MODELLING</span>
          <h3>AI Sales & Absorption Forecasting (Q3–Q4)</h3>
          <p>Statistical estimates based on inquiry velocities, seasonal registry trends, and historical Jaipur infrastructure milestones.</p>
        </div>
        <div className="forecast-disclaimer-pill">
          <AlertCircle size={13} color="#f59e0b" />
          <span>Simulated Probabilistic Projections (Not Guarantees)</span>
        </div>
      </div>

      <div className="forecast-kpi-grid">
        <div className="forecast-kpi-box">
          <span>Projected 90-Day Absorption</span>
          <strong>18 Plots (~₹5.8 Cr)</strong>
          <small>Based on current 2.4 weekly site-visit conversion rate</small>
        </div>
        <div className="forecast-kpi-box">
          <span>Highest Velocity Category</span>
          <strong>150–180 Gaj North Corner</strong>
          <small>Estimated inventory exhaustion: ~45 Days</small>
        </div>
        <div className="forecast-kpi-box">
          <span>Lead-to-Visit Ratio</span>
          <strong>34.2% Conversion</strong>
          <small>Boosted by instant WhatsApp appointment automation</small>
        </div>
      </div>

      <div className="forecast-breakdown-grid">
        <div className="forecast-card">
          <h4>Demand Volume by Footprint (Gaj)</h4>
          <div className="bar-stat-row">
            <span>150–180 Gaj (High Velocity)</span>
            <div className="bar-track"><div className="bar-fill" style={{ width: '68%' }} /></div>
            <b>68%</b>
          </div>
          <div className="bar-stat-row">
            <span>200–250 Gaj (Family Villa)</span>
            <div className="bar-track"><div className="bar-fill" style={{ width: '22%' }} /></div>
            <b>22%</b>
          </div>
          <div className="bar-stat-row">
            <span>300+ Gaj (Estate Parcels)</span>
            <div className="bar-track"><div className="bar-fill" style={{ width: '10%' }} /></div>
            <b>10%</b>
          </div>
        </div>

        <div className="forecast-card">
          <h4>Corridor Capital Growth Velocity (Projected)</h4>
          <div className="growth-metric">
            <strong>Ajmer Road DPS Axis</strong>
            <p>14–18% annual land appreciation projected post Ring Road Phase 2 connector commissioning.</p>
          </div>
          <div className="growth-metric">
            <strong>Ring Road Sector 34 Axis</strong>
            <p>18–22% appreciation anticipated as logistics hubs and dry port connectivity operationalize.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
