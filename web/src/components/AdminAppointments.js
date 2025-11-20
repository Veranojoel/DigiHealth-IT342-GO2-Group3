import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminAppointments.css';

const AdminAppointments = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [appointments, setAppointments] = useState([]);

  // Demo data - matches Figma design exactly
  useEffect(() => {
    setAppointments([
      {
        id: 'A001',
        patientName: 'John Smith',
        doctorName: 'Dr. Sarah Johnson',
        date: '2/20/2024',
        time: '09:00 AM',
        reason: 'Regular checkup',
        status: 'Scheduled'
      },
      {
        id: 'A002',
        patientName: 'Emma Davis',
        doctorName: 'Dr. Michael Chen',
        date: '2/20/2024',
        time: '10:30 AM',
        reason: 'Follow-up consultation',
        status: 'Scheduled'
      },
      {
        id: 'A003',
        patientName: 'Robert Brown',
        doctorName: 'Dr. Sarah Johnson',
        date: '2/19/2024',
        time: '02:00 PM',
        reason: 'Blood pressure check',
        status: 'Completed'
      },
      {
        id: 'A004',
        patientName: 'Lisa Anderson',
        doctorName: 'Dr. Michael Chen',
        date: '2/21/2024',
        time: '11:00 AM',
        reason: 'Vaccination',
        status: 'Scheduled'
      }
    ]);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleStatusChange = (appointmentId, newStatus) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    ));
  };

  const handleReschedule = (appointmentId) => {
    console.log('Reschedule appointment:', appointmentId);
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || apt.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      label: 'Total Doctors',
      value: '2',
      subtitle: '2 pending approval',
      icon: '/assets/Admin assets/Doctor-4.svg'
    },
    {
      label: 'Total Patients',
      value: '4',
      subtitle: 'Registered users',
      icon: '/assets/Admin assets/Total Patients.svg'
    },
    {
      label: 'Active Appointments',
      value: '3',
      subtitle: '1 completed',
      icon: '/assets/Admin assets/Active Appointments.svg'
    },
    {
      label: 'System Activity',
      value: '98%',
      subtitle: '↗ System uptime',
      icon: '/assets/Admin assets/Analytics.svg'
    }
  ];

  return (
    <div className="admin-appointments-container">
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

      {/* Breadcrumb Section */}
      <div className="breadcrumb-section">
        <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>
          <img src="/assets/BackIcon.svg" alt="back" className="back-icon" />
          Back to Dashboard
        </button>
        <div className="breadcrumb">
          <span className="breadcrumb-item">Admin</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-item active">Appointments</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="filters-section">
        <div className="search-container">
          <img src="/assets/search-icon.svg" alt="search" className="search-icon" />
          <input
            type="text"
            placeholder="Search by patient, doctor, or appointment ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-container">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="content-area">
        <section className="content-section">
          <div className="section-header">
            <h2>All Appointments</h2>
            <p className="section-description">System-wide appointment overview</p>
          </div>
          
          <div className="table-wrapper">
            <table className="appointments-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map(apt => (
                  <tr key={apt.id}>
                    <td className="id-cell">{apt.id}</td>
                    <td className="patient-cell">{apt.patientName}</td>
                    <td className="doctor-cell">{apt.doctorName}</td>
                    <td>{apt.date}</td>
                    <td>{apt.time}</td>
                    <td>{apt.reason}</td>
                    <td>
                      <span className={`status-badge ${apt.status.toLowerCase()}`}>
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAppointments.length === 0 && (
            <div className="empty-state">
              <img src="/assets/Admin assets/Active Appointments.svg" alt="no appointments" className="empty-icon" />
              <h3>No appointments found</h3>
              <p>No appointments match your current search criteria.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminAppointments;