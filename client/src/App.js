import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Auth from "./pages/Auth";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import CheckoutSidebar from "./components/CheckoutSidebar";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Loading state for auth check
  const [cart, setCart] = useState([]); // Cart items
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Sidebar visibility

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

  const handleCartUpdate = (updatedCart) => {
    setCart(updatedCart); // Update cart with new items
  };

  if (isCheckingAuth) {
    // Display a loader while checking authentication
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar is hidden only on the checkout page */}
        {window.location.pathname !== "/checkout" && (
          <Navbar
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
            onCartClick={() => setSidebarOpen(true)}
            cartItemCount={cart.length}
          />
        )}
        {/* Add margin-top to ensure content doesn't overlap with the transparent navbar */}
        <main className="flex-grow mt-16">
          <Routes>
            <Route path="/" element={<Navigate to="/auth" />} />
            <Route path="/auth" element={<Auth onLoginSuccess={handleLoginSuccess} />} />
            <Route
              path="/shop"
              element={
                isAuthenticated ? (
                  <Shop onCartUpdate={handleCartUpdate} />
                ) : (
                  <Navigate to="/auth" />
                )
              }
            />
            <Route
              path="/checkout"
              element={
                isAuthenticated ? <Checkout cart={cart} /> : <Navigate to="/auth" />
              }
            />
            <Route
              path="/admin"
              element={isAuthenticated ? <Admin /> : <Navigate to="/auth" />}
            />
          </Routes>
        </main>
        {/* Footer is hidden on the checkout page */}
        {window.location.pathname !== "/checkout" && <Footer />}
        <CheckoutSidebar
          cart={cart}
          isOpen={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onGoToShop={() => setSidebarOpen(false)}
        />
      </div>
    </Router>
  );
};

export default App;
