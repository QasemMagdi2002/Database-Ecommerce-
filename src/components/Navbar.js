import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">E-Commerce</h1>
        <div className="space-x-4">
          <Link to="/">
            <Button className="bg-blue-700 hover:bg-blue-800">Shop</Button>
          </Link>
          <Link to="/checkout">
            <Button className="bg-blue-700 hover:bg-blue-800">Checkout</Button>
          </Link>
          <Link to="/admin">
            <Button className="bg-blue-700 hover:bg-blue-800">Admin</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
