import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  // 🔥 ONLY underline red (no text color change)
  const navLinkClass = ({ isActive }) =>
    `relative px-2 py-1 font-medium transition
     ${
       isActive
         ? "after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-full after:bg-red-500"
         : "hover:after:absolute hover:after:left-0 hover:after:-bottom-2 hover:after:h-[2px] hover:after:w-full hover:after:bg-red-300"
     }`;

  const navItems = (
    <>
      <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
      <li><NavLink to="/available-tuitions" className={navLinkClass}>Tuitions</NavLink></li>
      <li><NavLink to="/tutors" className={navLinkClass}>Tutors</NavLink></li>
      <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>
      <li><NavLink to="/contact" className={navLinkClass}>Contact</NavLink></li>
    </>
  );

  return (
    <div
      className="
        navbar
        sticky top-0
        z-[9999]
        bg-base-100
        text-base-content
        shadow-md
        px-6
      "
    >
      {/* LEFT */}
      <div className="navbar-start">
        <div className="dropdown md:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-sm">☰</label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 shadow rounded-box mt-3 z-[9999]"
          >
            {navItems}
          </ul>
        </div>

        <Link to="/" className="text-2xl font-bold text-green-600">
          eTuitionBd
        </Link>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal gap-6">
          {navItems}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end gap-3">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <FaUserCircle size={22} />
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-100 shadow rounded-box w-44 z-[9999]"
            >
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><button onClick={logOut}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/auth/login" className="btn btn-outline btn-sm">
              Login
            </Link>
            <Link to="/auth/register" className="btn btn-success btn-sm text-white">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
