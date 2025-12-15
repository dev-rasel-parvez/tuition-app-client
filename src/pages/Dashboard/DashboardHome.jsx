import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import {
  FaBookOpen,
  FaUsers,
  FaGraduationCap,
  FaUserCog,
  FaClipboardList,
  FaChartBar,
} from "react-icons/fa";

const DashboardHome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();

  const [profileName, setProfileName] = useState("");

  // ✅ LOAD LATEST PROFILE NAME FROM DB
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get("/profile")
      .then(res => {
        setProfileName(res.data.name);
      })
      .catch(() => {
        setProfileName(user.displayName || "User");
      });
  }, [user?.email]);

  const Card = ({ icon, title, desc, to }) => (
    <div
      onClick={() => navigate(to)}
      className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex items-start gap-4"
    >
      <div className="text-3xl text-pink-600">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-500 text-sm">{desc}</p>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-8">

      {/* HEADER */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold">
          Welcome,{" "}
          <span className="uppercase">
            {profileName || "User"}
          </span>{" "}
          as a <span className="capitalize">{role}</span> 👋
        </h2>
        <p className="text-gray-500 mt-1">
          This is your dashboard overview
        </p>
      </div>

      {/* STUDENT DASHBOARD */}
      {role === "student" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            icon={<FaBookOpen />}
            title="Post a Tuition"
            desc="Create tuition posts to find tutors"
            to="/dashboard/post-tuition"
          />

          <Card
            icon={<FaUsers />}
            title="Available Tutors"
            desc="Browse verified tutors"
            to="/dashboard/tutors"
          />

          <Card
            icon={<FaGraduationCap />}
            title="My Tuitions"
            desc="Track applications & analytics"
            to="/dashboard/my-tuitions"
          />
        </div>
      )}

      {/* ADMIN DASHBOARD */}
      {role === "admin" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            icon={<FaUserCog />}
            title="User Management"
            desc="Approve or manage users"
            to="/dashboard/admin/users"
          />

          <Card
            icon={<FaClipboardList />}
            title="Tuition Management"
            desc="Approve or reject tuitions"
            to="/dashboard/admin/tuitions"
          />

          <div className="bg-white rounded-xl shadow p-6 flex items-start gap-4">
            <div className="text-3xl text-green-600">
              <FaChartBar />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Platform Overview</h3>
              <p className="text-gray-500 text-sm">
                Monitor system activity
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TUTOR DASHBOARD */}
      {role === "tutor" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            icon={<FaClipboardList />}
            title="My Applications"
            desc="View tuition applications"
            to="/dashboard/tutor/applications"
          />

          <Card
            icon={<FaGraduationCap />}
            title="My Profile"
            desc="Update tutor profile"
            to="/dashboard/tutor/profile"
          />
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
