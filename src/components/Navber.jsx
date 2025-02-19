import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
    const {user} = useContext(AuthContext)
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          MyApp
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-200">
            Sign In
          </Link>
          <Link to="/signup" className="hover:text-gray-200">
            Sign Up
          </Link>
        </div>
      </div>
      <p>{user.email}</p>
    </nav>
  );
};

export default Navbar;