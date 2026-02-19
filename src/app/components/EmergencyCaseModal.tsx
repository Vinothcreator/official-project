import React, { useState } from 'react';
import { X, AlertCircle, Phone, User, MapPin, FileText, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface EmergencyCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmergencySubmit?: (emergency: any) => void;
}

const EmergencyCaseModal: React.FC<EmergencyCaseModalProps> = ({
  isOpen,
  onClose,
  onEmergencySubmit,
}) => {
  const [step, setStep] = useState(1);
  const [urgencyLevel, setUrgencyLevel] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [location, setLocation] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const urgencyLevels = [
    {
      id: 'life-threatening',
      label: 'Life-Threatening',
      icon: '🚨',
      color: '#dc3545',
      description: 'Unconscious, severe bleeding, cardiac arrest',
    },
    {
      id: 'severe',
      label: 'Severe',
      icon: '⚠️',
      color: '#ff6b6b',
      description: 'Severe pain, difficulty breathing, chest pain',
    },
    {
      id: 'moderate',
      label: 'Moderate',
      icon: '⚡',
      color: '#fd7e14',
      description: 'Moderate pain, persistent symptoms, injury',
    },
    {
      id: 'urgent',
      label: 'Urgent',
      icon: '🏥',
      color: '#ffc107',
      description: 'Needs immediate attention but stable',
    },
  ];

  const commonSymptoms = [
    'Chest Pain',
    'Difficulty Breathing',
    'Severe Bleeding',
    'Severe Allergic Reaction',
    'Loss of Consciousness',
    'Severe Trauma',
    'Acute Poisoning',
    'Severe Burns',
  ];

  const handleSubmit = async () => {
    if (!urgencyLevel || !patientName || !contactPhone || !location || !symptoms) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate emergency submission
    setTimeout(() => {
      const emergency = {
        id: `EMG-${Date.now()}`,
        urgencyLevel,
        patientName,
        patientAge,
        contactPhone,
        location,
        symptoms,
        medicalHistory,
        submittedAt: new Date().toISOString(),
        status: 'Active',
      };

      toast.error('🚨 EMERGENCY ALERT TRIGGERED - Paramedics Dispatched!', {
        duration: 5000,
      });
      onEmergencySubmit?.(emergency);
      resetForm();
      onClose();
      setIsSubmitting(false);
    }, 1500);
  };

  const resetForm = () => {
    setStep(1);
    setUrgencyLevel('');
    setPatientName('');
    setPatientAge('');
    setContactPhone('');
    setLocation('');
    setSymptoms('');
    setMedicalHistory('');
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
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
              maxWidth: '650px',
              width: '90%',
              margin: '0 auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 shadow-lg">
              {/* Header - Urgent Red */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #dc3545 0%, #a71930 100%)',
                  padding: '20px',
                  borderRadius: '12px 12px 0 0',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div className="d-flex align-items-center gap-2">
                  <AlertCircle size={24} />
                  <div>
                    <h5 className="mb-1">Emergency Case Report</h5>
                    <small>Step {step} of 3 - URGENT</small>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="btn btn-link text-white p-0"
                  style={{ fontSize: '20px' }}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="modal-body p-4" style={{ minHeight: '420px' }}>
                {/* Progress Bar - Red */}
                <div className="mb-4">
                  <div className="progress" style={{ height: '4px' }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${(step / 3) * 100}%`,
                        background: 'linear-gradient(90deg, #dc3545 0%, #a71930 100%)',
                      }}
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {/* Step 1: Urgency Level */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h6 className="mb-3" style={{ fontWeight: 600, color: '#dc3545' }}>
                        What is the urgency level?
                      </h6>
                      <div className="row g-2">
                        {urgencyLevels.map((level) => (
                          <div key={level.id} className="col-6">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setUrgencyLevel(level.id)}
                              style={{
                                background:
                                  urgencyLevel === level.id
                                    ? level.color
                                    : '#f8f9fa',
                                border:
                                  urgencyLevel === level.id
                                    ? `2px solid ${level.color}`
                                    : '2px solid #ddd',
                                color:
                                  urgencyLevel === level.id ? 'white' : '#1a1a1a',
                                padding: '12px',
                                borderRadius: '8px',
                                width: '100%',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                              }}
                              className="d-flex flex-column align-items-center gap-2 text-start"
                            >
                              <span style={{ fontSize: '24px' }}>{level.icon}</span>
                              <div style={{ textAlign: 'center' }}>
                                <div style={{ fontWeight: 600, fontSize: '13px' }}>
                                  {level.label}
                                </div>
                                <small style={{ fontSize: '10px', opacity: 0.9 }}>
                                  {level.description}
                                </small>
                              </div>
                            </motion.button>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Patient Information */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h6 className="mb-3" style={{ fontWeight: 600 }}>
                        Patient Information
                      </h6>

                      {/* Patient Name */}
                      <div className="mb-3">
                        <label style={{ fontSize: '13px', fontWeight: 500 }} className="mb-2 d-block">
                          Patient Name *
                        </label>
                        <input
                          type="text"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          placeholder="Full name"
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontFamily: 'inherit',
                          }}
                        />
                      </div>

                      <div className="row">
                        {/* Patient Age */}
                        <div className="col-6 mb-3">
                          <label style={{ fontSize: '13px', fontWeight: 500 }} className="mb-2 d-block">
                            Age
                          </label>
                          <input
                            type="number"
                            value={patientAge}
                            onChange={(e) => setPatientAge(e.target.value)}
                            placeholder="Age"
                            style={{
                              width: '100%',
                              padding: '10px',
                              border: '1px solid #ddd',
                              borderRadius: '6px',
                              fontSize: '13px',
                              fontFamily: 'inherit',
                            }}
                          />
                        </div>

                        {/* Contact Phone */}
                        <div className="col-6 mb-3">
                          <label style={{ fontSize: '13px', fontWeight: 500 }} className="mb-2 d-block">
                            Contact Phone *
                          </label>
                          <input
                            type="tel"
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                            placeholder="Emergency contact"
                            style={{
                              width: '100%',
                              padding: '10px',
                              border: '1px solid #ddd',
                              borderRadius: '6px',
                              fontSize: '13px',
                              fontFamily: 'inherit',
                            }}
                          />
                        </div>
                      </div>

                      {/* Location */}
                      <div className="mb-3">
                        <label style={{ fontSize: '13px', fontWeight: 500 }} className="mb-2 d-block">
                          Current Location *
                        </label>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Hospital, home, street address, etc."
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontFamily: 'inherit',
                          }}
                        />
                      </div>

                      {/* Medical History */}
                      <div className="mb-3">
                        <label style={{ fontSize: '13px', fontWeight: 500 }} className="mb-2 d-block">
                          Relevant Medical History
                        </label>
                        <textarea
                          value={medicalHistory}
                          onChange={(e) => setMedicalHistory(e.target.value)}
                          placeholder="Existing conditions, allergies, medications..."
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontFamily: 'inherit',
                            minHeight: '60px',
                            resize: 'vertical',
                          }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Symptoms & Confirmation */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h6 className="mb-3" style={{ fontWeight: 600 }}>
                        Symptoms & Confirmation
                      </h6>

                      {/* Quick Symptom Selection */}
                      <div className="mb-3">
                        <label style={{ fontSize: '13px', fontWeight: 500 }} className="mb-2 d-block">
                          Common Symptoms (Optional)
                        </label>
                        <div className="row g-2 mb-3">
                          {commonSymptoms.map((symptom) => (
                            <div key={symptom} className="col-6">
                              <button
                                onClick={() => {
                                  if (!symptoms.includes(symptom)) {
                                    setSymptoms(
                                      symptoms ? `${symptoms}, ${symptom}` : symptom
                                    );
                                  }
                                }}
                                style={{
                                  width: '100%',
                                  padding: '8px',
                                  borderRadius: '6px',
                                  border: '1px solid #ddd',
                                  background: symptoms.includes(symptom)
                                    ? '#dc3545'
                                    : '#f8f9fa',
                                  color: symptoms.includes(symptom)
                                    ? 'white'
                                    : '#1a1a1a',
                                  fontSize: '12px',
                                  fontWeight: 500,
                                  cursor: 'pointer',
                                  transition: 'all 0.3s ease',
                                }}
                              >
                                {symptom}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Detailed Symptoms */}
                      <div className="mb-3">
                        <label style={{ fontSize: '13px', fontWeight: 500 }} className="mb-2 d-block">
                          Detailed Symptoms Description *
                        </label>
                        <textarea
                          value={symptoms}
                          onChange={(e) => setSymptoms(e.target.value)}
                          placeholder="Describe all symptoms and current condition in detail..."
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontFamily: 'inherit',
                            minHeight: '80px',
                            resize: 'vertical',
                          }}
                        />
                      </div>

                      {/* Emergency Alert */}
                      <div
                        style={{
                          background: '#ffe6e6',
                          border: '2px solid #dc3545',
                          color: '#721c24',
                          padding: '12px',
                          borderRadius: '6px',
                          fontSize: '13px',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                        }}
                      >
                        <AlertCircle size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
                        <div>
                          <strong>⚠️ EMERGENCY PROTOCOL</strong>
                          <p className="mb-0 mt-1" style={{ fontSize: '12px' }}>
                            Submitting this form will immediately dispatch emergency services to the specified location and alert all available medical personnel.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div
                className="modal-footer border-top"
                style={{ padding: '16px 20px', background: '#f8f9fa' }}
              >
                <button
                  onClick={() => {
                    if (step > 1) {
                      setStep(step - 1);
                    } else {
                      onClose();
                    }
                  }}
                  className="btn btn-outline-secondary"
                  disabled={isSubmitting}
                >
                  {step === 1 ? 'Cancel' : 'Back'}
                </button>
                <button
                  onClick={() => {
                    if (step < 3) {
                      if (
                        (step === 1 && urgencyLevel) ||
                        (step === 2 &&
                          patientName &&
                          contactPhone &&
                          location)
                      ) {
                        setStep(step + 1);
                      } else {
                        toast.error('Please fill in all required fields');
                      }
                    } else {
                      handleSubmit();
                    }
                  }}
                  className="btn btn-danger"
                  disabled={isSubmitting}
                  style={{
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      />
                      Dispatching...
                    </>
                  ) : step === 3 ? (
                    <>
                      <AlertCircle size={16} className="me-1" />
                      SUBMIT EMERGENCY
                    </>
                  ) : (
                    'Next'
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default EmergencyCaseModal;
