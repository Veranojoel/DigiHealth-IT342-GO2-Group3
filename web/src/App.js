import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./auth/auth";
import "./App.css";
import SecuritySettings from "./components/SecuritySettings";
import ProfileSettings from "./components/ProfileSettings";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./components/Dashboard";
import Patients from "./components/Patients";
import Appointments from "./components/Appointments";
import Notifications from "./components/Notifications";
import Schedule from "./components/Schedule";
import DigiHealthLoginScreen from "./components/LoginScreen";
import DoctorRegistration from "./components/DoctorRegistration";
import AdminPortal from "./components/AdminPortal";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import ErrorBoundary from "./components/ErrorBoundary";
import AdminPatients from "./components/AdminPatients";
import AdminAppointments from "./components/AdminAppointments";
import AdminAnalytics from "./components/AdminAnalytics";
import AdminDashboardSettings from "./components/AdminDashboardSettings";
import { SettingsProvider } from "./context/SettingsContext";

const RoleGuard = ({ role, children }) => {
  const { isAuthenticated, loading, currentUser } = useAuth();
  if (loading) {
    return <div>Loading application...</div>;
  }
  if (!isAuthenticated) {
    const target = role === "ADMIN" ? "/admin/login" : "/login";
    return <Navigate to={target} replace />;
  }
  if (!currentUser || currentUser.role !== role) {
    const redirectTo = currentUser && currentUser.role === "ADMIN" ? "/admin/dashboard" : "/login";
    return <Navigate to={redirectTo} replace />;
  }
  return children;
};

const AppRoutes = () => {
  const { isAuthenticated, loading, currentUser } = useAuth();

  if (loading) {
    return <div>Loading application...</div>;
  }

  return (
    <Routes>
      <Route path="/admin" element={<AdminPortal />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<ErrorBoundary><RoleGuard role="ADMIN"><AdminDashboard /></RoleGuard></ErrorBoundary>} />
      <Route path="/admin/patients" element={<RoleGuard role="ADMIN"><AdminPatients /></RoleGuard>} />
      <Route path="/admin/appointments" element={<RoleGuard role="ADMIN"><AdminAppointments /></RoleGuard>} />
      <Route path="/admin/analytics" element={<RoleGuard role="ADMIN"><AdminAnalytics /></RoleGuard>} />
      <Route path="/admin/settings" element={<RoleGuard role="ADMIN"><AdminDashboardSettings /></RoleGuard>} />

      {/* Doctor Routes - Auth protected */}
      <Route
        path="/login"
        element={
          !isAuthenticated ? (
            <DigiHealthLoginScreen />
          ) : (
            <Navigate to={currentUser && currentUser.role === "ADMIN" ? "/admin/dashboard" : "/dashboard"} replace />
          )
        }
      />
      <Route
        path="/register"
        element={
          !isAuthenticated ? (
            <DoctorRegistration />
          ) : (
            <Navigate to={currentUser && currentUser.role === "ADMIN" ? "/admin/dashboard" : "/dashboard"} replace />
          )
        }
      />

      <Route
        path="/"
        element={
          isAuthenticated ? (
            <RoleGuard role="DOCTOR"><DashboardLayout /></RoleGuard>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="appointments" element={<ErrorBoundary><Appointments /></ErrorBoundary>} />
        <Route path="patients" element={<Patients />} />
        <Route
          path="profile-settings/security"
          element={<SecuritySettings />}
        />
        <Route
          path="profile-settings/notifications"
          element={<Notifications />}
        />
        <Route path="profile-settings/schedule" element={<Schedule />} />
        <Route path="profile-settings" element={<ProfileSettings />} />
      </Route>

      <Route
        path="*"
        element={
          <Navigate to={isAuthenticated ? (currentUser && currentUser.role === "ADMIN" ? "/admin/dashboard" : "/dashboard") : "/login"} replace />
        }
      />
    </Routes>
  );
};

function App() {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "5854467795-4t9mgg506vvr88bl7j66i5mb0m87jtil.apps.googleusercontent.com";
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <SettingsProvider>
        <Router>
          <AppRoutes />
        </Router>
      </SettingsProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
