import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useAuth from "../../../hooks/useAuth";


const TutorDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState(false); // NEW → Hide contact until unlock

  // MASKING FUNCTIONS
  const maskPhone = (num) => num ? num.slice(0, 3) + "******" + num.slice(-2) : "";
  const maskEmail = (email) => {
    if (!email) return "";
    const [name, domain] = email.split("@");
    return name.slice(0, 2) + "****@" + domain;
  };

  // LOAD SINGLE TUTOR
  const loadTutor = async () => {
    try {
      const res = await axiosSecure.get(`/tutors/details/${id}`);
      setTutor(res.data.tutor);
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Unable to load tutor details", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
     loadTutor();
  }, []);

  // UNLOCK CONTACT
  const unlockContact = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to unlock tutor contact information.",
        confirmButtonText: "Login Now",
      }).then(() => navigate("/login"));
      return;
    }

    Swal.fire({
      title: "Unlock Contact?",
      html: `
        <p class="text-lg">Pay <strong>1000 Taka</strong> to reveal phone & email.</p>
        <p class="text-sm text-gray-500 mt-2">Amount will be adjusted in tutor’s first-month salary.</p>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Pay Now",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setUnlocked(true);
        Swal.fire("Unlocked!", "Full contact information is now visible.", "success");
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="text-center text-red-500 text-xl mt-20">
        Tutor not found
      </div>
    );
  }

  return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8"
      >
        {/* BACK BUTTON */}
        <button className="btn btn-sm mb-5 bg-red-400" onClick={() => navigate("/dashboard/tutors")}>
          ← Back to Tutors list
        </button>

        {/* HEADER */}
        <div className="flex flex-col items-center text-center">
          <img
            src={tutor.photoURL || "https://i.ibb.co/qW1s4HQ/user.png"}
            className="w-32 h-32 rounded-full border-4 border-pink-500"
          />

          <h2 className="text-3xl font-bold mt-3 mb-1">{tutor.name}</h2>
          <p className="text-gray-600">
            <strong>Tutor University: </strong> {tutor.university}
          </p>
          <p className="text-gray-600">
            <strong>Tutor Department: </strong> {tutor.department}
          </p>
        </div>

        {/* DETAILS */}
        <div className="mt-6 bg-gray-50 p-6 rounded-xl space-y-2">
          <p><strong>SSC Result:</strong> {tutor.ssc}</p>
          <p><strong>HSC Result:</strong> {tutor.hsc}</p>
          <p><strong>Running Year:</strong> {tutor.runningYear}</p>
          <p><strong>Experience:</strong> {tutor.experience} years</p>
        </div>

        {/* CONTACT BOX */}
        <div className="mt-6 border p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-3">Contact Information</h3>

          <p>
            <strong>Phone:</strong>{" "}
            {unlocked ? tutor.phone : maskPhone(tutor.phone)}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            {unlocked ? tutor.email : maskEmail(tutor.email)}
          </p>

          {!unlocked && (
            <button
              className="btn btn-primary w-full mt-4"
              onClick={unlockContact}
            >
              Unlock Full Contact (1000 Taka)
            </button>
          )}
        </div>
      </motion.div>
  );
};

export default TutorDetails;
