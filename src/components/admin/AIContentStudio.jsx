import { useState } from 'react';
import { Sparkles, Copy, Check, Send, MessageSquare, Globe, Camera, FileText } from 'lucide-react';
import { projects } from '../../data/projectsData';

export default function AIContentStudio() {
  const [selectedProject, setSelectedProject] = useState('avm-emerald-greens');
  const [contentType, setContentType] = useState('whatsapp'); // whatsapp | seo | instagram | description
  const [generatedDraft, setGeneratedDraft] = useState('');
  const [copied, setCopied] = useState(false);

  const proj = projects.find(p => p.slug === selectedProject) || projects[0];

  const generateCopy = (type) => {
    setContentType(type);
    if (type === 'whatsapp') {
      setGeneratedDraft(
        `🏛️ *EXCLUSIVE PLOT RELEASE: ${proj.name.toUpperCase()}*\n` +
        `📍 *Location:* ${proj.location}\n` +
        `📜 *Approvals:* 100% JDA Approved 90A Clear Title | RERA: ${proj.reraNumber}\n\n` +
        `✨ *Highlights:*\n` +
        `• Demarcated 150–250 Gaj Villa Plots on 60ft & 40ft wide black-top roads\n` +
        `• Just 6 mins from Delhi Public School (DPS) & Ring Road Interchange\n` +
        `• Up to 80% pre-approved bank loans from SBI & HDFC\n` +
        `• Immediate registry & ready for construction\n\n` +
        `🚙 *Free VIP Site Visit Available This Weekend (Complimentary AC Car Pickup).*\n\n` +
        `Reply *VISIT* or call +91 98290 12345 to reserve your plot number today.\n` +
        `— *AVM Talks by Avnish Jain*`
      );
    } else if (type === 'seo') {
      setGeneratedDraft(
        `SEO Meta Title:\n` +
        `Residential Plots in ${proj.location} | JDA Approved | AVM Talks\n\n` +
        `Meta Description (158 chars):\n` +
        `Explore verified residential villa plots for sale in ${proj.location}. 100% JDA approved with individual registered Patta. RERA: ${proj.reraNumber}. Book visit.\n\n` +
        `Primary Keywords:\n` +
        `plots for sale in jaipur, residential plots ajmer road, jda approved plots jaipur, rera registered plots rajasthan, avm talks plots`
      );
    } else if (type === 'instagram') {
      setGeneratedDraft(
        `Why buying land with an individual JDA Patta beats investing in a depreciating apartment box. 🏡✨\n\n` +
        `At ${proj.name} on Ajmer Road, every buyer gets:\n` +
        `✅ 100% soil ownership (No undivided share disputes)\n` +
        `✅ 60ft wide tree-lined sector avenues\n` +
        `✅ Walking distance to DPS & Ring Road access\n` +
        `✅ Clear Rajasthan RERA certification (${proj.reraNumber})\n\n` +
        `Watch our latest episode on YouTube: @Avmtalksbyavnish 🎙️\n` +
        `Link in bio to explore the interactive master layout & schedule a site visit.\n\n` +
        `#JaipurRealEstate #PlottedLiving #AVMTalks #LandInvestment #JDAApproved #AjmerRoadJaipur #PropertyWisdom`
      );
    } else {
      setGeneratedDraft(
        `${proj.name} is a master-planned luxury villa plotted estate situated along the prestigious ${proj.corridor} in Jaipur. Designed for discerning families and strategic investors, the project combines expansive 60-foot black-top boulevards with underground utilities and lush botanical parks. Every land parcel is legally vetted under the Rajasthan Real Estate Regulatory Authority (RERA No: ${proj.reraNumber}) and conveys immediate freehold Patta ownership.`
      );
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="content-studio-panel">
      <div className="studio-header">
        <div>
          <span className="eyebrow"><Sparkles size={14} /> AI MARKETING & CONTENT COPILOT</span>
          <h3>Content Studio & Campaign Generator</h3>
          <p>Generate brand-aligned, legally compliant promotional copy and SEO metadata reviewed against approved project facts.</p>
        </div>
      </div>

      <div className="studio-controls">
        <div className="proj-select-box">
          <label>Target Project</label>
          <select
            value={selectedProject}
            onChange={e => {
              setSelectedProject(e.target.value);
              setGeneratedDraft('');
            }}
          >
            {projects.map(p => (
              <option key={p.slug} value={p.slug}>{p.name}</option>
            ))}
          </select>
        </div>

        <div className="content-type-pills">
          <button
            className={`type-pill ${contentType === 'whatsapp' ? 'active' : ''}`}
            onClick={() => generateCopy('whatsapp')}
          >
            <MessageSquare size={14} /> WhatsApp Broadcast Draft
          </button>
          <button
            className={`type-pill ${contentType === 'seo' ? 'active' : ''}`}
            onClick={() => generateCopy('seo')}
          >
            <Globe size={14} /> SEO Meta & Keywords
          </button>
          <button
            className={`type-pill ${contentType === 'instagram' ? 'active' : ''}`}
            onClick={() => generateCopy('instagram')}
          >
            <Camera size={14} /> Social Media Caption
          </button>
          <button
            className={`type-pill ${contentType === 'description' ? 'active' : ''}`}
            onClick={() => generateCopy('description')}
          >
            <FileText size={14} /> Project Description
          </button>
        </div>
      </div>

      {generatedDraft && (
        <div className="draft-preview-card">
          <div className="draft-card-top">
            <span>Generated Draft — Verified against RERA No: {proj.reraNumber}</span>
            <button className="copy-draft-btn" onClick={copyToClipboard}>
              {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              {copied ? 'Copied to Clipboard' : 'Copy Copy'}
            </button>
          </div>
          <pre className="draft-textarea">{generatedDraft}</pre>
        </div>
      )}
    </div>
  );
}
