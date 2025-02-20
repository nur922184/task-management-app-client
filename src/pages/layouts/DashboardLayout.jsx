import React, { useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] h-screen">
            {/* Sidebar for Large Screens */}
            <aside className="hidden md:block bg-white shadow-lg">
                <Sidebar />
            </aside>

            {/* Mobile Sidebar with Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Mobile Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform z-50 
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
            >
                <Sidebar />
            </aside>

            {/* Main Content */}
            <div className="grid grid-rows-[auto_1fr]">
                {/* Mobile Navbar */}
                <div className="md:hidden bg-white p-4 shadow-md flex items-center justify-between">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="text-gray-600 text-2xl"
                    >
                        <FaBars />
                    </button>
                    <h1 className="text-lg font-semibold">Dashboard</h1>
                </div>

                <main className="p-6 bg-gray-100 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
