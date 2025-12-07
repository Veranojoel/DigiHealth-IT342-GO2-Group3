import React, { useState, useEffect } from 'react';
import './Schedule.css';
import './ProfileSettings.css';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/auth';
import apiClient from '../api/client';
import { useAppointmentUpdates } from '../hooks/useAppointmentUpdates';

const Schedule = () => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const [workingHours, setWorkingHours] = useState({
    monday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
    tuesday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
    wednesday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
    thursday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
    friday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
    saturday: { isAvailable: false, startTime: '', endTime: '' },
    sunday: { isAvailable: false, startTime: '', endTime: '' }
  });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [live, setLive] = useState(false);

  // Load working hours from backend API
  useEffect(() => {
    const fetchWorkingHours = async () => {
      try {
        const response = await apiClient.get('/api/doctors/me/working-hours');
        const workingHoursDto = response.data;

        const initialHours = {
          monday: { isAvailable: false, startTime: '09:00', endTime: '17:00' },
          tuesday: { isAvailable: false, startTime: '09:00', endTime: '17:00' },
          wednesday: { isAvailable: false, startTime: '09:00', endTime: '17:00' },
          thursday: { isAvailable: false, startTime: '09:00', endTime: '17:00' },
          friday: { isAvailable: false, startTime: '09:00', endTime: '17:00' },
          saturday: { isAvailable: false, startTime: '09:00', endTime: '17:00' },
          sunday: { isAvailable: false, startTime: '09:00', endTime: '17:00' }
        };

        // Update with actual working hours from backend
        if (workingHoursDto.workDays) {
          workingHoursDto.workDays.forEach(day => {
            const lowercaseDay = day.toLowerCase();
            if (initialHours.hasOwnProperty(lowercaseDay)) {
              initialHours[lowercaseDay].isAvailable = true;
              const timeRange = workingHoursDto.workHours?.[day];
              if (timeRange) {
                initialHours[lowercaseDay].startTime = timeRange.startTime || '09:00';
                initialHours[lowercaseDay].endTime = timeRange.endTime || '17:00';
              }
            }
          });
        }

        setWorkingHours(initialHours);
      } catch (error) {
        console.error('Error fetching working hours:', error);
        // Fallback to local storage data if API fails
        if (currentUser) {
          try {
            const initialHours = {
              monday: { isAvailable: false, startTime: '09:00', endTime: '17:00' },
              tuesday: { isAvailable: false, startTime: '09:00', endTime: '17:00' },
              wednesday: { isAvailable: false, startTime: '09:00', endTime: '17:00' },
              thursday: { isAvailable: false, startTime: '09:00', endTime: '17:00' },
              friday: { isAvailable: false, startTime: '09:00', endTime: '17:00' },
              saturday: { isAvailable: false, startTime: '09:00', endTime: '17:00' },
              sunday: { isAvailable: false, startTime: '09:00', endTime: '17:00' }
            };

            if (currentUser.workDays && Array.isArray(currentUser.workDays)) {
              currentUser.workDays.forEach(day => {
                const lowercaseDay = day.toLowerCase();
                if (initialHours.hasOwnProperty(lowercaseDay)) {
                  initialHours[lowercaseDay].isAvailable = true;
                  initialHours[lowercaseDay].startTime = currentUser.workHours?.[day]?.startTime || '09:00';
                  initialHours[lowercaseDay].endTime = currentUser.workHours?.[day]?.endTime || '17:00';
                }
              });
            }

            setWorkingHours(initialHours);
          } catch (fallbackError) {
            console.error('Error parsing working hours from local storage:', fallbackError);
          }
        }
      }
    };

    fetchWorkingHours();
  }, [currentUser]);

  useAppointmentUpdates(() => {
    setLive(true);
    setTimeout(() => setLive(false), 2000);
  });

  const toggleDayAvailability = (day) => {
    if (!isEditing) return;

    setWorkingHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        isAvailable: !prev[day].isAvailable
      }
    }));
  };

  const handleTimeChange = (day, field, value) => {
    if (!isEditing) return;

    setWorkingHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  const handleSaveSchedule = async () => {
    setIsSubmitting(true);
    setMessage('');

    try {
      // Convert workingHours object to workDays array format
      const workDays = [];
      const workHours = {};

      Object.entries(workingHours).forEach(([day, config]) => {
        if (config.isAvailable) {
          const capitalizedDay = day.charAt(0).toUpperCase() + day.slice(1);
          workDays.push(capitalizedDay);
          workHours[capitalizedDay] = {
            startTime: config.startTime,
            endTime: config.endTime
          };
        }
      });

      await apiClient.put('/api/doctors/me/working-hours', { workDays, workHours });
      setMessage('Schedule saved successfully!');
      setIsEditing(false);

      // Update current user with new working hours
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          workDays,
          workHours
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }

    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to save schedule. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAvailableDaysCount = () => {
    return Object.values(workingHours).filter(day => day.isAvailable).length;
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hourNum = parseInt(hours, 10);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const formattedHour = hourNum % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const formatTimeForDisplay = (time) => {
    if (!time) return '';
    // Convert 24-hour format to 12-hour format with AM/PM for display
    const [hours, minutes] = time.split(':');
    const hourNum = parseInt(hours, 10);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const formattedHour = hourNum % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const formatTimeForInput = (time) => {
    if (!time) return '';
    // If time is already in 24-hour format, return as is
    if (time.includes(':')) {
      const [hours, minutes] = time.split(':');
      if (hours.length === 2 && minutes.length === 2 && !isNaN(hours) && !isNaN(minutes)) {
        return time;
      }
    }

    // Convert 12-hour format with AM/PM to 24-hour format for input
    const [timePart, period] = time.split(' ');
    if (!period) return time; // already in 24-hour format

    const [hours, minutes] = timePart.split(':');
    let hourNum = parseInt(hours, 10);

    if (period === 'PM' && hourNum !== 12) {
      hourNum += 12;
    } else if (period === 'AM' && hourNum === 12) {
      hourNum = 0;
    }

    return `${hourNum.toString().padStart(2, '0')}:${minutes}`;
  };

  return (
    <div className="profile-settings-container">
      <div className="profile-settings-header">
        <h2>Profile Settings</h2>
        <p>Manage your account settings and preferences</p>
        <div className="active-account-badge">
          <img src="/assets/active-account.svg" alt="Active Account" />
          <p>Active Account</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: 8, background: live ? '#22c55e' : '#9ca3af', boxShadow: live ? '0 0 6px #22c55e' : 'none' }} />
          <span style={{ fontSize: 12, color: '#6b7280' }}>Live</span>
        </div>
      </div>

      <div className="profile-completion-card">
        <div className="profile-completion-info">
          <div className="profile-completion-icon-wrapper">
            <img src="/assets/profile-completion-icon.svg" alt="Profile Completion" />
          </div>
          <div className="profile-completion-text">
            <p className="profile-completion-title">Profile Completion</p>
            <p className="profile-completion-subtitle">Keep your profile updated for better security</p>
          </div>
        </div>
        <div className="profile-completion-percentage">
          <p className="percentage-value">100%</p>
          <p className="percentage-label">Complete</p>
        </div>
        <div className="profile-completion-progress"></div>
      </div>

      <div className="profile-tabs">
        <Link to="/profile-settings" className={`profile-tab ${location.pathname === '/profile-settings' ? 'active' : ''}`}>
          <img src="/assets/profile-tab-icon.svg" alt="Profile" />
          <p>Profile</p>
        </Link>
        <Link to="/profile-settings/security" className={`profile-tab ${location.pathname === '/profile-settings/security' ? 'active' : ''}`}>
          <img src="/assets/security-tab-icon.svg" alt="Security" />
          <p>Security</p>
        </Link>
        <Link to="/profile-settings/notifications" className={`profile-tab ${location.pathname === '/profile-settings/notifications' ? 'active' : ''}`}>
          <img src="/assets/notifications-tab-icon.svg" alt="Notifications" />
          <p>Notifications</p>
        </Link>
        <Link to="/profile-settings/schedule" className={`profile-tab ${location.pathname === '/profile-settings/schedule' ? 'active' : ''}`}>
          <img src="/assets/schedule-tab-icon.svg" alt="Schedule" />
          <p>Schedule</p>
        </Link>
      </div>

      <div className="card schedule-management-card">
        <div className="card-header">
          <img src="/assets/schedule-tab-icon.svg" alt="Working Hours" />
          <p className="card-title">Working Hours</p>
          <p className="card-description">Set your availability for appointments throughout the week</p>
        </div>
        <div className="card-content">
          {Object.entries(workingHours).map(([day, config]) => (
            <React.Fragment key={day}>
              <div className="day-schedule">
                <div className="day-info">
                  <div
                    className={`toggle-switch ${config.isAvailable ? 'active' : ''} ${isEditing ? 'editable' : ''}`}
                    onClick={() => toggleDayAvailability(day)}
                  >
                    <div className="toggle-handle"></div>
                  </div>
                  <div className="day-icon-wrapper">
                    <img src="/assets/calendar.svg" alt={day} />
                  </div>
                  <p className="day-name">{day}</p>
                </div>
                {config.isAvailable ? (
                  isEditing ? (
                    <div className="time-inputs">
                      <input
                        type="time"
                        value={config.startTime}
                        onChange={(e) => handleTimeChange(day, 'startTime', e.target.value)}
                      />
                      <span>to</span>
                      <input
                        type="time"
                        value={config.endTime}
                        onChange={(e) => handleTimeChange(day, 'endTime', e.target.value)}
                      />
                    </div>
                  ) : (
                    <div className="time-display">
                      <span>{formatTimeForDisplay(config.startTime)}</span>
                      <span>to</span>
                      <span>{formatTimeForDisplay(config.endTime)}</span>
                    </div>
                  )
                ) : (
                  <div className="unavailable-badge">
                    <p>Unavailable</p>
                  </div>
                )}
              </div>
              <hr />
            </React.Fragment>
          ))}

          <div className="schedule-summary-card">
            <img src="/assets/schedule-tab-icon.svg" alt="Schedule Summary" />
            <div className="schedule-summary-text">
              <p className="schedule-summary-title">Schedule Summary</p>
              <p className="schedule-summary-subtitle">
                You are available {getAvailableDaysCount()} days per week.
                Your working hours will be visible to patients when booking appointments.
              </p>
            </div>
          </div>

          <div className="schedule-actions">
            {isEditing ? (
              <div className="save-cancel-buttons">
                {message && <p className={message.includes('success') ? 'success-message' : 'error-message'}>{message}</p>}
                <button
                  className="save-schedule-btn"
                  onClick={handleSaveSchedule}
                  disabled={isSubmitting}
                >
                  <img src="/assets/save-icon.svg" alt="Save Schedule" />
                  {isSubmitting ? 'Saving...' : 'Save Schedule'}
                </button>
                <button
                  className="cancel-schedule-btn"
                  onClick={() => setIsEditing(false)}
                  disabled={isSubmitting}
                >
                  <img src="/assets/close-icon.svg" alt="Cancel" />
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="edit-schedule-btn"
                onClick={() => setIsEditing(true)}
              >
                <img src="/assets/save-icon.svg" alt="Edit Schedule" />
                Edit Schedule
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
