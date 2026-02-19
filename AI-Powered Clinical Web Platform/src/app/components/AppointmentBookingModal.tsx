import React, { useState } from 'react';
import { ChevronLeft, Clock, MapPin, Phone, Star, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  availability: string[];
  availableSlots: string[];
  phone: string;
  location: string;
  image?: string;
}

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingComplete?: (appointment: any) => void;
}

const AppointmentBookingModal: React.FC<AppointmentBookingModalProps> = ({
  isOpen,
  onClose,
  onBookingComplete,
}) => {
  const [step, setStep] = useState(1);
  const [consultationType, setConsultationType] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');

  const consultationTypes = [
    { id: 'general', label: 'General', icon: '👨‍⚕️', color: '#007bff' },
    { id: 'emergency', label: 'Emergency', icon: '🚨', color: '#dc3545' },
    { id: 'followup', label: 'Follow-up', icon: '📋', color: '#28a745' },
    { id: 'labreview', label: 'Lab Review', icon: '🔬', color: '#6f42c1' },
    { id: 'surgery', label: 'Surgery', icon: '🏥', color: '#fd7e14' },
    { id: 'other', label: 'Other', icon: '❓', color: '#17a2b8' },
  ];

  const doctors: Doctor[] = [
    {
      id: 'doc-001',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      rating: 4.9,
      availability: ['Available', 'Available', 'Available'],
      availableSlots: ['09:00 AM', '10:30 AM', '02:00 PM', '03:30 PM'],
      phone: '+1-555-0101',
      location: 'Building A, Floor 2',
    },
    {
      id: 'doc-002',
      name: 'Dr. Michael Brown',
      specialty: 'Orthopedic Surgeon',
      rating: 4.8,
      availability: ['Available', 'Available', 'Limited'],
      availableSlots: ['09:30 AM', '11:00 AM', '01:30 PM'],
      phone: '+1-555-0102',
      location: 'Building B, Floor 3',
    },
    {
      id: 'doc-003',
      name: 'Dr. Emily Davis',
      specialty: 'General Practitioner',
      rating: 4.7,
      availability: ['Available', 'Available', 'Available'],
      availableSlots: ['08:00 AM', '10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM'],
      phone: '+1-555-0103',
      location: 'Building A, Floor 1',
    },
    {
      id: 'doc-004',
      name: 'Dr. James Wilson',
      specialty: 'Neurologist',
      rating: 4.9,
      availability: ['Limited', 'Available', 'Available'],
      availableSlots: ['09:00 AM', '11:30 AM', '03:00 PM'],
      phone: '+1-555-0104',
      location: 'Building C, Floor 4',
    },
  ];

  // Generate next 7 days
  const getNextDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dateStr = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      dates.push({
        value: date.toISOString().split('T')[0],
        label: dayName,
        date: dateStr,
      });
    }
    return dates;
  };

  const getClinicHours = () => {
    return [
      '08:00 AM',
      '08:30 AM',
      '09:00 AM',
      '09:30 AM',
      '10:00 AM',
      '10:30 AM',
      '11:00 AM',
      '11:30 AM',
      '12:00 PM',
      '01:00 PM',
      '01:30 PM',
      '02:00 PM',
      '02:30 PM',
      '03:00 PM',
      '03:30 PM',
      '04:00 PM',
      '04:30 PM',
      '05:00 PM',
    ];
  };

  const handleConfirmBooking = () => {
    if (!consultationType || !selectedDoctor || !selectedDate || !selectedTime) {
      toast.error('Please fill all required fields');
      return;
    }

    const doctor = doctors.find((d) => d.id === selectedDoctor);
    const consultation = consultationTypes.find((c) => c.id === consultationType);

    const appointment = {
      id: `APT-${Date.now()}`,
      doctor: doctor?.name,
      specialty: doctor?.specialty,
      date: selectedDate,
      time: selectedTime,
      type: consultation?.label,
      notes,
      status: 'Confirmed',
      bookingDate: new Date().toISOString(),
    };

    toast.success('Appointment booked successfully!');
    onBookingComplete?.(appointment);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setStep(1);
    setConsultationType('');
    setSelectedDoctor('');
    setSelectedDate('');
    setSelectedTime('');
    setNotes('');
  };

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal d-flex align-items-center justify-content-center"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1050,
            display: 'flex',
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="modal-dialog modal-dialog-centered"
            style={{
              maxWidth: step === 1 ? '600px' : '700px',
              width: '90%',
              margin: '0 auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 shadow-lg">
              {/* Header */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
                  padding: '20px',
                  borderRadius: '12px 12px 0 0',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <h5 className="mb-1">Book an Appointment</h5>
                  <small>Step {step} of 4</small>
                </div>
                <button
                  onClick={onClose}
                  className="btn btn-link text-white p-0"
                  style={{ fontSize: '20px' }}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="modal-body p-4" style={{ minHeight: '400px' }}>
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="progress" style={{ height: '4px' }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${(step / 4) * 100}%`,
                        background: 'linear-gradient(90deg, #007bff 0%, #0056b3 100%)',
                      }}
                    />
                  </div>
                </div>

                {/* Step 1: Consultation Type */}
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h6 className="mb-3" style={{ fontWeight: 600 }}>
                        What kind of emergency or consultation?
                      </h6>
                      <div className="row g-2">
                        {consultationTypes.map((type) => (
                          <div key={type.id} className="col-6">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setConsultationType(type.id)}
                              style={{
                                background:
                                  consultationType === type.id
                                    ? type.color
                                    : '#f8f9fa',
                                border:
                                  consultationType === type.id
                                    ? `2px solid ${type.color}`
                                    : '2px solid #ddd',
                                color:
                                  consultationType === type.id ? 'white' : '#1a1a1a',
                                padding: '12px',
                                borderRadius: '8px',
                                width: '100%',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                fontSize: '14px',
                                fontWeight: 500,
                              }}
                              className="d-flex flex-column align-items-center gap-2"
                            >
                              <span style={{ fontSize: '24px' }}>{type.icon}</span>
                              {type.label}
                            </motion.button>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Doctor Selection */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h6 className="mb-3" style={{ fontWeight: 600 }}>
                        Select a Doctor
                      </h6>
                      <div className="row g-2">
                        {doctors.map((doctor) => (
                          <div key={doctor.id} className="col-12">
                            <motion.div
                              whileHover={{ boxShadow: '0 4px 12px rgba(0, 123, 255, 0.15)' }}
                              onClick={() => setSelectedDoctor(doctor.id)}
                              style={{
                                border:
                                  selectedDoctor === doctor.id
                                    ? '2px solid #007bff'
                                    : '2px solid #ddd',
                                borderRadius: '8px',
                                padding: '12px',
                                cursor: 'pointer',
                                background:
                                  selectedDoctor === doctor.id ? '#f0f7ff' : '#fff',
                                transition: 'all 0.3s ease',
                              }}
                              className="d-flex justify-content-between align-items-start"
                            >
                              <div className="flex-grow-1">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                  <h6 className="mb-0">{doctor.name}</h6>
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '2px',
                                      fontSize: '13px',
                                    }}
                                  >
                                    <Star size={14} fill="#ffc107" color="#ffc107" />
                                    {doctor.rating}
                                  </div>
                                </div>
                                <p className="text-muted small mb-2">{doctor.specialty}</p>
                                <div
                                  style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '8px',
                                    fontSize: '12px',
                                  }}
                                >
                                  <span className="d-flex align-items-center gap-1">
                                    <MapPin size={13} /> {doctor.location}
                                  </span>
                                  <span className="d-flex align-items-center gap-1">
                                    <Phone size={13} /> {doctor.phone}
                                  </span>
                                </div>
                              </div>
                              <div className="text-end ms-2">
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '4px',
                                  }}
                                >
                                  {doctor.availability.map((status, idx) => (
                                    <small
                                      key={idx}
                                      style={{
                                        padding: '2px 6px',
                                        borderRadius: '4px',
                                        background:
                                          status === 'Available'
                                            ? '#d4edda'
                                            : '#fff3cd',
                                        color:
                                          status === 'Available'
                                            ? '#155724'
                                            : '#856404',
                                        fontSize: '11px',
                                      }}
                                    >
                                      {status}
                                    </small>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Date & Time Selection */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h6 className="mb-3" style={{ fontWeight: 600 }}>
                        Select Date & Time
                      </h6>

                      {/* Date Selection */}
                      <div className="mb-4">
                        <label style={{ fontSize: '13px', fontWeight: 500 }} className="mb-2 d-block">
                          Available Dates
                        </label>
                        <div className="d-flex gap-2 overflow-auto pb-2">
                          {getNextDates().map((dateObj) => (
                            <motion.button
                              key={dateObj.value}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedDate(dateObj.value)}
                              style={{
                                flex: '0 0 auto',
                                padding: '12px 16px',
                                borderRadius: '8px',
                                border:
                                  selectedDate === dateObj.value
                                    ? '2px solid #007bff'
                                    : '2px solid #ddd',
                                background:
                                  selectedDate === dateObj.value ? '#007bff' : '#fff',
                                color:
                                  selectedDate === dateObj.value ? 'white' : '#1a1a1a',
                                cursor: 'pointer',
                                fontSize: '13px',
                                fontWeight: 500,
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                              }}
                            >
                              <div>{dateObj.label}</div>
                              <small>{dateObj.date}</small>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Clinic Hours and Time Selection */}
                      {selectedDate && (
                        <>
                          <label style={{ fontSize: '13px', fontWeight: 500 }} className="mb-2 d-block">
                            Clinic Hours (08:00 AM - 05:00 PM)
                          </label>
                          <div className="row g-2">
                            {getClinicHours().map((time) => (
                              <div key={time} className="col-4 col-sm-3 col-md-2.4">
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => setSelectedTime(time)}
                                  style={{
                                    padding: '10px',
                                    borderRadius: '6px',
                                    border:
                                      selectedTime === time
                                        ? '2px solid #28a745'
                                        : '2px solid #ddd',
                                    background:
                                      selectedTime === time ? '#28a745' : '#f8f9fa',
                                    color:
                                      selectedTime === time ? 'white' : '#1a1a1a',
                                    cursor: 'pointer',
                                    fontSize: '12px',
                                    fontWeight: 500,
                                    width: '100%',
                                    transition: 'all 0.3s ease',
                                  }}
                                >
                                  {time}
                                </motion.button>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </motion.div>
                  )}

                  {/* Step 4: Confirmation */}
                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h6 className="mb-3" style={{ fontWeight: 600 }}>
                        Confirm Your Appointment
                      </h6>

                      {/* Summary Card */}
                      <div
                        style={{
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          padding: '16px',
                          marginBottom: '16px',
                          background: '#f8f9fa',
                        }}
                      >
                        <div className="row mb-3">
                          <div className="col-6">
                            <small style={{ color: '#666' }}>Consultation Type</small>
                            <div style={{ fontWeight: 600, color: '#1a1a1a' }}>
                              {consultationTypes.find((c) => c.id === consultationType)?.label}
                            </div>
                          </div>
                          <div className="col-6">
                            <small style={{ color: '#666' }}>Doctor</small>
                            <div style={{ fontWeight: 600, color: '#1a1a1a' }}>
                              {doctors.find((d) => d.id === selectedDoctor)?.name}
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-6">
                            <small style={{ color: '#666' }}>Date</small>
                            <div
                              style={{
                                fontWeight: 600,
                                color: '#1a1a1a',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                              }}
                            >
                              📅 {new Date(selectedDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </div>
                          </div>
                          <div className="col-6">
                            <small style={{ color: '#666' }}>Time</small>
                            <div
                              style={{
                                fontWeight: 600,
                                color: '#1a1a1a',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                              }}
                            >
                              <Clock size={14} /> {selectedTime}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Notes */}
                      <div className="mb-3">
                        <label
                          style={{
                            fontSize: '13px',
                            fontWeight: 500,
                            display: 'block',
                            marginBottom: '8px',
                          }}
                        >
                          Additional Notes (Optional)
                        </label>
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Tell us about your symptoms or any medical history..."
                          style={{
                            width: '100%',
                            borderRadius: '6px',
                            border: '1px solid #ddd',
                            padding: '10px',
                            fontFamily: 'inherit',
                            fontSize: '13px',
                            minHeight: '80px',
                            resize: 'vertical',
                          }}
                        />
                      </div>

                      {/* Success Message */}
                      <div
                        style={{
                          background: '#d4edda',
                          border: '1px solid #c3e6cb',
                          color: '#155724',
                          padding: '12px',
                          borderRadius: '6px',
                          fontSize: '13px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <Check size={18} />
                        Your appointment will be confirmed after your submission
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div
                style={{
                  borderTop: '1px solid #eee',
                  padding: '16px',
                  display: 'flex',
                  gap: '8px',
                  justifyContent: 'flex-end',
                }}
              >
                {step > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(step - 1)}
                    className="btn btn-outline-secondary d-flex align-items-center gap-2"
                  >
                    <ChevronLeft size={16} /> Back
                  </motion.button>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (step < 4) {
                      setStep(step + 1);
                    } else {
                      handleConfirmBooking();
                    }
                  }}
                  className="btn btn-primary"
                  style={{
                    background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
                    border: 'none',
                  }}
                >
                  {step === 4 ? (
                    <>
                      <Check size={16} /> Confirm Booking
                    </>
                  ) : (
                    'Next'
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default AppointmentBookingModal;
