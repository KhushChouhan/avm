import { useState, useMemo } from 'react';
import { Search, Sparkles, HelpCircle, ChevronDown, CheckCircle2, ShieldCheck } from 'lucide-react';
import { verifiedFaqs } from '../data/ragKnowledge';
import { Eyebrow } from '../components/common/UI';

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Are all plots approved by the Jaipur Development Authority (JDA)?',
      category: 'Legal & RERA',
      a: 'Yes, 100% of our plots carry valid JDA approvals with 90A revenue clearance and individual Patta registration under Rajasthan RERA. We do not sell unapproved agricultural land.'
    },
    {
      q: 'What are the individual project RERA registration numbers?',
      category: 'Legal & RERA',
      a: 'AVM Emerald Greens: RAJ/P/2023/1892 • AVM Grand Meadows: RAJ/P/2023/2104 • AVM Solitaire Enclave: RAJ/P/2024/2499. You can verify these anytime on the official Rajasthan RERA portal (rera.rajasthan.gov.in).'
    },
    {
      q: 'What is the standard payment plan and booking token amount?',
      category: 'Financial & Booking',
      a: 'Plots are reserved with an initial 10% token booking amount. An allotment agreement is signed within 21 days with 15% payment, and the remaining 75% balance is payable at the time of final registry and possession. Pre-approved bank loans up to 80% are available from SBI and HDFC.'
    },
    {
      q: 'What are the stamp duty and registry charges in Rajasthan?',
      category: 'Financial & Booking',
      a: 'In Rajasthan, Stamp Duty is 6% for male buyers and 5% for female buyers (1% state rebate), plus 1% government registration fee. Our Rajasthan Plot Calculator simulates your exact total outflow.'
    },
    {
      q: 'Why should I choose a corner plot or 60ft/80ft wide road?',
      category: 'Plot Architecture',
      a: 'Corner plots offer dual road frontage, greater architectural design flexibility, superior daylight, cross-ventilation, and higher long-term capital appreciation. Plots on 60ft and 80ft sector avenues enjoy faster commercial and residential growth.'
    },
    {
      q: 'How do I book an on-ground VIP site visit?',
      category: 'Site Experience',
      a: 'You can book directly on our website or through the AI Assistant. We arrange 7-days-a-week chauffeured visits with complimentary AC car pickup from Jaipur city (Vaishali Nagar, Mansarovar, Airport).'
    },
    {
      q: 'Do you sell apartments, flats, or commercial high-rises?',
      category: 'Company Policy',
      a: 'No. AVM Talks by Avnish specializes exclusively in 100% freehold plotted land and gated villa estates. We believe in complete land ownership with independent Patta guarantees rather than fractional undivided shares in apartments.'
    }
  ];

  const filteredFaqs = useMemo(() => {
    if (!searchTerm.trim()) return faqs;
    const q = searchTerm.toLowerCase();
    return faqs.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q) || f.category.toLowerCase().includes(q));
  }, [searchTerm]);

  return (
    <main className="faq-page royal-leather-main">
      <section className="page-hero">
        <div className="container">
          <Eyebrow light>GROUNDED REAL ESTATE KNOWLEDGE</Eyebrow>
          <h1>Smart <em>FAQ System.</em></h1>
          <p>Verified, approved answers regarding RERA documentation, JDA Patta issuance, payment milestones, and Rajasthan land acquisition.</p>
        </div>
      </section>

      <section className="section" style={{ background: 'transparent' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          {/* Search bar */}
          <div className="faq-search-box">
            <Search size={18} color="#886b37" />
            <input
              type="text"
              placeholder="Search by keyword: e.g. RERA, stamp duty, 80ft road, loan, booking..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Quick filter pills */}
          <div className="faq-pills">
            {['RERA', 'Payment', 'Stamp Duty', 'Corner Plot', 'Site Visit'].map(tag => (
              <button
                key={tag}
                className="faq-pill-btn"
                onClick={() => setSearchTerm(tag)}
              >
                {tag}
              </button>
            ))}
            {searchTerm && (
              <button className="faq-pill-btn clear" onClick={() => setSearchTerm('')}>
                Clear Search
              </button>
            )}
          </div>

          {/* FAQ Accordion List */}
          <div className="faq-accordion-list">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className={`faq-card ${isOpen ? 'open' : ''}`}>
                  <button
                    className="faq-question-btn"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <div>
                      <span className="faq-cat-badge">{faq.category}</span>
                      <h3>{faq.q}</h3>
                    </div>
                    <ChevronDown size={20} className="chevron" />
                  </button>
                  {isOpen && (
                    <div className="faq-answer-content">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* AI Advisor Prompt Banner */}
          <div className="faq-ai-callout">
            <div className="callout-icon">
              <Sparkles size={24} color="#c6a15b" />
            </div>
            <div>
              <h4>Have a specific custom question?</h4>
              <p>Ask our conversational AI Land Advisor in Hindi, Hinglish, or English for instant verified facts.</p>
            </div>
            <button
              className="button gold"
              onClick={() => {
                const event = new CustomEvent('open-ai-chat');
                window.dispatchEvent(event);
              }}
            >
              Ask AI Assistant
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
