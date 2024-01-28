import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import '@radix-ui/themes/styles.css';
// import { Toaster } from "@/components/ui/sonner"
import { Toaster } from "sonner";
import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
      <Toaster position="top-right" richColors />
    </HashRouter>
  </React.StrictMode>
);
