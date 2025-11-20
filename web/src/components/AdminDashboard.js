import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('doctors');
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const [allPatients, setAllPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Demo data - matches Figma exactly
  useEffect(() => {
    setPendingDoctors([
      {
        id: 1,
        name: 'Dr. Emily Rodriguez',
        specialization: 'Dermatology',
        license: 'MD-2024-003',
        email: 'emily.rodriguez@digihealth.com',
        date: '2/10/2024',
      },
      {
        id: 2,
        name: 'Dr. James Wilson',
        specialization: 'Neurology',
        license: 'MD-2024-004',
        email: 'james.wilson@digihealth.com',
        date: '2/12/2024',
      }
    ]);
    setAllDoctors([
      {
        id: 'D001',
        name: 'Dr. Sarah Johnson',
        specialization: 'Cardiology',
        email: 'sarah.johnson@digihealth.com',
        phone: '+1-555-0101',
        status: 'Approved',
        registered: '1/15/2024',
      },
      {
        id: 'D002',
        name: 'Dr. Michael Chen',
        specialization: 'Pediatrics',
        email: 'michael.chen@digihealth.com',
        phone: '+1-555-0102',
        status: 'Approved',
        registered: '1/20/2024',
      },
      {
        id: 'D003',
        name: 'Dr. Emily Rodriguez',
        specialization: 'Dermatology',
        email: 'emily.rodriguez@digihealth.com',
        phone: '+1-555-0103',
        status: 'Pending',
        registered: '2/10/2024',
      },
      {
        id: 'D004',
        name: 'Dr. James Wilson',
        specialization: 'Neurology',
        email: 'james.wilson@digihealth.com',
        phone: '+1-555-0104',
        status: 'Pending',
        registered: '2/12/2024',
      }
    ]);

    // Patient demo data
    setAllPatients([
      {
        id: 'P001',
        name: 'Alice Johnson',
        email: 'alice.johnson@email.com',
        phone: '+1-555-0201',
        age: 28,
        gender: 'Female',
        bloodType: 'O+',
        status: 'Active',
        lastVisit: '2/15/2024',
        registered: '1/10/2024',
        appointments: 3
      },
      {
        id: 'P002',
        name: 'Robert Smith',
        email: 'robert.smith@email.com',
        phone: '+1-555-0202',
        age: 45,
        gender: 'Male',
        bloodType: 'A+',
        status: 'Active',
        lastVisit: '2/10/2024',
        registered: '1/12/2024',
        appointments: 5
      },
      {
        id: 'P003',
        name: 'Maria Garcia',
        email: 'maria.garcia@email.com',
        phone: '+1-555-0203',
        age: 32,
        gender: 'Female',
        bloodType: 'B-',
        status: 'Active',
        lastVisit: '2/8/2024',
        registered: '1/18/2024',
        appointments: 2
      },
      {
        id: 'P004',
        name: 'David Brown',
        email: 'david.brown@email.com',
        phone: '+1-555-0204',
        age: 55,
        gender: 'Male',
        bloodType: 'AB+',
        status: 'Inactive',
        lastVisit: '1/25/2024',
        registered: '12/20/2023',
        appointments: 8
      },
      {
        id: 'P005',
        name: 'Lisa Chen',
        email: 'lisa.chen@email.com',
        phone: '+1-555-0205',
        age: 29,
        gender: 'Female',
        bloodType: 'O-',
        status: 'Active',
        lastVisit: '2/14/2024',
        registered: '1/22/2024',
        appointments: 1
      }
    ]);
  }, []);

  const handleApprove = (doctorId) => {
    console.log('Approve doctor:', doctorId);
    const doctor = pendingDoctors.find(d => d.id === doctorId);
    if (doctor) {
      setPendingDoctors(pendingDoctors.filter(d => d.id !== doctorId));
    }
  };

  const handleReject = (doctorId) => {
    console.log('Reject doctor:', doctorId);
    setPendingDoctors(pendingDoctors.filter(d => d.id !== doctorId));
  };

  const handleTabClick = (tabId) => {
    if (tabId === 'patients') {
      navigate('/admin/patients');
    } else {
      setActiveTab(tabId);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // Filter patients based on search term and status
  const filteredPatients = allPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || patient.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const handleExportPatients = () => {
    console.log('Export patients data');
  };

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

  const tabs = [
    { id: 'doctors', label: 'Doctors', icon: '/assets/Admin assets/Doctor-4.svg' },
    { id: 'patients', label: 'Patients', icon: '/assets/Admin assets/Patients.svg' },
    { id: 'appointments', label: 'Appointments', icon: '/assets/Admin assets/Appointments.svg' },
    { id: 'analytics', label: 'Analytics', icon: '/assets/Admin assets/Analytics.svg' }
  ];

  return (
    <div className="admin-dashboard-container">
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

      {/* Alert Banner */}
      <div className="alert-banner">
        <span className="alert-icon">⚠️</span>
        <span className="alert-text">You have 2 doctor registrations pending approval.</span>
      </div>

      {/* Tabs Navigation */}
      <div className="tabs-navigation">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            <img src={tab.icon} alt={tab.label} className="tab-icon-img" />
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="content-area">
        {activeTab === 'doctors' && (
          <>
            {/* Pending Approvals */}
            <section className="content-section">
              <div className="section-header">
                <h2>Pending Doctor Approvals</h2>
                <p className="section-description">Review and approve or reject doctor registration requests</p>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Specialization</th>
                      <th>License Number</th>
                      <th>Email</th>
                      <th>Registered Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingDoctors.map(doctor => (
                      <tr key={doctor.id}>
                        <td>{doctor.name}</td>
                        <td>{doctor.specialization}</td>
                        <td>{doctor.license}</td>
                        <td>{doctor.email}</td>
                        <td>{doctor.date}</td>
                        <td className="actions-cell">
                          <button className="action-btn approve" onClick={() => handleApprove(doctor.id)}>
                            ✓ Approve
                          </button>
                          <button className="action-btn reject" onClick={() => handleReject(doctor.id)}>
                            ✕ Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* All Doctors */}
            <section className="content-section">
              <div className="section-header">
                <h2>All Doctors</h2>
                <p className="section-description">Manage all registered doctors in the system</p>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Specialization</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Status</th>
                      <th>Registered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allDoctors.map(doctor => (
                      <tr key={doctor.id}>
                        <td className="id-cell">{doctor.id}</td>
                        <td>{doctor.name}</td>
                        <td>{doctor.specialization}</td>
                        <td>{doctor.email}</td>
                        <td>{doctor.phone}</td>
                        <td>
                          <span className={`status-badge ${doctor.status.toLowerCase()}`}>
                            ● {doctor.status}
                          </span>
                        </td>
                        <td>{doctor.registered}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {activeTab === 'patients' && (
          <section className="content-section">
            <div className="section-header">
              <h2>Patients</h2>
              <p className="section-description">Patient management interface</p>
            </div>
            <div className="redirect-notice">
              <p>Redirecting to dedicated patients page...</p>
              <button 
                className="action-btn view" 
                onClick={() => navigate('/admin/patients')}
              >
                Go to Patients Page
              </button>
            </div>
          </section>
        )}

        {activeTab === 'appointments' && (
          <section className="content-section">
            <div className="section-header">
              <h2>Appointments</h2>
              <p className="section-description">Coming soon - Appointment management interface</p>
            </div>
          </section>
        )}

        {activeTab === 'analytics' && (
          <section className="content-section">
            <div className="section-header">
              <h2>Analytics</h2>
              <p className="section-description">Coming soon - Analytics and reporting interface</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
