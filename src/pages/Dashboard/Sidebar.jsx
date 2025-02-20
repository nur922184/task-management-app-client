import React from "react";
import { FaTasks, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link, } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Logout from "../../components/logout";

const Sidebar = () => {
    const { user,} = useAuth();

    return (
        <aside className="w-64 bg-blue-800 text-white p-4 flex flex-col h-screen">
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
            <nav className="flex-1">
                <ul>
                    <li className="mb-4">
                        <Link to="/tasks" className="flex items-center space-x-2">
                            <FaTasks /> <span>Tasks</span>
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/dashboard/profile" className="flex items-center space-x-2">
                            <FaUser /> <span>Profile</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            <Logout></Logout>
        </aside>
    );
};

export default Sidebar;