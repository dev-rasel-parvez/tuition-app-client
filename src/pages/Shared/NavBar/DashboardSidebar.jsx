import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
    FaHome,
    FaBook,
    FaUserGraduate,
    FaChalkboardTeacher,
    FaRegClipboard,
    FaUserCog,
    FaCog,
    FaSignOutAlt,
} from "react-icons/fa";
import ThemeSwitcher from "../../../contexts/ThemeContext/ThemeSwitcher";

const DashboardSidebar = ({ onLogout }) => {
    return (
        <aside className="w-64 bg-[var(--color-bg-soft)] h-screen shadow-md hidden md:flex flex-col p-5 sticky top-0">

            {/* Sidebar Header */}
            <Link
                to="/"
                className="text-2xl font-bold mb-5"
                style={{ color: "var(--color-accent)" }}
            >
                eTuitionBd
            </Link>

            {/* Navigation Menu */}
            <nav className="flex flex-col gap-2 text-[var(--color-text-primary)]">

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-lg transition ${isActive
                            ? "bg-[var(--color-accent)] text-white"
                            : "hover:bg-[var(--color-bg)]"
                        }`
                    }
                >
                    <FaHome />
                    Home
                </NavLink>

                <NavLink
                    to="/dashboard/my-tuitions"
                    className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-lg transition ${isActive
                            ? "bg-[var(--color-accent)] text-white"
                            : "hover:bg-[var(--color-bg)]"
                        }`
                    }
                >
                    <FaBook />
                    My Tuitions
                </NavLink>

                <NavLink
                    to="/dashboard/applications"
                    className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-lg transition ${isActive
                            ? "bg-[var(--color-accent)] text-white"
                            : "hover:bg-[var(--color-bg)]"
                        }`
                    }
                >
                    <FaRegClipboard />
                    Applications
                </NavLink>

                <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-lg transition ${isActive
                            ? "bg-[var(--color-accent)] text-white"
                            : "hover:bg-[var(--color-bg)]"
                        }`
                    }
                >
                    <FaUserGraduate />
                    My Profile
                </NavLink>

                <NavLink
                    to="/dashboard/become-tutor"
                    className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-lg transition ${isActive
                            ? "bg-[var(--color-accent)] text-white"
                            : "hover:bg-[var(--color-bg)]"
                        }`
                    }
                >
                    <FaChalkboardTeacher />
                    Become a Tutor
                </NavLink>

                {/* Admin section (optional) */}
                <NavLink
                    to="/dashboard/admin"
                    className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-lg transition ${isActive
                            ? "bg-[var(--color-accent)] text-white"
                            : "hover:bg-[var(--color-bg)]"
                        }`
                    }
                >
                    <FaUserCog />
                    Admin Panel
                </NavLink>

                {/* Settings */}
                <NavLink
                    to="/dashboard/settings"
                    className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-lg transition ${isActive
                            ? "bg-[var(--color-accent)] text-white"
                            : "hover:bg-[var(--color-bg)]"
                        }`
                    }
                >
                    <FaCog />
                    Settings
                </NavLink>



                {/* Theme Toggle Styled */}
                <div className="flex items-center -mt-4 p-4 rounded-lg cursor-pointer transition  text-[64px]">
                    <ThemeSwitcher />
                    
                </div>


                {/* Logout Button */}
                <button
                    onClick={onLogout}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-100 hover:text-red-600 mt-5 transition"
                >
                    <FaSignOutAlt />
                    Logout
                </button>
            </nav>
        </aside>
    );
};

export default DashboardSidebar;
