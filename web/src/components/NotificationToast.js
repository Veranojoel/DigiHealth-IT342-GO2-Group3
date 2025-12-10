import React, { useState, useEffect } from 'react';
import './NotificationToast.css';

const NotificationToast = ({ notification, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (notification) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300); // Wait for animation
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification, onClose]);

  if (!notification && !visible) return null;

  return (
    <div className={`notification-toast ${visible ? 'show' : ''} ${notification?.type?.toLowerCase()}`}>
      <div className="notification-icon">
        <img src="/assets/notification-icon.svg" alt="Notification" />
      </div>
      <div className="notification-content">
        <h4>{notification?.title}</h4>
        <p>{notification?.message}</p>
      </div>
      <button className="notification-close" onClick={() => setVisible(false)}>
        &times;
      </button>
    </div>
  );
};

export default NotificationToast;
