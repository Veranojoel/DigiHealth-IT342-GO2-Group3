import React from "react";
import "./PageStyling.css";

export function PageWrapper({ children }) {
  return <div className="page-container">{children}</div>;
}

export function PageMessage({ title, message, children }) {
  return (
    <div className="page-message">
      {/* The {children} prop renders any content placed inside 
        the <PageMessage>...</PageMessage> tags.
      */}
      {children}
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export function PageFolder({ children }) {
  return <div className="page-folder">{children}</div>;
}

export function PageFolder2({ children }) {
  return <div className="page-folder2">{children}</div>;
}
