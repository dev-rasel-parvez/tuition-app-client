import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import { ThemeContext } from "../../../contexts/ThemeContext/ThemeContext";
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const navItems = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/available-tuitions">Tuitions</Link></li>
      <li><Link to="/tutors">Tutors</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/contact">Contact</Link></li>
    </>
  );

  return (
    <div className="navbar bg-[var(--color-bg-soft)] text-[var(--color-text-primary)] shadow sticky top-0 z-50 px-4">

      {/* LEFT */}
      <div className="navbar-start">
        <div className="dropdown md:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-sm">☰</label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-[var(--color-bg)] rounded-box shadow mt-3">
            {navItems}
          </ul>
        </div>

        <Link to="/" className="text-2xl font-bold" style={{ color: "var(--color-accent)" }}>
          eTuitionBd
        </Link>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal gap-3">{navItems}</ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end gap-3">

        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <FaUserCircle size={22} />
            </label>
            <ul tabIndex={0} className="menu dropdown-content bg-[var(--color-bg)] rounded-box shadow w-44">
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><button onClick={logOut}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/auth/login" className="btn btn-sm btn-outline">Login</Link>
            <Link to="/auth/register" className="btn btn-sm btn-accent text-white">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
