import React from "react";
import { Link, Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="bg-[var(--color-bg-soft)] shadow-lg rounded-xl p-6 md:p-10 min-h-screen flex flex-col items-center justify-start bg-[var(--color-bg)] text-[var(--color-text-primary)]">

            {/* Top Logo */}
            <div className="w-full text-center pb-3">
                <Link
                    to="/"
                    className="text-3xl font-bold"
                    style={{ color: "var(--color-accent)" }}
                >
                    eTuitionBd
                </Link>
            </div>

            {/* Main Auth Container (80% width) */}
            <div className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto  flex flex-col md:flex-row items-center gap-10">

                {/* Left Side: Form */}
                <div className="flex-1 w-full">
                    <Outlet />
                </div>

                {/* Right Side: Image */}
                <div className="flex-1 hidden md:block">
                    <img
                        src="https://images.pexels.com/photos/3182763/pexels-photo-3182763.jpeg"
                        alt="Auth Illustration"
                        className="w-full h-[400px] object-cover rounded-xl shadow"
                    />
                </div>
            </div>

        </div>
    );
};

export default AuthLayout;
