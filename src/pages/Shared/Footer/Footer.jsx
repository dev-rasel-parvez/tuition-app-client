import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-bg-soft)] text-[var(--color-text-primary)] border-t border-base-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2
            className="text-2xl font-bold mb-3"
            style={{ color: "var(--color-accent)" }}
          >
            eTuitionBd
          </h2>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-sm">
            Smart tuition management for students and tutors — class tracking,
            secure payments, and verified tutors in one modern platform.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="footer-title text-xs font-semibold uppercase tracking-wide mb-3">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2 text-sm">
            <Link className="hover:text-[var(--color-accent)]" to="/">Home</Link>
            <Link className="hover:text-[var(--color-accent)]" to="/available-tuitions">Tuitions</Link>
            <Link className="hover:text-[var(--color-accent)]" to="/tutors">Tutors</Link>
            <Link className="hover:text-[var(--color-accent)]" to="/dashboard">Dashboard</Link>
            <Link className="hover:text-[var(--color-accent)]" to="/contact">Contact</Link>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="footer-title text-xs font-semibold uppercase tracking-wide mb-3">
            Contact
          </h3>
          <p className="text-sm text-[var(--color-muted)]">
            Email:{" "}
            <a
              href="mailto:support@etuitionbd.com"
              className="hover:text-[var(--color-accent)]"
            >
              support@etuitionbd.com
            </a>
          </p>

          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Location: Dhaka, Bangladesh
          </p>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="footer-title text-xs font-semibold uppercase tracking-wide mb-3">
            Stay Connected
          </h3>
          <div className="flex gap-4 mt-2">
            {[FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub].map(
              (Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full border border-base-300 flex items-center justify-center
                             hover:bg-[var(--color-accent)] hover:text-[var(--accent-text-color)]
                             transition-colors"
                >
                  <Icon size={18} />
                </a>
              )
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-base-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-[var(--color-muted)]">
          <p>© {year} eTuitionBd. All rights reserved.</p>

          <div className="flex gap-6 mt-2 md:mt-0">
            <button className="hover:text-[var(--color-accent)]">Terms</button>
            <button className="hover:text-[var(--color-accent)]">Privacy</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
