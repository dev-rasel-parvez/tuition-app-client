import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../contexts/ThemeContext/ThemeContext";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import ThemeSwitcher from "../../../contexts/ThemeContext/ThemeSwitcher";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut().catch((err) => console.log(err));
  };

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
    <div className="navbar bg-[var(--color-bg-soft)] shadow-sm sticky top-0 z-50 px-4">

      {/* LEFT - Logo + Mobile Menu */}
      <div className="navbar-start">

        {/* Mobile Dropdown */}
        <div className="dropdown md:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-sm">
            ☰
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 w-52 bg-[var(--color-bg)] shadow rounded-box">
            {navItems}
          </ul>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold"
          style={{ color: "var(--color-accent)" }}
        >
          eTuitionBd
        </Link>
      </div>

      {/* CENTER - Desktop Menu */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 flex gap-3">
          {navItems}
        </ul>
      </div>

      {/* RIGHT - Actions */}
      <div className="navbar-end flex items-center gap-3">

        

        {/* If NO USER → show Login & Register */}
        {!user && (
          <>
            <Link to="/login" className="btn btn-sm btn-outline">Login</Link>
            <Link to="/register" className="btn btn-sm btn-accent text-white">Register</Link>
          </>
        )}

        

        {/* If USER LOGGED IN → show Dashboard + Profile Dropdown */}
        {user && (
          <div className="dropdown dropdown-end">

            {/* Avatar Button */}
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="profile" />
                ) : (
                  <FaUserCircle className="text-3xl" />
                )}
              </div>
            </label>

            {/* Dropdown Menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[var(--color-bg)] text-[var(--color-text-primary)] shadow rounded-box mt-3 w-48 p-2"
            >
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>

              <li>
                <button onClick={handleLogOut}>Logout</button>
              </li>
            </ul>
          </div>
        )}

        {/* Theme Toggle */}
        <ThemeSwitcher />

      </div>
    </div>
  );
};

export default Navbar;
