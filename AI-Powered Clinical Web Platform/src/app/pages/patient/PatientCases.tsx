import React from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

const mockCases = [
  { id: 'C-1023', title: 'Knee Pain Follow-up', date: '2025-11-02', doctor: 'Dr. Sarah Johnson', status: 'Closed' },
  { id: 'C-1104', title: 'Hypertension Management', date: '2026-01-10', doctor: 'Dr. Michael Brown', status: 'Open' },
  { id: 'C-1130', title: 'Routine Checkup', date: '2026-02-01', doctor: 'Dr. Sarah Johnson', status: 'Closed' },
];

const PatientCases: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-vh-100" style={{ background: '#f8f9fa', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="d-lg-flex">
        <div className="flex-grow-1">
          <Navbar onMenuClick={() => setSidebarOpen(true)} />
          <div className="container-fluid p-4">
            <div className="mb-4">
              <h2 className="mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>My Case History</h2>
              <p className="text-muted">All of your past and current clinical cases.</p>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="list-group">
                      {mockCases.map((c) => (
                        <div key={c.id} className="list-group-item d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1">{c.title}</h6>
                            <small className="text-muted">{c.date} • {c.doctor}</small>
                          </div>
                          <div className="text-end">
                            <span className={`badge ${c.status === 'Open' ? 'bg-warning text-dark' : 'bg-success'}`}>{c.status}</span>
                          </div>
                        </div>
                      ))}
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

export default PatientCases;
