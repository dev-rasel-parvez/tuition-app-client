import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../../contexts/ThemeContext/ThemeContext';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import ThemeSwitcher from '../../../contexts/ThemeContext/ThemeSwitcher';


const Navbar = () => {
    const { user } = useContext(AuthContext);
    const { accent } = useContext(ThemeContext);

    return (
        <nav className="w-full shadow-sm bg-[var(--color-bg-soft)] sticky top-0 z-40">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                
                {/* Left Section */}
                <div className="flex items-center gap-3">
                    <Link
                        to="/"
                        className="text-xl font-bold"
                        style={{ color: 'var(--color-accent)' }}
                    >
                        eTuitionBd
                    </Link>

                    <Link to="/tuitions" className="text-sm hover:underline">
                        Tuitions
                    </Link>
                    <Link to="/tutors" className="text-sm hover:underline">
                        Tutors
                    </Link>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-3">
                    <ThemeSwitcher />
                    

                    {user ? (
                        <Link to="/dashboard" className="btn btn-sm">
                            Dashboard
                        </Link>
                    ) : (
                        <Link to="/login" className="btn btn-sm btn-outline">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
