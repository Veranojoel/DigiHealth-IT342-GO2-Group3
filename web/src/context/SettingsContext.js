import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../api/client';

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

  const fetchSettings = async () => {
    try {
      const res = await apiClient.get('/api/admin/settings');
      setSettings(res.data);
    } catch (e) {
      console.warn('Failed to load clinic settings:', e);
      setSettings({ clinicName: 'DigiHealth' }); // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Refresh on window focus (e.g., after admin saves settings)
  useEffect(() => {
    const handleFocus = () => fetchSettings();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refetch: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
