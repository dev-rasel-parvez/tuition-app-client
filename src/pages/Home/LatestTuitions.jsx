import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const LatestTuitions = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [tuitions, setTuitions] = useState([]);

  useEffect(() => {
    axiosSecure.get("/tuitions?limit=6").then(res => {
      setTuitions(res.data.tuitions || []);
    });
  }, [axiosSecure]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Latest Tuition Posts
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {tuitions.map((t, i) => (
          <motion.div
            key={t._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
            onClick={() => navigate("/auth/login")}
            className="cursor-pointer rounded-2xl overflow-hidden bg-white
                       shadow hover:shadow-xl transition"
          >
            {/* ================= HEADER (BLUE) ================= */}
            <div className="bg-blue-50 px-5 py-4 relative">

              <h3 className="text-lg font-bold text-gray-900">
                {t.title}
              </h3>

              <h3 className="text-md font-bold text-gray-900">
                Class: {t.class}
              </h3>

              {/* SUBJECT + SECONDARY BUTTON */}
              <div className="flex items-center justify-between mt-1">
                <p className="font-semibold text-gray-800">
                  Subject: {t.subjects}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/auth/login");
                  }}
                  className="text-xs font-medium px-3 py-1
                             rounded-md border border-blue-600
                             bg-blue-600 text-white
                             cursor-pointer
                             hover:shadow-md hover:scale-105
                             active:scale-95
                             transition-all duration-200"
                >
                  Apply Now
                </button>
              </div>

              <p className="text-sm text-gray-600 mt-1">
                Tuition No: <span className="font-medium">{t.tuitionId}</span>
              </p>
            </div>

            {/* ================= DETAILS (WHITE) ================= */}
            <div className="px-5 py-4 space-y-2 text-sm text-gray-800">
              <p>📍 <strong>Location:</strong> {t.location}</p>
              <p>📅 <strong>Schedule:</strong> {t.schedule}</p>
              <p>🎓 <strong>Tutor University:</strong> {t.university}</p>
              <p>🏫 <strong>Department:</strong> {t.uniSubject}</p>
            </div>

            {/* ================= FOOTER (GREEN) ================= */}
            <div className="bg-green-50 px-5 py-4 flex justify-between items-center">
              <div>
                <p className="text-xl font-bold text-green-700">
                  {t.budget} TK
                </p>
                <p className="text-xs text-gray-600">
                  Posted by {t.postedByEmail}
                </p>
              </div>

              <p className="text-xs text-gray-500 flex items-center gap-1">
                ⏱ {Math.floor((Date.now() - new Date(t.createdAt)) / 3600000)} hours ago
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LatestTuitions;
