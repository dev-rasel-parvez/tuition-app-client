import React from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Contact = () => {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] flex flex-col">

      {/* CONTENT WRAPPER (fixes empty white space) */}
      <div className="flex-1">

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-14 text-center">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6 }}
            style={{ color: "var(--color-accent)" }}
            className="text-4xl font-bold"
          >
            Contact Us
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.8 }}
            className="mt-4 text-lg max-w-2xl mx-auto text-[var(--color-muted)]"
          >
            Have questions? We're here to help! Whether you're a tutor or a student,
            feel free to reach out anytime.
          </motion.p>
        </section>

        {/* Contact Info Boxes */}
        <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 pb-16 -mt-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            className="p-6 rounded-xl shadow bg-[var(--color-bg-soft)] flex flex-col items-center text-center"
          >
            <FaEnvelope
              className="text-3xl mb-3"
              style={{ color: "var(--color-accent)" }}
            />
            <h3 className="font-semibold mb-1">Email</h3>
            <p className="text-sm text-[var(--color-muted)]">
              support@etuitionbd.com
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            transition={{ delay: 0.15 }}
            className="p-6 rounded-xl shadow bg-[var(--color-bg-soft)] flex flex-col items-center text-center"
          >
            <FaPhoneAlt
              className="text-3xl mb-3"
              style={{ color: "var(--color-accent)" }}
            />
            <h3 className="font-semibold mb-1">Phone</h3>
            <p className="text-sm text-[var(--color-muted)]">
              +880 1234 567 890
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            transition={{ delay: 0.3 }}
            className="p-6 rounded-xl shadow bg-[var(--color-bg-soft)] flex flex-col items-center text-center"
          >
            <FaMapMarkerAlt
              className="text-3xl mb-3"
              style={{ color: "var(--color-accent)" }}
            />
            <h3 className="font-semibold mb-1">Location</h3>
            <p className="text-sm text-[var(--color-muted)]">Dhaka, Bangladesh</p>
          </motion.div>
        </section>

        {/* Contact Form Section */}
        <section className="bg-[var(--color-bg-soft)] py-16 mt-0 mb-0">
          <div className="max-w-4xl mx-auto px-6">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              className="text-3xl font-bold text-center mb-8"
            >
              Send Us a Message
            </motion.h2>

            <motion.form
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              transition={{ duration: 0.6 }}
              className="grid gap-6 bg-[var(--color-bg)] p-8 rounded-xl shadow"
            >
              <div>
                <label className="block mb-1 font-medium text-sm">Your Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-[var(--color-bg-soft)]"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-sm">Email Address</label>
                <input
                  type="email"
                  className="input input-bordered w-full bg-[var(--color-bg-soft)]"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-sm">Message</label>
                <textarea
                  rows="5"
                  className="textarea textarea-bordered w-full bg-[var(--color-bg-soft)]"
                  placeholder="Write your message..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-accent text-[var(--accent-text-color)] w-full"
              >
                Send Message
              </button>
            </motion.form>
          </div>
        </section>
      </div>

    </div>
  );
};

export default Contact;
