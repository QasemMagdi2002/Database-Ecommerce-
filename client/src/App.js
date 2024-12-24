import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Auth from "./pages/Auth";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Loading state for auth check

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    setIsCheckingAuth(false); // Mark authentication check as completed
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    setIsAuthenticated(false); // Update state
  };

  if (isCheckingAuth) {
    // Display a loader while checking authentication
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/auth" />} />
            <Route path="/auth" element={<Auth onLoginSuccess={handleLoginSuccess} />} />
            <Route
              path="/shop"
              element={isAuthenticated ? <Shop /> : <Navigate to="/auth" />}
            />
            <Route
              path="/checkout"
              element={isAuthenticated ? <Checkout /> : <Navigate to="/auth" />}
            />
            <Route
              path="/admin"
              element={isAuthenticated ? <Admin /> : <Navigate to="/auth" />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
