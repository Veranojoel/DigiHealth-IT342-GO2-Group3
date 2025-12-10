import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/auth';
import apiClient from '../api/client';
import AdminTabs from './AdminTabs';

const formatBytes = (bytes) => {
  if (!bytes && bytes !== 0) return 'N/A';
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const val = bytes / Math.pow(1024, i);
  return `${val.toFixed(1)} ${sizes[i]}`;
};

const AdminMonitoring = () => {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, loading: authLoading, logout } = useAuth();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || currentUser?.role !== 'ADMIN')) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, currentUser, authLoading, navigate]);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/api/admin/system-status');
      setStatus(res.data);
      setError('');
    } catch (e) {
      setError('Failed to load system status');
    } finally {
      setLoading(false);
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await apiClient.get('/api/admin/logs?limit=100');
      setLogs(res.data || []);
    } catch (e) {
      // silently ignore
    }
  };

  useEffect(() => {
    if (isAuthenticated && currentUser?.role === 'ADMIN') {
      fetchStatus();
      fetchLogs();
      const id = setInterval(fetchStatus, 15000);
      const lid = setInterval(fetchLogs, 30000);
      return () => {
        clearInterval(id);
        clearInterval(lid);
      };
    }
  }, [isAuthenticated, currentUser]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (authLoading) {
    return <div className="admin-loading">Checking authentication...</div>;
  }
  if (!isAuthenticated || currentUser?.role !== 'ADMIN') {
    return <div className="admin-loading">Redirecting to login...</div>;
  }

  const stats = [
    {
      label: 'Uptime',
      value: status ? `${Math.floor(status.uptimeSeconds / 3600)}h ${Math.floor((status.uptimeSeconds % 3600) / 60)}m` : '—',
      subtitle: 'Server uptime',
      icon: '/assets/Admin-assets/System-Activity.svg'
    },
    {
      label: 'Memory Used',
      value: status ? formatBytes(status.memoryUsedBytes) : '—',
      subtitle: status ? `Total ${formatBytes(status.memoryTotalBytes)}` : '—',
      icon: '/assets/Admin-assets/Analytics.svg'
    },
    {
      label: 'Database',
      value: status ? (status.databaseHealthy ? 'Healthy' : 'Down') : '—',
      subtitle: status && status.maintenanceMode ? 'Maintenance On' : 'Maintenance Off',
      icon: '/assets/Admin-assets/Shield.svg'
    },
    {
      label: 'Users',
      value: status ? `${status.totalDoctors} D / ${status.totalPatients} P` : '—',
      subtitle: 'Doctors / Patients',
      icon: '/assets/Admin-assets/Total-Patients.svg'
    },
    {
      label: 'Appointments',
      value: status ? `${status.scheduledAppointments}` : '—',
      subtitle: status ? `${status.completedAppointments} completed` : '—',
      icon: '/assets/Admin-assets/Active-Appointments.svg'
    }
  ];

  return (
    <div className="admin-dashboard-container">
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
            <img src="/assets/Admin-assets/Logout.svg" alt="logout" className="logout-icon-img" />
            Logout
          </button>
        </div>
      </header>

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

      <AdminTabs />

      <div className="content-area">
        <section className="content-section">
          <div className="section-header">
            <h2>System Status</h2>
            <p className="section-description">Live system metrics and health overview</p>
          </div>

          {loading && <div className="admin-loading">Loading system metrics...</div>}
          {error && <div className="admin-error">{error}</div>}

          {status && (
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Server Time</td>
                    <td>{new Date(status.serverTime).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Uptime</td>
                    <td>{`${Math.floor(status.uptimeSeconds / 3600)}h ${Math.floor((status.uptimeSeconds % 3600) / 60)}m ${status.uptimeSeconds % 60}s`}</td>
                  </tr>
                  <tr>
                    <td>Memory Used</td>
                    <td>{formatBytes(status.memoryUsedBytes)} / {formatBytes(status.memoryTotalBytes)}</td>
                  </tr>
                  <tr>
                    <td>Database Healthy</td>
                    <td>{status.databaseHealthy ? 'Yes' : 'No'}</td>
                  </tr>
                  <tr>
                    <td>Maintenance Mode</td>
                    <td>{status.maintenanceMode ? 'On' : 'Off'}</td>
                  </tr>
                  <tr>
                    <td>Total Doctors</td>
                    <td>{status.totalDoctors}</td>
                  </tr>
                  <tr>
                    <td>Total Patients</td>
                    <td>{status.totalPatients}</td>
                  </tr>
                  <tr>
                    <td>Scheduled Appointments</td>
                    <td>{status.scheduledAppointments}</td>
                  </tr>
                  <tr>
                    <td>Completed Appointments</td>
                    <td>{status.completedAppointments}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="content-section">
          <div className="section-header">
            <h2>Audit Logs</h2>
            <p className="section-description">Recent administrative and system actions</p>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Operation</th>
                  <th>Actor</th>
                  <th>Resource</th>
                </tr>
              </thead>
              <tbody>
                {(logs || []).map((log) => (
                  <tr key={log.id}>
                    <td>{log.createdAt ? new Date(log.createdAt).toLocaleString() : '—'}</td>
                    <td>{log.operation}</td>
                    <td>{log.actorUserEmail}</td>
                    <td>{`${log.resourceType || ''} ${log.resourceId || ''}`.trim()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminMonitoring;
