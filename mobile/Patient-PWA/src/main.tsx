
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "./components/theme-provider";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "5854467795-4t9mgg506vvr88bl7j66i5mb0m87jtil.apps.googleusercontent.com";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={clientId}>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </GoogleOAuthProvider>
);
  
