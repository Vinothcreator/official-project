import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, ThumbsUp, ThumbsDown, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { toast } from 'sonner';

const ChatbotPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hello! I\'m your AI Healthcare Assistant. I can help you with appointment scheduling, health information, clinic details, and more. What can I help you with today?',
      timestamp: new Date().toISOString(),
      feedback: null,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickQuestions = [
    'Check doctor availability',
    'View my lab reports',
    'What are clinic hours?',
    'When is my next appointment?',
    'How do I schedule an appointment?',
    'What should I bring to my appointment?',
    'Emergency services information',
    'Health tips and wellness advice',
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        text: message,
        timestamp: new Date().toISOString(),
        feedback: null,
      };
      setMessages([...messages, newMessage]);
      setMessage('');

      // Show typing indicator
      setIsTyping(true);

      // Simulate bot response
      setTimeout(() => {
        setIsTyping(false);
        const botResponse = {
          id: messages.length + 2,
          type: 'bot',
          text: generateBotResponse(message),
          timestamp: new Date().toISOString(),
          feedback: null,
        };
        setMessages((prev) => [...prev, botResponse]);
      }, 1500);
    }
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes('available') ||
      lowerMessage.includes('availability')
    ) {
      return 'Our doctors have excellent availability. Dr. Sarah Johnson is available Feb 22, 23, and 25. Dr. Michael Brown is available on Feb 20, 21, and 24. Would you like to book an appointment?';
    } else if (
      lowerMessage.includes('report') ||
      lowerMessage.includes('lab')
    ) {
      return 'You have 3 recent lab reports available. All your results are within normal range. Your most recent Blood Test Report from Feb 15 shows everything is healthy. Would you like me to provide more details?';
    } else if (
      lowerMessage.includes('hours') ||
      lowerMessage.includes('open') ||
      lowerMessage.includes('timing')
    ) {
      return 'Our clinic is open Monday-Friday: 8:00 AM - 6:00 PM, Saturday: 9:00 AM - 2:00 PM, and closed on Sundays. We also have emergency services available 24/7.';
    } else if (
      lowerMessage.includes('appointment') ||
      lowerMessage.includes('schedule')
    ) {
      return 'Your next appointment is scheduled with Dr. Sarah Johnson on February 22, 2026 at 10:30 AM for a Follow-up Consultation. You can reschedule or cancel through your dashboard if needed.';
    } else if (
      lowerMessage.includes('emergency') ||
      lowerMessage.includes('urgent')
    ) {
      return 'For medical emergencies, please call 911 immediately or visit your nearest emergency room. You can also use our Emergency Case feature in the Quick Actions to alert our medical team.';
    } else if (
      lowerMessage.includes('bring') ||
      lowerMessage.includes('prepare')
    ) {
      return 'For your appointment, please bring: 1) Valid ID or insurance card, 2) List of current medications, 3) Medical history documents, 4) Any recent test results. Arrive 10 minutes early.';
    } else if (
      lowerMessage.includes('wellness') ||
      lowerMessage.includes('health tips')
    ) {
      return 'Here are some wellness tips: Stay hydrated (8 glasses of water daily), Exercise for at least 30 minutes, Get 7-9 hours of sleep, Eat a balanced diet with fruits and vegetables, and manage stress through meditation or yoga.';
    } else if (
      lowerMessage.includes('fee') ||
      lowerMessage.includes('cost') ||
      lowerMessage.includes('price')
    ) {
      return 'Consultation fees vary based on the doctor and type of visit. General consultations start at $50, specialist consultations at $75-$150. We accept most insurance plans. Please contact our billing department for specific rates.';
    } else {
      return 'I understand your query. Based on your needs, I can help you schedule appointments, view medical reports, check clinic information, or provide health advice. What would you specifically like help with?';
    }
  };

  const handleQuickQuestion = (question: string) => {
    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      text: question,
      timestamp: new Date().toISOString(),
      feedback: null,
    };
    setMessages([...messages, newMessage]);

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const response = generateBotResponse(question);

      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        text: response,
        timestamp: new Date().toISOString(),
        feedback: null,
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1500);
  };

  const handleFeedback = (messageId: number, feedbackType: 'helpful' | 'not-helpful') => {
    setMessages(
      messages.map((msg) =>
        msg.id === messageId ? { ...msg, feedback: feedbackType as any } : msg
      ) as any
    );
    toast.success('Thank you for your feedback!');
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-vh-100" style={{ background: '#f8f9fa', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="d-lg-flex">
        <div className="flex-grow-1">
          <Navbar onMenuClick={() => setSidebarOpen(true)} />

          <div className="container-fluid p-4">
            {/* Page Header */}
            <div className="mb-4 d-flex align-items-center justify-content-between">
              <div>
                <h2 className="mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <Bot className="me-2" style={{ display: 'inline' }} />
                  AI Healthcare Assistant
                </h2>
                <p className="text-muted mb-0">
                  Get instant answers to your healthcare questions
                </p>
              </div>
              <button
                className="btn btn-outline-primary d-flex align-items-center gap-2"
                onClick={() => navigate(-1)}
              >
                <Home size={16} /> Back
              </button>
            </div>

            {/* Main Chat Container */}
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <motion.div
                  className="card border-0 shadow-sm"
                  style={{
                    height: '600px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {/* Chat Header */}
                  <div
                    className="p-4 border-bottom"
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                    }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: '50px',
                          height: '50px',
                          background: 'rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        <Bot size={28} />
                      </div>
                      <div>
                        <h5 className="mb-0">Healthcare AI Assistant</h5>
                        <small className="opacity-75">Online & Ready to Help</small>
                      </div>
                    </div>
                  </div>

                  {/* Quick Questions */}
                  <div className="p-4 border-bottom bg-light">
                    <p className="small text-muted mb-3">
                      <strong>Quick Questions:</strong>
                    </p>
                    <div className="row g-2">
                      {quickQuestions.map((q, idx) => (
                        <div key={idx} className="col-6">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn btn-sm btn-outline-primary w-100"
                            onClick={() => handleQuickQuestion(q)}
                            style={{ fontSize: '0.85rem' }}
                          >
                            {q}
                          </motion.button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div
                    className="flex-grow-1 overflow-auto p-4"
                    style={{ background: '#f8f9fa' }}
                  >
                    <div className="d-flex flex-column gap-3">
                      {messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          className={`d-flex flex-column ${
                            msg.type === 'user'
                              ? 'align-items-end'
                              : 'align-items-start'
                          }`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <div
                            className="rounded-4 px-4 py-2"
                            style={{
                              maxWidth: '85%',
                              background:
                                msg.type === 'user'
                                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                  : 'white',
                              color:
                                msg.type === 'user' ? 'white' : '#1a1a1a',
                              border:
                                msg.type === 'bot'
                                  ? '1px solid #ddd'
                                  : 'none',
                              wordWrap: 'break-word',
                            }}
                          >
                            <div style={{ lineHeight: '1.5' }}>{msg.text}</div>
                            <small
                              className="d-block mt-2"
                              style={{
                                fontSize: '0.75rem',
                                opacity: msg.type === 'user' ? 0.7 : 0.6,
                              }}
                            >
                              {formatTime(msg.timestamp)}
                            </small>
                          </div>
                          {msg.type === 'bot' && (
                            <div className="d-flex gap-2 mt-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`btn btn-sm ${
                                  msg.feedback === 'helpful'
                                    ? 'btn-success'
                                    : 'btn-outline-secondary'
                                }`}
                                onClick={() =>
                                  handleFeedback(msg.id, 'helpful')
                                }
                                style={{
                                  fontSize: '0.75rem',
                                  padding: '0.3rem 0.6rem',
                                }}
                              >
                                <ThumbsUp size={12} className="me-1" />
                                Helpful
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`btn btn-sm ${
                                  msg.feedback === 'not-helpful'
                                    ? 'btn-danger'
                                    : 'btn-outline-secondary'
                                }`}
                                onClick={() =>
                                  handleFeedback(msg.id, 'not-helpful')
                                }
                                style={{
                                  fontSize: '0.75rem',
                                  padding: '0.3rem 0.6rem',
                                }}
                              >
                                <ThumbsDown size={12} className="me-1" />
                                Not Helpful
                              </motion.button>
                            </div>
                          )}
                        </motion.div>
                      ))}
                      {isTyping && (
                        <div className="d-flex justify-content-start">
                          <div
                            className="rounded-4 px-4 py-2 bg-white border"
                            style={{ maxWidth: '85%' }}
                          >
                            <div className="d-flex align-items-center gap-2">
                              <div
                                className="rounded-circle bg-secondary"
                                style={{
                                  width: '8px',
                                  height: '8px',
                                  animation:
                                    'bounce 1.4s infinite ease-in-out both',
                                  animationDelay: '-0.32s',
                                }}
                              />
                              <div
                                className="rounded-circle bg-secondary"
                                style={{
                                  width: '8px',
                                  height: '8px',
                                  animation:
                                    'bounce 1.4s infinite ease-in-out both',
                                  animationDelay: '-0.16s',
                                }}
                              />
                              <div
                                className="rounded-circle bg-secondary"
                                style={{
                                  width: '8px',
                                  height: '8px',
                                  animation:
                                    'bounce 1.4s infinite ease-in-out both',
                                }}
                              />
                            </div>
                            <span className="text-muted small ms-2">
                              AI is typing...
                            </span>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-top">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ask me anything about your health..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === 'Enter' && handleSendMessage()
                        }
                        style={{ borderRadius: '8px 0 0 8px' }}
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn text-white"
                        onClick={handleSendMessage}
                        style={{
                          background:
                            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          borderRadius: '0 8px 8px 0',
                        }}
                      >
                        <Send size={18} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scaleY(0.5);
            opacity: 0.5;
          }
          40% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatbotPage;
