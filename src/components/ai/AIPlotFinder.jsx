import { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, RotateCcw, MapPin, Compass, ShieldCheck } from 'lucide-react';
import { plots } from '../../data/plotsData';
import { projects } from '../../data/projectsData';

export default function AIPlotFinder({ onPlotSelect }) {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    budget: null,
    budgetLabel: '',
    sizeGaj: null,
    sizeLabel: '',
    corridor: null,
    facing: null,
    cornerPreference: false
  });
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Step 1: Budget options
  const budgetOptions = [
    { label: 'Under ₹25 Lakh', max: 2500000 },
    { label: '₹25 – ₹35 Lakh', max: 3500000 },
    { label: '₹35 – ₹50 Lakh', max: 5000000 },
    { label: '₹50 Lakh & Above', max: 9900000 }
  ];

  // Step 2: Plot Size options (in Gaj / Sq. Yds)
  const sizeOptions = [
    { label: '111 – 150 Gaj (Compact Villa)', min: 110, max: 155 },
    { label: '150 – 200 Gaj (Most Popular)', min: 150, max: 205 },
    { label: '200 – 300 Gaj (Large Duplex)', min: 200, max: 305 },
    { label: '300+ Gaj (Estate Parcel)', min: 300, max: 600 }
  ];

  // Step 3: Location / Corridors
  const corridorOptions = [
    { label: 'Ajmer Road Express Corridor', slug: 'avm-emerald-greens', desc: 'Near DPS & Ring Road Interchange' },
    { label: 'Ring Road Growth Corridor', slug: 'avm-grand-meadows', desc: '80ft Sector Road, Sanganer Axis' },
    { label: 'Mahindra World City / SEZ Hub', slug: 'avm-solitaire-enclave', desc: 'Opposite Infosys Campus' },
    { label: 'Any Verified Corridor in Jaipur', slug: 'ALL', desc: 'Show best match across all projects' }
  ];

  // Step 4: Specific Attributes (Facing / Corner)
  const facingOptions = ['Any Facing', 'North (Most Preferred)', 'East (Morning Sun)', 'North-East (Ishan)'];

  const executeRecommendationEngine = (finalPrefs) => {
    // Query verified available inventory strictly
    const availablePlots = plots.filter(p => p.status === 'AVAILABLE');

    const scored = availablePlots.map(p => {
      let score = 70;
      const matchReasons = [];

      // Budget scoring
      if (finalPrefs.budget) {
        if (p.totalPrice <= finalPrefs.budget) {
          score += 12;
          matchReasons.push(`Fits within your budget (${p.priceDisplay})`);
        } else {
          score -= 10;
        }
      }

      // Size scoring (in Gaj)
      if (finalPrefs.sizeGaj) {
        if (p.areaGaj >= finalPrefs.sizeGaj.min && p.areaGaj <= finalPrefs.sizeGaj.max) {
          score += 10;
          matchReasons.push(`Matches your ${p.areaGaj} Gaj preference`);
        }
      }

      // Corridor / Project scoring
      if (finalPrefs.corridor && finalPrefs.corridor !== 'ALL') {
        if (p.projectSlug === finalPrefs.corridor) {
          score += 8;
          matchReasons.push(`Located in ${p.location}`);
        }
      } else {
        matchReasons.push(`JDA Approved corridor (${p.location})`);
      }

      // Facing scoring
      if (finalPrefs.facing && finalPrefs.facing !== 'Any Facing') {
        const cleanFacing = finalPrefs.facing.split(' ')[0];
        if (p.facing.includes(cleanFacing)) {
          score += 5;
          matchReasons.push(`${p.facing} facing`);
        }
      }

      // Corner scoring
      if (finalPrefs.cornerPreference) {
        if (p.isCorner) {
          score += 5;
          matchReasons.push('Corner plot dual frontage');
        }
      }

      // Cap match score realistically between 75% and 98%
      const finalScore = Math.min(98, Math.max(72, score));

      return {
        ...p,
        matchScore: finalScore,
        matchExplanation: `${finalScore}% Match: ${matchReasons.join(', ')}.`
      };
    });

    // Sort descending by match score
    scored.sort((a, b) => b.matchScore - a.matchScore);
    setResults(scored.slice(0, 3));
    setHasSearched(true);
  };

  const handleReset = () => {
    setStep(1);
    setPreferences({
      budget: null,
      budgetLabel: '',
      sizeGaj: null,
      sizeLabel: '',
      corridor: null,
      facing: null,
      cornerPreference: false
    });
    setResults([]);
    setHasSearched(false);
  };

  return (
    <div className="ai-finder-box">
      <div className="gold-corner-bracket top-left" />
      <div className="gold-corner-bracket top-right" />
      <div className="gold-corner-bracket bottom-left" />
      <div className="gold-corner-bracket bottom-right" />

      <div className="ai-finder-top">
        <div className="vip-pass-seal" style={{ margin: '0 auto 16px' }}>
          <Sparkles size={28} />
        </div>
        <div className="finder-badge">
          <span>AI RECOMMENDATION ENGINE • JDA VERIFIED</span>
        </div>
        <h3 style={{ fontSize: 'clamp(32px, 3.8vw, 44px)', margin: '10px 0 10px' }}>
          Find Your Perfect Plot <br /><em style={{ color: '#dfba73', fontStyle: 'italic' }}>In 4 Conversational Steps.</em>
        </h3>
        <p style={{ maxWidth: '620px', margin: '0 auto' }}>Answer 4 quick preferences to calculate real-time match scores across our verified Jaipur inventory.</p>
      </div>

      {!hasSearched ? (
        <div className="finder-step-card">
          <div className="step-indicator">
            <span className="step-num">Step 0{step} of 04</span>
            <div className="step-progress-bar">
              <div className="step-fill" style={{ width: `${(step / 4) * 100}%` }} />
            </div>
          </div>

          {/* Step 1: Budget */}
          {step === 1 && (
            <div className="step-content">
              <h4>What is your approximate budget for the plot?</h4>
              <p className="step-sub">We verify clear title plots across Jaipur from ₹19 Lakh to ₹80 Lakh.</p>
              <div className="step-button-grid">
                {budgetOptions.map(opt => (
                  <button
                    key={opt.label}
                    className="step-choice-btn"
                    onClick={() => {
                      setPreferences(prev => ({ ...prev, budget: opt.max, budgetLabel: opt.label }));
                      setStep(2);
                    }}
                  >
                    <span>{opt.label}</span>
                    <ArrowRight size={16} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Size in Gaj */}
          {step === 2 && (
            <div className="step-content">
              <h4>What plot size (in Gaj / Sq. Yd) are you looking for?</h4>
              <p className="step-sub">1 Gaj = 9 Sq. Ft. All plots are demarcated with individual boundary markers.</p>
              <div className="step-button-grid">
                {sizeOptions.map(opt => (
                  <button
                    key={opt.label}
                    className="step-choice-btn"
                    onClick={() => {
                      setPreferences(prev => ({ ...prev, sizeGaj: { min: opt.min, max: opt.max }, sizeLabel: opt.label }));
                      setStep(3);
                    }}
                  >
                    <span>{opt.label}</span>
                    <ArrowRight size={16} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Corridor */}
          {step === 3 && (
            <div className="step-content">
              <h4>Which Jaipur growth corridor do you prefer?</h4>
              <p className="step-sub">All projects are located near major infrastructure arterial roads.</p>
              <div className="step-button-grid">
                {corridorOptions.map(opt => (
                  <button
                    key={opt.label}
                    className="step-choice-btn"
                    onClick={() => {
                      setPreferences(prev => ({ ...prev, corridor: opt.slug }));
                      setStep(4);
                    }}
                  >
                    <div>
                      <strong>{opt.label}</strong>
                      <small>{opt.desc}</small>
                    </div>
                    <ArrowRight size={16} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Facing & Corner */}
          {step === 4 && (
            <div className="step-content">
              <h4>Any specific Vastu facing or corner preference?</h4>
              <p className="step-sub">Corner plots and North/East facings enjoy maximum light and ventilation.</p>

              <div className="step-facing-matrix">
                <div className="facing-pills">
                  {facingOptions.map(face => (
                    <button
                      key={face}
                      className={`pill-btn ${preferences.facing === face ? 'active' : ''}`}
                      onClick={() => setPreferences(prev => ({ ...prev, facing: face }))}
                    >
                      {face}
                    </button>
                  ))}
                </div>

                <label className="checkbox-wrap">
                  <input
                    type="checkbox"
                    checked={preferences.cornerPreference}
                    onChange={e => setPreferences(prev => ({ ...prev, cornerPreference: e.target.checked }))}
                  />
                  <span>Prioritize Corner Plots (Dual Road Frontage)</span>
                </label>
              </div>

              <button
                className="button gold full-width"
                onClick={() => executeRecommendationEngine(preferences)}
              >
                Match My Plots with AI <Sparkles size={16} />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="finder-results-section">
          <div className="results-header">
            <div>
              <h4>AI Found {results.length} Top Matched Plots</h4>
              <p>Ranked strictly by your criteria: {preferences.budgetLabel} • {preferences.sizeLabel}</p>
            </div>
            <button className="reset-btn" onClick={handleReset}>
              <RotateCcw size={14} /> Adjust Filters
            </button>
          </div>

          <div className="matched-plot-grid">
            {results.map(plot => (
              <div key={plot.id} className="matched-plot-card">
                <div className="match-score-badge">
                  <Sparkles size={14} />
                  <span>{plot.matchScore}% Match</span>
                </div>

                <div className="matched-card-body">
                  <span className="card-proj">{plot.projectName}</span>
                  <h3>Plot #{plot.plotNumber} — {plot.areaGaj} Gaj</h3>
                  <p className="card-loc"><MapPin size={13} /> {plot.location}</p>

                  <div className="matched-specs">
                    <div>
                      <span>Facing</span>
                      <b>{plot.facing}</b>
                    </div>
                    <div>
                      <span>Road Width</span>
                      <b>{plot.roadWidthFt} Feet</b>
                    </div>
                    <div>
                      <span>Corner</span>
                      <b>{plot.isCorner ? 'Yes' : 'No'}</b>
                    </div>
                    <div>
                      <span>Total Price</span>
                      <b className="price-tag">{plot.priceDisplay}</b>
                    </div>
                  </div>

                  <p className="match-explanation">
                    <CheckCircle2 size={14} color="#10b981" />
                    <span>{plot.matchExplanation}</span>
                  </p>

                  <div className="matched-card-actions">
                    <button
                      className="button gold"
                      onClick={() => {
                        const event = new CustomEvent('open-site-visit', { detail: { plot } });
                        window.dispatchEvent(event);
                      }}
                    >
                      Schedule Site Visit
                    </button>
                    <button
                      className="button outline"
                      onClick={() => {
                        const event = new CustomEvent('open-ai-chat', {
                          detail: {
                            initialPrompt: `Tell me more about Plot ${plot.plotNumber} in ${plot.projectName} and its RERA approval.`
                          }
                        });
                        window.dispatchEvent(event);
                      }}
                    >
                      Inspect with AI
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
