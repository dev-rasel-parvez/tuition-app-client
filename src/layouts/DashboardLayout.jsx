import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../pages/Shared/NavBar/DashboardSidebar';

const DashboardLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      <DashboardSidebar></DashboardSidebar>

      <main className="flex-1 bg-[var(--color-bg)] text-[var(--color-text-primary)]">
        <Outlet />
      </main>

      
    </div>
    );
};

export default DashboardLayout;