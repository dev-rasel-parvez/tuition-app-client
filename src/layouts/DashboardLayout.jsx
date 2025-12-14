import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardSidebar from "../pages/Shared/DashboardSidebar/DashboardSidebar";
import useRole from "../hooks/useRole";


const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { role, status } = useRole();


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
        {role === "admin" && status === "pending" && (
          <div className="m-6 p-6 bg-yellow-100 border border-yellow-400 rounded text-center">
            <h2 className="text-2xl font-bold mb-2">
              Admin Access Pending ⏳
            </h2>
            <p className="text-gray-700">
              Your admin account is waiting for approval from the super admin.
              <br />
              Please wait until approval is completed.
            </p>
          </div>
        )}

        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
