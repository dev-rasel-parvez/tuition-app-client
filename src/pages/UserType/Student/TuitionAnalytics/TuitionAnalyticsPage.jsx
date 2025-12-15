import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import TutorFilterModal from "./TutorFilterModal";
import TutorDetailsModal from "./TutorDetailsModal";
import { FaFilter } from "react-icons/fa";

const TuitionAnalyticsPage = () => {
  const { tuitionId } = useParams(); // ✅ FIX
  const axiosSecure = useAxiosSecure();

  const [applications, setApplications] = useState([]);
  const [filters, setFilters] = useState({});
  const [showFilter, setShowFilter] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);

  const loadTutors = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await axiosSecure.get(
        `/student/tuition/${tuitionId}/applicants?${query}`
      );
      setApplications(res.data);
    } catch (err) {
      console.error("Failed to load tutors", err);
    }
  };

  useEffect(() => {
    if (tuitionId) loadTutors();
  }, [tuitionId]);

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h2 className="text-3xl font-bold">Tuition Analytics</h2>
        <button className="btn btn-outline" onClick={() => setShowFilter(true)}>
          <FaFilter /> Filter Tutors
        </button>
      </div>

      {applications.length === 0 && (
        <p className="text-gray-500">No tutors applied yet.</p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {applications.map(app => (
          <div
            key={app._id}
            className="bg-white p-5 rounded-xl shadow cursor-pointer"
            onClick={() => setSelectedTutor(app.tutor)}
          >
            <img
              src={app.tutor.photoURL}
              className="w-20 h-20 rounded-full mx-auto"
            />
            <h3 className="text-center font-bold mt-2">{app.tutor.name}</h3>
            <p className="text-center text-sm">{app.tutor.university}</p>
            <p className="text-center text-sm">{app.tutor.department}</p>

            <button className="btn btn-sm btn-outline w-full mt-3">
              Contact Tutor
            </button>
          </div>
        ))}
      </div>

      {showFilter && (
        <TutorFilterModal
          filters={filters}
          setFilters={setFilters}
          close={() => setShowFilter(false)}
          apply={() => {
            loadTutors();
            setShowFilter(false);
          }}
        />
      )}

      {selectedTutor && (
        <TutorDetailsModal
          tutor={selectedTutor}
          close={() => setSelectedTutor(null)}
        />
      )}
    </div>
  );
};

export default TuitionAnalyticsPage;
