import React, { useState } from 'react';
import { Users, FileText, Calendar, AlertCircle, TrendingUp, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

const DoctorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    {
      icon: Users,
      label: 'Total Patients',
      value: '324',
      change: '+12%',
      color: '#667eea',
      bgColor: '#f0f1ff',
    },
    {
      icon: Calendar,
      label: 'Appointments Today',
      value: '18',
      change: '+5%',
      color: '#10b981',
      bgColor: '#d1fae5',
    },
    {
      icon: FileText,
      label: 'Pending Reports',
      value: '7',
      change: '-3%',
      color: '#f59e0b',
      bgColor: '#fef3c7',
    },
    {
      icon: AlertCircle,
      label: 'Active Cases',
      value: '42',
      change: '+8%',
      color: '#ef4444',
      bgColor: '#fee2e2',
    },
  ];

  const recentPatients = [
    { id: 'PT001', name: 'Michael Brown', age: 45, condition: 'Hypertension', lastVisit: '2026-02-18', status: 'Critical' },
    { id: 'PT002', name: 'Sarah Wilson', age: 32, condition: 'Diabetes Type 2', lastVisit: '2026-02-17', status: 'Stable' },
    { id: 'PT003', name: 'James Anderson', age: 58, condition: 'Heart Disease', lastVisit: '2026-02-16', status: 'Monitoring' },
    { id: 'PT004', name: 'Emma Davis', age: 28, condition: 'Asthma', lastVisit: '2026-02-15', status: 'Stable' },
    { id: 'PT005', name: 'Robert Taylor', age: 51, condition: 'Arthritis', lastVisit: '2026-02-14', status: 'Follow-up' },
  ];

  const upcomingAppointments = [
    { time: '09:00 AM', patient: 'John Smith', type: 'Consultation', duration: '30 min' },
    { time: '10:30 AM', patient: 'Mary Johnson', type: 'Follow-up', duration: '15 min' },
    { time: '02:00 PM', patient: 'David Lee', type: 'Check-up', duration: '20 min' },
    { time: '03:30 PM', patient: 'Lisa Chen', type: 'Consultation', duration: '30 min' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical': return 'danger';
      case 'Stable': return 'success';
      case 'Monitoring': return 'warning';
      case 'Follow-up': return 'info';
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
                Doctor Dashboard
              </h2>
              <p className="text-muted">Welcome back! Here's your overview for today.</p>
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
              {/* Recent Patients Table */}
              <div className="col-lg-8">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="mb-0" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Recent Patients
                      </h5>
                      <button className="btn btn-sm btn-outline-primary">View All</button>
                    </div>

                    <div className="table-responsive">
                      <table className="table table-hover align-middle">
                        <thead className="bg-light">
                          <tr>
                            <th className="border-0">Patient ID</th>
                            <th className="border-0">Name</th>
                            <th className="border-0 d-none d-md-table-cell">Age</th>
                            <th className="border-0 d-none d-lg-table-cell">Condition</th>
                            <th className="border-0 d-none d-xl-table-cell">Last Visit</th>
                            <th className="border-0">Status</th>
                            <th className="border-0">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentPatients.map((patient, idx) => (
                            <motion.tr
                              key={idx}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: idx * 0.05 }}
                            >
                              <td className="small">{patient.id}</td>
                              <td>{patient.name}</td>
                              <td className="d-none d-md-table-cell">{patient.age}</td>
                              <td className="d-none d-lg-table-cell small">{patient.condition}</td>
                              <td className="d-none d-xl-table-cell small">{patient.lastVisit}</td>
                              <td>
                                <span className={`badge bg-${getStatusColor(patient.status)}`}>
                                  {patient.status}
                                </span>
                              </td>
                              <td>
                                <button className="btn btn-sm btn-light">
                                  <Eye size={16} />
                                </button>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Appointments */}
              <div className="col-lg-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Today's Appointments
                    </h5>

                    <div className="d-flex flex-column gap-3">
                      {upcomingAppointments.map((appointment, idx) => (
                        <motion.div
                          key={idx}
                          className="p-3 rounded-3 border"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          style={{ background: '#f8f9fa' }}
                        >
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div className="rounded-2 px-2 py-1 text-white small"
                              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                              {appointment.time}
                            </div>
                            <span className="badge bg-light text-dark">{appointment.duration}</span>
                          </div>
                          <h6 className="mb-1">{appointment.patient}</h6>
                          <p className="text-muted small mb-0">{appointment.type}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="row g-4 mt-2">
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="mb-0" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Patient Statistics
                      </h5>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-secondary">Week</button>
                        <button className="btn btn-sm btn-primary">Month</button>
                        <button className="btn btn-sm btn-outline-secondary">Year</button>
                      </div>
                    </div>
                    
                    <div className="d-flex align-items-center justify-content-center py-5 text-muted">
                      <div className="text-center">
                        <TrendingUp size={48} className="mb-3" />
                        <p>Chart visualization would be displayed here</p>
                        <p className="small">Using Recharts library for detailed analytics</p>
                      </div>
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

export default DoctorDashboard;
