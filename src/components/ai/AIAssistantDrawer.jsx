import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot, ArrowUpRight, PhoneCall, ShieldCheck, MapPin, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { processGroundedAIResponse, companyKnowledge } from '../../data/ragKnowledge';
import { createWhatsAppChatUrl } from '../../data/leadStore';

export default function AIAssistantDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'bot',
      text: `Namaste! I am the **AVM AI Land Advisor**.\n\nI can help you explore verified **JDA-approved residential & villa plots in Jaipur** across Ajmer Road, Ring Road, and the MWC SEZ corridor.\n\nAsk me by typing or clicking the **Mic icon** 🎙️:\n• *"30 lakh ke under plot dikhao"*\n• *"150 gaj North facing available hai?"*\n• *"Is project ka RERA number kya hai?"*`,
      plots: [],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'hi-IN'; // supports Hindi & Hinglish recognition in Chrome

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(transcript);
          handleSend(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Voice recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const speakText = (text) => {
    if (!voiceEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    // Clean markdown stars
    const cleanText = text.replace(/[*#_•]/g, '').slice(0, 180);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  // Listen for custom event to open chat with pre-filled prompt
  useEffect(() => {
    const handleOpenChat = (event) => {
      setIsOpen(true);
      if (event.detail?.initialPrompt) {
        handleSend(event.detail.initialPrompt);
      }
    };
    window.addEventListener('open-ai-chat', handleOpenChat);
    return () => window.removeEventListener('open-ai-chat', handleOpenChat);
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate grounded retrieval delay (350ms)
    setTimeout(() => {
      const response = processGroundedAIResponse(query);
      const botMsg = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        plots: response.plots || [],
        suggestedActions: response.suggestedActions || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
      speakText(response.text);
    }, 400);
  };

  const handleQuickPrompt = (prompt) => {
    handleSend(prompt);
  };

  const quickPills = [
    '30 lakh ke under plot dikhao',
    'Corner plot available hai?',
    'North facing 180 gaj plot',
    'Is project ka RERA number kya hai?',
    'Payment plan kya hai?'
  ];

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          className="ai-floating-trigger"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Land Assistant"
        >
          <div className="ai-trigger-pulse" />
          <Sparkles size={18} className="sparkle-icon" />
          <span>Ask AI Plot Advisor</span>
        </button>
      )}

      {/* Slide-in Drawer */}
      {isOpen && (
        <div className="ai-drawer-overlay" onClick={() => setIsOpen(false)}>
          <aside className="ai-drawer" onClick={e => e.stopPropagation()}>
            {/* Drawer Header */}
            <div className="ai-drawer-header">
              <div className="ai-avatar">
                <Bot size={20} />
              </div>
              <div className="ai-title-info">
                <div className="title-row">
                  <h3>AVM AI Land Advisor</h3>
                  <span className="verified-badge"><ShieldCheck size={12} /> Grounded RAG</span>
                </div>
                <p>Strictly Plotted Land & RERA Verified Information</p>
              </div>
              <div className="header-icon-actions">
                <button
                  className={`voice-toggle-btn ${voiceEnabled ? 'active' : ''}`}
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  title={voiceEnabled ? 'Voice Response Enabled (Click to Mute)' : 'Enable Voice Audio Narration'}
                  aria-label="Toggle voice output"
                >
                  {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
                <button
                  className="ai-close-btn"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Assistant"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Conversation Stream */}
            <div className="ai-message-list">
              {messages.map(msg => (
                <div key={msg.id} className={`ai-message ${msg.sender}`}>
                  <div className="msg-bubble">
                    <div className="msg-sender-meta">
                      {msg.sender === 'bot' ? <Bot size={13} /> : <User size={13} />}
                      <span>{msg.sender === 'bot' ? 'AVM AI Advisor' : 'You'} • {msg.timestamp}</span>
                    </div>

                    <div className="msg-content">
                      {msg.text.split('\n').map((paragraph, i) => (
                        <p key={i}>
                          {paragraph.startsWith('•') ? (
                            <span className="bullet-point">{paragraph}</span>
                          ) : (
                            paragraph
                          )}
                        </p>
                      ))}
                    </div>

                    {/* Grounded Plot Cards inside chat */}
                    {msg.plots && msg.plots.length > 0 && (
                      <div className="chat-plot-cards">
                        {msg.plots.map(plot => (
                          <div key={plot.id} className="chat-plot-card">
                            <div className="chat-plot-header">
                              <div>
                                <span className="plot-badge">Plot {plot.plotNumber}</span>
                                <h4>{plot.projectName}</h4>
                              </div>
                              <div className="chat-plot-price">
                                <strong>{plot.priceDisplay}</strong>
                                <small>₹{plot.pricePerGaj}/Gaj</small>
                              </div>
                            </div>
                            <div className="chat-plot-specs">
                              <span><MapPin size={11} /> {plot.areaGaj} Gaj</span>
                              <span>{plot.facing} Facing</span>
                              <span>{plot.roadWidthFt}ft Road</span>
                              {plot.isCorner && <span className="corner-tag">Corner</span>}
                            </div>
                            {plot.matchReason && (
                              <p className="chat-match-reason">
                                <Sparkles size={11} /> {plot.matchReason}
                              </p>
                            )}
                            <div className="chat-plot-actions">
                              <button
                                className="chat-action-btn primary"
                                onClick={() => {
                                  setIsOpen(false);
                                  const event = new CustomEvent('open-site-visit', { detail: { plot } });
                                  window.dispatchEvent(event);
                                }}
                              >
                                Book Site Visit
                              </button>
                              <a
                                href={`https://wa.me/${companyKnowledge.officialWhatsApp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi, I am interested in Plot ${plot.plotNumber} (${plot.areaGaj} Gaj, ${plot.priceDisplay}) at ${plot.projectName}. Please share documentation.`)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="chat-action-btn whatsapp"
                              >
                                WhatsApp Agent
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="ai-message bot typing">
                  <div className="typing-dots">
                    <span /><span /><span />
                  </div>
                  <small>Verifying live plot inventory...</small>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Pills */}
            <div className="ai-quick-pills">
              {quickPills.map(pill => (
                <button
                  key={pill}
                  className="quick-pill"
                  onClick={() => handleQuickPrompt(pill)}
                >
                  {pill}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="ai-input-bar">
              <form onSubmit={e => { e.preventDefault(); handleSend(); }}>
                <input
                  type="text"
                  placeholder={isListening ? "Listening... speak in Hindi or English..." : "Ask in Hinglish or English: e.g. 150 gaj corner plot..."}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                />
                <button
                  type="button"
                  className={`mic-input-btn ${isListening ? 'listening' : ''}`}
                  onClick={toggleListening}
                  title={isListening ? 'Stop Listening' : 'Speak to AI Land Advisor (Hindi/English)'}
                  aria-label="Voice Input"
                >
                  {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                </button>
                <button type="submit" className="send-btn" disabled={!input.trim()}>
                  <Send size={16} />
                </button>
              </form>

              {/* Human Handoff / Safe Escalation */}
              <div className="ai-footer-safety">
                <span>Need legal negotiation or custom requirements?</span>
                <a
                  href={createWhatsAppChatUrl({ text: 'Hi AVM Team, I would like to speak directly with a Senior Land Acquisition Specialist regarding JDA plotted land in Jaipur.' })}
                  target="_blank"
                  rel="noreferrer"
                  className="safety-link"
                >
                  <PhoneCall size={12} /> Talk to Sales Specialist <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
