import { ShieldCheck, CheckCircle2, FileText, AlertTriangle, ArrowRight, Compass, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Eyebrow } from '../components/common/UI';

export default function BuyerGuidePage() {
  const steps = [
    {
      num: '01',
      title: 'Verify 90A Conversion & JDA Master Plan Approval',
      desc: 'Ensure the land has been legally converted from agricultural use under Section 90A of the Rajasthan Land Revenue Act. Confirm the township layout has been sanctioned by the Jaipur Development Authority (JDA) with official sector plan alignment.'
    },
    {
      num: '02',
      title: 'Examine Rajasthan RERA Registration Certificate',
      desc: 'Check the project RERA registration number on the public portal (rera.rajasthan.gov.in). Verify approved layout maps, promoter details, designated development escrow accounts, and promised possession completion dates.'
    },
    {
      num: '03',
      title: 'Inspect Physical Demarcation & Sector Roads on Ground',
      desc: 'Never buy purely on paper. Personally inspect the corner stone boundary markers, 60ft or 40ft black-top tar roads, underground electricity conduits, and water supply lines to verify physical possession readiness.'
    },
    {
      num: '04',
      title: 'Execute Allotment Agreement & Token Receipt',
      desc: 'Once shortlisted, pay the 10% booking token via official banking channels (NEFT/RTGS/Cheque). Secure an allotment agreement outlining clear terms, payment milestones, and zero unauthorized escalation clauses.'
    },
    {
      num: '05',
      title: 'Complete Sub-Registrar Registration & Individual Patta Transfer',
      desc: 'Execute final deed registration at the jurisdictional Jaipur Sub-Registrar office. Pay state stamp duty (6% for male / 5% for female) and receive the registered freehold Patta certificate in your name.'
    }
  ];

  return (
    <main className="guide-page royal-leather-main">
      <section className="page-hero">
        <div className="container">
          <Eyebrow light>LEGAL DUE DILIGENCE BLUEPRINT</Eyebrow>
          <h1>Jaipur Land Buyer’s <em>Handbook.</em></h1>
          <p>Essential checklist, statutory verification steps, and regulatory guidelines for acquiring clear-title plotted land in Rajasthan.</p>
        </div>
      </section>

      <section className="section" style={{ background: 'transparent' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div className="guide-intro-banner royal-leather-card">
            <div className="gold-corner-bracket top-left" />
            <div className="gold-corner-bracket top-right" />
            <div className="gold-corner-bracket bottom-left" />
            <div className="gold-corner-bracket bottom-right" />
            <ShieldCheck size={32} style={{ color: '#dfba73', flexShrink: 0 }} />
            <div>
              <h3 style={{ color: '#fff', margin: '0 0 6px', fontFamily: 'Cormorant Garamond, serif' }}>Our Core Philosophy: Independent Verification</h3>
              <p style={{ color: '#cbd5e1', margin: 0 }}>Property information and seller claims must always be backed by registered public documents. AVM Talks guarantees 100% legal title transparency across every square yard.</p>
            </div>
          </div>

          <div className="guide-timeline">
            {steps.map(step => (
              <div key={step.num} className="guide-timeline-item">
                <div className="step-badge">{step.num}</div>
                <div className="step-card royal-leather-card">
                  <div className="gold-corner-bracket top-left" />
                  <div className="gold-corner-bracket top-right" />
                  <div className="gold-corner-bracket bottom-left" />
                  <div className="gold-corner-bracket bottom-right" />
                  <h3 style={{ color: '#fff', fontFamily: 'Cormorant Garamond, serif' }}>{step.title}</h3>
                  <p style={{ color: '#cbd5e1' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Practical Checklist Box */}
          <div className="checklist-card royal-leather-card">
            <div className="gold-corner-bracket top-left" />
            <div className="gold-corner-bracket top-right" />
            <div className="gold-corner-bracket bottom-left" />
            <div className="gold-corner-bracket bottom-right" />
            <h4>Documents You Must Verify Before Paying Any Advance:</h4>
            <div className="check-grid">
              {[
                'JDA Approved Sector Layout Map with Seal',
                'Individual Khasra Plan & Naksha Trace',
                'Section 90A Revenue Conversion Order',
                'Rajasthan RERA Project Registration Number',
                '30-Year Non-Encumbrance Certificate (Search Report)',
                'Clear Demarcation of 60ft/40ft Black Top Roads',
                'Bank Approval Letters (SBI / HDFC / ICICI)',
                'No-Objection Certificate (NOC) from Fire & Airport'
              ].map((item, i) => (
                <div key={i} className="check-item">
                  <CheckCircle2 size={16} color="#10b981" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick CTA row */}
          <div className="guide-actions-row">
            <Link to="/plots" className="button gold">
              Explore Verified Inventory <ArrowRight size={16} />
            </Link>
            <Link to="/master-plan" className="button outline">
              <Compass size={15} /> Inspect Master Plans
            </Link>
            <button
              className="button outline"
              onClick={() => {
                const event = new CustomEvent('open-plot-calc');
                window.dispatchEvent(event);
              }}
            >
              <Calculator size={15} /> Calculate Stamp Duty
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
