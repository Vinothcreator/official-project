import React, { useState } from 'react';
import { Users, Upload, Activity, CheckCircle, FileText, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

const NurseDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    {
      icon: Users,
      label: 'Patients Assigned',
      value: '48',
      change: '+6%',
      color: '#667eea',
      bgColor: '#f0f1ff',
    },
    {
      icon: Upload,
      label: 'Reports Uploaded',
      value: '23',
      change: '+15%',
      color: '#10b981',
      bgColor: '#d1fae5',
    },
    {
      icon: Activity,
      label: 'Vitals Updated',
      value: '34',
      change: '+8%',
      color: '#f59e0b',
      bgColor: '#fef3c7',
    },
    {
      icon: CheckCircle,
      label: 'Tasks Completed',
      value: '67',
      change: '+12%',
      color: '#06b6d4',
      bgColor: '#cffafe',
    },
  ];

  const recentUploads = [
    { id: 1, patient: 'John Doe', type: 'Lab Report', file: 'blood_test_report.pdf', time: '10 min ago', status: 'Uploaded' },
    { id: 2, patient: 'Jane Smith', type: 'X-Ray', file: 'chest_xray.jpg', time: '25 min ago', status: 'Uploaded' },
    { id: 3, patient: 'Mike Johnson', type: 'ECG Report', file: 'ecg_results.pdf', time: '1 hour ago', status: 'Uploaded' },
    { id: 4, patient: 'Sarah Williams', type: 'Blood Pressure', file: 'bp_readings.csv', time: '2 hours ago', status: 'Uploaded' },
  ];

  const pendingTasks = [
    { id: 1, patient: 'Emily Brown', task: 'Update vital signs', priority: 'High', due: '11:00 AM' },
    { id: 2, patient: 'David Lee', task: 'Upload lab results', priority: 'Medium', due: '02:00 PM' },
    { id: 3, patient: 'Lisa Chen', task: 'Record medication', priority: 'High', due: '03:30 PM' },
    { id: 4, patient: 'Tom Wilson', task: 'Update case notes', priority: 'Low', due: '05:00 PM' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      case 'Low': return 'info';
      default: return 'secondary';
    }
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
                Nurse Dashboard
              </h2>
              <p className="text-muted">Manage patient care and documentation efficiently.</p>
            </div>

            {/* Stats Cards */}
            <div className="row g-4 mb-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="col-6 col-lg-3">
                  <motion.div
                    className="card border-0 shadow-sm h-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="rounded-3 d-flex align-items-center justify-content-center"
                          style={{
                            width: '50px',
                            height: '50px',
                            backgroundColor: stat.bgColor,
                          }}>
                          <stat.icon size={24} style={{ color: stat.color }} />
                        </div>
                        <span className={`badge ${stat.change.startsWith('+') ? 'bg-success' : 'bg-danger'}`}>
                          {stat.change}
                        </span>
                      </div>
                      <h3 className="mb-1">{stat.value}</h3>
                      <p className="text-muted small mb-0">{stat.label}</p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            <div className="row g-4">
              {/* Quick Upload Section */}
              <div className="col-lg-6">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <h5 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Quick Upload
                    </h5>

                    <div className="border-2 border-dashed rounded-4 p-5 text-center"
                      style={{ 
                        borderColor: '#667eea',
                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)';
                      }}
                    >
                      <Upload size={48} className="mb-3" style={{ color: '#667eea' }} />
                      <h6 className="mb-2">Drag & Drop Files Here</h6>
                      <p className="text-muted small mb-3">or click to browse</p>
                      <button className="btn btn-primary">
                        Select Files
                      </button>
                    </div>

                    <div className="mt-4">
                      <label className="form-label">Select Patient</label>
                      <select className="form-select mb-3">
                        <option>Choose patient...</option>
                        <option>John Doe - PT001</option>
                        <option>Jane Smith - PT002</option>
                        <option>Mike Johnson - PT003</option>
                      </select>

                      <label className="form-label">Document Type</label>
                      <select className="form-select mb-3">
                        <option>Choose type...</option>
                        <option>Lab Report</option>
                        <option>X-Ray/Scan</option>
                        <option>Prescription</option>
                        <option>Vitals Record</option>
                        <option>Other</option>
                      </select>

                      <button className="btn w-100 text-white"
                        style={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        }}>
                        Upload Document
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Uploads */}
              <div className="col-lg-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="mb-0" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Recent Uploads
                      </h5>
                      <button className="btn btn-sm btn-outline-primary">View All</button>
                    </div>

                    <div className="d-flex flex-column gap-3">
                      {recentUploads.map((upload, idx) => (
                        <motion.div
                          key={idx}
                          className="d-flex align-items-start gap-3 p-3 rounded-3 border"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          style={{ background: '#f8f9fa' }}
                        >
                          <div className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{
                              width: '45px',
                              height: '45px',
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            }}>
                            <FileText size={20} className="text-white" />
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="mb-1">{upload.patient}</h6>
                            <p className="text-muted small mb-1">{upload.type} • {upload.file}</p>
                            <div className="d-flex justify-content-between align-items-center">
                              <small className="text-muted">{upload.time}</small>
                              <span className="badge bg-success">{upload.status}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pending Tasks */}
            <div className="row g-4 mt-2">
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="mb-0" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Pending Tasks
                      </h5>
                      <button className="btn btn-sm btn-primary">Add Task</button>
                    </div>

                    <div className="table-responsive">
                      <table className="table table-hover align-middle">
                        <thead className="bg-light">
                          <tr>
                            <th className="border-0">Patient</th>
                            <th className="border-0">Task</th>
                            <th className="border-0">Priority</th>
                            <th className="border-0">Due Time</th>
                            <th className="border-0">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pendingTasks.map((task, idx) => (
                            <motion.tr
                              key={idx}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: idx * 0.05 }}
                            >
                              <td>{task.patient}</td>
                              <td>{task.task}</td>
                              <td>
                                <span className={`badge bg-${getPriorityColor(task.priority)}`}>
                                  {task.priority}
                                </span>
                              </td>
                              <td>
                                <div className="d-flex align-items-center gap-2">
                                  <Clock size={14} className="text-muted" />
                                  <span className="small">{task.due}</span>
                                </div>
                              </td>
                              <td>
                                <button className="btn btn-sm btn-success me-2">Complete</button>
                                <button className="btn btn-sm btn-light">View</button>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
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

export default NurseDashboard;
