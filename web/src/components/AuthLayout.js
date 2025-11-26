import React from "react";
import "./AuthLayout.css";

const AuthLayout = ({ subtitle, children }) => {
  return (
    <div className="auth-layout-container">
      <div className="auth-content-container">
        {/* Shared Header Section */}
        <div className="header-container">
          <div className="logo-container">
            <img
              alt="DigiHealth Logo"
              className="logo-image"
              src="/assets/icon.svg"
            />
          </div>
          <p className="header-subtitle">{subtitle}</p>
        </div>

        {/* Dynamic Content (Forms/Steppers go here) */}
        <div className="auth-body">{children}</div>

        {/* Shared Footer Section */}
        <div className="footer-container">
          <p>DigiHealth Clinic Management System</p>
          <p>For support: support@digihealth.com</p>
          <p>© 2025 DigiHealth. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
