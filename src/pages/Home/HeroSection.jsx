import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-green-600 to-emerald-500 text-white py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-6"
        >
          Find the Perfect Tutor for Your Needs
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg mb-8"
        >
          Trusted tutors • Verified students • Secure payments
        </motion.p>

        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/available-tuitions" className="btn btn-white text-green-700">
            Browse Tuitions
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
