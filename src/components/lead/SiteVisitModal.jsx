import { useState, useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, Sparkles, MessageSquare } from 'lucide-react';
import { scheduleSiteVisit, createWhatsAppChatUrl } from '../../data/leadStore';
import { projects } from '../../data/projectsData';

export default function SiteVisitModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [leadResult, setLeadResult] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    project: 'AVM Emerald Greens',
    plotOfInterest: '',
    visitDate: '',
    timeSlot: '11:00 AM - 1:00 PM',
    pickupRequired: false,
    pickupLocation: '',
    // Lead Qualification fields
    budget: '₹25 – ₹35 Lakh',
    purpose: 'Immediate Villa Construction (Self Use)',
    timeline: 'Immediate (Within 15-30 days)',
    financing: 'Bank Loan (SBI/HDFC)',
    notes: ''
  });

  useEffect(() => {
    const handleOpen = (e) => {
      setIsOpen(true);
      setIsSuccess(false);
      if (e.detail?.plot) {
        setSelectedPlot(e.detail.plot);
        setFormData(prev => ({
          ...prev,
          project: e.detail.plot.projectName,
          plotOfInterest: `Plot #${e.detail.plot.plotNumber} (${e.detail.plot.areaGaj} Gaj)`
        }));
      }
    };
    window.addEventListener('open-site-visit', handleOpen);
    return () => window.removeEventListener('open-site-visit', handleOpen);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.visitDate) {
      alert('Please provide your name, contact phone number, and preferred visit date.');
      return;
    }

    const scheduled = scheduleSiteVisit({
      customerName: formData.name,
      customerPhone: formData.phone,
      project: formData.project,
      plotOfInterest: formData.plotOfInterest,
      date: formData.visitDate,
      timeSlot: formData.timeSlot,
      pickupRequired: formData.pickupRequired,
      pickupLocation: formData.pickupLocation,
      budget: formData.budget,
      purpose: formData.purpose,
      timeline: formData.timeline,
      financing: formData.financing,
      hasRequestedSiteVisit: true,
      notes: formData.notes
    });

    setLeadResult(scheduled);
    setIsSuccess(true);
  };

  const getWhatsAppBookingText = () => {
    return `Namaste AVM Team, I have booked an on-ground site visit:\n\n• Name: ${formData.name}\n• Project: ${formData.project}\n• Plot: ${formData.plotOfInterest || 'General Plotted Layout'}\n• Date: ${formData.visitDate} (${formData.timeSlot})\n• Purpose: ${formData.purpose}\n• Timeline: ${formData.timeline}\n• Pickup: ${formData.pickupRequired ? formData.pickupLocation : 'Direct site arrival'}\n\nPlease confirm my site visit coordinator details.`;
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={() => setIsOpen(false)}>
      <div className="site-visit-modal" onClick={e => e.stopPropagation()}>
        <button className="close" onClick={() => setIsOpen(false)} aria-label="Close modal">
          <X size={20} />
        </button>

        {!isSuccess ? (
          <div>
            <div className="modal-header">
              <span className="eyebrow"><ShieldCheck size={14} /> VIP ON-GROUND EXPERIENCE</span>
              <h2>Schedule VIP Site Visit</h2>
              <p>Experience the actual ground reality, black-top roads, and individual plot demarcation with our senior land advisors.</p>
              {selectedPlot && (
                <div className="target-plot-alert">
                  <Sparkles size={14} color="#c6a15b" />
                  <span>Inspecting shortlisted <strong>Plot #{selectedPlot.plotNumber}</strong> ({selectedPlot.areaGaj} Gaj, {selectedPlot.priceDisplay}) at {selectedPlot.projectName}</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="visit-form">
              <div className="form-row-2">
                <div>
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Verma"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label>Mobile Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98290 XXXXX"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div>
                  <label>Select Project</label>
                  <select
                    value={formData.project}
                    onChange={e => setFormData({ ...formData, project: e.target.value })}
                  >
                    {projects.map(p => (
                      <option key={p.slug} value={p.name}>{p.name} ({p.corridor})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Plot of Interest</label>
                  <input
                    type="text"
                    placeholder="e.g. Plot 102 or General 150-200 Gaj"
                    value={formData.plotOfInterest}
                    onChange={e => setFormData({ ...formData, plotOfInterest: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div>
                  <label>Preferred Visit Date *</label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.visitDate}
                    onChange={e => setFormData({ ...formData, visitDate: e.target.value })}
                  />
                </div>
                <div>
                  <label>Time Slot</label>
                  <select
                    value={formData.timeSlot}
                    onChange={e => setFormData({ ...formData, timeSlot: e.target.value })}
                  >
                    <option>10:00 AM - 12:00 PM (Morning Slot)</option>
                    <option>11:00 AM - 1:00 PM (Prime Daylight)</option>
                    <option>2:30 PM - 4:30 PM (Afternoon)</option>
                    <option>4:30 PM - 6:00 PM (Sunset Viewing)</option>
                  </select>
                </div>
              </div>

              {/* Lead Qualification Section */}
              <div className="qualification-box">
                <span className="qual-title"><Sparkles size={12} /> AI Lead Qualification & Matching</span>
                <div className="form-row-3">
                  <div>
                    <label>Buying Purpose</label>
                    <select
                      value={formData.purpose}
                      onChange={e => setFormData({ ...formData, purpose: e.target.value })}
                    >
                      <option>Immediate Villa Construction (Self Use)</option>
                      <option>Long-term Capital Investment</option>
                      <option>Build-to-Rent Asset</option>
                      <option>Weekend Farmhouse / Villa</option>
                    </select>
                  </div>
                  <div>
                    <label>Target Timeline</label>
                    <select
                      value={formData.timeline}
                      onChange={e => setFormData({ ...formData, timeline: e.target.value })}
                    >
                      <option>Immediate (Within 15-30 days)</option>
                      <option>1-3 Months</option>
                      <option>3-6 Months</option>
                      <option>Research Phase</option>
                    </select>
                  </div>
                  <div>
                    <label>Financing Mode</label>
                    <select
                      value={formData.financing}
                      onChange={e => setFormData({ ...formData, financing: e.target.value })}
                    >
                      <option>Bank Loan (SBI/HDFC Pre-Approved)</option>
                      <option>Self-Funded / Cash Ready</option>
                      <option>Part Loan, Part Cash</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pickup-toggle">
                <label className="checkbox-wrap">
                  <input
                    type="checkbox"
                    checked={formData.pickupRequired}
                    onChange={e => setFormData({ ...formData, pickupRequired: e.target.checked })}
                  />
                  <span>Need complimentary AC car pickup from Jaipur city?</span>
                </label>
                {formData.pickupRequired && (
                  <input
                    type="text"
                    className="pickup-input"
                    placeholder="Enter pickup address or landmark (e.g. Vaishali Nagar / Airport)"
                    value={formData.pickupLocation}
                    onChange={e => setFormData({ ...formData, pickupLocation: e.target.value })}
                  />
                )}
              </div>

              <button type="submit" className="button gold full-width">
                Confirm Site Visit Appointment
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="visit-success-card">
            <div className="success-icon">
              <CheckCircle2 size={54} color="#10b981" />
            </div>
            <span className="eyebrow"><ShieldCheck size={14} /> APPOINTMENT SCHEDULED</span>
            <h2>Your Site Visit is Confirmed!</h2>
            <p className="success-desc">
              We have assigned an experienced land acquisition executive for your visit to <strong>{formData.project}</strong> on <strong>{formData.visitDate}</strong> ({formData.timeSlot}).
            </p>

            <div className="success-dossier">
              <div>
                <span>Registered Lead ID:</span>
                <strong>{leadResult?.leadId || 'LEAD-CONFIRMED'}</strong>
              </div>
              <div>
                <span>Plot of Interest:</span>
                <strong>{formData.plotOfInterest || 'General Township Demarcations'}</strong>
              </div>
              <div>
                <span>Transportation:</span>
                <strong>{formData.pickupRequired ? `Pickup at ${formData.pickupLocation}` : 'Direct Arrival at Site Entrance'}</strong>
              </div>
            </div>

            <div className="success-actions">
              <a
                href={createWhatsAppChatUrl({ text: getWhatsAppBookingText() })}
                target="_blank"
                rel="noreferrer"
                className="button gold"
              >
                <MessageSquare size={16} /> Open Appointment on WhatsApp
              </a>
              <button className="button outline" onClick={() => setIsOpen(false)}>
                Back to Exploring Plots
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
