import React, { useState } from "react";
import { FaTasks, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logout from "../../components/logout";

const Sidebar = () => {

    return (
        <div>

            {/* Sidebar */}
            <aside className="bg-gray-800 h-screen text-white p-6">
                <h2 className="text-2xl font-bold mb-6 sm:text-xl">Dashboard</h2>
                <nav className="flex-1">
                    <ul>
                        <li className="mb-4">
                            <Link to="/dashboard/tasks" className="flex items-center space-x-2 text-lg sm:text-base">
                                <FaTasks /> <span>Tasks Add</span>
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/dashboard/profile" className="flex items-center space-x-2 text-lg sm:text-base">
                                <FaUser /> <span>Profile</span>
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/dashboard/list" className="flex items-center space-x-2 text-lg sm:text-base">
                                <FaTasks /> <span>Tasks List</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div>
                    <Logout></Logout>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;