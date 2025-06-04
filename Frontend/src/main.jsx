// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthProvider.jsx";
import AuthProvider1 from "./context/AuthProvider1.jsx";
import AuthProvider2 from "./context/AuthProvider2.jsx";
import "./i18n";
import { ThemeProvider } from "next-themes";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <AuthProvider2>
    <AuthProvider1>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="">
          <App />
        </div>
        </ThemeProvider>
      </AuthProvider>
    </AuthProvider1>
    </AuthProvider2>
  </BrowserRouter>
);