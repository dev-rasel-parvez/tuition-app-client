import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const LatestTutors = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    axiosSecure.get("/tutors?limit=6").then(res => {
      setTutors(res.data.tutors || []);
    });
  }, [axiosSecure]);

  const handleCardClick = () => {
    navigate("/auth/login");
  };

  return (
    <section className="max-w-7xl mx-auto px-6">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Latest Tutors
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {tutors.map((t, i) => (
          <motion.div
            key={t._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
            onClick={handleCardClick}
            className="relative cursor-pointer
                       rounded-2xl overflow-hidden bg-white
                       shadow hover:shadow-xl
                       hover:scale-[1.02]
                       transition-all duration-300
                       group"
          >
            {/* 🔒 Hover overlay */}
            <div
              className="absolute inset-0 bg-black/10 opacity-0
                         group-hover:opacity-100
                         transition flex items-center justify-center z-10"
            >
              <span className="bg-green-600 text-white px-5 py-2 rounded-full text-sm font-semibold">
                Login to View Profile
              </span>
            </div>

            {/* ================= TOP (BLUE) ================= */}
            <div className="bg-blue-50 px-6 py-6 text-center">
              <img
                src={t.photoURL || "https://i.ibb.co/2kRZ6XW/user.png"}
                alt={t.name}
                className="w-24 h-24 rounded-full mx-auto
                           object-cover object-top
                           border-4 border-white
                           shadow-md"
              />

              <h3 className="mt-4 text-lg font-bold text-gray-900">
                {t.name}
              </h3>
            </div>

            {/* ================= DETAILS (WHITE) ================= */}
            <div className="px-6 py-5 space-y-2 text-sm text-gray-800">
              <p>🎓 <strong>Tutor University:</strong> {t.university || "N/A"}</p>
              <p>🏫 <strong>Tutor Department:</strong> {t.department || "N/A"}</p>
              <p>📘 <strong>SSC:</strong> {t.ssc || "N/A"}</p>
              <p>📗 <strong>HSC:</strong> {t.hsc || "N/A"}</p>
              <p>📅 <strong>Running Year:</strong> {t.runningYear || "N/A"}</p>
            </div>

            {/* ================= FOOTER (GREEN) ================= */}
            <div className="bg-green-50 px-6 py-4 flex justify-between items-center">
              <p className="text-green-700 font-semibold">
                🧑‍🏫 {t.experience || "0"} years experience
              </p>

              <span className="text-xs text-gray-500">
                Verified Tutor
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LatestTutors;
