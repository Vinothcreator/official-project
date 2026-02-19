import React, { useRef, useState } from 'react';
import { Upload, X, FileText, AlertCircle, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface UploadReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete?: (report: any) => void;
}

const UploadReportModal: React.FC<UploadReportModalProps> = ({
  isOpen,
  onClose,
  onUploadComplete,
}) => {
  const [step, setStep] = useState(1);
  const [reportType, setReportType] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [patientName, setPatientName] = useState('');
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const reportTypes = [
    { id: 'xray', label: 'X-Ray', icon: '🩻' },
    { id: 'bloodtest', label: 'Blood Test', icon: '🧪' },
    { id: 'ultrasound', label: 'Ultrasound', icon: '📡' },
    { id: 'mri', label: 'MRI', icon: '🏥' },
    { id: 'prescription', label: 'Prescription', icon: '💊' },
    { id: 'other', label: 'Other', icon: '📄' },
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload a valid file (PDF, Image, Word, etc.)');
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!reportType || !selectedFile || !patientName) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const report = {
        id: `RPT-${Date.now()}`,
        type: reportType,
        fileName: selectedFile.name,
        patientName,
        description,
        uploadDate: new Date().toISOString(),
        fileSize: (selectedFile.size / 1024 / 1024).toFixed(2),
      };

      toast.success('Report uploaded successfully!');
      onUploadComplete?.(report);
      resetForm();
      onClose();
      setIsUploading(false);
    }, 1500);
  };

  const resetForm = () => {
    setStep(1);
    setReportType('');
    setSelectedFile(null);
    setPatientName('');
    setDescription('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
              maxWidth: '600px',
              width: '90%',
              margin: '0 auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 shadow-lg">
              {/* Header */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #28a745 0%, #1e7e34 100%)',
                  padding: '20px',
                  borderRadius: '12px 12px 0 0',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <h5 className="mb-1">Upload Medical Report</h5>
                  <small>Step {step} of 3</small>
                </div>
                <button
                  onClick={onClose}
                  className="btn btn-link text-white p-0"
                  style={{ fontSize: '20px' }}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="modal-body p-4" style={{ minHeight: '380px' }}>
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="progress" style={{ height: '4px' }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${(step / 3) * 100}%`,
                        background: 'linear-gradient(90deg, #28a745 0%, #1e7e34 100%)',
                      }}
                    />
                  </div>
                </div>

                {/* Step 1: Report Type Selection */}
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
                        What type of report are you uploading?
                      </h6>
                      <div className="row g-2">
                        {reportTypes.map((type) => (
                          <div key={type.id} className="col-6">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setReportType(type.id)}
                              style={{
                                background:
                                  reportType === type.id
                                    ? '#28a745'
                                    : '#f8f9fa',
                                border:
                                  reportType === type.id
                                    ? '2px solid #28a745'
                                    : '2px solid #ddd',
                                color:
                                  reportType === type.id ? 'white' : '#1a1a1a',
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

                  {/* Step 2: File Upload & Patient Info */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h6 className="mb-3" style={{ fontWeight: 600 }}>
                        Upload Report & Patient Information
                      </h6>

                      {/* File Upload Area */}
                      <div
                        style={{
                          border: '2px dashed #28a745',
                          borderRadius: '8px',
                          padding: '20px',
                          textAlign: 'center',
                          marginBottom: '16px',
                          cursor: 'pointer',
                          background: '#f8f9fa',
                          transition: 'all 0.3s ease',
                        }}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          onChange={handleFileSelect}
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          style={{ display: 'none' }}
                        />
                        {selectedFile ? (
                          <div>
                            <FileText size={32} color="#28a745" className="mx-auto mb-2" />
                            <p style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px' }}>
                              {selectedFile.name}
                            </p>
                            <small style={{ color: '#666' }}>
                              ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                            </small>
                          </div>
                        ) : (
                          <div>
                            <Upload size={32} color="#28a745" className="mx-auto mb-2" />
                            <p style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px' }}>
                              Click to upload or drag and drop
                            </p>
                            <small style={{ color: '#666' }}>
                              PDF, Images, or Documents up to 10MB
                            </small>
                          </div>
                        )}
                      </div>

                      {/* Patient Name */}
                      <div className="mb-3">
                        <label style={{ fontSize: '13px', fontWeight: 500 }} className="mb-2 d-block">
                          Patient Name *
                        </label>
                        <input
                          type="text"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          placeholder="Enter patient name"
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

                      {/* Description */}
                      <div className="mb-3">
                        <label style={{ fontSize: '13px', fontWeight: 500 }} className="mb-2 d-block">
                          Description (Optional)
                        </label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Add any notes about this report..."
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

                  {/* Step 3: Confirmation */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h6 className="mb-3" style={{ fontWeight: 600 }}>
                        Confirm Report Upload
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
                            <small style={{ color: '#666' }}>Report Type</small>
                            <div style={{ fontWeight: 600, color: '#1a1a1a' }}>
                              {reportTypes.find((r) => r.id === reportType)?.label}
                            </div>
                          </div>
                          <div className="col-6">
                            <small style={{ color: '#666' }}>Patient</small>
                            <div style={{ fontWeight: 600, color: '#1a1a1a' }}>
                              {patientName}
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-6">
                            <small style={{ color: '#666' }}>File</small>
                            <div
                              style={{
                                fontWeight: 600,
                                color: '#1a1a1a',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                wordBreak: 'break-word',
                              }}
                            >
                              <FileText size={14} /> {selectedFile?.name}
                            </div>
                          </div>
                          <div className="col-6">
                            <small style={{ color: '#666' }}>File Size</small>
                            <div style={{ fontWeight: 600, color: '#1a1a1a' }}>
                              {(selectedFile?.size ? selectedFile.size / 1024 / 1024 : 0).toFixed(2)} MB
                            </div>
                          </div>
                        </div>
                        {description && (
                          <div>
                            <small style={{ color: '#666' }}>Description</small>
                            <div style={{ fontWeight: 500, color: '#1a1a1a', fontSize: '13px' }}>
                              {description}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Info Message */}
                      <div
                        style={{
                          background: '#e7f3ff',
                          border: '1px solid #b3d9ff',
                          color: '#004085',
                          padding: '12px',
                          borderRadius: '6px',
                          fontSize: '13px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <AlertCircle size={16} />
                        Once uploaded, the report will be available to authorized personnel.
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
                  disabled={isUploading}
                >
                  {step === 1 ? 'Cancel' : 'Back'}
                </button>
                <button
                  onClick={() => {
                    if (step < 3) {
                      if ((step === 1 && reportType) || (step === 2 && selectedFile && patientName)) {
                        setStep(step + 1);
                      } else {
                        toast.error('Please fill in all required fields');
                      }
                    } else {
                      handleUpload();
                    }
                  }}
                  className="btn btn-success"
                  disabled={isUploading}
                  style={{
                    opacity: isUploading ? 0.7 : 1,
                  }}
                >
                  {isUploading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      />
                      Uploading...
                    </>
                  ) : step === 3 ? (
                    <>
                      <Check size={16} className="me-1" />
                      Upload Report
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

export default UploadReportModal;
