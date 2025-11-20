import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminTabs from './AdminTabs';
import './AdminAnalytics.css';

const AdminAnalytics = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // Stats cards (same as appointments page)
  const stats = [
    {
      icon: '/assets/Admin assets/Doctor-3.svg',
      label: 'Total Doctors',
      value: '2',
      subtitle: 'Active'
    },
    {
      icon: '/assets/Admin assets/Total Patients.svg',
      label: 'Total Patients',
      value: '4',
      subtitle: 'Active'
    },
    {
      icon: '/assets/Admin assets/Active Appointments.svg',
      label: 'Active Appointments',
      value: '3',
      subtitle: 'Scheduled'
    },
    {
      icon: '/assets/Admin assets/System Activity.svg',
      label: 'System Activity',
      value: '98%',
      subtitle: 'Uptime'
    }
  ];

  // Analytics data from Figma design
  const analyticsData = {
    doctors: {
      approved: 2,
      pending: 2,
      total: 4
    },
    appointments: {
      scheduled: 3,
      completed: 1,
      total: 4
    },
    patients: {
      total: 4,
      avgAppointments: 4.3
    },
    systemHealth: {
      uptime: '98%',
      activeSessions: 8,
      status: 'Operational'
    }
  };

  return (
    <div className="admin-analytics-container">
      {/* Header */}
      <header className="admin-header">
        <div className="header-left">
          <div className="logo-section">
            <div className="logo-circle">D</div>
          </div>
          <div className="header-title">
            <h1>DigiHealth Admin</h1>
            <p>System Administration Panel</p>
          </div>
        </div>
        <div className="header-right">
          <div className="user-info">
            <div className="user-avatar">SA</div>
            <div className="user-details">
              <p className="user-name">System Administrator</p>
              <p className="user-email">admin@digihealth.com</p>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <img src="/assets/Admin assets/Logout.svg" alt="logout" className="logout-icon-img" />
            Logout
          </button>
        </div>
      </header>

      {/* Stats Section */}
      <div className="stats-section">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-icon">
              <img src={stat.icon} alt={stat.label} />
            </div>
            <div className="stat-body">
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-subtitle">{stat.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs Navigation - Shared Component */}
      <AdminTabs />

      {/* Alert Banner */}
      <div className="alert-banner">
        <span className="alert-icon">⚠️</span>
        <span className="alert-text">You have 2 doctor registrations pending approval.</span>
      </div>

      {/* Analytics Grid - 2x2 layout of analytics cards */}
      <div className="content-area">
        <div className="analytics-grid">
          {/* Doctor Statistics */}
          <section className="analytics-card">
            <div className="card-header">
              <h3>Doctor Statistics</h3>
            </div>
            <div className="card-content">
              <div className="stat-row">
                <span className="stat-label">Approved Doctors</span>
                <span className="stat-value">{analyticsData.doctors.approved}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label pending">Pending Approvals</span>
                <span className="stat-value pending">{analyticsData.doctors.pending}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Total Registered</span>
                <span className="stat-value">{analyticsData.doctors.total}</span>
              </div>
            </div>
          </section>

          {/* Appointment Statistics */}
          <section className="analytics-card">
            <div className="card-header">
              <h3>Appointment Statistics</h3>
            </div>
            <div className="card-content">
              <div className="stat-row">
                <span className="stat-label scheduled">Scheduled</span>
                <span className="stat-value scheduled">{analyticsData.appointments.scheduled}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label completed">Completed</span>
                <span className="stat-value completed">{analyticsData.appointments.completed}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Total</span>
                <span className="stat-value">{analyticsData.appointments.total}</span>
              </div>
            </div>
          </section>

          {/* Patient Statistics */}
          <section className="analytics-card">
            <div className="card-header">
              <h3>Patient Statistics</h3>
            </div>
            <div className="card-content">
              <div className="stat-row">
                <span className="stat-label">Total Patients</span>
                <span className="stat-value">{analyticsData.patients.total}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Avg Appointments/Patient</span>
                <span className="stat-value">{analyticsData.patients.avgAppointments}</span>
              </div>
            </div>
          </section>

          {/* System Health */}
          <section className="analytics-card">
            <div className="card-header">
              <h3>System Health</h3>
            </div>
            <div className="card-content">
              <div className="stat-row">
                <span className="stat-label uptime">System Uptime</span>
                <span className="stat-value uptime">{analyticsData.systemHealth.uptime}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Active Sessions</span>
                <span className="stat-value">{analyticsData.systemHealth.activeSessions}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">System Status</span>
                <span className="status-badge operational">{analyticsData.systemHealth.status}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;