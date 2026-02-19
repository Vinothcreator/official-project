import React, { useState } from 'react';
import { Save, X, User, Mail, Phone, MapPin, Heart, AlertCircle, Shield, Bell, Palette, Globe, Monitor } from 'lucide-react';
import { motion } from 'motion/react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { toast } from 'sonner';

const ProfileSettings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, New York, NY 10001',
    medicalHistory: 'Hypertension, Diabetes Type 2',
    emergencyContact: 'Jane Doe - +1 (555) 987-6543',
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    labResultAlerts: true,
    darkMode: false,
    language: 'en',
    fontSize: 'medium',
    highContrast: false,
    screenReader: false,
  });

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset to original values if needed
  };

  const tabs = [
    { id: 'profile', label: 'Account Settings', icon: User },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'accessibility', label: 'Accessibility', icon: Heart },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'preferences', label: 'Preferences', icon: Globe },
  ];

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
                Settings & Profile
              </h2>
              <p className="text-muted">Manage your account settings and preferences</p>
            </div>

            <div className="row g-4">
              {/* Tabs Sidebar */}
              <div className="col-lg-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        className={`btn w-100 text-start d-flex align-items-center gap-2 mb-1 ${
                          activeTab === tab.id ? 'btn-primary' : 'btn-light'
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        <tab.icon size={18} />
                        <span className="d-none d-lg-inline">{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="col-lg-9">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Profile Settings Tab */}
                  {activeTab === 'profile' && (
                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <h5 className="mb-0" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Account Information
                          </h5>
                          {!isEditing ? (
                            <button 
                              className="btn btn-primary"
                              onClick={() => setIsEditing(true)}
                            >
                              Edit Profile
                            </button>
                          ) : (
                            <div className="d-flex gap-2">
                              <button 
                                className="btn btn-outline-secondary"
                                onClick={handleCancelEdit}
                              >
                                <X size={18} className="me-1" />
                                Cancel
                              </button>
                              <button 
                                className="btn btn-success"
                                onClick={handleSaveProfile}
                              >
                                <Save size={18} className="me-1" />
                                Save Changes
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="row g-4">
                          <div className="col-md-6">
                            <label className="form-label d-flex align-items-center gap-2">
                              <User size={16} className="text-primary" />
                              Full Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={profileData.name}
                              onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                              disabled={!isEditing}
                            />
                          </div>

                          <div className="col-md-6">
                            <label className="form-label d-flex align-items-center gap-2">
                              <Mail size={16} className="text-primary" />
                              Email Address
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              value={profileData.email}
                              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                              disabled={!isEditing}
                            />
                            {isEditing && (
                              <small className="text-muted">Changes to email require OTP verification</small>
                            )}
                          </div>

                          <div className="col-md-6">
                            <label className="form-label d-flex align-items-center gap-2">
                              <Phone size={16} className="text-primary" />
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              className="form-control"
                              value={profileData.phone}
                              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                              disabled={!isEditing}
                            />
                          </div>

                          <div className="col-md-6">
                            <label className="form-label d-flex align-items-center gap-2">
                              <MapPin size={16} className="text-primary" />
                              Address
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={profileData.address}
                              onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                              disabled={!isEditing}
                            />
                          </div>

                          <div className="col-12">
                            <label className="form-label d-flex align-items-center gap-2">
                              <Heart size={16} className="text-danger" />
                              Medical History Summary
                            </label>
                            <textarea
                              className="form-control"
                              rows={3}
                              value={profileData.medicalHistory}
                              onChange={(e) => setProfileData({...profileData, medicalHistory: e.target.value})}
                              disabled={!isEditing}
                            />
                          </div>

                          <div className="col-12">
                            <label className="form-label d-flex align-items-center gap-2">
                              <AlertCircle size={16} className="text-warning" />
                              Emergency Contact
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={profileData.emergencyContact}
                              onChange={(e) => setProfileData({...profileData, emergencyContact: e.target.value})}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Privacy & Security Tab */}
                  {activeTab === 'privacy' && (
                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <h5 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          Privacy & Security
                        </h5>

                        <div className="d-flex flex-column gap-4">
                          <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3">
                            <div>
                              <h6 className="mb-1">Two-Factor Authentication</h6>
                              <p className="text-muted small mb-0">Add an extra layer of security</p>
                            </div>
                            <button className="btn btn-primary">Enable</button>
                          </div>

                          <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3">
                            <div>
                              <h6 className="mb-1">Change Password</h6>
                              <p className="text-muted small mb-0">Update your account password</p>
                            </div>
                            <button className="btn btn-outline-primary">Change</button>
                          </div>

                          <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3">
                            <div>
                              <h6 className="mb-1">Connected Devices</h6>
                              <p className="text-muted small mb-0">Manage devices with access to your account</p>
                            </div>
                            <button className="btn btn-outline-primary">Manage</button>
                          </div>

                          <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3">
                            <div>
                              <h6 className="mb-1">Data Privacy</h6>
                              <p className="text-muted small mb-0">Control how your data is used</p>
                            </div>
                            <button className="btn btn-outline-primary">Review</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notifications Tab */}
                  {activeTab === 'notifications' && (
                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <h5 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          Notification Preferences
                        </h5>

                        <div className="d-flex flex-column gap-3">
                          <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3">
                            <div>
                              <h6 className="mb-1">Email Notifications</h6>
                              <p className="text-muted small mb-0">Receive updates via email</p>
                            </div>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={settings.emailNotifications}
                                onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                                style={{ width: '3rem', height: '1.5rem' }}
                              />
                            </div>
                          </div>

                          <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3">
                            <div>
                              <h6 className="mb-1">SMS Notifications</h6>
                              <p className="text-muted small mb-0">Receive updates via text message</p>
                            </div>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={settings.smsNotifications}
                                onChange={(e) => setSettings({...settings, smsNotifications: e.target.checked})}
                                style={{ width: '3rem', height: '1.5rem' }}
                              />
                            </div>
                          </div>

                          <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3">
                            <div>
                              <h6 className="mb-1">Appointment Reminders</h6>
                              <p className="text-muted small mb-0">Get notified before appointments</p>
                            </div>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={settings.appointmentReminders}
                                onChange={(e) => setSettings({...settings, appointmentReminders: e.target.checked})}
                                style={{ width: '3rem', height: '1.5rem' }}
                              />
                            </div>
                          </div>

                          <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3">
                            <div>
                              <h6 className="mb-1">Lab Result Alerts</h6>
                              <p className="text-muted small mb-0">Be notified when results are ready</p>
                            </div>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={settings.labResultAlerts}
                                onChange={(e) => setSettings({...settings, labResultAlerts: e.target.checked})}
                                style={{ width: '3rem', height: '1.5rem' }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Accessibility Tab */}
                  {activeTab === 'accessibility' && (
                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <h5 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          Accessibility Settings
                        </h5>

                        <div className="d-flex flex-column gap-3">
                          <div className="p-3 bg-light rounded-3">
                            <label className="form-label">Font Size</label>
                            <select 
                              className="form-select"
                              value={settings.fontSize}
                              onChange={(e) => setSettings({...settings, fontSize: e.target.value})}
                            >
                              <option value="small">Small (14px)</option>
                              <option value="medium">Medium (16px)</option>
                              <option value="large">Large (18px)</option>
                              <option value="xlarge">Extra Large (20px)</option>
                            </select>
                          </div>

                          <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3">
                            <div>
                              <h6 className="mb-1">High Contrast Mode</h6>
                              <p className="text-muted small mb-0">Increase color contrast for better visibility</p>
                            </div>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={settings.highContrast}
                                onChange={(e) => setSettings({...settings, highContrast: e.target.checked})}
                                style={{ width: '3rem', height: '1.5rem' }}
                              />
                            </div>
                          </div>

                          <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3">
                            <div>
                              <h6 className="mb-1">Screen Reader Support</h6>
                              <p className="text-muted small mb-0">Optimize for screen readers (WCAG 2.1 AA)</p>
                            </div>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={settings.screenReader}
                                onChange={(e) => setSettings({...settings, screenReader: e.target.checked})}
                                style={{ width: '3rem', height: '1.5rem' }}
                              />
                            </div>
                          </div>

                          <div className="p-3 bg-light rounded-3">
                            <h6 className="mb-2">Keyboard Navigation</h6>
                            <p className="text-muted small mb-2">Navigate using keyboard shortcuts:</p>
                            <ul className="small mb-0">
                              <li><kbd>Tab</kbd> - Move between elements</li>
                              <li><kbd>Enter</kbd> - Activate buttons/links</li>
                              <li><kbd>Esc</kbd> - Close modals/menus</li>
                              <li><kbd>Arrow Keys</kbd> - Navigate menus</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Appearance Tab */}
                  {activeTab === 'appearance' && (
                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <h5 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          Appearance
                        </h5>

                        <div className="d-flex flex-column gap-3">
                          <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3">
                            <div>
                              <h6 className="mb-1">Dark Mode</h6>
                              <p className="text-muted small mb-0">Switch to dark theme</p>
                            </div>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={settings.darkMode}
                                onChange={(e) => setSettings({...settings, darkMode: e.target.checked})}
                                style={{ width: '3rem', height: '1.5rem' }}
                              />
                            </div>
                          </div>

                          <div className="p-3 bg-light rounded-3">
                            <h6 className="mb-3">Theme Preview</h6>
                            <div className="row g-3">
                              <div className="col-6">
                                <div className="p-3 bg-white rounded-3 border text-center">
                                  <Monitor size={32} className="mb-2 text-primary" />
                                  <p className="small mb-0">Light Theme</p>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="p-3 bg-dark rounded-3 border text-center text-white">
                                  <Monitor size={32} className="mb-2" />
                                  <p className="small mb-0">Dark Theme</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Preferences Tab */}
                  {activeTab === 'preferences' && (
                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <h5 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          General Preferences
                        </h5>

                        <div className="d-flex flex-column gap-3">
                          <div className="p-3 bg-light rounded-3">
                            <label className="form-label">Language</label>
                            <select 
                              className="form-select"
                              value={settings.language}
                              onChange={(e) => setSettings({...settings, language: e.target.value})}
                            >
                              <option value="en">English</option>
                              <option value="es">Español</option>
                              <option value="fr">Français</option>
                              <option value="de">Deutsch</option>
                            </select>
                          </div>

                          <div className="p-3 bg-light rounded-3">
                            <h6 className="mb-2">AI Personalization</h6>
                            <p className="text-muted small mb-3">Allow AI to personalize your dashboard based on your health data and preferences</p>
                            <button className="btn btn-primary">Enable AI Features</button>
                          </div>

                          <div className="p-3 bg-light rounded-3">
                            <h6 className="mb-2">Data Export</h6>
                            <p className="text-muted small mb-3">Download all your health records and data</p>
                            <button className="btn btn-outline-primary">Download My Data</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
