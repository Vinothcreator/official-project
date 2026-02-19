import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ArrowLeft, User, Calendar, Phone, Mail, MapPin,
  FileText, Activity, Pill, Clock, Download
} from 'lucide-react';
import { motion } from 'motion/react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

const PatientDetails = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const patientInfo = {
    id: 'PT001',
    name: 'Michael Brown',
    age: 45,
    gender: 'Male',
    bloodGroup: 'A+',
    phone: '+1 (555) 123-4567',
    email: 'michael.brown@email.com',
    address: '123 Main St, New York, NY 10001',
    admittedDate: '2026-01-15',
    primaryCondition: 'Hypertension',
  };

  const caseHistory = [
    { date: '2026-02-18', condition: 'Hypertension Check-up', doctor: 'Dr. Sarah Johnson', status: 'Ongoing' },
    { date: '2026-02-01', condition: 'Blood Pressure Monitoring', doctor: 'Dr. Sarah Johnson', status: 'Completed' },
    { date: '2026-01-15', condition: 'Initial Consultation', doctor: 'Dr. Michael Chen', status: 'Completed' },
  ];

  const labReports = [
    { id: 1, name: 'Complete Blood Count', date: '2026-02-15', status: 'Normal', file: 'cbc_report.pdf' },
    { id: 2, name: 'Lipid Profile', date: '2026-02-10', status: 'Normal', file: 'lipid_profile.pdf' },
    { id: 3, name: 'Blood Sugar (Fasting)', date: '2026-02-05', status: 'Normal', file: 'blood_sugar.pdf' },
  ];

  const prescriptions = [
    { medication: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '30 days', prescribedOn: '2026-02-18' },
    { medication: 'Metoprolol', dosage: '25mg', frequency: 'Twice daily', duration: '30 days', prescribedOn: '2026-02-18' },
  ];

  const visitHistory = [
    { date: '2026-02-18', type: 'Follow-up', doctor: 'Dr. Sarah Johnson', notes: 'BP controlled, continue medication' },
    { date: '2026-02-01', type: 'Check-up', doctor: 'Dr. Sarah Johnson', notes: 'Slight improvement in BP readings' },
    { date: '2026-01-15', type: 'Consultation', doctor: 'Dr. Michael Chen', notes: 'Diagnosed with stage 1 hypertension' },
  ];

  return (
    <div className="min-vh-100" style={{ background: '#f8f9fa', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="d-lg-flex">
        <div className="flex-grow-1">
          <Navbar onMenuClick={() => setSidebarOpen(true)} />
          
          <div className="container-fluid p-4">
            {/* Back Button */}
            <button 
              className="btn btn-light mb-4 d-flex align-items-center gap-2"
              onClick={() => navigate('/doctor/dashboard')}
            >
              <ArrowLeft size={18} />
              Back to Dashboard
            </button>

            {/* Patient Info Card */}
            <motion.div
              className="card border-0 shadow-sm mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="card-body p-4">
                <div className="row">
                  <div className="col-md-3 text-center mb-3 mb-md-0">
                    <div className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: '120px',
                        height: '120px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      }}>
                      <User size={50} className="text-white" />
                    </div>
                    <h4 className="mb-1">{patientInfo.name}</h4>
                    <p className="text-muted mb-2">Patient ID: {patientInfo.id}</p>
                    <span className="badge bg-success">Active</span>
                  </div>

                  <div className="col-md-9">
                    <div className="row g-3">
                      <div className="col-sm-6 col-lg-4">
                        <div className="d-flex align-items-center gap-2">
                          <Calendar size={18} className="text-muted" />
                          <div>
                            <small className="text-muted d-block">Age / Gender</small>
                            <strong>{patientInfo.age} / {patientInfo.gender}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-lg-4">
                        <div className="d-flex align-items-center gap-2">
                          <Activity size={18} className="text-muted" />
                          <div>
                            <small className="text-muted d-block">Blood Group</small>
                            <strong>{patientInfo.bloodGroup}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-lg-4">
                        <div className="d-flex align-items-center gap-2">
                          <Phone size={18} className="text-muted" />
                          <div>
                            <small className="text-muted d-block">Phone</small>
                            <strong>{patientInfo.phone}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-lg-4">
                        <div className="d-flex align-items-center gap-2">
                          <Mail size={18} className="text-muted" />
                          <div>
                            <small className="text-muted d-block">Email</small>
                            <strong className="small">{patientInfo.email}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-lg-4">
                        <div className="d-flex align-items-center gap-2">
                          <MapPin size={18} className="text-muted" />
                          <div>
                            <small className="text-muted d-block">Address</small>
                            <strong className="small">{patientInfo.address}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-lg-4">
                        <div className="d-flex align-items-center gap-2">
                          <Calendar size={18} className="text-muted" />
                          <div>
                            <small className="text-muted d-block">Admitted On</small>
                            <strong>{patientInfo.admittedDate}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 rounded-3" style={{ background: '#f8f9fa' }}>
                      <strong>Primary Condition:</strong> {patientInfo.primaryCondition}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tabs Section */}
            <Tabs defaultValue="history" className="w-100">
              <TabsList className="mb-4">
                <TabsTrigger value="history">Case History</TabsTrigger>
                <TabsTrigger value="reports">Lab Reports</TabsTrigger>
                <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                <TabsTrigger value="visits">Visit History</TabsTrigger>
              </TabsList>

              <TabsContent value="history">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <h5 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Case History Timeline
                    </h5>
                    
                    <div className="position-relative" style={{ paddingLeft: '30px' }}>
                      <div className="position-absolute top-0 bottom-0 bg-primary"
                        style={{ left: '12px', width: '2px' }} />
                      
                      {caseHistory.map((item, idx) => (
                        <motion.div
                          key={idx}
                          className="mb-4 position-relative"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <div className="position-absolute rounded-circle bg-primary"
                            style={{ left: '-24px', width: '12px', height: '12px', top: '5px' }} />
                          
                          <div className="p-3 rounded-3 border" style={{ background: '#f8f9fa' }}>
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <h6 className="mb-0">{item.condition}</h6>
                              <span className={`badge ${item.status === 'Ongoing' ? 'bg-warning' : 'bg-success'}`}>
                                {item.status}
                              </span>
                            </div>
                            <p className="text-muted small mb-1">
                              <Calendar size={14} className="me-1" />
                              {item.date}
                            </p>
                            <p className="text-muted small mb-0">
                              Doctor: {item.doctor}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reports">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="mb-0" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Laboratory Reports
                      </h5>
                      <button className="btn btn-primary">
                        <FileText size={18} className="me-2" />
                        Upload Report
                      </button>
                    </div>

                    <div className="table-responsive">
                      <table className="table table-hover align-middle">
                        <thead className="bg-light">
                          <tr>
                            <th>Report Name</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {labReports.map((report, idx) => (
                            <motion.tr
                              key={idx}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <td>
                                <div className="d-flex align-items-center gap-2">
                                  <FileText size={18} className="text-primary" />
                                  {report.name}
                                </div>
                              </td>
                              <td>{report.date}</td>
                              <td>
                                <span className="badge bg-success">{report.status}</span>
                              </td>
                              <td>
                                <button className="btn btn-sm btn-outline-primary">
                                  <Download size={16} className="me-1" />
                                  Download
                                </button>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="prescriptions">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="mb-0" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Current Prescriptions
                      </h5>
                      <button className="btn btn-primary">
                        <Pill size={18} className="me-2" />
                        Add Prescription
                      </button>
                    </div>

                    <div className="row g-3">
                      {prescriptions.map((prescription, idx) => (
                        <div key={idx} className="col-md-6">
                          <motion.div
                            className="p-4 rounded-3 border h-100"
                            style={{ background: '#f8f9fa' }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <div className="d-flex align-items-start gap-3">
                              <div className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                }}>
                                <Pill size={24} className="text-white" />
                              </div>
                              <div className="flex-grow-1">
                                <h6 className="mb-2">{prescription.medication}</h6>
                                <p className="text-muted small mb-1">
                                  <strong>Dosage:</strong> {prescription.dosage}
                                </p>
                                <p className="text-muted small mb-1">
                                  <strong>Frequency:</strong> {prescription.frequency}
                                </p>
                                <p className="text-muted small mb-1">
                                  <strong>Duration:</strong> {prescription.duration}
                                </p>
                                <p className="text-muted small mb-0">
                                  <Clock size={12} className="me-1" />
                                  Prescribed on {prescription.prescribedOn}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="visits">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <h5 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Visit History
                    </h5>

                    <div className="d-flex flex-column gap-3">
                      {visitHistory.map((visit, idx) => (
                        <motion.div
                          key={idx}
                          className="p-4 rounded-3 border"
                          style={{ background: '#f8f9fa' }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <div>
                              <h6 className="mb-1">{visit.type}</h6>
                              <p className="text-muted small mb-0">
                                <Calendar size={14} className="me-1" />
                                {visit.date} • {visit.doctor}
                              </p>
                            </div>
                            <span className="badge bg-primary">{visit.type}</span>
                          </div>
                          <div className="p-3 rounded-3 bg-white">
                            <strong className="small">Clinical Notes:</strong>
                            <p className="mb-0 mt-2">{visit.notes}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
