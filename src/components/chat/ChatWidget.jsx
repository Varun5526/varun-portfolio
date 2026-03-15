import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Loader, Send, X, MessageCircle, RefreshCw } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { callAssistant } from '../../utils/gemini';

const INITIAL_MESSAGE = {
  role: 'ai',
  text: "Hi! I'm Varun's AI assistant. Ask me anything about his skills, projects, or experience! 🚀",
};

const SUGGESTIONS = [
  "What are Varun's top skills?",
  "Tell me about the RAG Chatbot project.",
  "Describe his internship experience.",
  "How can I contact Varun?",
];

const ChatWidget = ({ contextData }) => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(scrollToBottom, [messages, isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 150);
  }, [isOpen]);

  const handleSend = async (text = input) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;
    setMessages(prev => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    setIsTyping(true);

    try {
      const reply = await callAssistant(trimmed, '', contextData);
      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: 'Sorry, I ran into an issue. Please try again!' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () => setMessages([INITIAL_MESSAGE]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className={`fixed bottom-6 right-6 z-50 bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-all duration-200 ${!isOpen ? 'animate-bounce' : ''}`}
        aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="text-white" size={22} /> : <MessageCircle className="text-white" size={22} />}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Varun's AI Chat Assistant"
          className={`fixed bottom-24 right-6 z-50 w-80 md:w-96 backdrop-blur-xl border rounded-2xl shadow-2xl flex flex-col max-h-[520px] animate-in slide-in-from-right duration-300 ${isDark ? 'bg-[#0f172a]/95 border-cyan-500/30' : 'bg-white/95 border-gray-200'}`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-4 flex items-center justify-between rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Sparkles size={16} className="text-white" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Varun's Assistant</h3>
                <p className="text-white/70 text-xs">Powered by AI</p>
              </div>
            </div>
            {messages.length > 1 && (
              <button
                onClick={handleReset}
                aria-label="Reset conversation"
                className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white/80 hover:text-white"
                title="Reset chat"
              >
                <RefreshCw size={14} />
              </button>
            )}
          </div>

          {/* Messages */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-3 ${isDark ? 'bg-black/20' : 'bg-gray-50'}`}>
            {/* Suggestions on first load */}
            {messages.length === 1 && !isTyping && (
              <>
                <p className={`text-xs text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Try asking me something:
                </p>
                {SUGGESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className={`w-full text-xs p-2.5 rounded-xl transition-all hover:scale-[1.02] text-left border ${isDark ? 'bg-cyan-500/10 text-gray-300 border-cyan-500/30 hover:bg-cyan-500/20' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'}`}
                  >
                    {q}
                  </button>
                ))}
              </>
            )}

            {/* Message bubbles */}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-br-none'
                      : isDark
                        ? 'bg-[#1e293b] text-gray-200 rounded-bl-none'
                        : 'bg-white text-gray-700 border border-gray-200 shadow-sm rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <div className={`p-3 rounded-2xl rounded-bl-none flex gap-1 ${isDark ? 'bg-[#1e293b]' : 'bg-white border border-gray-200 shadow-sm'}`}>
                  {[0, 150, 300].map(delay => (
                    <span key={delay} className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className={`p-3 border-t flex gap-2 rounded-b-2xl ${isDark ? 'border-gray-800 bg-[#0f172a]' : 'border-gray-200 bg-white'}`}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              disabled={isTyping}
              aria-label="Chat message input"
              className={`flex-1 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 border transition-all disabled:opacity-50 ${isDark ? 'bg-[#1e293b] border-gray-700 text-white placeholder-gray-500' : 'bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-400'}`}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
              className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-2.5 rounded-full hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
