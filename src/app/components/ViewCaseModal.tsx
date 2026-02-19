import React, { useState } from 'react';
import { X, FileText, User, Calendar, AlertCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ViewCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ViewCaseModal: React.FC<ViewCaseModalProps> = ({ isOpen, onClose }) => {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);

  const cases = [
    {
      id: 'CASE-001',
      patientName: 'Michael Brown',
      patientId: 'PT001',
      condition: 'Hypertension',
      status: 'Active',
      severity: 'High',
      doctor: 'Dr. Sarah Johnson',
      startDate: '2025-12-10',
      lastUpdate: '2026-02-18',
      description: 'Patient with sustained high blood pressure, currently on medication management.',
      notes: 'Monitor daily BP readings. Follow up in 2 weeks.',
      medications: ['Lisinopril 10mg', 'Hydrochlorothiazide 25mg'],
    },
    {
      id: 'CASE-002',
      patientName: 'Sarah Wilson',
      patientId: 'PT002',
      condition: 'Diabetes Type 2',
      status: 'Active',
      severity: 'Medium',
      doctor: 'Dr. James Chen',
      startDate: '2025-08-15',
      lastUpdate: '2026-02-17',
      description: 'Type 2 diabetes management with diet and medication control.',
      notes: 'HbA1c level improved to 6.8%. Continue current regimen.',
      medications: ['Metformin 500mg', 'Glipizide 5mg'],
    },
    {
      id: 'CASE-003',
      patientName: 'James Anderson',
      patientId: 'PT003',
      condition: 'Heart Disease',
      status: 'Monitoring',
      severity: 'Critical',
      doctor: 'Dr. Sarah Johnson',
      startDate: '2025-06-20',
      lastUpdate: '2026-02-16',
      description: 'Post-MI patient with left ventricular dysfunction requiring close monitoring.',
      notes: 'Echocardiogram scheduled for next month. Very important to monitor.',
      medications: ['Clopidogrel 75mg', 'Atorvastatin 80mg', 'Carvedilol 25mg'],
    },
    {
      id: 'CASE-004',
      patientName: 'Emma Davis',
      patientId: 'PT004',
      condition: 'Asthma',
      status: 'Stable',
      severity: 'Low',
      doctor: 'Dr. Michael Torres',
      startDate: '2025-11-05',
      lastUpdate: '2026-02-15',
      description: 'Mild persistent asthma, well-controlled with inhaled corticosteroid.',
      notes: 'Patient reports good control. Continue current therapy.',
      medications: ['Albuterol inhaler PRN', 'Fluticasone/Salmeterol'],
    },
    {
      id: 'CASE-005',
      patientName: 'Robert Taylor',
      patientId: 'PT005',
      condition: 'Arthritis',
      status: 'Follow-up',
      severity: 'Medium',
      doctor: 'Dr. Patricia Brown',
      startDate: '2025-09-12',
      lastUpdate: '2026-02-14',
      description: 'Rheumatoid arthritis managed with DMARDs and NSAIDs.',
      notes: 'In remission for 3 months. Continue biweekly monitoring.',
      medications: ['Methotrexate 15mg weekly', 'Meloxicam 15mg daily'],
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return { bg: '#ffebee', text: '#c62828', border: '#ef5350' };
      case 'High':
        return { bg: '#fff3e0', text: '#e65100', border: '#ff9800' };
      case 'Medium':
        return { bg: '#fce4ec', text: '#c2185b', border: '#ec407a' };
      case 'Low':
        return { bg: '#e8f5e9', text: '#2e7d32', border: '#66bb6a' };
      default:
        return { bg: '#f5f5f5', text: '#616161', border: '#bdbdbd' };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return '#007bff';
      case 'Monitoring':
        return '#ff9800';
      case 'Stable':
        return '#28a745';
      case 'Follow-up':
        return '#17a2b8';
      default:
        return '#6c757d';
    }
  };

  const currentCase = cases.find((c) => c.id === selectedCase);

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
              maxWidth: selectedCase ? '700px' : '600px',
              width: '90%',
              margin: '0 auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 shadow-lg">
              {/* Header */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #6f42c1 0%, #5a32a3 100%)',
                  padding: '20px',
                  borderRadius: '12px 12px 0 0',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <h5 className="mb-1">View Case Details</h5>
                  <small>{selectedCase ? 'Case Details' : 'Select a case to view'}</small>
                </div>
                <button
                  onClick={onClose}
                  className="btn btn-link text-white p-0"
                  style={{ fontSize: '20px' }}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="modal-body p-4" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                <AnimatePresence mode="wait">
                  {!selectedCase ? (
                    <motion.div
                      key="list"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h6 className="mb-3" style={{ fontWeight: 600 }}>
                        Active Cases
                      </h6>
                      <div className="row g-2">
                        {cases.map((caseItem) => {
                          const severity = getSeverityColor(caseItem.severity);
                          return (
                            <div key={caseItem.id} className="col-12">
                              <motion.div
                                whileHover={{ boxShadow: '0 4px 12px rgba(111, 66, 193, 0.15)' }}
                                onClick={() => setSelectedCase(caseItem.id)}
                                style={{
                                  border: '2px solid #ddd',
                                  borderRadius: '8px',
                                  padding: '12px',
                                  cursor: 'pointer',
                                  background: '#fff',
                                  transition: 'all 0.3s ease',
                                }}
                                className="d-flex justify-content-between align-items-start"
                              >
                                <div className="flex-grow-1">
                                  <div className="d-flex align-items-center gap-2 mb-2">
                                    <h6 className="mb-0">{caseItem.condition}</h6>
                                    <span
                                      style={{
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        background: getStatusColor(caseItem.status) + '20',
                                        color: getStatusColor(caseItem.status),
                                        fontSize: '11px',
                                        fontWeight: 600,
                                      }}
                                    >
                                      {caseItem.status}
                                    </span>
                                  </div>
                                  <div className="d-flex align-items-center gap-3" style={{ fontSize: '12px' }}>
                                    <span className="text-muted">
                                      <User size={13} className="me-1" />
                                      {caseItem.patientName}
                                    </span>
                                    <span className="text-muted">
                                      <Calendar size={13} className="me-1" />
                                      {new Date(caseItem.lastUpdate).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                      })}
                                    </span>
                                  </div>
                                </div>
                                <div
                                  style={{
                                    padding: '6px 10px',
                                    borderRadius: '6px',
                                    background: severity.bg,
                                    color: severity.text,
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    whiteSpace: 'nowrap',
                                    marginLeft: '12px',
                                  }}
                                >
                                  {caseItem.severity}
                                </div>
                              </motion.div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Case Header */}
                      <div className="mb-4">
                        <div className="d-flex align-items-start justify-content-between mb-3">
                          <div>
                            <h5 style={{ fontWeight: 600, color: '#1a1a1a' }}>
                              {currentCase?.condition}
                            </h5>
                            <p className="text-muted mb-0">{currentCase?.id}</p>
                          </div>
                          <span
                            style={{
                              padding: '8px 12px',
                              borderRadius: '6px',
                              background:
                                getSeverityColor(currentCase?.severity || '').bg,
                              color:
                                getSeverityColor(currentCase?.severity || '').text,
                              fontSize: '12px',
                              fontWeight: 600,
                            }}
                          >
                            {currentCase?.severity} Severity
                          </span>
                        </div>
                      </div>

                      {/* Case Information Grid */}
                      <div className="row mb-4">
                        <div className="col-6 mb-3">
                          <small style={{ color: '#666', fontWeight: 500 }}>Patient Name</small>
                          <div style={{ fontWeight: 600, color: '#1a1a1a' }}>
                            {currentCase?.patientName}
                          </div>
                        </div>
                        <div className="col-6 mb-3">
                          <small style={{ color: '#666', fontWeight: 500 }}>Patient ID</small>
                          <div style={{ fontWeight: 600, color: '#1a1a1a' }}>
                            {currentCase?.patientId}
                          </div>
                        </div>
                        <div className="col-6 mb-3">
                          <small style={{ color: '#666', fontWeight: 500 }}>Assigned Doctor</small>
                          <div style={{ fontWeight: 600, color: '#1a1a1a' }}>
                            {currentCase?.doctor}
                          </div>
                        </div>
                        <div className="col-6 mb-3">
                          <small style={{ color: '#666', fontWeight: 500 }}>Status</small>
                          <div
                            style={{
                              fontWeight: 600,
                              color: getStatusColor(currentCase?.status || ''),
                            }}
                          >
                            {currentCase?.status}
                          </div>
                        </div>
                        <div className="col-6 mb-3">
                          <small style={{ color: '#666', fontWeight: 500 }}>Start Date</small>
                          <div style={{ fontWeight: 600, color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Calendar size={14} />
                            {new Date(currentCase?.startDate || '').toLocaleDateString(
                              'en-US',
                              { year: 'numeric', month: 'short', day: 'numeric' }
                            )}
                          </div>
                        </div>
                        <div className="col-6 mb-3">
                          <small style={{ color: '#666', fontWeight: 500 }}>Last Update</small>
                          <div style={{ fontWeight: 600, color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={14} />
                            {new Date(currentCase?.lastUpdate || '').toLocaleDateString(
                              'en-US',
                              { year: 'numeric', month: 'short', day: 'numeric' }
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
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
                            fontSize: '13px',
                            color: '#1a1a1a',
                            lineHeight: '1.5',
                          }}
                        >
                          {currentCase?.description}
                        </div>
                      </div>

                      {/* Clinical Notes */}
                      <div className="mb-4">
                        <small style={{ color: '#666', fontWeight: 500, display: 'block', marginBottom: '8px' }}>
                          <AlertCircle size={14} className="me-1" />
                          Clinical Notes
                        </small>
                        <div
                          style={{
                            background: '#fffbf0',
                            border: '1px solid #ffe0c0',
                            borderRadius: '6px',
                            padding: '12px',
                            fontSize: '13px',
                            color: '#1a1a1a',
                            lineHeight: '1.5',
                          }}
                        >
                          {currentCase?.notes}
                        </div>
                      </div>

                      {/* Medications */}
                      <div className="mb-4">
                        <small style={{ color: '#666', fontWeight: 500, display: 'block', marginBottom: '8px' }}>
                          <FileText size={14} className="me-1" />
                          Current Medications
                        </small>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {currentCase?.medications.map((med, idx) => (
                            <div
                              key={idx}
                              style={{
                                background: '#f0f7ff',
                                border: '1px solid #b3d9ff',
                                borderRadius: '6px',
                                padding: '10px',
                                fontSize: '13px',
                                color: '#1a1a1a',
                              }}
                            >
                              • {med}
                            </div>
                          ))}
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
                {selectedCase && (
                  <button
                    onClick={() => setSelectedCase(null)}
                    className="btn btn-outline-secondary"
                  >
                    Back to List
                  </button>
                )}
                <button onClick={onClose} className="btn btn-secondary">
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default ViewCaseModal;
