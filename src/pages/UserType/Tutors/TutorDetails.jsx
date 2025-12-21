import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import DirectHirePaymentModal from "./DirectHirePaymentModal";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const TutorDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  /* ===============================
     MASK HELPERS
  =============================== */
  const maskPhone = (num) =>
    num ? num.slice(0, 3) + "******" + num.slice(-2) : "";

  const maskEmail = (email) => {
    if (!email) return "";
    const [name, domain] = email.split("@");
    return name.slice(0, 2) + "****@" + domain;
  };

  /* ===============================
     LOAD TUTOR
  =============================== */
  useEffect(() => {
    const loadTutor = async () => {
      try {
        const res = await axiosSecure.get(`/tutors/details/${id}`);
        setTutor(res.data.tutor);
      } catch (err) {
        Swal.fire("Error", "Tutor not found", "error");
      } finally {
        setLoading(false);
      }
    };

    loadTutor();
  }, [id, axiosSecure]);

  /* ===============================
     GLOBAL UNLOCK CHECK
     (ONE PAYMENT → ALL TUTORS)
  =============================== */
  useEffect(() => {
    if (!user) {
      setUnlocked(false);
      return;
    }

    const checkUnlock = async () => {
      try {
        const res = await axiosSecure.get("/payments/direct-hire/check");
        setUnlocked(res.data.unlocked);
      } catch {
        setUnlocked(false);
      }
    };

    checkUnlock();
  }, [user, axiosSecure]);

  /* ===============================
     UNLOCK BUTTON CLICK
  =============================== */
  const handleUnlockClick = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to unlock tutor contact information.",
        confirmButtonText: "Login Now",
      }).then(() => navigate("/login"));
      return;
    }

    setShowPaymentModal(true);
  };

  /* ===============================
     UI STATES
  =============================== */
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (!tutor) {
    return <div className="text-center text-red-500 mt-20">Tutor not found</div>;
  }

  return (
    <Elements stripe={stripePromise}>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto mt-10 bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* BACK */}
        <div className="p-4">
          <button
            className="btn btn-sm bg-red-400"
            onClick={() => navigate("/dashboard/tutors")}
          >
            ← Back to Tutors
          </button>
        </div>

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-center p-8">
          <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200">
            <img
              src={tutor.photoURL || "https://i.ibb.co/qW1s4HQ/user.png"}
              alt={tutor.name}
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-2xl font-bold text-white mt-4">
            {tutor.name}
          </h2>
          <p className="text-blue-100 text-sm mt-1">
            {tutor.university} · {tutor.department}
          </p>
        </div>

        {/* DETAILS */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <Info icon="🎓" label="University" value={tutor.university} />
          <Info icon="🏫" label="Department" value={tutor.department} />
          <Info icon="📘" label="SSC Result" value={tutor.ssc} />
          <Info icon="📗" label="HSC Result" value={tutor.hsc} />
          <Info icon="📅" label="Running Year" value={tutor.runningYear} />
          <Info
            icon="👨‍🏫"
            label="Experience"
            value={`${tutor.experience} years`}
            highlight
          />
        </div>

        {/* CONTACT */}
        <div className="border-t p-6 bg-gray-50">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            📞 Contact Information
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              Verified Tutor
            </span>
          </h3>

          {/* PHONE */}
          <p className="mb-2">
            <b>Phone:</b>{" "}
            {unlocked ? (
              <a
                href={`tel:${tutor.phone}`}
                className="text-blue-600 font-mono hover:underline"
              >
                {tutor.phone}
              </a>
            ) : (
              <span className="font-mono">{maskPhone(tutor.phone)}</span>
            )}
          </p>

          {/* EMAIL */}
          <p>
            <b>Email:</b>{" "}
            {unlocked ? (
              <a
                href={`mailto:${tutor.email}`}
                className="text-blue-600 font-mono hover:underline"
              >
                {tutor.email}
              </a>
            ) : (
              <span className="font-mono">{maskEmail(tutor.email)}</span>
            )}
          </p>

          {!unlocked && (
            <button
              onClick={handleUnlockClick}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
            >
              🔓 Unlock All Tutor Contacts (1000 Taka)
            </button>
          )}
        </div>
      </motion.div>

      {/* PAYMENT MODAL */}
      {showPaymentModal && (
        <DirectHirePaymentModal
          tutorId={tutor._id}
          close={() => setShowPaymentModal(false)}
          onSuccess={() => {
            setUnlocked(true);
            setTimeout(() => {
              navigate("/dashboard/payment-history");
            }, 300);
          }}
        />
      )}
    </Elements>
  );
};

/* ===============================
   SMALL INFO CARD
=============================== */
const Info = ({ icon, label, value, highlight }) => (
  <div
    className={`flex items-center gap-3 p-4 rounded-lg ${highlight ? "bg-green-50" : "bg-gray-50"
      }`}
  >
    <span className="text-xl">{icon}</span>
    <div>
      <p className="text-gray-500">{label}</p>
      <p className={`font-semibold ${highlight && "text-green-700"}`}>
        {value}
      </p>
    </div>
  </div>
);

export default TutorDetails;
