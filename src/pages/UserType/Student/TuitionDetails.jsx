import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";
import ApplyTuitionModal from "../../tuition/ApplyTuitionModal";
import QualificationMatch from "../../tuition/QualificationMatch";

const TuitionDetails = () => {
  const { tuitionId } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { role } = useRole();

  const [tuition, setTuition] = useState(null);
  const [profile, setProfile] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);

  // Load tuition
  useEffect(() => {
    axiosSecure.get(`/tuitions/${tuitionId}`).then(res => {
      setTuition(res.data);
    });
  }, [tuitionId, axiosSecure]);

  // Load tutor profile
  useEffect(() => {
    if (user?.email && role === "tutor") {
      axiosSecure.get("/profile").then(res => {
        setProfile(res.data);
      });
    }
  }, [user, role, axiosSecure]);

  if (!tuition) {
    return <div className="text-center mt-20 text-xl">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        className="btn btn-sm mb-5 bg-red-400"
        onClick={() => navigate("/dashboard/available-tuitions")}
      >
        ← Back to Tuition list
      </button>

      <h1 className="text-4xl font-bold mb-6">{tuition.title}</h1>

      {/* Tuition Info */}
      <div className="grid md:grid-cols-2 gap-4 text-lg">
        <p><b>Class:</b> {tuition.class}</p>
        <p><b>Subjects:</b> {tuition.subjects}</p>
        <p><b>Budget:</b> {tuition.budget} TK</p>
        <p><b>Location:</b> {tuition.location}</p>
        <p><b>Schedule:</b> {tuition.schedule}</p>
      </div>

      <hr className="my-6" />
      <h2 className="text-2xl font-bold mb-4">Tutor Requirements</h2>

      {/* ✅ NOW VISIBLE FOR ALL */}
      <QualificationMatch
        tuition={tuition}
        profile={role === "tutor" ? profile : null}
      />

      {/* Apply button ONLY for tutor */}
      {role === "tutor" && (
        <button
          onClick={() => setShowApplyModal(true)}
          className="mt-8 w-full py-4 bg-green-600 text-white text-xl rounded-xl"
        >
          Apply for This Tuition
        </button>
      )}

      {/* Apply Modal */}
      {showApplyModal && profile && (
        <ApplyTuitionModal
          tuition={tuition}
          profile={profile}
          close={() => setShowApplyModal(false)}
        />
      )}
    </div>
  );
};

export default TuitionDetails;
