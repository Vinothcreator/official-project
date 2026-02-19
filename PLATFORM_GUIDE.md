# HealthCare AI Platform - User Guide

## 🏥 Platform Overview

The HealthCare AI Platform is a modern, responsive clinical web application designed for three primary user roles:
- **Doctors**: Manage patients, view case histories, and handle appointments
- **Nurses**: Upload reports, update vitals, and manage patient documentation
- **Patients**: Access health records, book appointments, and interact with AI assistant

## 🎨 Design Features

### Visual Design
- **Color Scheme**: Professional medical theme with soft healthcare colors (white, light blue #667eea, purple #764ba2, teal, soft green)
- **Typography**: Inter (body text) and Poppins (headings) for professional appearance
- **UI Elements**: 
  - Glassmorphism effects
  - Rounded cards with soft shadows
  - Smooth micro-interactions and hover effects
  - Custom gradient scrollbars
  - Animated components with Motion/React

### Responsive Layout
- **Bootstrap 5 Grid System**: Fully responsive across desktop (1440px) and mobile (375px)
- **Mobile Features**:
  - Collapsible sidebar with hamburger menu
  - Vertically stacked cards
  - Touch-friendly buttons
  - Optimized table views

## 🔐 Authentication System

### Login Flow
1. Navigate to login page (split-screen design)
2. Enter email, password, and select role (Doctor/Nurse/Patient)
3. Click "Sign In" to receive OTP
4. Enter 6-digit OTP code sent to email
5. Successfully redirected to role-specific dashboard

**Demo Credentials** (any email/password works):
- Role: Doctor → `/doctor/dashboard`
- Role: Nurse → `/nurse/dashboard`
- Role: Patient → `/patient/dashboard`

### Registration (Patients Only)
1. Click "Register as New Patient"
2. Fill in personal details:
   - Full Name, Email, Phone
   - Date of Birth, Gender, Address
   - Password (minimum 6 characters)
3. Accept terms and conditions
4. Verify email with OTP
5. Account created successfully

### OTP Verification
- 6-digit OTP input with individual slots
- Resend OTP option with 60-second countdown
- Automatic validation and error handling

## 👨‍⚕️ Doctor Dashboard

### Overview Features
- **Statistics Cards**: Total patients, active cases, today's appointments, pending reports
- **Recent Patients Table**: Quick view with patient ID, name, age, condition, last visit, status
- **Today's Appointments**: Timeline view with patient names, appointment types, and duration
- **Performance Charts**: Visual analytics (placeholder for Recharts integration)

### Navigation Menu
- Dashboard Overview
- Patient Management
- Case History
- Reports
- Appointments
- Messages

### Patient Details View
Access comprehensive patient information through tabs:
1. **Case History**: Timeline of medical conditions and treatments
2. **Lab Reports**: Downloadable test results and reports
3. **Prescriptions**: Current medications with dosage and frequency
4. **Visit History**: Chronological record of consultations with clinical notes

## 👩‍⚕️ Nurse Dashboard

### Overview Features
- **Statistics Cards**: Patients assigned, reports uploaded, vitals updated, tasks completed
- **Quick Upload Section**: 
  - Drag-and-drop file upload interface
  - Patient selection dropdown
  - Document type categorization
  - Real-time upload status
- **Recent Uploads**: List of recently uploaded documents with patient info
- **Pending Tasks**: Priority-based task management with due times

### Upload Capabilities
- Lab Reports
- X-Ray/Scan Images
- Prescriptions
- Vitals Records
- Custom document types

### Task Management
- High/Medium/Low priority indicators
- Due time tracking
- Quick completion actions

## 🧑‍🦽 Patient Dashboard

### Health Overview
- **Health Summary Card**: Real-time vital statistics
  - Heart Rate
  - Blood Pressure
  - Body Temperature
  - Oxygen Level
- **Recent Reports**: Access to lab results with doctor information and status
- **Upcoming Appointment**: Next scheduled consultation details

### Appointment Management
- View current appointments
- Reschedule or cancel options
- Doctor information and specialty

### AI Chatbot Assistant

#### Features
- Floating chat button for easy access
- Full-screen chat window with:
  - Quick question buttons
  - Real-time message exchange
  - Typing indicators
  - Chat history

#### Available Queries
- Check doctor availability
- View lab reports
- Clinic working hours
- Next appointment time
- General medical guidance

#### Quick Questions
- "Check doctor availability"
- "View my lab reports"
- "What are clinic hours?"
- "When is my next appointment?"

## 🎯 Key Features

### Security
- OTP-based two-factor authentication
- Role-based access control
- Secure session management

### User Experience
- Intuitive navigation with persistent sidebar
- Search functionality for patients and reports
- Notification bell with dropdown
- Profile dropdown menu
- Real-time status indicators

### Accessibility
- Responsive on all devices
- Touch-friendly interfaces
- Clear visual hierarchy
- High contrast ratios
- Screen reader compatible elements

## 📱 Mobile Optimization

### Mobile Features
- Hamburger menu for navigation
- Collapsible sidebar overlay
- Responsive tables (hidden columns on smaller screens)
- Touch-optimized buttons (minimum 44px)
- Stacked card layouts
- Mobile-friendly forms

### Breakpoints
- Desktop: 1440px (lg+)
- Tablet: 768px (md)
- Mobile: 375px (sm)

## 🛠️ Technical Stack

### Frontend
- **React 18.3**: Modern UI framework
- **React Router 7**: Client-side routing
- **Bootstrap 5**: Responsive grid system
- **Tailwind CSS 4**: Utility-first styling
- **Motion/React**: Smooth animations
- **Lucide React**: Modern icon library

### UI Components
- Custom-built with Radix UI primitives
- Accessible and composable
- Fully styled with Tailwind

## 🎨 Color Palette

### Primary Colors
- Primary Blue: `#667eea`
- Primary Purple: `#764ba2`
- Success Green: `#10b981`
- Warning Orange: `#f59e0b`
- Danger Red: `#ef4444`
- Info Cyan: `#06b6d4`

### Neutral Colors
- White: `#ffffff`
- Light Gray: `#f8f9fa`
- Medium Gray: `#ececf0`
- Dark Gray: `#717182`

### Gradients
- Primary Gradient: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`

## 📊 Mock Data

The platform uses realistic mock data for demonstration:
- Patient records with medical conditions
- Lab reports and test results
- Appointment schedules
- Vital statistics
- Prescription information
- Task lists

## 🚀 Getting Started

### For Doctors
1. Login with Doctor role
2. View dashboard statistics
3. Access patient management
4. Review appointments and reports

### For Nurses
1. Login with Nurse role
2. Navigate to upload section
3. Select patient and document type
4. Upload files via drag-and-drop
5. Track pending tasks

### For Patients
1. Register new account or login
2. View health summary
3. Access medical reports
4. Book appointments
5. Chat with AI assistant

## 🔄 Future Enhancements

Potential additions for production:
- Real backend integration with Supabase
- Video consultation feature
- Prescription refill requests
- Medical history export (PDF)
- Multi-language support
- Dark mode toggle
- Advanced analytics with Recharts
- Push notifications
- Calendar integration
- Telemedicine capabilities

## 📞 Support

The platform includes:
- Built-in chatbot for common queries
- Help & Support in profile menu
- Notification system for updates
- Real-time status indicators

---

**Note**: This is a frontend demo with mock data. For production use, integrate with a secure backend (e.g., Supabase) for data persistence and real-time updates.
