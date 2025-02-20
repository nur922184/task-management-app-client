import React from 'react';
import Sidebar from '../Dashboard/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 p-6 bg-gray-100">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;