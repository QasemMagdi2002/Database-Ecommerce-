import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button";

const Navbar = ({ isAuthenticated, onLogout, onSearch }) => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm); // Call the onSearch function passed from App
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">E-Commerce</h1>
        <div className="flex space-x-4 items-center">
          {isAuthenticated && location.pathname !== "/auth" && (
            <>
              <Link to="/shop">
                <Button className="bg-blue-700 hover:bg-blue-800">Shop</Button>
              </Link>
              <Link to="/checkout">
                <Button className="bg-blue-700 hover:bg-blue-800">Checkout</Button>
              </Link>
              <Link to="/admin">
                <Button className="bg-blue-700 hover:bg-blue-800">Admin</Button>
              </Link>
              <Button className="bg-red-500 hover:bg-red-600" onClick={onLogout}>
                Logout
              </Button>
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  className="p-2 rounded-lg text-black"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 px-2 py-1 bg-blue-500 text-white rounded"
                >
                  Go
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
