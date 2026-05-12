import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Activity, Terminal, Shield } from 'lucide-react';
import axios from 'axios';

const AICoreAssistant = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

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
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/chat`,
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

  return (
    <div className="relative h-[calc(100vh-144px)] w-full flex flex-col items-center px-6 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full mix-blend-screen"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-accent/20 blur-[120px] rounded-full mix-blend-screen"
        />
      </div>

      {messages.length === 0 ? (
        /* Empty State / Initial View */
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-4xl flex flex-col items-center justify-center flex-1 z-10"
        >
          {/* AI Core Orb */}
          <div className="mb-20 relative group">
            <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-primary/30 via-accent/20 to-primary/10 backdrop-blur-3xl shadow-[0_0_100px_20px_rgba(0,102,255,0.15)] flex items-center justify-center border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/40 via-transparent to-transparent opacity-50 animate-pulse"></div>
              {/* Mesh Gradient Element */}
              <div className="absolute w-[200%] h-[200%] bg-gradient-to-r from-primary/20 via-indigo-500/10 to-primary/20 blur-2xl rotate-45 animate-[spin_10s_linear_infinite]"></div>
              <Sparkles className="w-16 h-16 text-white font-thin relative z-10 drop-shadow-glow-sm" strokeWidth={1} />
            </div>
            
            {/* Loading State Hint */}
            <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 w-48">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary/80">Systems Online</span>
              <div className="w-full h-1 bg-surfaceLight rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(0,102,255,0.8)]"
                />
              </div>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="w-full text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              How can I assist your <span className="text-gradient-primary italic pr-2">Nexus journey</span> today?
            </h1>
            <p className="text-lg text-textMuted max-w-2xl mx-auto font-medium leading-relaxed">
              Monitoring academic cycles, campus resources, and placement trajectories in real-time.
            </p>
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {["Which skills should I learn?", "Am I placement eligible?", "Suggest projects for web dev", "What is my attendance?"].map((sug, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSend(sug)}
                className="px-6 py-3 rounded-full border border-white/10 text-textMuted text-xs font-bold uppercase tracking-widest hover:border-primary/50 hover:text-primary hover:bg-primary/10 transition-all shadow-sm"
              >
                {sug}
              </motion.button>
            ))}
          </div>
        </motion.div>
      ) : (
        /* Active Conversation View */
        <div className="flex-1 w-full max-w-4xl flex flex-col pt-8 pb-32 z-10 relative">
           <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 space-y-8">
              {messages.map((msg, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] sm:max-w-[75%] p-5 rounded-3xl text-[15px] leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-br-sm'
                      : 'glass-card border border-white/10 text-textMuted rounded-bl-sm'
                  }`}>
                    {msg.role === 'model' && (
                      <div className="flex items-center gap-2 mb-3 text-white text-xs font-bold tracking-widest uppercase">
                        <Sparkles className="w-4 h-4 text-primary" /> Eswar AI Core
                      </div>
                    )}
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="glass-card border border-white/10 rounded-3xl rounded-bl-sm px-6 py-5 flex gap-2 items-center">
                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-primary rounded-full shadow-glow-sm"></motion.span>
                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-primary rounded-full shadow-glow-sm"></motion.span>
                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-primary rounded-full shadow-glow-sm"></motion.span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} className="h-4" />
           </div>
        </div>
      )}

      {/* Persistent Bottom Chat Input */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-3xl px-6 z-20">
        <div className="glass border border-white/10 rounded-[2rem] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-4 px-4 py-2 bg-white/[0.02] rounded-[1.5rem]">
            <Sparkles className="w-5 h-5 text-primary shrink-0" />
            <input 
              className="bg-transparent border-none focus:ring-0 flex-1 text-base text-white placeholder-textMuted font-medium h-12" 
              placeholder="Ask Eswar Nexus anything..." 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              onClick={() => handleSend()}
              disabled={!inputText.trim() || isTyping}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                !inputText.trim() || isTyping
                  ? 'bg-white/5 text-textMuted cursor-not-allowed'
                  : 'bg-primary text-white hover:scale-110 shadow-glow-sm'
              }`}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <p className="text-center mt-4 text-[10px] text-textMuted/50 font-bold tracking-widest uppercase">
          Eswar Nexus Intelligence. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default AICoreAssistant;
