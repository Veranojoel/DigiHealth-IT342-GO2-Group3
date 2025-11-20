import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AdminTabs.css';

const AdminTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active tab based on current route
  const getActiveTab = () => {
    if (location.pathname === '/admin/dashboard' || location.pathname === '/admin') {
      return 'doctors';
    } else if (location.pathname === '/admin/patients') {
      return 'patients';
    } else if (location.pathname === '/admin/appointments') {
      return 'appointments';
    } else if (location.pathname === '/admin/analytics') {
      return 'analytics';
    }
    return 'doctors';
  };

  const activeTab = getActiveTab();

  const tabs = [
    { id: 'doctors', label: 'Doctors', icon: '/assets/Admin assets/Doctor-4.svg', path: '/admin/dashboard' },
    { id: 'patients', label: 'Patients', icon: '/assets/Admin assets/Patients.svg', path: '/admin/patients' },
    { id: 'appointments', label: 'Appointments', icon: '/assets/Admin assets/Appointments.svg', path: '/admin/appointments' },
    { id: 'analytics', label: 'Analytics', icon: '/assets/Admin assets/Analytics.svg', path: '/admin/analytics' }
  ];

  const handleTabClick = (tabPath) => {
    navigate(tabPath);
  };

  return (
    <div className="tabs-navigation">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => handleTabClick(tab.path)}
        >
          <img src={tab.icon} alt={tab.label} className="tab-icon-img" />
          <span className="tab-label">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default AdminTabs;
