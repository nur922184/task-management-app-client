import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navber";
import Footer from "../../components/Footer";
import { ToastContainer } from 'react-toastify';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <ToastContainer position="top-right" autoClose={3000} />
        <Outlet /> {/* চাইল্ড রাউটগুলি এখানে রেন্ডার হবে */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;