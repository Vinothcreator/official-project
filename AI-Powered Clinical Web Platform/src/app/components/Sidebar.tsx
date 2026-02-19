import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { 
  LayoutDashboard, Users, FileText, Calendar, 
  MessageSquare, LogOut, Upload, Activity,
  ClipboardList, Stethoscope, Heart, Bell, Settings, HelpCircle, Bot
} from 'lucide-react';
import { useAuth, UserRole } from '../context/AuthContext';
import { motion } from 'motion/react';
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

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutDialog, setShowLogoutDialog] = React.useState(false);
  
  const getMenuItems = (role: UserRole) => {
    switch (role) {
      case 'doctor':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/doctor/dashboard' },
          { icon: Users, label: 'Patient Management', path: '/doctor/patients' },
          { icon: ClipboardList, label: 'Case History', path: '/doctor/cases' },
          { icon: FileText, label: 'Lab Reports', path: '/doctor/reports' },
          { icon: Calendar, label: 'Appointments', path: '/doctor/appointments' },
          { icon: Bot, label: 'AI Assistant', path: '/doctor/chatbot' },
          { icon: MessageSquare, label: 'Messages', path: '/doctor/messages' },
          { icon: Bell, label: 'Notifications', path: '/doctor/notifications' },
          { icon: Settings, label: 'Profile Settings', path: '/doctor/profile' },
          { icon: HelpCircle, label: 'Help & Support', path: '/doctor/help' },
        ];
      case 'nurse':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/nurse/dashboard' },
          { icon: Users, label: 'Patient Management', path: '/nurse/patients' },
          { icon: Upload, label: 'Upload Reports', path: '/nurse/upload' },
          { icon: Activity, label: 'Update Vitals', path: '/nurse/vitals' },
          { icon: FileText, label: 'Case Details', path: '/nurse/cases' },
          { icon: MessageSquare, label: 'Messages', path: '/nurse/messages' },
          { icon: Bell, label: 'Notifications', path: '/nurse/notifications' },
          { icon: Settings, label: 'Profile Settings', path: '/nurse/profile' },
          { icon: HelpCircle, label: 'Help & Support', path: '/nurse/help' },
        ];
      case 'patient':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/patient/dashboard' },
          { icon: ClipboardList, label: 'My Case History', path: '/patient/cases' },
          { icon: FileText, label: 'My Reports', path: '/patient/reports' },
          { icon: Calendar, label: 'Appointments', path: '/patient/appointments' },
          { icon: Bot, label: 'Chatbot Assistant', path: '/patient/chatbot' },
          { icon: MessageSquare, label: 'Messages', path: '/patient/messages' },
          { icon: Bell, label: 'Notifications', path: '/patient/notifications' },
          { icon: Settings, label: 'Profile Settings', path: '/patient/profile' },
          { icon: HelpCircle, label: 'Help & Support', path: '/patient/help' },
        ];
      default:
        return [];
    }
  };

  const menuItems = user ? getMenuItems(user.role) : [];

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutDialog(false);
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Overlay shown when sidebar is open */}
      {isOpen && (
        <div 
          className="position-fixed w-100 h-100 top-0 start-0 bg-dark bg-opacity-50"
          style={{ zIndex: 1040 }}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.div
        className={`position-fixed h-100 bg-white shadow-lg d-flex flex-column ${isOpen ? 'translate-x-0' : ''}`}
        style={{
          width: '280px',
          top: 0,
          left: isOpen ? 0 : '-280px',
          zIndex: 1050,
          transition: 'left 0.3s ease',
          fontFamily: 'Inter, sans-serif',
        }}
        initial={false}
      >
        {/* Logo / Header */}
        <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <div className="d-flex align-items-center justify-content-center rounded-3"
              style={{
                width: '45px',
                height: '45px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}>
              <Heart size={24} className="text-white" />
            </div>
            <div>
              <h5 className="mb-0" style={{ fontFamily: 'Poppins, sans-serif' }}>HealthCare AI</h5>
              <small className="text-muted text-capitalize">{user?.role} Portal</small>
            </div>
          </div>
          <button className="btn btn-sm btn-light" onClick={onClose} aria-label="Close sidebar">✕</button>
        </div>

        {/* Menu Items */}
        <div className="flex-grow-1 overflow-auto py-3">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`d-flex align-items-center gap-3 px-4 py-3 text-decoration-none position-relative ${
                  isActive ? 'text-white' : 'text-dark'
                }`}
                onClick={onClose}
                style={{
                  background: isActive ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
                {isActive && (
                  <div className="position-absolute end-0 top-0 bottom-0 bg-white"
                    style={{ width: '4px' }} />
                )}
              </Link>
            );
          })}
        </div>

        {/* Logout */}
        <div className="border-top p-4">
          <button
            onClick={handleLogoutClick}
            className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
          >
            <LogOut size={18} />
            Logout Securely
          </button>
        </div>
      </motion.div>

      {/* Desktop sidebar removed — sidebar now overlays content only when opened */}

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

export default Sidebar;