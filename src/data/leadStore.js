// Client-side CRM Store with Lead Scoring & WhatsApp Integration
const STORAGE_KEY = 'avm_crm_leads';
const VISITS_KEY = 'avm_crm_site_visits';

// Initial baseline mock leads for instant CRM demonstration
const INITIAL_LEADS = [
  {
    id: 'LEAD-101',
    name: 'Rajesh Sharma',
    phone: '+91 98290 88210',
    email: 'rajesh.sharma@gmail.com',
    budget: '₹30 - 35 Lakh',
    budgetValue: 3500000,
    preferredSize: '180 - 200 Gaj',
    preferredCorridor: 'Ajmer Road Express Corridor',
    preferredProject: 'AVM Emerald Greens',
    plotPreference: 'Plot 102 (180 Gaj Corner)',
    purpose: 'Immediate Villa Construction',
    timeline: 'Within 30 Days',
    financing: 'Bank Loan Required (SBI/HDFC)',
    score: 'HOT',
    scorePoints: 92,
    scoreReason: 'Requested site visit for this Sunday, 1-month buying timeline, exact budget match for corner plot.',
    status: 'Visit Scheduled',
    source: 'AI Assistant',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    lastFollowUp: null,
    notes: 'Interested in North-facing 180 Gaj corner plot. Requested pickup from Vaishali Nagar.'
  },
  {
    id: 'LEAD-102',
    name: 'Vikramaditya Rathore',
    phone: '+91 94140 33412',
    email: 'v.rathore@outlook.com',
    budget: '₹22 - 25 Lakh',
    budgetValue: 2500000,
    preferredSize: '150 Gaj',
    preferredCorridor: 'Ring Road Growth Corridor',
    preferredProject: 'AVM Grand Meadows',
    plotPreference: 'Plot 201 (150 Gaj 80ft road)',
    purpose: 'Long-term Capital Growth',
    timeline: '2 - 3 Months',
    financing: 'Self-Funded / Cash Ready',
    score: 'WARM',
    scorePoints: 78,
    scoreReason: 'Self-funded capital, 80ft road preference. Follow-up needed for on-site visit.',
    status: 'Follow-up Due',
    source: 'Master Plan Explorer',
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
    lastFollowUp: new Date(Date.now() - 3600000 * 24).toISOString(),
    notes: 'High net-worth investor comparing Ring Road corridor vs Ajmer Road corridor.'
  },
  {
    id: 'LEAD-103',
    name: 'Neha Chawla',
    phone: '+91 99280 55120',
    email: 'neha.chawla@techcorp.in',
    budget: '₹35 - 40 Lakh',
    budgetValue: 4000000,
    preferredSize: '200 Gaj',
    preferredCorridor: 'Mahindra World City / SEZ',
    preferredProject: 'AVM Solitaire Enclave',
    plotPreference: 'Plot 302 (200 Gaj East)',
    purpose: 'Build-to-Rent Rental Asset',
    timeline: 'Next 6 Months',
    financing: 'Exploring Options',
    score: 'COLD',
    scorePoints: 45,
    scoreReason: 'Long horizon timeline (6+ months), initial research phase.',
    status: 'Nurture',
    source: 'Website Search',
    createdAt: new Date(Date.now() - 3600000 * 52).toISOString(),
    lastFollowUp: null,
    notes: 'Works at Infosys campus opposite the project. Looking for rental income calculation.'
  }
];

const INITIAL_VISITS = [
  {
    id: 'VISIT-501',
    leadId: 'LEAD-101',
    customerName: 'Rajesh Sharma',
    customerPhone: '+91 98290 88210',
    project: 'AVM Emerald Greens',
    plotOfInterest: 'Plot 102 (180 Gaj)',
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days later
    timeSlot: '11:00 AM - 1:00 PM',
    pickupRequired: true,
    pickupLocation: 'Amrapali Circle, Vaishali Nagar, Jaipur',
    status: 'CONFIRMED'
  }
];

export function getLeads() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_LEADS));
      return INITIAL_LEADS;
    }
    return JSON.parse(saved);
  } catch (e) {
    return INITIAL_LEADS;
  }
}

export function saveLead(leadData) {
  const currentLeads = getLeads();
  
  // Rule-based Explainable Lead Scoring Engine
  let points = 50;
  const reasons = [];

  if (leadData.timeline === 'Immediate (Within 15-30 days)') {
    points += 25;
    reasons.push('High buying urgency (under 30 days)');
  } else if (leadData.timeline === '1-3 Months') {
    points += 15;
    reasons.push('Active decision cycle (1-3 months)');
  }

  if (leadData.hasRequestedSiteVisit) {
    points += 20;
    reasons.push('Requested on-ground site visit');
  }

  if (leadData.plotPreference) {
    points += 10;
    reasons.push('Specific plot number shortlisted');
  }

  if (leadData.budget) {
    points += 10;
    reasons.push('Explicit verified budget supplied');
  }

  let tier = 'COLD';
  if (points >= 80) tier = 'HOT';
  else if (points >= 60) tier = 'WARM';

  const newLead = {
    id: `LEAD-${Date.now().toString().slice(-4)}`,
    name: leadData.name || 'Anonymous Visitor',
    phone: leadData.phone || 'Not Provided',
    email: leadData.email || '',
    budget: leadData.budget || 'Open for Consultation',
    preferredSize: leadData.preferredSize || '150 - 200 Gaj',
    preferredCorridor: leadData.preferredCorridor || 'Jaipur Growth Corridor',
    preferredProject: leadData.preferredProject || 'AVM Emerald Greens',
    plotPreference: leadData.plotPreference || 'General Inventory',
    purpose: leadData.purpose || 'Residential Villa',
    timeline: leadData.timeline || 'Within 1-2 Months',
    financing: leadData.financing || 'Bank Loan / Self Funded',
    score: tier,
    scorePoints: Math.min(99, points),
    scoreReason: reasons.join('; ') || 'Standard web lead inquiry',
    status: leadData.hasRequestedSiteVisit ? 'Visit Scheduled' : 'New Lead',
    source: leadData.source || 'AI Sales Portal',
    createdAt: new Date().toISOString(),
    lastFollowUp: null,
    notes: leadData.notes || 'Inquired via conversational AI plot platform.'
  };

  const updated = [newLead, ...currentLeads];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Storage error', e);
  }
  return newLead;
}

export function getSiteVisits() {
  try {
    const saved = localStorage.getItem(VISITS_KEY);
    if (!saved) {
      localStorage.setItem(VISITS_KEY, JSON.stringify(INITIAL_VISITS));
      return INITIAL_VISITS;
    }
    return JSON.parse(saved);
  } catch (e) {
    return INITIAL_VISITS;
  }
}

export function scheduleSiteVisit(visitData) {
  const currentVisits = getSiteVisits();
  const newVisit = {
    id: `VISIT-${Date.now().toString().slice(-4)}`,
    leadId: visitData.leadId || `LEAD-${Date.now().toString().slice(-4)}`,
    customerName: visitData.customerName,
    customerPhone: visitData.customerPhone,
    project: visitData.project,
    plotOfInterest: visitData.plotOfInterest || 'General Plotted Layout',
    date: visitData.date,
    timeSlot: visitData.timeSlot,
    pickupRequired: visitData.pickupRequired || false,
    pickupLocation: visitData.pickupLocation || 'Direct at Site Office',
    status: 'CONFIRMED',
    createdAt: new Date().toISOString()
  };

  const updated = [newVisit, ...currentVisits];
  try {
    localStorage.setItem(VISITS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Storage error', e);
  }

  // Also qualify/create lead
  saveLead({
    name: visitData.customerName,
    phone: visitData.customerPhone,
    preferredProject: visitData.project,
    plotPreference: visitData.plotOfInterest,
    hasRequestedSiteVisit: true,
    timeline: 'Immediate (Within 15-30 days)',
    source: 'Site Visit Booking Engine'
  });

  return newVisit;
}

// Generate pre-filled WhatsApp click-to-chat link
export function createWhatsAppChatUrl({ phone = '919829012345', text }) {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}
