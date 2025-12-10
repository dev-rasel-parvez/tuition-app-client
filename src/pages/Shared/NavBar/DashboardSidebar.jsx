import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  FaHome,
  FaBook,
  FaPlusCircle,
  FaRegClipboard,
  FaUserGraduate,
  FaMoneyCheckAlt,
  FaUsersCog,
  FaListAlt,
  FaChartPie,
  FaSignOutAlt
} from "react-icons/fa";

import ThemeSwitcher from "../../../contexts/ThemeContext/ThemeSwitcher";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import useRole from "../../../hooks/useRole";

const DashboardSidebar = ({ closeSidebar }) => {
  const { logOut } = useContext(AuthContext);
  const { role } = useRole();

  const NavItem = ({ to, text, icon, end }) => (
    <NavLink
      to={to}
      end={end}
      onClick={closeSidebar}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-lg transition 
        ${isActive
          ? "bg-[var(--color-accent)] text-white"
          : "hover:bg-[var(--color-bg)] text-[var(--color-text-primary)]"
        }`
      }
    >
      {icon}
      {text}
    </NavLink>
  );

  return (
    <aside className="w-64 h-full bg-[var(--color-bg-soft)] text-[var(--color-text-primary)] p-5 flex flex-col shadow-lg">

      <Link
        to="/"
        onClick={closeSidebar}
        className="text-2xl font-bold mb-6 text-[var(--color-accent)]"
      >
        eTuitionBd
      </Link>

      {/* STUDENT MENU */}
      {role === "student" && (
        <>
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            🎓 Student Menu
          </h3>

          <NavItem to="/dashboard" text="Home" icon={<FaHome />} end />
          <NavItem to="/dashboard/post-tuition" text="Post Tuition" icon={<FaPlusCircle />} />
          <NavItem to="/dashboard/my-tuitions" text="My Tuitions" icon={<FaBook />} />
          <NavItem to="/dashboard/applications" text="Applications" icon={<FaRegClipboard />} />
          <NavItem to="/dashboard/payments" text="Payments" icon={<FaMoneyCheckAlt />} />
          <NavItem to="/dashboard/profile" text="Profile Settings" icon={<FaUserGraduate />} />
        </>
      )}

      {/* TUTOR MENU */}
      {role === "tutor" && (
        <>
          <h3 className="font-semibold text-lg mb-3">🧑‍🏫 Tutor Menu</h3>

          <NavItem to="/dashboard" text="Home" icon={<FaHome />} end />
          <NavItem to="/dashboard/tutor/available-tuitions" text=" Available Tuitions" icon={<FaUserGraduate />} />
          <NavItem to="/dashboard/tutor/applications" text="My Applications" icon={<FaRegClipboard />} />
          <NavItem to="/dashboard/tutor/ongoing-tuitions" text="Ongoing Tuitions" icon={<FaBook />} />
          <NavItem to="/dashboard/tutor/revenue" text="Revenue History" icon={<FaMoneyCheckAlt />} />
          <NavItem to="/dashboard/tutor/profile" text="Profile Settings" icon={<FaUserGraduate />} />
          
        </>
      )}

      {/* ADMIN MENU */}
      {role === "admin" && (
        <>
          <h3 className="font-semibold text-lg mb-3">🛠 Admin Menu</h3>

          <NavItem to="/dashboard" text="Dashboard Home" icon={<FaHome />} end />
          <NavItem to="/dashboard/users" text="User Management" icon={<FaUsersCog />} />
          <NavItem to="/dashboard/tuitions" text="Tuition Management" icon={<FaListAlt />} />
          <NavItem to="/dashboard/reports" text="Reports & Analytics" icon={<FaChartPie />} />
        </>
      )}

      <div className="mt-6">
        <ThemeSwitcher />
      </div>

      <button
        onClick={() => {
          logOut();
          closeSidebar();
        }}
        className="flex items-center gap-3 p-3 mt-auto rounded-lg hover:bg-red-100 text-red-600"
      >
        <FaSignOutAlt /> Logout
      </button>
    </aside>
  );
};

export default DashboardSidebar;
