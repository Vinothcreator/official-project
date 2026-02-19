import React from 'react';
import { Calendar, Clock, User, MapPin, Phone, Trash2, Edit2 } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  type: string;
  status: string;
  notes?: string;
}

interface AppointmentsSidebarProps {
  appointments: Appointment[];
  onCancelAppointment?: (id: string) => void;
  onRescheduleAppointment?: (id: string) => void;
}

const AppointmentsSidebar: React.FC<AppointmentsSidebarProps> = ({
  appointments,
  onCancelAppointment,
  onRescheduleAppointment,
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return '#28a745';
      case 'pending':
        return '#ffc107';
      case 'cancelled':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return '#d4edda';
      case 'pending':
        return '#fff3cd';
      case 'cancelled':
        return '#f8d7da';
      default:
        return '#e2e3e5';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '12px',
        border: '1px solid #e0e0e0',
        overflow: 'hidden',
        height: 'fit-content',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
          color: 'white',
          padding: '16px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <Calendar size={20} />
        My Appointments
      </div>

      {/* Content */}
      <div style={{ padding: '0', maxHeight: 'calc(100vh - 400px)', overflowY: 'auto' }}>
        {appointments && appointments.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {appointments.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  borderBottom: index < appointments.length - 1 ? '1px solid #f0f0f0' : 'none',
                  padding: '16px',
                }}
                className="appointment-card"
              >
                {/* Status Badge */}
                <div style={{ marginBottom: '12px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: getStatusColor(appointment.status),
                      background: getStatusBg(appointment.status),
                    }}
                  >
                    {appointment.status}
                  </span>
                </div>

                {/* Doctor Info */}
                <div style={{ marginBottom: '12px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '4px',
                    }}
                  >
                    <User size={16} color="#007bff" />
                    <div>
                      <h6 style={{ margin: 0, fontSize: '13px', fontWeight: 600 }}>
                        {appointment.doctor}
                      </h6>
                      <small style={{ color: '#666' }}>{appointment.specialty}</small>
                    </div>
                  </div>
                </div>

                {/* Appointment Type */}
                <div
                  style={{
                    background: '#f8f9fa',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    marginBottom: '12px',
                    fontSize: '12px',
                    fontWeight: 500,
                  }}
                >
                  📋 {appointment.type}
                </div>

                {/* Date & Time */}
                <div style={{ marginBottom: '12px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '6px',
                      fontSize: '13px',
                    }}
                  >
                    <Calendar size={14} color="#6f42c1" />
                    <span>{formatDate(appointment.date)}</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                    }}
                  >
                    <Clock size={14} color="#fd7e14" />
                    <span>{appointment.time}</span>
                  </div>
                </div>

                {/* Notes */}
                {appointment.notes && (
                  <div
                    style={{
                      background: '#f0f7ff',
                      padding: '10px',
                      borderRadius: '6px',
                      marginBottom: '12px',
                      fontSize: '12px',
                      color: '#444',
                      borderLeft: '3px solid #007bff',
                    }}
                  >
                    <strong style={{ color: '#007bff' }}>Notes:</strong>
                    <p style={{ margin: '4px 0 0 0' }}>{appointment.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      onRescheduleAppointment?.(appointment.id);
                      toast.info('Reschedule feature coming soon');
                    }}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '6px',
                      border: '1px solid #007bff',
                      background: 'transparent',
                      color: '#007bff',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#007bff';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#007bff';
                    }}
                  >
                    <Edit2 size={14} /> Reschedule
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      onCancelAppointment?.(appointment.id);
                      toast.success('Appointment cancelled');
                    }}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '6px',
                      border: '1px solid #dc3545',
                      background: 'transparent',
                      color: '#dc3545',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#dc3545';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#dc3545';
                    }}
                  >
                    <Trash2 size={14} /> Cancel
                  </motion.button>
                </div>

                {/* Appointment ID */}
                <small style={{ display: 'block', color: '#999', marginTop: '8px' }}>
                  ID: {appointment.id}
                </small>
              </motion.div>
            ))}
          </div>
        ) : (
          <div
            style={{
              padding: '32px 16px',
              textAlign: 'center',
              color: '#999',
            }}
          >
            <Calendar size={32} style={{ marginBottom: '12px', opacity: 0.5 }} />
            <p style={{ margin: 0, fontSize: '13px' }}>No appointments scheduled</p>
            <small style={{ color: '#bbb' }}>Book one to get started</small>
          </div>
        )}
      </div>

      {/* Footer Info */}
      {appointments && appointments.length > 0 && (
        <div
          style={{
            borderTop: '1px solid #f0f0f0',
            padding: '12px 16px',
            background: '#f8f9fa',
            fontSize: '12px',
            color: '#666',
          }}
        >
          <strong>{appointments.length}</strong> upcoming appointment
          {appointments.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
};

export default AppointmentsSidebar;
