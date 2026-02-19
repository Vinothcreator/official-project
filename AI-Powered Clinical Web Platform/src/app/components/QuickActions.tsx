import React, { useState } from 'react';
import {
  Plus,
  Upload,
  Eye,
  AlertCircle,
  Calendar,
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import AppointmentBookingModal from './AppointmentBookingModal';

interface QuickActionsProps {
  onAppointmentBooked?: (appointment: any) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onAppointmentBooked }) => {
  const [showBookingModal, setShowBookingModal] = useState(false);

  const quickActions = [
    {
      id: 'add-patient',
      title: 'Add Patient',
      icon: Plus,
      color: '#007bff',
      bgColor: '#e7f1ff',
      description: 'Register a new patient',
    },
    {
      id: 'upload-report',
      title: 'Upload Report',
      icon: Upload,
      color: '#28a745',
      bgColor: '#e8f5e9',
      description: 'Upload medical reports',
    },
    {
      id: 'view-case',
      title: 'View Case',
      icon: Eye,
      color: '#6f42c1',
      bgColor: '#f3e5f5',
      description: 'Review case details',
    },
    {
      id: 'emergency-case',
      title: 'Emergency Case',
      icon: AlertCircle,
      color: '#dc3545',
      bgColor: '#ffebee',
      description: 'Create emergency case',
    },
    {
      id: 'book-appointment',
      title: 'Book Appointment',
      icon: Calendar,
      color: '#fd7e14',
      bgColor: '#fff3e0',
      description: 'Schedule appointment',
    },
  ];

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'add-patient':
        toast.info('Add Patient feature coming soon');
        break;
      case 'upload-report':
        toast.info('Upload Report feature coming soon');
        break;
      case 'view-case':
        toast.info('View Case feature coming soon');
        break;
      case 'emergency-case':
        toast.error('Emergency! Immediate assistance needed');
        break;
      case 'book-appointment':
        setShowBookingModal(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="container-fluid mb-4">
        <div className="mb-3">
          <h5 className="mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: '#1a1a1a' }}>
            Quick Actions
          </h5>
        </div>

        <div className="row g-2">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.id}
                className="col-12 col-sm-6 col-md-4 col-lg-2.4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <button
                  onClick={() => handleQuickAction(action.id)}
                  style={{
                    background: action.bgColor,
                    border: `2px solid ${action.color}`,
                    borderRadius: '12px',
                    padding: '16px 12px',
                    width: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  className="quick-action-btn"
                  onMouseEnter={(e) => {
                    const btn = e.currentTarget;
                    btn.style.background = action.color;
                    btn.style.boxShadow = `0 8px 16px ${action.color}33`;
                    const icon = btn.querySelector('svg');
                    if (icon) {
                      icon.style.color = 'white';
                    }
                    const title = btn.querySelector('.action-title');
                    if (title) {
                      (title as HTMLElement).style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    const btn = e.currentTarget;
                    btn.style.background = action.bgColor;
                    btn.style.boxShadow = 'none';
                    const icon = btn.querySelector('svg');
                    if (icon) {
                      icon.style.color = action.color;
                    }
                    const title = btn.querySelector('.action-title');
                    if (title) {
                      (title as HTMLElement).style.color = '#1a1a1a';
                    }
                  }}
                >
                  <Icon
                    size={24}
                    style={{
                      color: action.color,
                      marginBottom: '8px',
                      transition: 'color 0.3s ease',
                    }}
                  />
                  <div
                    className="action-title"
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#1a1a1a',
                      marginBottom: '4px',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {action.title}
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: '#666',
                      lineHeight: '1.2',
                    }}
                  >
                    {action.description}
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AppointmentBookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        onBookingComplete={(appointment: any) => {
          onAppointmentBooked?.(appointment);
        }}
      />
    </>
  );
};

export default QuickActions;
