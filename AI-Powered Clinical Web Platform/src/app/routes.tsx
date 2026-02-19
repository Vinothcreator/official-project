import { createBrowserRouter, Navigate } from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import NurseDashboard from './pages/nurse/NurseDashboard';
import PatientDashboard from './pages/patient/PatientDashboard';
import PatientCases from './pages/patient/PatientCases';
import ProfileSettings from './pages/patient/ProfileSettings';
import PatientAppointments from './pages/patient/PatientAppointments';
import Notifications from './pages/common/Notifications';
import HelpSupport from './pages/common/HelpSupport';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/doctor',
    children: [
      {
        path: 'dashboard',
        element: <DoctorDashboard />,
      },
      {
        path: 'patients',
        element: <DoctorDashboard />,
      },
      {
        path: 'cases',
        element: <DoctorDashboard />,
      },
      {
        path: 'reports',
        element: <DoctorDashboard />,
      },
      {
        path: 'appointments',
        element: <DoctorDashboard />,
      },
      {
        path: 'chatbot',
        element: <DoctorDashboard />,
      },
      {
        path: 'messages',
        element: <DoctorDashboard />,
      },
      {
        path: 'notifications',
        element: <Notifications />,
      },
      {
        path: 'profile',
        element: <ProfileSettings />,
      },
      {
        path: 'help',
        element: <HelpSupport />,
      },
    ],
  },
  {
    path: '/nurse',
    children: [
      {
        path: 'dashboard',
        element: <NurseDashboard />,
      },
      {
        path: 'patients',
        element: <NurseDashboard />,
      },
      {
        path: 'upload',
        element: <NurseDashboard />,
      },
      {
        path: 'vitals',
        element: <NurseDashboard />,
      },
      {
        path: 'cases',
        element: <NurseDashboard />,
      },
      {
        path: 'messages',
        element: <NurseDashboard />,
      },
      {
        path: 'notifications',
        element: <Notifications />,
      },
      {
        path: 'profile',
        element: <ProfileSettings />,
      },
      {
        path: 'help',
        element: <HelpSupport />,
      },
    ],
  },
  {
    path: '/patient',
    children: [
      {
        path: 'dashboard',
        element: <PatientDashboard />,
      },
      {
        path: 'cases',
        element: <PatientCases />,
      },
      {
        path: 'reports',
        element: <PatientDashboard />,
      },
      {
        path: 'appointments',
        element: <PatientAppointments />,
      },
      {
        path: 'chatbot',
        element: <PatientDashboard />,
      },
      {
        path: 'messages',
        element: <PatientDashboard />,
      },
      {
        path: 'notifications',
        element: <Notifications />,
      },
      {
        path: 'profile',
        element: <ProfileSettings />,
      },
      {
        path: 'help',
        element: <HelpSupport />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);