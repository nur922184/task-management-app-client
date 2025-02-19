import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navber";
import Footer from "../../components/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet /> {/* চাইল্ড রাউটগুলি এখানে রেন্ডার হবে */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;