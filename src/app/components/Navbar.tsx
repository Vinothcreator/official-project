import React, { useState } from 'react';
import { Menu, Bell, Search, User, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const notifications = [
    { id: 1, text: 'New appointment scheduled for tomorrow', time: '5 min ago', unread: true },
    { id: 2, text: 'Lab report is ready for download', time: '1 hour ago', unread: true },
    { id: 3, text: 'Prescription refill reminder', time: '2 hours ago', unread: false },
  ];

  const handleLogoutClick = () => {
    setShowProfile(false);
    setShowLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutDialog(false);
    logout();
    navigate('/');
  };

  return (
    <>
      <nav className="bg-white border-bottom shadow-sm sticky-top" style={{ zIndex: 1100 }}>
        <div className="container-fluid px-4 py-3">
          <div className="row align-items-center">
            {/* Mobile Menu + Search */}
            <div className="col-6 col-md-4 d-flex align-items-center gap-3">
              <button
                className="btn btn-link text-dark p-0"
                onClick={onMenuClick}
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
              
              
              <div className="d-none d-md-flex align-items-center bg-light rounded-pill px-3 py-2 flex-grow-1">
                <Search size={18} className="text-muted" />
                <input
                  type="text"
                  className="border-0 bg-transparent ms-2 w-100"
                  placeholder="Search patients, reports..."
                  style={{ outline: 'none' }}
                  aria-label="Search"
                />
              </div>
            </div>

            {/* User Info + Actions */}
            <div className="col-6 col-md-8 d-flex align-items-center justify-content-end gap-3">
              {/* Mobile Search Icon */}
              <button className="btn btn-link text-dark p-0 d-md-none" aria-label="Search">
                <Search size={20} />
              </button>

              {/* Notifications */}
              <div className="position-relative">
                <button
                  className="btn btn-link text-dark p-0 position-relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                  aria-label="Notifications"
                >
                  <Bell size={20} />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: '0.6rem', padding: '0.2rem 0.4rem' }}
                    aria-label="2 unread notifications">
                    2
                  </span>
                </button>

                {showNotifications && (
                  <motion.div
                    className="position-absolute end-0 mt-2 bg-white rounded-3 shadow-lg border"
                    style={{ width: '320px', zIndex: 1100 }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    role="menu"
                  >
                    <div className="p-3 border-bottom">
                      <h6 className="mb-0">Notifications</h6>
                    </div>
                    <div className="overflow-auto" style={{ maxHeight: '300px' }}>
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-3 border-bottom ${notif.unread ? 'bg-light' : ''}`}
                          style={{ cursor: 'pointer' }}
                          role="menuitem"
                        >
                          <p className="mb-1 small">{notif.text}</p>
                          <small className="text-muted">{notif.time}</small>
                        </div>
                      ))}
                    </div>
                    <div className="p-2 text-center border-top">
                      <Link 
                        to={`/${user?.role}/notifications`} 
                        className="small text-decoration-none"
                        onClick={() => setShowNotifications(false)}
                      >
                        View all notifications
                      </Link>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="position-relative">
                <button
                  className="btn btn-link p-0 d-flex align-items-center gap-2 text-decoration-none"
                  onClick={() => setShowProfile(!showProfile)}
                  aria-label="User menu"
                  aria-expanded={showProfile}
                >
                  <div className="d-none d-sm-block text-end">
                    <div className="small mb-0 text-dark">{user?.name}</div>
                    <div className="text-muted text-capitalize" style={{ fontSize: '0.75rem' }}>
                      {user?.role}
                    </div>
                  </div>
                  <div className="rounded-circle overflow-hidden border border-2"
                    style={{ width: '40px', height: '40px', borderColor: '#667eea !important' }}>
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-100 h-100 object-fit-cover" />
                    ) : (
                      <div className="w-100 h-100 d-flex align-items-center justify-content-center"
                        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                        <User size={20} className="text-white" />
                      </div>
                    )}
                  </div>
                </button>

                {showProfile && (
                  <motion.div
                    className="position-absolute end-0 mt-2 bg-white rounded-3 shadow-lg border"
                    style={{ width: '200px', zIndex: 1100 }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    role="menu"
                  >
                    <div className="p-2">
                      <Link 
                        to={`/${user?.role}/profile`} 
                        className="dropdown-item rounded-2 py-2 d-flex align-items-center gap-2"
                        onClick={() => setShowProfile(false)}
                        role="menuitem"
                      >
                        <User size={16} />
                        My Profile
                      </Link>
                      <Link 
                        to={`/${user?.role}/profile`} 
                        className="dropdown-item rounded-2 py-2 d-flex align-items-center gap-2"
                        onClick={() => setShowProfile(false)}
                        role="menuitem"
                      >
                        <Settings size={16} />
                        Settings
                      </Link>
                      <Link 
                        to={`/${user?.role}/help`} 
                        className="dropdown-item rounded-2 py-2 d-flex align-items-center gap-2"
                        onClick={() => setShowProfile(false)}
                        role="menuitem"
                      >
                        <HelpCircle size={16} />
                        Help & Support
                      </Link>
                      <hr className="my-1" />
                      <button 
                        className="dropdown-item rounded-2 py-2 d-flex align-items-center gap-2 text-danger"
                        onClick={handleLogoutClick}
                        role="menuitem"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

        {/* Spacer to offset sticky navbar height so page content isn't hidden */}
        <div style={{ height: '72px' }} />

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be securely logged out of your account. Any unsaved changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogoutConfirm} className="bg-danger">
              Logout Securely
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Navbar;