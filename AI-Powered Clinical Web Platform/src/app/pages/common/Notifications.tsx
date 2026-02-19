import React, { useState } from 'react';
import { Bell, Check, Trash2, Calendar, FileText, MessageSquare, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

const Notifications = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'appointment',
      icon: Calendar,
      title: 'Upcoming Appointment',
      message: 'You have an appointment with Dr. Sarah Johnson tomorrow at 10:30 AM',
      time: '5 minutes ago',
      unread: true,
      color: '#667eea',
    },
    {
      id: 2,
      type: 'report',
      icon: FileText,
      title: 'Lab Report Ready',
      message: 'Your blood test results are now available for download',
      time: '1 hour ago',
      unread: true,
      color: '#10b981',
    },
    {
      id: 3,
      type: 'message',
      icon: MessageSquare,
      title: 'New Message',
      message: 'Dr. Michael Brown has sent you a message',
      time: '2 hours ago',
      unread: false,
      color: '#f59e0b',
    },
    {
      id: 4,
      type: 'alert',
      icon: AlertCircle,
      title: 'Prescription Refill Reminder',
      message: 'Your prescription for Metformin is due for refill in 3 days',
      time: '1 day ago',
      unread: false,
      color: '#ef4444',
    },
    {
      id: 5,
      type: 'appointment',
      icon: Calendar,
      title: 'Appointment Confirmed',
      message: 'Your appointment on Feb 22, 2026 has been confirmed',
      time: '2 days ago',
      unread: false,
      color: '#667eea',
    },
  ];

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : filter === 'unread'
    ? notifications.filter(n => n.unread)
    : notifications.filter(n => n.type === filter);

  const markAllAsRead = () => {
    // Implementation
  };

  const deleteAll = () => {
    // Implementation
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
                Notifications
              </h2>
              <p className="text-muted">Stay updated with your healthcare alerts</p>
            </div>

            <div className="row g-4">
              {/* Filters */}
              <div className="col-lg-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-3">
                    <h6 className="mb-3">Filter</h6>
                    <div className="d-flex flex-column gap-2">
                      <button
                        className={`btn text-start ${filter === 'all' ? 'btn-primary' : 'btn-light'}`}
                        onClick={() => setFilter('all')}
                      >
                        All Notifications
                      </button>
                      <button
                        className={`btn text-start ${filter === 'unread' ? 'btn-primary' : 'btn-light'}`}
                        onClick={() => setFilter('unread')}
                      >
                        Unread
                      </button>
                      <button
                        className={`btn text-start ${filter === 'appointment' ? 'btn-primary' : 'btn-light'}`}
                        onClick={() => setFilter('appointment')}
                      >
                        <Calendar size={16} className="me-2" />
                        Appointments
                      </button>
                      <button
                        className={`btn text-start ${filter === 'report' ? 'btn-primary' : 'btn-light'}`}
                        onClick={() => setFilter('report')}
                      >
                        <FileText size={16} className="me-2" />
                        Reports
                      </button>
                      <button
                        className={`btn text-start ${filter === 'message' ? 'btn-primary' : 'btn-light'}`}
                        onClick={() => setFilter('message')}
                      >
                        <MessageSquare size={16} className="me-2" />
                        Messages
                      </button>
                      <button
                        className={`btn text-start ${filter === 'alert' ? 'btn-primary' : 'btn-light'}`}
                        onClick={() => setFilter('alert')}
                      >
                        <AlertCircle size={16} className="me-2" />
                        Alerts
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card border-0 shadow-sm mt-3">
                  <div className="card-body p-3">
                    <h6 className="mb-3">Actions</h6>
                    <button className="btn btn-outline-primary w-100 mb-2" onClick={markAllAsRead}>
                      <Check size={16} className="me-2" />
                      Mark all as read
                    </button>
                    <button className="btn btn-outline-danger w-100" onClick={deleteAll}>
                      <Trash2 size={16} className="me-2" />
                      Clear all
                    </button>
                  </div>
                </div>
              </div>

              {/* Notifications List */}
              <div className="col-lg-9">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-0">
                    {filteredNotifications.length > 0 ? (
                      filteredNotifications.map((notification, idx) => (
                        <motion.div
                          key={notification.id}
                          className={`p-4 border-bottom ${notification.unread ? 'bg-light' : ''}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="d-flex gap-3">
                            <div 
                              className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                              style={{
                                width: '48px',
                                height: '48px',
                                backgroundColor: `${notification.color}20`,
                              }}
                            >
                              <notification.icon size={20} style={{ color: notification.color }} />
                            </div>
                            <div className="flex-grow-1">
                              <div className="d-flex justify-content-between align-items-start mb-1">
                                <h6 className="mb-0">{notification.title}</h6>
                                <small className="text-muted">{notification.time}</small>
                              </div>
                              <p className="text-muted mb-2">{notification.message}</p>
                              <div className="d-flex gap-2">
                                <button className="btn btn-sm btn-outline-primary">View</button>
                                <button className="btn btn-sm btn-outline-secondary">
                                  <Check size={14} />
                                </button>
                                <button className="btn btn-sm btn-outline-danger">
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="p-5 text-center text-muted">
                        <Bell size={48} className="mb-3 opacity-50" />
                        <p>No notifications to display</p>
                      </div>
                    )}
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

export default Notifications;
