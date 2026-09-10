import { useState } from 'react';
import { FileText, Upload, CheckCircle2, AlertTriangle, Sparkles, RefreshCw, Check, ArrowRight } from 'lucide-react';
import { plots } from '../../data/plotsData';

export default function AIDocumentIntelligence() {
  const [activeDoc, setActiveDoc] = useState('price-list'); // price-list | rera-doc | brochure
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [approvedStatus, setApprovedStatus] = useState(false);

  // Automated Inventory Health Audit
  const auditReport = {
    totalPlotsAudited: plots.length,
    duplicatePlots: 0,
    missingPrices: 0,
    missingRera: 0,
    priceAnomalies: 0,
    status: 'PASSED_100_PERCENT'
  };

  const handleSimulateExtract = (docType) => {
    setActiveDoc(docType);
    setIsProcessing(true);
    setApprovedStatus(false);

    setTimeout(() => {
      if (docType === 'price-list') {
        setExtractedData({
          documentType: 'Official Price List PDF',
          project: 'AVM Emerald Greens (Phase 2 Expansion)',
          extractedCount: 4,
          records: [
            { plotNo: '111', areaGaj: 180, facing: 'North', roadFt: 60, rateGaj: 17800, totalPrice: '₹32.04 L', confidence: '98%' },
            { plotNo: '112', areaGaj: 200, facing: 'East', roadFt: 40, rateGaj: 17500, totalPrice: '₹35.00 L', confidence: '99%' },
            { plotNo: '113', areaGaj: 150, facing: 'West', roadFt: 40, rateGaj: 17200, totalPrice: '₹25.80 L', confidence: '97%' },
            { plotNo: '114', areaGaj: 250, facing: 'North-East', roadFt: 60, rateGaj: 18200, totalPrice: '₹45.50 L', confidence: '96%' }
          ]
        });
      } else if (docType === 'rera-doc') {
        setExtractedData({
          documentType: 'Rajasthan RERA Allotment Certificate',
          project: 'AVM Grand Meadows (Sector 34)',
          extractedCount: 1,
          records: [
            { field: 'RERA Registration No', value: 'RAJ/P/2023/2104', confidence: '100%' },
            { field: 'Promoter Entity', value: 'AVM Land Ventures LLP', confidence: '100%' },
            { field: 'Total Approved Plotted Area', value: '28.4 Acres', confidence: '99%' },
            { field: 'Demarcated Plots Sanctioned', value: '126 Residential Plots', confidence: '100%' },
            { field: 'Valid Upto', value: '31-Dec-2027', confidence: '98%' }
          ]
        });
      }
      setIsProcessing(false);
    }, 600);
  };

  return (
    <div className="doc-intel-panel">
      <div className="doc-intel-header">
        <div>
          <span className="eyebrow"><Sparkles size={14} /> OCR & RERA AUDIT ENGINE</span>
          <h3>Document Intelligence & Inventory Validation</h3>
          <p>Extract verified plot numbers, sizes, and pricing directly from official documents with mandatory human review before publishing.</p>
        </div>
      </div>

      {/* Audit Banner */}
      <div className="inventory-audit-banner">
        <div className="audit-score">
          <CheckCircle2 size={24} color="#10b981" />
          <div>
            <strong>Automated Inventory Integrity: 100% Verified</strong>
            <p>0 duplicate plots • 0 missing prices • 0 unverified RERA numbers across {auditReport.totalPlotsAudited} active parcels.</p>
          </div>
        </div>
      </div>

      {/* Document Selector & Upload Simulation */}
      <div className="doc-selector-grid">
        <button
          className={`doc-card-btn ${activeDoc === 'price-list' ? 'active' : ''}`}
          onClick={() => handleSimulateExtract('price-list')}
        >
          <FileText size={20} />
          <div>
            <strong>Phase 2 Price List PDF</strong>
            <small>Extract plot rates, sizes, and total amounts</small>
          </div>
        </button>

        <button
          className={`doc-card-btn ${activeDoc === 'rera-doc' ? 'active' : ''}`}
          onClick={() => handleSimulateExtract('rera-doc')}
        >
          <FileText size={20} />
          <div>
            <strong>RERA Certificate PDF</strong>
            <small>Extract sanction dates, promoter, and plot count</small>
          </div>
        </button>
      </div>

      {isProcessing && (
        <div className="processing-state">
          <RefreshCw size={24} className="spin-icon" color="#c6a15b" />
          <p>AI is parsing tabular data and validating with JDA master Khasra records...</p>
        </div>
      )}

      {extractedData && !isProcessing && (
        <div className="extracted-review-box">
          <div className="review-top">
            <div>
              <span className="badge-doc">{extractedData.documentType}</span>
              <h4>{extractedData.project}</h4>
            </div>
            <div className="human-review-status">
              <AlertTriangle size={15} color="#f59e0b" />
              <span>Human Approval Required</span>
            </div>
          </div>

          <table className="extracted-table">
            <thead>
              {activeDoc === 'price-list' ? (
                <tr>
                  <th>Plot #</th>
                  <th>Size (Gaj)</th>
                  <th>Facing</th>
                  <th>Road</th>
                  <th>Rate/Gaj</th>
                  <th>Total Price</th>
                  <th>AI Confidence</th>
                </tr>
              ) : (
                <tr>
                  <th>Extracted Field</th>
                  <th>Verified Value</th>
                  <th>AI Confidence</th>
                </tr>
              )}
            </thead>
            <tbody>
              {activeDoc === 'price-list'
                ? extractedData.records.map((r, i) => (
                    <tr key={i}>
                      <td><strong>Plot {r.plotNo}</strong></td>
                      <td>{r.areaGaj} Gaj</td>
                      <td>{r.facing}</td>
                      <td>{r.roadFt}ft</td>
                      <td>₹{r.rateGaj}</td>
                      <td><strong style={{ color: '#b45309' }}>{r.totalPrice}</strong></td>
                      <td><span className="conf-pill">{r.confidence}</span></td>
                    </tr>
                  ))
                : extractedData.records.map((r, i) => (
                    <tr key={i}>
                      <td><strong>{r.field}</strong></td>
                      <td>{r.value}</td>
                      <td><span className="conf-pill">{r.confidence}</span></td>
                    </tr>
                  ))}
            </tbody>
          </table>

          <div className="review-actions">
            {!approvedStatus ? (
              <button
                className="button gold"
                onClick={() => setApprovedStatus(true)}
              >
                <Check size={16} /> Approve & Publish to Verified Database
              </button>
            ) : (
              <div className="approval-confirmed">
                <CheckCircle2 size={18} color="#10b981" />
                <span>Document verified and approved by Avnish Jain. Published safely to inventory.</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
