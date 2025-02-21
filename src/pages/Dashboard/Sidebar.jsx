import React from "react";
import { FaTasks, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Logout from "../../components/logout";
import { RiStickyNoteAddLine } from "react-icons/ri";

const Sidebar = () => {
    const location = useLocation();

    return (
        <aside className="bg-gray-800 h-screen text-white p-6">
            <h2 className="text-2xl font-bold mb-6 sm:text-xl">Dashboard</h2>
            <nav className="flex-1">
                <ul>
                    <li className="mb-4">
                        <Link 
                            to="/dashboard/tasks"
                            className={`flex items-center space-x-2 text-lg sm:text-base p-2 rounded-md ${
                                location.pathname === "/dashboard/tasks" ? "bg-gray-700" : "hover:bg-gray-700"
                            }`}
                        >
                            <RiStickyNoteAddLine /> <span>Tasks Add</span>
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link 
                            to="/dashboard/lists"
                            className={`flex items-center space-x-2 text-lg sm:text-base p-2 rounded-md ${
                                location.pathname === "/dashboard/lists" ? "bg-gray-700" : "hover:bg-gray-700"
                            }`}
                        >
                            <FaTasks /> <span>Tasks List</span>
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link 
                            to="/dashboard/profile"
                            className={`flex items-center space-x-2 text-lg sm:text-base p-2 rounded-md ${
                                location.pathname === "/dashboard/profile" ? "bg-gray-700" : "hover:bg-gray-700"
                            }`}
                        >
                            <FaUser /> <span>Profile</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div>
                <Logout />
            </div>
        </aside>
    );
};

export default Sidebar;
