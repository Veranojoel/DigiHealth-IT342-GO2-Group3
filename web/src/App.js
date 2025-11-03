import React, { useState } from 'react';
import './App.css';
import DigiHealthLoginScreen from './components/LoginScreen';
import DoctorRegistration from './components/DoctorRegistration';

function App() {
  const [currentView, setCurrentView] = useState('login');

  const navigateToRegister = () => setCurrentView('register');
  const navigateToLogin = () => setCurrentView('login');

  return (
    <div className="App">
      {currentView === 'login' && <DigiHealthLoginScreen onNavigateToRegister={navigateToRegister} />}
      {currentView === 'register' && <DoctorRegistration onNavigateToLogin={navigateToLogin} />}
    </div>
  );
}

export default App;
