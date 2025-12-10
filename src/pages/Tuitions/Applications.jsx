import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ApplicantModal from "../../pages/Tuitions/ApplicantModal";
import { FaFilter } from "react-icons/fa";

const Applications = () => {
  const { tuitionId } = useParams();   // ✅ FIXED
  const axiosSecure = useAxiosSecure();

  const [apps, setApps] = useState([]);
  const [showModal, setShowModal] = useState(null);

  const [filters, setFilters] = useState({
    sscResult: "",
    hscResult: "",
    university: "",
    department: "",
    runningYear: "",
    experience: ""
  });

  const loadApps = async () => {
    // ✅ FIXED — correct backend endpoint
    let query = `/applications/by-tuition/${tuitionId}?`;

    Object.entries(filters).forEach(([k, v]) => {
      if (v) query += `${k}=${v}&`;
    });

    const res = await axiosSecure.get(query);
    setApps(res.data);
  };

  useEffect(() => {
    loadApps();
  }, [filters]);

  return (
    <div className="p-8">

      <h2 className="text-3xl font-bold mb-3">
        Applications ({apps.length})
      </h2>

      {/* FILTER SECTION */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 my-4">

        {Object.keys(filters).map(key => (
          <input
            key={key}
            className="input input-bordered"
            placeholder={key}
            onChange={(e) =>
              setFilters({ ...filters, [key]: e.target.value })
            }
          />
        ))}

      </div>

      {/* APPLICANT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {apps.map(a => (
          <div
            key={a._id}
            className="p-5 bg-white rounded-xl shadow hover:shadow-2xl transition"
          >

            <img src={a.photo} className="w-20 h-20 rounded-full mx-auto" />

            <h3 className="text-lg font-bold text-center mt-2">
              {a.tutorName}
            </h3>

            <p className="text-center text-gray-500 text-sm">
              {a.university} • {a.department}
            </p>

            <div className="flex justify-center mt-3">
              <button
                className="btn btn-outline"
                onClick={() => setShowModal(a)}
              >
                View Profile
              </button>
            </div>

          </div>
        ))}

      </div>

      {/* MODAL */}
      {showModal && (
        <ApplicantModal data={showModal} close={() => setShowModal(null)} />
      )}
    </div>
  );
};

export default Applications;
