import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import PageHeader from "./PageHeader";
import "./PageStyling.css";
import { useNotifications } from "../hooks/useNotifications";
import NotificationToast from "./NotificationToast";

const DashboardLayout = () => {
  const location = useLocation();
  const [notification, setNotification] = useState(null);

  useNotifications((newNotification) => {
    setNotification(newNotification);
  });

  const getActivePage = () => {
    switch (location.pathname) {
      case "/appointments":
        return "Appointments";
      case "/patients":
        return "Patients";
      case "/dashboard":
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="dashboard-layout">
      <PageHeader activePage={getActivePage()} />
      <main className="page-main">
        <Outlet /> {/* Routed components render here */}
      </main>
      <NotificationToast notification={notification} onClose={() => setNotification(null)} />
    </div>
  );
};

export default DashboardLayout;
