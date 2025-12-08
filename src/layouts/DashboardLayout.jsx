import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../pages/Shared/NavBar/DashboardSidebar";
import { FaBars } from "react-icons/fa";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)]">

      {/* 🔥 Hamburger (mobile/tablet only) */}
      <button
        onClick={toggleSidebar}
        className="
          md:hidden
          fixed top-4 left-4 z-50 
          p-2 bg-[var(--color-bg-soft)] shadow-lg rounded-md 
          text-2xl cursor-pointer text-[var(--color-text-primary)]
        "
      >
        <FaBars />
      </button>

      {/* 🔥 Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-40 w-64 h-full bg-[var(--color-bg-soft)] shadow-xl
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0
        `}
      >
        <DashboardSidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* 🔥 Overlay (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* 🔥 Page Content */}
      <main
        className="
          flex-1 p-6
          pt-20
          md:pt-6
          md:ml-64
          text-[var(--color-text-primary)]
        "
      >
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
