import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Mic, Terminal, Activity } from 'lucide-react';
import axios from 'axios';

const ChatbotUI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'model',
      content: "System online. I am Eswar AI Core. State your query.",
    }
  ]);
  const [conversationId, setConversationId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener('open-ai-assistant', handleOpenEvent);
    return () => window.removeEventListener('open-ai-assistant', handleOpenEvent);
  }, []);

  const handleSend = async (customText) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim()) return;

    const userMessage = { role: 'user', content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      const response = await axios.post(
        'http://localhost:5000/api/chat',
        {
          message: userMessage.content,
          conversationId: conversationId
        },
        {
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.conversationId) {
        setConversationId(response.data.conversationId);
      }

      setMessages((prev) => [
        ...prev,
        { role: 'model', content: response.data.message }
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      
      const isAuthError = error.response && error.response.status === 401;
      const errorMessage = isAuthError 
        ? "Authentication required. Please sign in to access core functions." 
        : "Network disruption detected. Connection to AI Core failed.";
        
      setMessages((prev) => [
        ...prev,
        { role: 'model', content: errorMessage }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const suggestions = [
    "Predict my final GPA",
    "Show attendance telemetry",
    "List pending action items"
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-6 w-[380px] sm:w-[420px] h-[600px] glass-panel rounded-3xl flex flex-col overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/[0.05]"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/[0.05] bg-black/50 flex justify-between items-center relative overflow-hidden shrink-0">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-30" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20 relative">
                  <Sparkles className="w-4 h-4 text-accent drop-shadow-[0_0_8px_rgba(94,106,210,0.6)]" />
                  <div className="absolute inset-0 rounded-full border border-accent/50 animate-ping opacity-50" />
                </div>
                <div>
                  <h3 className="text-text font-semibold text-sm tracking-tight">Eswar AI Core</h3>
                  <p className="text-[10px] text-accent uppercase tracking-widest font-medium flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(94,106,210,0.8)]"></span> Connected
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-textMuted hover:text-white transition-colors bg-white/[0.03] p-1.5 rounded-full hover:bg-white/[0.1]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5 custom-scrollbar bg-surface/30 relative">
              <div className="absolute inset-0 bg-mesh-subtle opacity-20 pointer-events-none" />
              
              {messages.map((msg, index) => (
                <div 
                  key={index}
                  className={`max-w-[85%] text-sm relative z-10 ${
                    msg.role === 'user'
                      ? 'self-end bg-white text-black rounded-2xl rounded-tr-sm px-4 py-3 font-medium'
                      : 'self-start bg-white/[0.02] border border-white/[0.05] rounded-2xl rounded-tl-sm px-4 py-3 text-textMuted'
                  }`}
                >
                  {msg.role === 'model' && (
                    <div className="flex items-center gap-2 mb-2 text-text text-xs font-semibold tracking-tight">
                      <Terminal className="w-3.5 h-3.5 text-accent" /> AI Core
                    </div>
                  )}
                  <div className="leading-relaxed">{msg.content}</div>
                </div>
              ))}
              
              {isTyping && (
                <div className="self-start bg-white/[0.02] border border-white/[0.05] rounded-2xl rounded-tl-sm px-5 py-4 text-sm flex gap-1.5 items-center relative z-10">
                  <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_8px_rgba(94,106,210,0.5)]"></motion.span>
                  <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_8px_rgba(94,106,210,0.5)]"></motion.span>
                  <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_8px_rgba(94,106,210,0.5)]"></motion.span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && !isTyping && (
              <div className="px-5 pb-2 bg-surface/30 flex flex-wrap gap-2">
                {suggestions.map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(sug)}
                    className="px-3 py-1.5 rounded-full border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.05] text-xs text-textMuted transition-colors whitespace-nowrap"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-white/[0.05] bg-surface/80 backdrop-blur-xl shrink-0">
              <div className="relative flex items-center bg-white/[0.03] border border-white/[0.05] rounded-2xl focus-within:border-white/[0.1] focus-within:bg-white/[0.05] transition-all">
                <input 
                  type="text" 
                  placeholder="Query system..." 
                  className="w-full bg-transparent py-3.5 pl-4 pr-24 text-sm text-text placeholder-textMuted focus:outline-none"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <div className="absolute right-2 flex items-center gap-1">
                  <button className="p-2 text-textMuted hover:text-text transition-colors">
                    <Mic className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleSend()}
                    disabled={!inputText.trim() || isTyping}
                    className={`p-2 rounded-xl transition-all ${
                      (!inputText.trim() || isTyping) 
                        ? 'text-textMuted opacity-50 cursor-not-allowed' 
                        : 'bg-white text-black hover:scale-105'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Floating Orb Trigger */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-black border border-white/[0.1] flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.8)] z-50 relative group"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
        <div className="absolute inset-1 rounded-full border border-white/[0.05]" />
        
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6 text-textMuted" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} className="relative flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-accent relative z-10" />
              {/* Breathing pulse rings */}
              <div className="absolute inset-[-10px] rounded-full border border-accent/30 animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-[-20px] rounded-full border border-accent/10 animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ChatbotUI;
