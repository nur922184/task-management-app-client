import React, { use, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";


const Navbar = () => {
  const { user } = useContext(AuthContext);
  console.log(user)
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">MyApp</Link>

        <div className="space-x-4">
          {user ? (
            <>
              <div className="flex flex-row items-center gap-5">
                <Link to="/dashboard/card" className="hover:bg-gray-500 rounded-lg text-gray-950 bg-gray-400 p-2">Dashboard</Link>
                <span className="font-semibold">{user.email}</span>
                <img className="w-10 h-10 rounded-full" src={user.photoURL} alt="" />
              </div>
            </>
          ) : (
            <>
              <Link to="/" className="hover:text-gray-200">Sign In</Link>
              <Link to="/signup" className="hover:text-gray-200">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;