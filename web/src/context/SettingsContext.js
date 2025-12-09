import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../api/client';
import { useAuth } from '../auth/auth';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  const fetchSettings = async () => {
    try {
      if (!currentUser || currentUser.role !== 'ADMIN') {
        setSettings({ clinicName: 'DigiHealth' });
        return;
      }
      const res = await apiClient.get('/api/admin/settings');
      setSettings(res.data);
    } catch (e) {
      setSettings({ clinicName: 'DigiHealth' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [currentUser]);

  // Refresh on window focus (e.g., after admin saves settings)
  useEffect(() => {
    const handleFocus = () => fetchSettings();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [currentUser]);

  return (
    <SettingsContext.Provider value={{ settings, loading, refetch: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
