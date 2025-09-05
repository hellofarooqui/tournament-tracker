import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";
import { registerSW } from "virtual:pwa-register";
import AuthProvider from './context/AuthContext.jsx';


registerSW({ immediate: true });




createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
     
        <App />
     
    </AuthProvider>
    <Toaster />
  </StrictMode>
);
