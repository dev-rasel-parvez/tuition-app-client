import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardSidebar from "../pages/Shared/DashboardSidebar/DashboardSidebar";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  // ✅ AUTO-COLLAPSE ON MOBILE
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setCollapsed(true);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashboardSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
