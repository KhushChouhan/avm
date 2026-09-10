import { useState, useEffect } from 'react';
import { X, Calculator, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function PlotCalculatorModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [areaGaj, setAreaGaj] = useState(180);
  const [ratePerGaj, setRatePerGaj] = useState(17500);
  const [buyerGender, setBuyerGender] = useState('male'); // male (6%) or female (5%)
  const [loanPercentage, setLoanPercentage] = useState(75); // up to 80%

  useEffect(() => {
    const handleOpen = (e) => {
      setIsOpen(true);
      if (e.detail?.plot) {
        setAreaGaj(e.detail.plot.areaGaj);
        setRatePerGaj(e.detail.plot.pricePerGaj);
      }
    };
    window.addEventListener('open-plot-calc', handleOpen);
    return () => window.removeEventListener('open-plot-calc', handleOpen);
  }, []);

  if (!isOpen) return null;

  // Calculations
  const areaSqFt = areaGaj * 9;
  const baseLandCost = areaGaj * ratePerGaj;
  
  // Rajasthan Stamp Duty: Male 6%, Female 5%
  const stampDutyRate = buyerGender === 'female' ? 0.05 : 0.06;
  const stampDutyAmount = Math.round(baseLandCost * stampDutyRate);
  
  // Registration charges: 1%
  const registrationFee = Math.round(baseLandCost * 0.01);
  const totalRegistryCost = stampDutyAmount + registrationFee;
  const totalOutflow = baseLandCost + totalRegistryCost;

  // Plot Loan EMI calculation (8.75% p.a. for 15 years)
  const loanAmount = Math.round((baseLandCost * loanPercentage) / 100);
  const downPayment = totalOutflow - loanAmount;
  const monthlyRate = 8.75 / 12 / 100;
  const totalMonths = 15 * 12;
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  return (
    <div className="modal-backdrop" onClick={() => setIsOpen(false)}>
      <div className="calc-modal" onClick={e => e.stopPropagation()}>
        <button className="close" onClick={() => setIsOpen(false)} aria-label="Close calculator">
          <X size={20} />
        </button>

        <div className="modal-header">
          <span className="eyebrow"><Calculator size={14} /> RAJASTHAN PLOT FINANCIAL ENGINE</span>
          <h2>Plot Cost & Registry Simulator</h2>
          <p>Estimate complete on-ground acquisition outflows including Rajasthan stamp duty, registration, and monthly bank EMI.</p>
        </div>

        <div className="calc-grid">
          {/* Controls */}
          <div className="calc-inputs">
            <div className="input-field">
              <label>Plot Area: <strong>{areaGaj} Gaj (Sq. Yards)</strong> = {areaSqFt} Sq. Ft.</label>
              <input
                type="range"
                min="100"
                max="500"
                step="5"
                value={areaGaj}
                onChange={e => setAreaGaj(Number(e.target.value))}
              />
              <div className="range-labels">
                <span>100 Gaj</span>
                <span>250 Gaj</span>
                <span>500 Gaj</span>
              </div>
            </div>

            <div className="input-field">
              <label>Rate per Gaj: <strong>₹{ratePerGaj.toLocaleString('en-IN')} / Gaj</strong></label>
              <input
                type="range"
                min="12000"
                max="35000"
                step="250"
                value={ratePerGaj}
                onChange={e => setRatePerGaj(Number(e.target.value))}
              />
              <div className="range-labels">
                <span>₹12,000</span>
                <span>₹22,000</span>
                <span>₹35,000</span>
              </div>
            </div>

            <div className="gender-toggle">
              <label>Registry In The Name Of:</label>
              <div className="toggle-btns">
                <button
                  className={`choice-btn ${buyerGender === 'male' ? 'active' : ''}`}
                  onClick={() => setBuyerGender('male')}
                >
                  Male (6% Stamp Duty)
                </button>
                <button
                  className={`choice-btn ${buyerGender === 'female' ? 'active' : ''}`}
                  onClick={() => setBuyerGender('female')}
                >
                  Female (5% Stamp Duty - 1% Govt Rebate)
                </button>
              </div>
            </div>

            <div className="input-field">
              <label>Bank Loan Financing: <strong>{loanPercentage}% of Land Value</strong></label>
              <input
                type="range"
                min="0"
                max="80"
                step="5"
                value={loanPercentage}
                onChange={e => setLoanPercentage(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Breakdown Output */}
          <div className="calc-breakdown">
            <span className="breakdown-title">Estimated Outflow Summary</span>

            <div className="breakdown-row">
              <span>Base Land Agreement Value</span>
              <strong>₹{baseLandCost.toLocaleString('en-IN')}</strong>
            </div>

            <div className="breakdown-row">
              <span>Rajasthan Stamp Duty ({buyerGender === 'female' ? '5%' : '6%'})</span>
              <strong>₹{stampDutyAmount.toLocaleString('en-IN')}</strong>
            </div>

            <div className="breakdown-row">
              <span>Registration Fee (1%)</span>
              <strong>₹{registrationFee.toLocaleString('en-IN')}</strong>
            </div>

            <div className="breakdown-divider" />

            <div className="breakdown-total">
              <div>
                <span>Total Acquisition Outflow</span>
                <p>Includes complete land cost + state registration</p>
              </div>
              <strong className="outflow-val">₹{totalOutflow.toLocaleString('en-IN')}</strong>
            </div>

            {/* Loan EMI preview */}
            {loanPercentage > 0 && (
              <div className="emi-card">
                <div>
                  <span className="emi-title">Estimated Monthly EMI (SBI/HDFC @ 8.75% for 15 yrs)</span>
                  <p>Upfront Self Down-Payment required: <strong>₹{downPayment.toLocaleString('en-IN')}</strong></p>
                </div>
                <strong className="emi-val">₹{emi.toLocaleString('en-IN')} / mo</strong>
              </div>
            )}

            <button
              className="button gold full-width"
              style={{ marginTop: '20px' }}
              onClick={() => {
                setIsOpen(false);
                const event = new CustomEvent('open-site-visit', {
                  detail: {
                    plot: {
                      projectName: 'Selected Plotted Corridor',
                      plotNumber: `${areaGaj} Gaj Parcel`,
                      areaGaj,
                      priceDisplay: `₹${(totalOutflow / 100000).toFixed(2)} Lakh`
                    }
                  }
                });
                window.dispatchEvent(event);
              }}
            >
              Book Site Visit with this Budget
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
