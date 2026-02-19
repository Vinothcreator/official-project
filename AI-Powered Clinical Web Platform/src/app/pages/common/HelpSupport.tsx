import React, { useState } from 'react';
import { HelpCircle, MessageSquare, Phone, Mail, FileText, Search } from 'lucide-react';
import { motion } from 'motion/react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { toast } from 'sonner';

const HelpSupport = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [supportMessage, setSupportMessage] = useState('');

  const faqs = [
    {
      question: 'How do I schedule an appointment?',
      answer: 'You can schedule an appointment by clicking on the "Book Appointment" button in your dashboard, selecting your preferred doctor, date, and time slot.',
    },
    {
      question: 'How can I access my lab reports?',
      answer: 'Navigate to "My Reports" section from the sidebar menu. All your lab reports will be available for viewing and downloading.',
    },
    {
      question: 'Can I reschedule or cancel an appointment?',
      answer: 'Yes, you can reschedule or cancel appointments up to 24 hours before the scheduled time from the Appointments page.',
    },
    {
      question: 'How do I update my personal information?',
      answer: 'Go to Profile Settings and click on "Edit Profile" to update your personal information including contact details and medical history.',
    },
    {
      question: 'Is my health data secure?',
      answer: 'Yes, we use industry-standard encryption and comply with HIPAA regulations to ensure your health data is completely secure and private.',
    },
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone Support',
      info: '+1 (800) 123-4567',
      description: 'Mon-Fri, 8:00 AM - 6:00 PM EST',
      color: '#667eea',
    },
    {
      icon: Mail,
      title: 'Email Support',
      info: 'support@healthcareai.com',
      description: 'Response within 24 hours',
      color: '#10b981',
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      info: 'Chat with us',
      description: 'Available 24/7',
      color: '#f59e0b',
    },
  ];

  const handleSubmitTicket = () => {
    if (supportMessage.trim()) {
      toast.success('Support ticket submitted successfully! We\'ll get back to you soon.');
      setSupportMessage('');
    }
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                Help & Support
              </h2>
              <p className="text-muted">We're here to help you with any questions or issues</p>
            </div>

            {/* Search Bar */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-white border-end-0">
                    <Search size={20} className="text-muted" />
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0 ps-0"
                    placeholder="Search for help articles, FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row g-4">
              {/* Contact Methods */}
              <div className="col-lg-8">
                <div className="row g-3 mb-4">
                  {contactMethods.map((method, idx) => (
                    <div key={idx} className="col-md-4">
                      <motion.div
                        className="card border-0 shadow-sm h-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="card-body text-center p-4">
                          <div
                            className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                            style={{
                              width: '60px',
                              height: '60px',
                              backgroundColor: `${method.color}20`,
                            }}
                          >
                            <method.icon size={28} style={{ color: method.color }} />
                          </div>
                          <h6 className="mb-2">{method.title}</h6>
                          <p className="text-primary mb-1">{method.info}</p>
                          <p className="text-muted small mb-0">{method.description}</p>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>

                {/* FAQs */}
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <h5 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Frequently Asked Questions
                    </h5>

                    <div className="accordion" id="faqAccordion">
                      {filteredFaqs.map((faq, idx) => (
                        <div key={idx} className="accordion-item border-0 mb-2">
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button collapsed bg-light"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#faq${idx}`}
                            >
                              <HelpCircle size={18} className="me-2 text-primary" />
                              {faq.question}
                            </button>
                          </h2>
                          <div
                            id={`faq${idx}`}
                            className="accordion-collapse collapse"
                            data-bs-parent="#faqAccordion"
                          >
                            <div className="accordion-body bg-white">
                              {faq.answer}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {filteredFaqs.length === 0 && (
                      <div className="text-center py-4 text-muted">
                        <p>No FAQs found matching your search.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Ticket */}
              <div className="col-lg-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <h5 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Submit a Support Ticket
                    </h5>

                    <div className="mb-3">
                      <label className="form-label">Subject</label>
                      <select className="form-select">
                        <option>Technical Issue</option>
                        <option>Billing Question</option>
                        <option>Appointment Help</option>
                        <option>Medical Records</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Priority</label>
                      <select className="form-select">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Urgent</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Message</label>
                      <textarea
                        className="form-control"
                        rows={6}
                        placeholder="Describe your issue in detail..."
                        value={supportMessage}
                        onChange={(e) => setSupportMessage(e.target.value)}
                      />
                    </div>

                    <button
                      className="btn btn-primary w-100"
                      onClick={handleSubmitTicket}
                    >
                      Submit Ticket
                    </button>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="card border-0 shadow-sm mt-3">
                  <div className="card-body">
                    <h6 className="mb-3">Quick Links</h6>
                    <div className="d-flex flex-column gap-2">
                      <a href="#" className="btn btn-outline-primary text-start">
                        <FileText size={16} className="me-2" />
                        Documentation
                      </a>
                      <a href="#" className="btn btn-outline-primary text-start">
                        <HelpCircle size={16} className="me-2" />
                        User Guide
                      </a>
                      <a href="#" className="btn btn-outline-primary text-start">
                        <MessageSquare size={16} className="me-2" />
                        Community Forum
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
