import React from 'react';
import './LoginScreen.css';
import icon from '../assets/icon.png';
import doctorLogin from '../assets/doctor-login.png';

export default function DigiHealthLoginScreen() {
  return (
    <div className="login-screen-container">
      <div className="login-form-container">
        <div className="header-container">
          <div className="logo-container">
            <img alt="DigiHealth Logo" className="logo-image" src={icon} />
          </div>
          <p className="header-title">DigiHealth</p>
          <p className="header-subtitle">Doctor Portal</p>
        </div>
        <div className="form-card">
          <p className="welcome-text">Welcome Back</p>
          <button className="google-btn">
            <img alt="Google Icon" src={doctorLogin} />
            Continue with Google
          </button>
          <div className="divider-container">
            <div className="divider-line" />
            <p className="divider-text">Or login with email</p>
            <div className="divider-line" />
          </div>
          <div className="form-inputs">
            <label>Email Address</label>
            <input type="email" placeholder="doctor@digihealth.com" />
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
            <a href="#" className="forgot-password">Forgot Password?</a>
            <button className="login-btn">Login</button>
          </div>
          <div className="register-link">
            <p>Don't have an account? <a href="#">Register as a Doctor</a></p>
          </div>
        </div>
        <div className="footer-container">
          <p>DigiHealth Clinic Management System</p>
          <p>© 2025 DigiHealth. All rights reserved.</p>
          <p>For support: support@digihealth.com</p>
        </div>
      </div>
    </div>
  );
}
