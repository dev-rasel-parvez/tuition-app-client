import { NavLink, useNavigate } from "react-router-dom";
import {
    HiHome,
    HiChevronDoubleLeft,
    HiChevronDoubleRight,
    HiLogout,
} from "react-icons/hi";
import { FaBook, FaUserGraduate, FaUsersCog } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";

const DashboardSidebar = ({ collapsed, setCollapsed }) => {
    const { logOut } = useAuth();
    const { role, status } = useRole();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logOut();
        navigate("/auth/login");
    };

    return (
        <aside
            className={`bg-white shadow-lg transition-all duration-300 flex flex-col
        ${collapsed ? "w-16" : "w-64"}
      `}
        >
            {/* HEADER */}
            <div className="h-16 flex items-center justify-between px-3 border-b">
                {!collapsed && (
                    <h2 className="text-pink-600 font-bold text-xl">
                        eTuitionBd
                    </h2>
                )}

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1 rounded-full hover:bg-gray-200"
                >
                    {collapsed ? (
                        <HiChevronDoubleRight size={18} />
                    ) : (
                        <HiChevronDoubleLeft size={18} />
                    )}
                </button>
            </div>

            {/* MENU */}
            <ul className="p-3 space-y-2 flex-1">

                {/* STUDENT */}
                {role === "student" && (
                    <>
                        <NavItem to="/dashboard" icon={<HiHome />} text="Home" collapsed={collapsed} />
                        <NavItem to="/dashboard/post-tuition" icon={<FaBook />} text="Post Tuition" collapsed={collapsed} />
                        <NavItem to="/dashboard/profile" icon={<FaUserGraduate />} text="Profile" collapsed={collapsed} />
                    </>
                )}

                {/* TUTOR */}
                {role === "tutor" && (
                    <>
                        <NavItem to="/dashboard" icon={<HiHome />} text="Home" collapsed={collapsed} />
                        <NavItem to="/dashboard/tutor/applications" icon={<FaBook />} text="Applications" collapsed={collapsed} />
                        <NavItem to="/dashboard/tutor/profile" icon={<FaUserGraduate />} text="Profile" collapsed={collapsed} />
                    </>
                )}

                {/* ADMIN */}
                {role === "admin" && (
                    <>
                        {/* Dashboard always visible */}
                        <NavItem
                            to="/dashboard"
                            icon={<HiHome />}
                            text="Dashboard"
                            collapsed={collapsed}
                        />

                        {/* ⏳ Pending Admin */}
                        {status === "pending" && !collapsed && (
                            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 rounded text-yellow-800 text-sm">
                                ⏳ Your admin access is pending approval.
                                <br />
                                Please wait for super admin approval.
                            </div>
                        )}

                        {/* ✅ Approved Admin */}
                        {status === "approved" && (
                            <>
                                <NavItem
                                    to="/dashboard/users"
                                    icon={<FaUsersCog />}
                                    text="Users"
                                    collapsed={collapsed}
                                />
                                <NavItem
                                    to="/dashboard/tuitions"
                                    icon={<FaBook />}
                                    text="Tuitions"
                                    collapsed={collapsed}
                                />
                            </>
                        )}
                    </>
                )}

            </ul>

            {/* LOGOUT */}
            <div className="p-3 border-t">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full p-2 rounded hover:bg-red-100 text-red-600"
                >
                    <HiLogout size={20} />
                    {!collapsed && <span>Logout</span>}
                </button>
            </div>
        </aside>
    );
};

/* SMALL HELPER COMPONENT */
const NavItem = ({ to, icon, text, collapsed }) => (
    <li>
        <NavLink
            to={to}
            className="flex items-center gap-3 p-2 rounded hover:bg-pink-100"
        >
            {icon}
            {!collapsed && <span>{text}</span>}
        </NavLink>
    </li>
);

export default DashboardSidebar;
