import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const TuitionDetails = () => {
  const { tuitionId } = useParams();
  const navigate = useNavigate();
  const [t, setT] = useState(null);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure(); 

  useEffect(() => {
    axiosSecure
      .get(`/tuitions/${tuitionId}`)
      .then((res) => setT(res.data))
      .catch((err) => console.log(err));
  }, [tuitionId, axiosSecure]);

  if (!t) return <div className="text-center mt-20 text-xl">Loading...</div>;

  // ---------------------------
  // Handle Apply Button
  // ---------------------------
  const handleApply = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required!",
        text: "Please login to apply for this tuition.",
        confirmButtonText: "Login Now",
      }).then(() => navigate("/login"));
      return;
    }

    const res = await axiosSecure.post(`/tuitions/${tuitionId}/apply`, {
      tutorEmail: user.email,
      tutorName: user.displayName,
    });

    if (res.data.applied) {
      Swal.fire("Applied!", "Your application has been submitted.", "success");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">

        {/* Title */}
        <h1
          className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-8 
                     animate-[fadeIn_0.6s_ease-in-out]"
        >
          {t.title}
        </h1>

        {/* Main Card */}
        <div
          className="bg-white shadow-2xl rounded-2xl p-10 border border-gray-200 
                      animate-[slideUp_0.6s_ease]"
        >
          <button className="btn btn-sm mb-5 bg-red-400 " onClick={() => navigate("/dashboard/available-tuitions")}>
          ← Back to Tuition list
        </button>

          {/* Tuition Info */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Tuition Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
            <p><strong>Class:</strong> {t.class}</p>
            <p><strong>Subjects:</strong> {t.subjects}</p>
            <p><strong>Budget:</strong> {t.budget} TK</p>
            <p><strong>Location:</strong> {t.location}</p>
            <p><strong>Schedule:</strong> {t.schedule}</p>
          </div>

          <hr className="my-6" />

          {/* Tutor Requirements */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Tutor Requirements</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
            <p><strong>SSC:</strong> {t.sscResult}</p>
            <p><strong>HSC:</strong> {t.hscResult}</p>
            <p><strong>University:</strong> {t.university}</p>
            <p><strong>Department:</strong> {t.uniSubject}</p>
            <p><strong>Running Year:</strong> {t.runningYear}</p>
            <p><strong>Experience:</strong> {t.experience} years</p>
          </div>

          {/* Apply Button */}
          <button
            onClick={handleApply}
            className="mt-10 w-full py-4 bg-green-600 text-white text-xl rounded-xl 
                       shadow-lg hover:bg-green-700 hover:scale-[1.03] transition"
          >
            Apply for This Tuition
          </button>
        </div>
      </div>
  );
};

export default TuitionDetails;
