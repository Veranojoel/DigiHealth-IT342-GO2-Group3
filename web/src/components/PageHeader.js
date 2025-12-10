import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./DashboardHeader.css";
import "./NotificationDropdown.css";
import ProfileDropdown from "./ProfileDropdown";
import { useAuth } from "../auth/auth";
import { useNotifications } from "../hooks/useNotifications";
import apiClient from "../api/client";

const PageHeader = ({ activePage }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const res = await apiClient.get('/api/notifications');
      setNotifications(res.data);
      setUnreadCount(res.data.filter(n => !n.isRead).length);
    } catch (error) {
      console.error("Failed to load notifications", error);
    }
  };

  useNotifications((newNotification) => {
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
  });

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const toggleNotifications = async () => {
    if (!showNotifications) {
      // Mark all as read when opening
      if (unreadCount > 0) {
        try {
          await apiClient.put('/api/notifications/read-all');
          setUnreadCount(0);
          setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        } catch (e) {
          console.error("Failed to mark read", e);
        }
      }
    }
    setShowNotifications(!showNotifications);
    setDropdownVisible(false);
  };

  const handleNotificationClick = (n) => {
    setShowNotifications(false);
    if (n.relatedEntityId && n.relatedEntityDate && n.type.startsWith('APPOINTMENT')) {
      navigate('/appointments', {
        state: {
          date: n.relatedEntityDate,
          appointmentId: n.relatedEntityId
        }
      });
    }
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
        <div className="notification-icon" onClick={toggleNotifications} style={{cursor: 'pointer', position: 'relative'}}>
          <img src="/assets/notification-icon.svg" alt="Notifications" />
          {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <h3>Notifications</h3>
                {notifications.length > 0 && <span onClick={loadNotifications} style={{fontSize: 12, color: '#3b82f6', cursor: 'pointer'}}>Refresh</span>}
              </div>
              <div className="notification-list">
                {notifications.length === 0 ? (
                  <div className="no-notifications">No notifications</div>
                ) : (
                  notifications.map((n) => (
                    <div 
                      key={n.notificationId} 
                      className={`notification-item ${!n.isRead ? 'unread' : ''}`}
                      onClick={() => handleNotificationClick(n)}
                      style={{cursor: 'pointer'}}
                    >
                      <div className="notification-title">{n.title}</div>
                      <div className="notification-message">{n.message}</div>
                      <div className="notification-time">
                        {new Date(n.createdAt).toLocaleDateString()} {new Date(n.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
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
