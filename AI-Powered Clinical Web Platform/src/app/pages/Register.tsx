import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { 
  User, Mail, Phone, Calendar, MapPin, 
  Lock, CheckCircle, Heart 
} from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../components/ui/input-otp';
import { toast } from 'sonner';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    address: '',
    password: '',
    confirmPassword: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowOTP(true);
      toast.success('OTP sent to your email for verification');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
    
    setLoading(true);
    try {
      await register(formData);
      setShowOTP(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        navigate('/patient/dashboard');
      }, 2000);
    } catch (error) {
      toast.error('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-5" style={{ 
      fontFamily: 'Inter, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }}>
      <div className="container">
        <motion.div 
          className="row justify-content-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="col-lg-8 col-xl-7">
            <div className="bg-white rounded-4 shadow-lg p-4 p-md-5">
              <div className="text-center mb-4">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3" 
                  style={{ 
                    width: '70px', 
                    height: '70px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}>
                  <Heart size={35} className="text-white" />
                </div>
                <h2 className="mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Patient Registration
                </h2>
                <p className="text-muted">Create your account to access healthcare services</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Full Name *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <User size={18} className="text-muted" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Email Address *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <Mail size={18} className="text-muted" />
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Phone Number *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <Phone size={18} className="text-muted" />
                      </span>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Date of Birth *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <Calendar size={18} className="text-muted" />
                      </span>
                      <input
                        type="date"
                        className="form-control"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Gender *</label>
                    <select
                      className="form-select"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Address *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <MapPin size={18} className="text-muted" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        placeholder="City, State"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Password *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <Lock size={18} className="text-muted" />
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Min. 6 characters"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Confirm Password *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <Lock size={18} className="text-muted" />
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        placeholder="Re-enter password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-check mt-4 mb-4">
                  <input type="checkbox" className="form-check-input" id="terms" required />
                  <label className="form-check-label small" htmlFor="terms">
                    I agree to the <a href="#" className="text-decoration-none">Terms & Conditions</a> and{' '}
                    <a href="#" className="text-decoration-none">Privacy Policy</a>
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn w-100 text-white py-3 mb-3 rounded-3"
                  disabled={loading}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm me-2" />
                  ) : null}
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>

                <div className="text-center">
                  <p className="text-muted mb-0">
                    Already have an account?{' '}
                    <Link to="/" className="text-decoration-none fw-semibold" 
                      style={{ color: '#667eea' }}>
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      {/* OTP Verification Modal */}
      <Dialog open={showOTP} onOpenChange={setShowOTP}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>Verify Your Email</DialogTitle>
          <DialogDescription className="text-center text-muted">
            We've sent a verification code to {formData.email}
          </DialogDescription>
          <div className="text-center py-4">
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4" 
              style={{ 
                width: '80px', 
                height: '80px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}>
              <Mail size={40} className="text-white" />
            </div>

            <div className="d-flex justify-content-center mb-4">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <button
              onClick={handleOTPSubmit}
              className="btn w-100 text-white py-3 mb-3 rounded-3"
              disabled={loading || otp.length !== 6}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
              }}
            >
              {loading ? 'Verifying...' : 'Verify & Complete Registration'}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Registration Successful!
          </DialogTitle>
          <DialogDescription className="text-center text-muted">
            Your account has been created successfully.
          </DialogDescription>
          <div className="text-center py-5">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <CheckCircle size={80} className="text-success mb-4" />
            </motion.div>
            
            <p className="text-muted">
              Redirecting to dashboard...
            </p>
            
            <div className="spinner-border text-primary mt-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Register;