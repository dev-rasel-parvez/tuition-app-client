import React from 'react';
import { Link } from 'react-router-dom';
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaGithub,
} from 'react-icons/fa';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-base-300 bg-[var(--color-bg-soft)] text-[var(--color-text-primary)] mt-10">
            <div className="max-w-6xl mx-auto px-4">
                {/* Top section */}
                <div className="footer py-10 text-sm md:items-start grid grid-cols-4">
                    {/* Brand + short text */}
                    <div>
                        <Link
                            to="/"
                            className="text-2xl font-bold"
                            style={{ color: 'var(--color-accent)' }}
                        >
                            eTuitionBd
                        </Link>
                        <p className="mt-3 text-[var(--color-muted)] leading-relaxed max-w-xs">
                            Smart tuition management for students and tutors —
                            class tracking, secure payments, and verified tutors in
                            one place.
                        </p>
                    </div>

                    {/* Quick links */}
                    <nav>
                        <h6 className="footer-title text-xs font-semibold tracking-wide">
                            Quick Links
                        </h6>
                        <Link
                            to="/"
                            className="link link-hover"
                        >
                            Home
                        </Link>
                        <Link
                            to="/tuitions"
                            className="link link-hover"
                        >
                            Tuitions
                        </Link>
                        <Link
                            to="/tutors"
                            className="link link-hover"
                        >
                            Tutors
                        </Link>
                        <Link
                            to="/dashboard"
                            className="link link-hover"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/contact"
                            className="link link-hover"
                        >
                            Contact
                        </Link>
                    </nav>

                    {/* Contact */}
                    <div>
                        <h6 className="footer-title text-xs font-semibold tracking-wide">
                            Contact
                        </h6>
                        <p className="text-[var(--color-muted)]">
                            Email:{' '}
                            <a
                                href="mailto:support@etuitionbd.com"
                                className="link link-hover"
                            >
                                support@etuitionbd.com
                            </a>
                        </p>
                        <p className="mt-1 text-[var(--color-muted)]">
                            Location: Dhaka, Bangladesh
                        </p>
                    </div>

                    {/* Social + newsletter (optional) */}
                    <div>
                        <h6 className="footer-title text-xs font-semibold tracking-wide">
                            Stay Connected
                        </h6>
                        <div className="flex gap-3 mt-2">
                            <a
                                href="#"
                                className="w-9 h-9 rounded-full border border-base-300 flex items-center justify-center hover:bg-[var(--color-accent)] hover:text-[var(--accent-text-color)] transition-colors"
                            >
                                <FaFacebookF size={14} />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 rounded-full border border-base-300 flex items-center justify-center hover:bg-[var(--color-accent)] hover:text-[var(--accent-text-color)] transition-colors"
                            >
                                <FaInstagram size={16} />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 rounded-full border border-base-300 flex items-center justify-center hover:bg-[var(--color-accent)] hover:text-[var(--accent-text-color)] transition-colors"
                            >
                                <FaLinkedinIn size={16} />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 rounded-full border border-base-300 flex items-center justify-center hover:bg-[var(--color-accent)] hover:text-[var(--accent-text-color)] transition-colors"
                            >
                                <FaGithub size={16} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-base-300 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-[var(--color-muted)]">
                    <p>© {year} eTuitionBd. All rights reserved.</p>

                    <div className="flex gap-4">
                        <button className="link link-hover">Terms</button>
                        <button className="link link-hover">Privacy</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
