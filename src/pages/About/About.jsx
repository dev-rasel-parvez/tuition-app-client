import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaCheckCircle, FaChalkboardTeacher, FaShieldAlt } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const  About = ()=> {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-10 text-center">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold"
          style={{ color: "var(--color-accent)" }}
        >
          About eTuitionBd
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.8 }}
          className="mt-4 text-lg max-w-2xl mx-auto text-[var(--color-muted)] leading-relaxed"
        >
          We connect students with verified expert tutors — making education simple,
          secure, and accessible across Bangladesh.
        </motion.p>
      </section>

      {/* Mission Section */}
      <section className="bg-[var(--color-bg-soft)] py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          
          {/* Text */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-[var(--color-muted)] leading-relaxed">
              Our goal is to revolutionize private tutoring by building a platform
              that ensures trust, transparency, and smooth communication between
              students and tutors.  
              <br /><br />
              From posting tuition requests to managing classes, payments, and tutor
              profiles — we help both students and tutors focus on what matters most:
              quality learning.
            </p>
          </motion.div>

          {/* Image */}
          <motion.img
            src="https://images.pexels.com/photos/3182763/pexels-photo-3182763.jpeg"
            alt="Teamwork"
            className="rounded-xl shadow-xl object-cover w-full h-80"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.8 }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose eTuitionBd?</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature */}
          <motion.div
            className="p-6 bg-[var(--color-bg-soft)] rounded-xl shadow hover:shadow-lg transition"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.4 }}
          >
            <FaUsers className="text-3xl mb-3" style={{ color: "var(--color-accent)" }} />
            <h3 className="font-semibold mb-2">Verified Tutors</h3>
            <p className="text-sm text-[var(--color-muted)]">Every tutor is identity-checked and skill-verified.</p>
          </motion.div>

          <motion.div
            className="p-6 bg-[var(--color-bg-soft)] rounded-xl shadow hover:shadow-lg transition"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.5 }}
          >
            <FaShieldAlt className="text-3xl mb-3" style={{ color: "var(--color-accent)" }} />
            <h3 className="font-semibold mb-2">Secure & Transparent</h3>
            <p className="text-sm text-[var(--color-muted)]">Payment protection, verified reviews, and safe communication.</p>
          </motion.div>

          <motion.div
            className="p-6 bg-[var(--color-bg-soft)] rounded-xl shadow hover:shadow-lg transition"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.6 }}
          >
            <FaChalkboardTeacher className="text-3xl mb-3" style={{ color: "var(--color-accent)" }} />
            <h3 className="font-semibold mb-2">Expert Teachers</h3>
            <p className="text-sm text-[var(--color-muted)]">Find tutors for all classes, subjects, and skill levels.</p>
          </motion.div>

          <motion.div
            className="p-6 bg-[var(--color-bg-soft)] rounded-xl shadow hover:shadow-lg transition"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.7 }}
          >
            <FaCheckCircle className="text-3xl mb-3" style={{ color: "var(--color-accent)" }} />
            <h3 className="font-semibold mb-2">Reliable Experience</h3>
            <p className="text-sm text-[var(--color-muted)]">Fast matching, streamlined workflow, and easy class tracking.</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold"
        >
          Ready to Start Your Learning Journey?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-6"
        >
          <a href="/tuitions" className="btn btn-accent text-[var(--accent-text-color)]">
            Find a Tutor
          </a>
        </motion.div>
      </section>

    </div>
  );
}
export default  About;
