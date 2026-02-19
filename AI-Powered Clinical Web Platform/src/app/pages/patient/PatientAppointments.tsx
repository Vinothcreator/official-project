import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { Calendar, Clock, User } from 'lucide-react';
import { toast } from 'sonner';

const initialAppointments = [
  { id: 'A-1001', doctor: 'Dr. Sarah Johnson', specialty: 'Cardiology', date: '2026-02-22', time: '10:30 AM', status: 'Confirmed' },
  { id: 'A-1002', doctor: 'Dr. Michael Brown', specialty: 'Orthopedics', date: '2026-03-05', time: '02:00 PM', status: 'Pending' },
  { id: 'A-1003', doctor: 'Dr. Sarah Johnson', specialty: 'Cardiology', date: '2026-04-10', time: '09:00 AM', status: 'Confirmed' },
];

const PatientAppointments: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [appointments, setAppointments] = useState(initialAppointments);

  const handleCancel = (id: string) => {
    setAppointments((prev) => prev.filter(a => a.id !== id));
    toast.success('Appointment cancelled');
  };

  const handleReschedule = (id: string) => {
    setAppointments((prev) => prev.map(a => a.id === id ? { ...a, date: a.date, time: a.time, status: 'Rescheduled' } : a));
    toast.success('Appointment rescheduled (mock)');
  };

  return (
    <div className="min-vh-100" style={{ background: '#f8f9fa', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="d-lg-flex">
        <div className="flex-grow-1">
          <Navbar onMenuClick={() => setSidebarOpen(true)} />
          <div className="container-fluid p-4">
            <div className="mb-4">
              <h2 className="mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>My Appointments</h2>
              <p className="text-muted">Manage your upcoming and past appointments.</p>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="list-group">
                      {appointments.map((a) => (
                        <div key={a.id} className="list-group-item d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1">{a.doctor} <small className="text-muted">• {a.specialty}</small></h6>
                            <p className="text-muted small mb-0"><Calendar size={12} className="me-1" /> {a.date} <Clock size={12} className="ms-2 me-1" /> {a.time}</p>
                            <small className="text-muted">ID: {a.id}</small>
                          </div>
                          <div className="text-end">
                            <span className={`badge ${a.status === 'Confirmed' ? 'bg-success' : a.status === 'Pending' ? 'bg-warning text-dark' : 'bg-secondary'}`}>{a.status}</span>
                            <div className="mt-2 d-flex gap-2 justify-content-end">
                              <button className="btn btn-sm btn-outline-primary" onClick={() => handleReschedule(a.id)}>Reschedule</button>
                              <button className="btn btn-sm btn-outline-danger" onClick={() => handleCancel(a.id)}>Cancel</button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {appointments.length === 0 && (
                        <div className="p-4 text-center text-muted">No appointments found.</div>
                      )}
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

export default PatientAppointments;
