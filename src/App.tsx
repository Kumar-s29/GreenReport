import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ReportPage from "./pages/ReportPage";
import MapPage from "./pages/MapPage";
import ReportsListPage from "./pages/ReportsListPage";
import NotFoundPage from "./pages/NotFoundPage";
import { FirebaseProvider } from "./contexts/FirebaseContext";
import Index from "./pages/index";

function App() {
  return (
    <FirebaseProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#fff",
              color: "#333",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              padding: "16px",
            },
            success: {
              style: {
                borderLeft: "4px solid #22C55E",
              },
            },
            error: {
              style: {
                borderLeft: "4px solid #EF4444",
              },
            },
          }}
        />
        <Routes>
          {/* Set Index page as the default landing page */}
          <Route path="/" element={<Index />} />

          {/* Layout that wraps other pages */}
          <Route path="/home" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="report" element={<ReportPage />} />
            <Route path="map" element={<MapPage />} />
            <Route path="reports" element={<ReportsListPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FirebaseProvider>
  );
}

export default App;
