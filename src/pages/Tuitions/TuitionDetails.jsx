import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const TuitionDetails = () => {
  const { id } = useParams();
  const [tuition, setTuition] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    axios.get(`/tuitions/${id}`).then((res) => setTuition(res.data));
  }, [id]);

  const apply = async () => {
    const res = await axios.post(`/tuitions/${id}/apply`, {
      tutorEmail: user.email,
      tutorName: user.displayName,
    });

    if (res.data.applied) {
      Swal.fire("Applied!", "Your application has been submitted.", "success");
    }
  };

  if (!tuition) return <div>Loading...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto">

      <h1 className="text-4xl font-bold mb-6">{tuition.class} Tuition</h1>

      <div className="space-y-3">
        <p><strong>Subjects:</strong> {tuition.subjects}</p>
        <p><strong>Budget:</strong> {tuition.budget}</p>
        <p><strong>Location:</strong> {tuition.location}</p>
        <p><strong>Schedule:</strong> {tuition.schedule}</p>

        <hr />

        <h2 className="text-2xl font-semibold">Tutor Requirements</h2>
        <p><strong>SSC:</strong> {tuition.sscResult}</p>
        <p><strong>HSC:</strong> {tuition.hscResult}</p>
        <p><strong>University:</strong> {tuition.university}</p>
        <p><strong>Department:</strong> {tuition.uniSubject}</p>
        <p><strong>Running Year:</strong> {tuition.runningYear}</p>
        <p><strong>Experience:</strong> {tuition.experience}</p>
      </div>

      <button className="btn btn-primary mt-6" onClick={apply}>
        Apply for This Tuition
      </button>
    </div>
  );
};

export default TuitionDetails;
