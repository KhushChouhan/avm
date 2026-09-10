// RAG Knowledge Base & Anti-Hallucination Verified Truth Engine
import { plots } from './plotsData';
import { projects } from './projectsData';

export const companyKnowledge = {
  companyName: 'AVM Plots & Land Estates',
  founder: 'Avnish Jain (AVM Talks by Avnish)',
  focus: 'Exclusively 100% Plotted Land & Plotted Villa Townships in Jaipur growth corridors. We DO NOT sell apartments, flats, or commercial high-rises.',
  headquarters: 'Vaishali Nagar, Jaipur, Rajasthan',
  supportPhone: '+91 98290 12345',
  supportEmail: 'contact@avmtalks.com',
  officialWhatsApp: '+919829012345',
  operatingHours: 'Monday to Sunday, 9:30 AM to 7:00 PM IST',
  reraRegime: 'All projects are strictly JDA (Jaipur Development Authority) approved, 90A cleared with individual RERA certification.',
  siteVisitDays: 'Site visits are hosted 7 days a week with complimentary pick-and-drop service from key city points in Jaipur.'
};

export const verifiedFaqs = [
  {
    topic: 'rera',
    keywords: ['rera', 'registration', 'approval', 'jda', 'patta', 'legal', 'law', 'safe', 'clear title'],
    answer: 'All our plotted projects are 100% legally verified and approved. AVM Emerald Greens is RERA registered under RAJ/P/2023/1892 (JDA Approved). AVM Grand Meadows is RAJ/P/2023/2104. AVM Solitaire Enclave is RAJ/P/2024/2499. Every buyer receives an individual registered Patta with a forensic 30-year title guarantee.'
  },
  {
    topic: 'payment_plan',
    keywords: ['payment plan', 'installment', 'booking amount', 'token', 'down payment', 'emi', 'loan', 'bank'],
    answer: 'Standard payment plan: 10% token amount to reserve your plot number, 15% within 21 days on allotment agreement, and 75% at the time of final registry and possession. Up to 80% plot loans are pre-approved by SBI, HDFC, ICICI, and Axis Bank.'
  },
  {
    topic: 'site_visit',
    keywords: ['site visit', 'visit', 'sunday', 'weekend', 'cab', 'see the plot', 'timing', 'pickup', 'inspect'],
    answer: 'Site visits are arranged every day including weekends between 10:00 AM and 6:00 PM. We provide private AC vehicle pickup from Vaishali Nagar, Mansarovar, or Ajmer Road. You can book directly in the chat or via WhatsApp.'
  },
  {
    topic: 'amenities',
    keywords: ['amenities', 'roads', 'electricity', 'water', 'underground', 'security', 'park', 'clubhouse'],
    answer: 'All projects include 60ft or 40ft black-top demarcated avenues, underground electrification (no overhead cables), dedicated borewell + overhead water reservoir, underground drainage/sewer lines, gated security with boom barriers, and lush central parks.'
  },
  {
    topic: 'registry_stamp_duty',
    keywords: ['registry', 'stamp duty', 'cost', 'extra charges', 'dlc rate', 'charges', 'rajasthan'],
    answer: 'In Rajasthan, Stamp Duty is 6% for male buyers and 5% for female buyers, plus 1% Registration fee and applicable local cesses (roughly 7-8% total over the government DLC rate or agreement value). No hidden maintenance deposit surprises.'
  },
  {
    topic: 'school_connectivity',
    keywords: ['school', 'dps', 'airport', 'railway station', 'ring road', 'distance', 'near', 'connectivity', 'hospital'],
    answer: 'At AVM Emerald Greens (Ajmer Road), DPS (Delhi Public School) is just 3.2 km (6 mins away), and the Ring Road interchange is 4.5 km. At AVM Solitaire Enclave, Infosys and Tech Mahindra campuses are within 1.2 km (walk-to-work).'
  },
  {
    topic: 'investment',
    keywords: ['investment', 'return', 'appreciation', 'growth', 'best plot', 'roi'],
    answer: 'For long-term capital appreciation, front-row 150-200 Gaj plots on the 80ft sector road in AVM Grand Meadows (Ring Road corridor) offer excellent infrastructure momentum. For immediate rental/build-to-rent yield, AVM Solitaire Enclave opposite Infosys MWC provides high executive tenant demand.'
  }
];

// Conversational Intent Parser & Inventory Matcher (Hinglish + Hindi + English)
export function parseUserQuery(query) {
  const q = query.toLowerCase().trim();
  const filters = {
    budgetMax: null,
    minGaj: null,
    maxGaj: null,
    facing: null,
    roadWidthMin: null,
    isCorner: null,
    projectSlug: null,
    location: null,
    status: 'AVAILABLE' // default only to available unless asking generally
  };

  // 1. Budget extraction (e.g., "30 lakh", "under 25L", "35 lakh ke under", "below 40")
  const lakhMatch = q.match(/(\d+)\s*(?:lakh|lakhs|lac|lacs|l)/i);
  if (lakhMatch) {
    const lakhVal = parseInt(lakhMatch[1], 10);
    filters.budgetMax = lakhVal * 100000;
  }

  // 2. Gaj / Sq. Yd extraction (e.g., "150 gaj", "200 sq yd", "150-200 gaj", "180 gaj ka plot")
  const gajRangeMatch = q.match(/(\d+)\s*(?:-|to)\s*(\d+)\s*(?:gaj|sq\.?\s*yd|yards)/i);
  if (gajRangeMatch) {
    filters.minGaj = parseInt(gajRangeMatch[1], 10);
    filters.maxGaj = parseInt(gajRangeMatch[2], 10);
  } else {
    const singleGajMatch = q.match(/(\d+)\s*(?:gaj|sq\.?\s*yd|yards)/i);
    if (singleGajMatch) {
      const gaj = parseInt(singleGajMatch[1], 10);
      filters.minGaj = Math.max(100, gaj - 30);
      filters.maxGaj = gaj + 40;
    }
  }

  // 3. Facing
  if (q.includes('north-east') || q.includes('northeast') || q.includes('ishan')) {
    filters.facing = 'North-East';
  } else if (q.includes('north') || q.includes('uttar')) {
    filters.facing = 'North';
  } else if (q.includes('east') || q.includes('purva') || q.includes('poorv')) {
    filters.facing = 'East';
  } else if (q.includes('west')) {
    filters.facing = 'West';
  } else if (q.includes('south')) {
    filters.facing = 'South';
  }

  // 4. Road width (e.g. "80 feet", "60 ft road", "80 ft road")
  const roadMatch = q.match(/(\d+)\s*(?:feet|ft|foot)\s*(?:road|chaudi|chodi)?/i);
  if (roadMatch) {
    filters.roadWidthMin = parseInt(roadMatch[1], 10);
  }

  // 5. Corner
  if (q.includes('corner') || q.includes('kona') || q.includes('kone')) {
    filters.isCorner = true;
  }

  // 6. Project / Location
  if (q.includes('ajmer road') || q.includes('emerald')) {
    filters.projectSlug = 'avm-emerald-greens';
  } else if (q.includes('ring road') || q.includes('meadows')) {
    filters.projectSlug = 'avm-grand-meadows';
  } else if (q.includes('sez') || q.includes('infosys') || q.includes('solitaire') || q.includes('mwc')) {
    filters.projectSlug = 'avm-solitaire-enclave';
  }

  return filters;
}

// Grounded Query Resolver - Queries real inventory & approved knowledge
export function processGroundedAIResponse(userMessage) {
  const q = userMessage.toLowerCase().trim();

  // Safety / Domain Guardrail: Block non-plotted questions
  if (q.includes('flat') || q.includes('apartment') || q.includes('bhk') || q.includes('rent') || q.includes('kiraya')) {
    return {
      text: "At AVM Plots, we specialize exclusively in **100% Clear-Title Plotted Land and Villa Plots** in Jaipur. We do not deal in apartments, flats, or rental properties. We can help you find a freehold plot to construct your independent home or make a high-yield land investment.",
      plots: [],
      suggestedActions: ['Show All Available Plots', 'Explore Master Plan', 'Calculate Plot Registry']
    };
  }

  // Check for RERA / Project specific factual questions
  for (const faq of verifiedFaqs) {
    const match = faq.keywords.some(kw => q.includes(kw));
    if (match && !q.includes('plot dikhao') && !q.includes('show plot') && !q.match(/\d+\s*(?:gaj|lakh)/)) {
      return {
        text: faq.answer,
        plots: [],
        suggestedActions: ['Show Available Plots', 'Book Free Site Visit', 'Download RERA Patta Dossier']
      };
    }
  }

  // Otherwise, treat as an inventory search query
  const filters = parseUserQuery(userMessage);

  let matchedPlots = plots.filter(p => {
    if (p.status !== 'AVAILABLE') return false;
    if (filters.budgetMax && p.totalPrice > filters.budgetMax) return false;
    if (filters.minGaj && p.areaGaj < filters.minGaj) return false;
    if (filters.maxGaj && p.areaGaj > filters.maxGaj) return false;
    if (filters.facing && p.facing !== filters.facing && !p.facing.includes(filters.facing)) return false;
    if (filters.roadWidthMin && p.roadWidthFt < filters.roadWidthMin) return false;
    if (filters.isCorner !== null && p.isCorner !== filters.isCorner) return false;
    if (filters.projectSlug && p.projectSlug !== filters.projectSlug) return false;
    return true;
  });

  // Calculate explainable AI match score for matched plots
  const scoredPlots = matchedPlots.map(p => {
    let score = 85;
    const reasons = [];

    if (filters.budgetMax && p.totalPrice <= filters.budgetMax) {
      score += 5;
      reasons.push(`Under your ₹${(filters.budgetMax / 100000).toFixed(0)}L budget`);
    }
    if (filters.facing && p.facing.includes(filters.facing)) {
      score += 5;
      reasons.push(`${p.facing} facing`);
    }
    if (filters.isCorner && p.isCorner) {
      score += 5;
      reasons.push('Corner plot advantage');
    }
    if (filters.roadWidthMin && p.roadWidthFt >= filters.roadWidthMin) {
      reasons.push(`${p.roadWidthFt}ft wide avenue frontage`);
    }
    if (reasons.length === 0) {
      reasons.push('JDA Approved ready registry plot in high growth corridor');
    }

    return {
      ...p,
      matchScore: Math.min(98, score),
      matchReason: reasons.join(' • ')
    };
  });

  if (scoredPlots.length > 0) {
    const topPlots = scoredPlots.slice(0, 3);
    const summaryList = topPlots.map(p => `• **Plot ${p.plotNumber}** (${p.projectName}): ${p.areaGaj} Gaj (${p.dimensions}), ${p.facing} Facing on ${p.roadWidthFt}ft road — **${p.priceDisplay}** (${p.isCorner ? 'Corner' : 'Standard'})`).join('\n');

    return {
      text: `I have verified our real-time inventory and found **${scoredPlots.length} verified available plots** matching your criteria:\n\n${summaryList}\n\nAll of these plots possess clear JDA Patta approvals and are ready for immediate site inspection or registration.`,
      plots: topPlots,
      suggestedActions: ['Book Site Visit for this Plot', 'View on Master Plan', 'Calculate Registry & EMI']
    };
  }

  // Anti-hallucination fallback if no real inventory matches
  return {
    text: "I searched our live inventory, but currently no verified plots exactly meet those parameters (e.g. specific size, facing, or budget). \n\nI don't have verified information for that yet. I can connect you directly with our sales desk to check upcoming releases or close alternatives.",
    plots: [],
    suggestedActions: ['Talk to Sales Specialist', 'Schedule Site Visit', 'View All Available Plots']
  };
}
