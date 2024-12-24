import React from "react";
import { useLocation } from "react-router-dom";

const Navbar = ({ isAuthenticated, onLogout, onCartClick, cartItemCount }) => {
  const location = useLocation();

  // Hide navbar on the checkout page
  if (location.pathname === "/checkout") {
    return null;
  }

  return (
    <nav className="bg-blue-800 bg-opacity-80 fixed top-0 left-0 w-full p-4 flex justify-between items-center z-10 shadow-md">
      <h1 className="text-white text-2xl font-bold">E-Commerce</h1>
      <div className="flex items-center space-x-4">
        {/* Cart Icon */}
        <button onClick={onCartClick} className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 0L7 13m0 0l-2.4 4m2.4-4h10m0 0l2.4 4M7 13h10m-6 8h4m-4 0a2 2 0 11-4 0m4 0a2 2 0 104 0"
            />
          </svg>
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
              {cartItemCount}
            </span>
          )}
        </button>
        {/* Logout Button */}
        {isAuthenticated && (
          <button
            onClick={onLogout}
            className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
