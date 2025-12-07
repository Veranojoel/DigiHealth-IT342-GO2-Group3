import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./DashboardHeader.css";
import ProfileDropdown from "./ProfileDropdown";
import { useAuth } from "../auth/auth";

const PageHeader = ({ activePage }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { currentUser } = useAuth();

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "/assets/dashboard-icon.svg",
    },
    {
      name: "Patients",
      path: "/patients",
      icon: "/assets/patients-nav-icon.svg",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "/assets/appointments-nav-icon.svg",
    },
  ];

  return (
    <header className="page-header">
      <div className="header-logo-container">
        <div className="logo-background">
          <img src="/assets/header-logo.svg" alt="DigiHealth Logo" />
        </div>
        <div className="header-title-container">
          <h1>DigiHealth</h1>
          <p>Doctor Portal</p>
        </div>
      </div>

      <nav className="header-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={`nav-item ${activePage === item.name ? "active" : ""}`}
          >
            <img src={item.icon} alt={item.name} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="header-user-container">
        <div className="notification-icon">
          <img src="/assets/notification-icon.svg" alt="Notifications" />
          <span className="notification-badge">2</span>
        </div>

        <div className="user-profile" onClick={toggleDropdown}>
          <img
            src="/assets/profile-pic.svg"
            alt={currentUser?.fullName || "User"}
            className="profile-pic"
          />
          <div className="user-info">
            <p className="user-name">{currentUser?.fullName || "Loading..."}</p>
            <p className="user-specialty">
              {currentUser?.specialization || currentUser?.role || "Doctor"}
            </p>
          </div>
          <img
            src="/assets/dropdown-icon.svg"
            alt="Dropdown"
            className="dropdown-icon"
          />
          {isDropdownVisible && <ProfileDropdown />}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
