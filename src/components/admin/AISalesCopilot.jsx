import { useState } from 'react';
import { Bot, Send, Sparkles, User, MessageSquare, Copy, Check, ArrowRight } from 'lucide-react';
import { getLeads, getSiteVisits } from '../../data/leadStore';

export default function AISalesCopilot({ onSelectLead }) {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'copilot-1',
      sender: 'bot',
      text: `Hello Agent. I am your **Internal Sales Copilot**.\n\nAsk me queries such as:\n• *"Show all hot leads"* \n• *"Who asked for a site visit?"*\n• *"Which leads have not been followed up?"*\n• *"Draft follow-up WhatsApp message"*`
    }
  ]);
  const [suggestedDraft, setSuggestedDraft] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleAsk = (userText) => {
    const q = (userText || query).toLowerCase().trim();
    if (!q) return;

    const leads = getLeads();
    const visits = getSiteVisits();

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: userText || query
    };

    let replyText = '';
    let draft = null;

    if (q.includes('hot')) {
      const hotLeads = leads.filter(l => l.score === 'HOT');
      replyText = `Found **${hotLeads.length} HOT Leads** requiring priority attention:\n\n` +
        hotLeads.map(l => `• **${l.name}** (${l.phone}): Target **${l.plotPreference}** in ${l.preferredProject}. Budget: ${l.budget}. Reason: ${l.scoreReason}`).join('\n');
    } else if (q.includes('site visit') || q.includes('visit')) {
      replyText = `There are **${visits.length} Scheduled Site Visits** in the system:\n\n` +
        visits.map(v => `• **${v.customerName}** (${v.customerPhone}) for **${v.project}** (${v.plotOfInterest}) on **${v.date}** at ${v.timeSlot}. Pickup: ${v.pickupRequired ? v.pickupLocation : 'Self-arrival'}`).join('\n');
    } else if (q.includes('follow') || q.includes('pending')) {
      const pending = leads.filter(l => !l.lastFollowUp);
      replyText = `Found **${pending.length} leads with pending first contact**:\n\n` +
        pending.map(l => `• **${l.name}** (${l.phone}) - Interested in ${l.preferredSize} (${l.budget}) - Inquired via ${l.source}`).join('\n');
    } else if (q.includes('draft') || q.includes('message') || q.includes('whatsapp')) {
      const targetLead = leads[0] || { name: 'Customer', preferredProject: 'AVM Emerald Greens', preferredSize: '180 Gaj' };
      replyText = `Generated contextual WhatsApp follow-up draft for **${targetLead.name}**:`;
      draft = `Namaste ${targetLead.name} ji,\n\nAvnish from AVM Talks team here. You had inquired regarding the JDA-approved ${targetLead.preferredSize} plot at ${targetLead.preferredProject}.\n\nWe have demarcated 2 prime North-facing inventory units this week. Would this Saturday or Sunday morning work for a quick 30-minute on-ground site visit? We can also arrange complimentary pickup if needed.\n\nWarm regards,\nAVM Land Advisory Desk`;
    } else {
      replyText = `Here is your current CRM telemetry:\n• Total Active Leads: **${leads.length}**\n• Hot Leads: **${leads.filter(l => l.score === 'HOT').length}**\n• Confirmed Site Visits: **${visits.length}**\n\nYou can click on any lead row in the table below to review their full interaction history.`;
    }

    setMessages(prev => [...prev, userMsg, { id: `b-${Date.now()}`, sender: 'bot', text: replyText }]);
    setSuggestedDraft(draft);
    setQuery('');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="copilot-container">
      <div className="copilot-header">
        <div className="copilot-title">
          <Bot size={18} color="#c6a15b" />
          <h4>AI Sales Copilot & Follow-Up Engine</h4>
        </div>
        <span className="copilot-badge"><Sparkles size={12} /> Internal Sales AI</span>
      </div>

      <div className="copilot-chat-body">
        {messages.map(m => (
          <div key={m.id} className={`copilot-msg ${m.sender}`}>
            <div className="copilot-msg-bubble">
              <span className="copilot-author">
                {m.sender === 'bot' ? <Bot size={12} /> : <User size={12} />}
                {m.sender === 'bot' ? 'Copilot' : 'Agent'}
              </span>
              <div className="copilot-text">
                {m.text.split('\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Contextual Draft Suggestion */}
        {suggestedDraft && (
          <div className="copilot-draft-box">
            <div className="draft-top">
              <span>Suggested WhatsApp Message (Contextual):</span>
              <button
                className="copy-btn"
                onClick={() => copyToClipboard(suggestedDraft)}
              >
                {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy Draft'}
              </button>
            </div>
            <pre className="draft-content">{suggestedDraft}</pre>
          </div>
        )}
      </div>

      {/* Suggested Quick Prompts */}
      <div className="copilot-prompts">
        <button onClick={() => handleAsk('Show all hot leads')}>Show Hot Leads</button>
        <button onClick={() => handleAsk('Who asked for a site visit?')}>Scheduled Visits</button>
        <button onClick={() => handleAsk('Which leads have not been followed up?')}>Follow-ups Due</button>
        <button onClick={() => handleAsk('Draft follow-up WhatsApp message')}>Draft WhatsApp</button>
      </div>

      <form
        className="copilot-input-form"
        onSubmit={e => {
          e.preventDefault();
          handleAsk();
        }}
      >
        <input
          type="text"
          placeholder="Ask copilot about leads, follow-ups, or site visits..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit" disabled={!query.trim()}>
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}
