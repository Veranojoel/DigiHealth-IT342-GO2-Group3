
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "5854467795-4t9mgg506vvr88bl7j66i5mb0m87jtil.apps.googleusercontent.com";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={clientId}>
    <App />
  </GoogleOAuthProvider>
);
  
