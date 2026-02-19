import React, { useState, useRef, useEffect } from 'react';
import { Heart, FileText, Calendar, Activity, MessageSquare, Send, Bot, ThumbsUp, ThumbsDown, X, Download, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import QuickActions from '../../components/QuickActions';
import AppointmentsSidebar from '../../components/AppointmentsSidebar';
import { toast } from 'sonner';

const PatientDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hello! I\'m your AI healthcare assistant. How can I help you today?', timestamp: new Date().toISOString(), feedback: null },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [appointments, setAppointments] = useState([
    { id: 'A-1001', doctor: 'Dr. Sarah Johnson', specialty: 'Cardiology', date: '2026-02-22', time: '10:30 AM', type: 'Follow-up Consultation', status: 'Confirmed' },
    { id: 'A-1002', doctor: 'Dr. Michael Brown', specialty: 'Orthopedics', date: '2026-03-05', time: '02:00 PM', type: 'General Consultation', status: 'Pending' },
  ]);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const healthSummary = {
    heartRate: '72 bpm',
    bloodPressure: '120/80',
    temperature: '98.6°F',
    oxygenLevel: '98%',
  };

  const recentReports = [
    {
      id: 1,
      name: 'Blood Test Report',
      date: '2026-02-15',
      doctor: 'Dr. Sarah Johnson',
      status: 'Normal',
      summary: 'Hemoglobin, WBC and platelets within normal range.',
      content: `Hemoglobin: 14.2 g/dL\nWBC: 6.4 x10^3/µL\nPlatelets: 250 x10^3/µL\nCholesterol: 180 mg/dL\nNotes: No abnormalities detected.`,
    },
    {
      id: 2,
      name: 'X-Ray Chest',
      date: '2026-02-10',
      doctor: 'Dr. Michael Brown',
      status: 'Clear',
      summary: 'No signs of consolidation or pleural effusion.',
      content: `Findings: Lungs clear. Cardiomediastinal silhouette within normal limits.\nImpression: No acute cardiopulmonary disease.`,
    },
    {
      id: 3,
      name: 'ECG Report',
      date: '2026-02-05',
      doctor: 'Dr. Sarah Johnson',
      status: 'Normal',
      summary: 'Normal sinus rhythm, no ischemic changes.',
      content: `Rate: 72 bpm\nRhythm: Normal sinus rhythm\nIntervals: PR 160 ms, QRS 90 ms\nImpression: Normal ECG.`,
    },
  ];

  const handleDownloadReport = (report: any) => {
    if (!report) return toast.error('No report selected');
    const content = report.content || `Report: ${report.name}\nDate: ${report.date}\nDoctor: ${report.doctor}\nStatus: ${report.status}\n\nSummary:\n${report.summary || 'No summary available.'}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safeName = report.name.replace(/[^a-z0-9_-]/gi, '_');
    a.download = `${safeName}_${report.date}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast.success('Download started!');
  };

  const upcomingAppointment = {
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    date: 'Feb 22, 2026',
    time: '10:30 AM',
    type: 'Follow-up Consultation',
  };

  const quickQuestions = [
    'Check doctor availability',
    'View my lab reports',
    'What are clinic hours?',
    'When is my next appointment?',
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = { 
        id: messages.length + 1, 
        type: 'user', 
        text: message,
        timestamp: new Date().toISOString(),
        feedback: null
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
          text: 'I understand your query. Let me help you with that. Your next appointment is scheduled with Dr. Sarah Johnson on February 22, 2026 at 10:30 AM.',
          timestamp: new Date().toISOString(),
          feedback: null
        };
        setMessages((prev) => [...prev, botResponse]);
      }, 1500);
    }
  };

  const handleQuickQuestion = (question: string) => {
    const newMessage = { 
      id: messages.length + 1, 
      type: 'user', 
      text: question,
      timestamp: new Date().toISOString(),
      feedback: null
    };
    setMessages([...messages, newMessage]);

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let response = '';
      if (question.includes('availability')) {
        response = 'Dr. Sarah Johnson is available on Feb 22, 23, and 25. Would you like to book an appointment?';
      } else if (question.includes('reports')) {
        response = 'You have 3 recent lab reports available. All results are within normal range.';
      } else if (question.includes('hours')) {
        response = 'Our clinic is open Monday-Friday: 8:00 AM - 6:00 PM, Saturday: 9:00 AM - 2:00 PM. Closed on Sundays.';
      } else {
        response = 'Your next appointment is on February 22, 2026 at 10:30 AM with Dr. Sarah Johnson.';
      }
      
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        text: response,
        timestamp: new Date().toISOString(),
        feedback: null
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1500);
  };

  const handleFeedback = (messageId: number, feedbackType: 'helpful' | 'not-helpful') => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, feedback: feedbackType } : msg
    ));
    toast.success(`Thank you for your feedback!`);
  };

  const handleAppointmentBooked = (appointment: any) => {
    setAppointments([...appointments, appointment]);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(appointments.filter(a => a.id !== id));
  };

  const handleRescheduleAppointment = (id: string) => {
    toast.info('Reschedule feature coming soon');
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-vh-100" style={{ background: '#f8f9fa', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="d-lg-flex">
        <div className="flex-grow-1">
          <Navbar onMenuClick={() => setSidebarOpen(true)} />
          
          <div className="container-fluid p-4">
            {/* Page Header */}
            <div className="mb-4">
              <h2 className="mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                My Health Dashboard
              </h2>
              <p className="text-muted">Track your health and manage your appointments.</p>
            </div>

            {/* Quick Actions Section */}
            <QuickActions onAppointmentBooked={handleAppointmentBooked} />

            <div className="row g-4">
              {/* Health Summary Card */}
              <div className="col-lg-8">
                <motion.div
                  className="card border-0 shadow-sm mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                  }}
                >
                  <div className="card-body p-4">
                    <h5 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Health Summary
                    </h5>
                    <div className="row g-3">
                      {[
                        { icon: Heart, label: 'Heart Rate', value: healthSummary.heartRate },
                        { icon: Activity, label: 'Blood Pressure', value: healthSummary.bloodPressure },
                        { icon: Activity, label: 'Temperature', value: healthSummary.temperature },
                        { icon: Heart, label: 'Oxygen Level', value: healthSummary.oxygenLevel },
                      ].map((item, idx) => (
                        <div key={idx} className="col-6 col-md-3">
                          <div className="d-flex flex-column align-items-center text-center p-3 rounded-3"
                            style={{ background: 'rgba(255, 255, 255, 0.2)' }}>
                            <item.icon size={32} className="mb-2" />
                            <h4 className="mb-1">{item.value}</h4>
                            <p className="small mb-0 opacity-75">{item.label}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Recent Reports */}
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="mb-0" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Recent Reports
                      </h5>
                      <button className="btn btn-sm btn-outline-primary">View All</button>
                    </div>

                    <div className="d-flex flex-column gap-3">
                      {recentReports.map((report, idx) => (
                        <motion.div
                          key={idx}
                          className="d-flex align-items-center justify-content-between p-3 rounded-3 border"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          style={{ background: '#f8f9fa' }}
                        >
                          <div className="d-flex align-items-center gap-3">
                            <div className="rounded-3 d-flex align-items-center justify-content-center"
                              style={{
                                width: '45px',
                                height: '45px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              }}>
                              <FileText size={20} className="text-white" />
                            </div>
                            <div>
                              <h6 className="mb-1">{report.name}</h6>
                              <p className="text-muted small mb-0">
                                {report.date} • {report.doctor}
                              </p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-success">{report.status}</span>
                            <button 
                              className="btn btn-sm btn-light"
                              onClick={() => {
                                setSelectedReport(report);
                                setShowReportModal(true);
                              }}
                            >
                              View
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointments Sidebar */}
              <div className="col-lg-4">
                <AppointmentsSidebar
                  appointments={appointments}
                  onCancelAppointment={handleCancelAppointment}
                  onRescheduleAppointment={handleRescheduleAppointment}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chatbot Button */}
      {!chatOpen && (
        <motion.button
          className="position-fixed rounded-circle border-0 shadow-lg d-flex align-items-center justify-content-center"
          style={{
            bottom: '30px',
            right: '30px',
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            zIndex: 1000,
          }}
          onClick={() => setChatOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageSquare size={28} className="text-white" />
        </motion.button>
      )}

      {/* Chatbot Window */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            className="position-fixed bg-white rounded-4 shadow-lg d-flex flex-column"
            style={{
              bottom: '30px',
              right: '30px',
              width: '380px',
              height: '550px',
              zIndex: 1000,
              maxWidth: 'calc(100vw - 40px)',
            }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            {/* Chat Header */}
            <div className="p-3 border-bottom d-flex align-items-center justify-content-between"
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <div className="d-flex align-items-center gap-2 text-white">
                <Bot size={24} />
                <div>
                  <h6 className="mb-0">AI Healthcare Assistant</h6>
                  <small className="opacity-75">Online</small>
                </div>
              </div>
              <button
                className="btn btn-sm btn-link text-white p-0"
                onClick={() => setChatOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Quick Questions */}
            <div className="p-3 border-bottom bg-light">
              <p className="small text-muted mb-2">Quick questions:</p>
              <div className="d-flex flex-wrap gap-2">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleQuickQuestion(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow-1 overflow-auto p-3" style={{ background: '#f8f9fa' }}>
              <div className="d-flex flex-column gap-3">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    className={`d-flex flex-column ${msg.type === 'user' ? 'align-items-end' : 'align-items-start'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div
                      className={`rounded-3 px-3 py-2 ${
                        msg.type === 'user'
                          ? 'text-white'
                          : 'bg-white'
                      }`}
                      style={{
                        maxWidth: '80%',
                        background: msg.type === 'user' 
                          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                          : 'white',
                      }}
                    >
                      <div>{msg.text}</div>
                      <small className={`d-block mt-1 ${msg.type === 'user' ? 'text-white opacity-75' : 'text-muted'}`} style={{ fontSize: '0.7rem' }}>
                        {formatTime(msg.timestamp)}
                      </small>
                    </div>
                    {msg.type === 'bot' && (
                      <div className="d-flex gap-2 mt-1">
                        <button
                          className={`btn btn-sm ${msg.feedback === 'helpful' ? 'btn-success' : 'btn-outline-secondary'}`}
                          onClick={() => handleFeedback(msg.id, 'helpful')}
                          style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
                        >
                          <ThumbsUp size={12} className="me-1" />
                          Helpful
                        </button>
                        <button
                          className={`btn btn-sm ${msg.feedback === 'not-helpful' ? 'btn-danger' : 'btn-outline-secondary'}`}
                          onClick={() => handleFeedback(msg.id, 'not-helpful')}
                          style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
                        >
                          <ThumbsDown size={12} className="me-1" />
                          Not Helpful
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="d-flex justify-content-start">
                    <div
                      className="rounded-3 px-3 py-2 bg-white d-flex align-items-center gap-2"
                      style={{ maxWidth: '80%' }}
                    >
                      <div className="d-flex gap-1">
                        <div className="rounded-circle bg-secondary" style={{ width: '6px', height: '6px', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '-0.32s' }} />
                        <div className="rounded-circle bg-secondary" style={{ width: '6px', height: '6px', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '-0.16s' }} />
                        <div className="rounded-circle bg-secondary" style={{ width: '6px', height: '6px', animation: 'bounce 1.4s infinite ease-in-out both' }} />
                      </div>
                      <span className="text-muted small">AI is typing...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-3 border-top">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  className="btn text-white"
                  onClick={handleSendMessage}
                  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Report View Modal */}
      <AnimatePresence>
        {showReportModal && selectedReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="d-flex align-items-center justify-content-center"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 2000,
            }}
            onClick={() => setShowReportModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                maxWidth: '600px',
                width: '90%',
                margin: '0 auto',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                {/* Header */}
                <div
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '20px',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <h5 className="mb-1">View Report</h5>
                    <small>Report Details</small>
                  </div>
                  <button
                    onClick={() => setShowReportModal(false)}
                    className="btn btn-link text-white p-0"
                    style={{ fontSize: '20px' }}
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Body */}
                <div className="modal-body p-4">
                  {/* Report Icon and Name */}
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: '60px',
                        height: '60px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      }}
                    >
                      <FileText size={28} className="text-white" />
                    </div>
                    <div>
                      <h5 className="mb-1" style={{ fontWeight: 600 }}>{selectedReport.name}</h5>
                      <span className="badge bg-success">{selectedReport.status}</span>
                    </div>
                  </div>

                  {/* Report Details Grid */}
                  <div className="row mb-4">
                    <div className="col-6 mb-3">
                      <small style={{ color: '#666', fontWeight: 500 }}>Report Date</small>
                      <div style={{ fontWeight: 600, color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={16} />
                        {selectedReport.date}
                      </div>
                    </div>
                    <div className="col-6 mb-3">
                      <small style={{ color: '#666', fontWeight: 500 }}>Report ID</small>
                      <div style={{ fontWeight: 600, color: '#1a1a1a' }}>
                        RPT-{String(selectedReport.id).padStart(3, '0')}
                      </div>
                    </div>
                    <div className="col-6 mb-3">
                      <small style={{ color: '#666', fontWeight: 500 }}>Physician</small>
                      <div style={{ fontWeight: 600, color: '#1a1a1a' }}>
                        {selectedReport.doctor}
                      </div>
                    </div>
                    <div className="col-6 mb-3">
                      <small style={{ color: '#666', fontWeight: 500 }}>Report Type</small>
                      <div style={{ fontWeight: 600, color: '#1a1a1a' }}>
                        Laboratory Test
                      </div>
                    </div>
                  </div>

                  {/* Report Description */}
                  <div className="mb-4">
                    <small style={{ color: '#666', fontWeight: 500, display: 'block', marginBottom: '8px' }}>
                      Description
                    </small>
                    <div
                      style={{
                        background: '#f8f9fa',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        padding: '12px',
                        fontSize: '14px',
                        color: '#1a1a1a',
                        lineHeight: '1.5',
                      }}
                    >
                      This is a {selectedReport.name.toLowerCase()} conducted on {selectedReport.date} by {selectedReport.doctor}. 
                      The results show {selectedReport.status.toLowerCase()} readings.
                    </div>
                  </div>

                  {/* Download Button */}
                  <div className="d-grid">
                    <button 
                      className="btn text-white d-flex align-items-center justify-content-center gap-2"
                      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '12px' }}
                      onClick={() => handleDownloadReport(selectedReport)}
                    >
                      <Download size={18} />
                      Download Report
                    </button>
                  </div>
                </div>

                {/* Footer */}
                <div
                  className="modal-footer border-top"
                  style={{ padding: '16px 20px', background: '#f8f9fa' }}
                >
                  <button 
                    onClick={() => setShowReportModal(false)} 
                    className="btn btn-secondary"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

export default PatientDashboard;