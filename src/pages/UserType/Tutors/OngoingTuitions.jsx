import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const OngoingTuitions = () => {
  const axiosSecure = useAxiosSecure();
  const [ongoing, setOngoing] = useState([]);

  // -----------------------------
  // LOAD APPROVED APPLICATIONS
  // -----------------------------
  const loadOngoingTuitions = async () => {
    const res = await axiosSecure.get("/tutor/my-applications");

    // ✅ only approved ones
    const approved = res.data.filter(
      app => app.status === "approved"
    );

    setOngoing(approved);
  };

  useEffect(() => {
    loadOngoingTuitions();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">
        Ongoing Tuitions
      </h2>

      {ongoing.length === 0 && (
        <p className="text-gray-500">
          No ongoing tuitions yet.
        </p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {ongoing.map(app => (
          <div
            key={app._id}
            className="bg-white p-5 rounded-xl shadow border relative"
          >
            {/* STATUS */}
            <span className="absolute top-3 right-3 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
              APPROVED
            </span>

            {/* TUITION INFO */}

            <h3 className="font-bold text-lg mt-2 ">
               {app.tuition.title} 
            </h3>

            <h3 className="font-bold text-lg">
              Class: {app.tuition.class}
            </h3>
            <h3 className="font-bold text-lg ">
              Subjects: {app.tuition.subjects}
            </h3>

            

            <p className="text-sm mt-1">
              📍 Location: {app.tuition.location}
            </p>

            <p className="text-sm">
              🕒 Schedule: {app.tuition.schedule}
            </p>

            <p className="text-sm">
              💰 Budget: {app.tuition.budget} TK
            </p>

            <hr className="my-3" />

            {/* YOUR INFO */}
            <p className="text-sm">
              Your Experience: {app.tutor.experience} years
            </p>

            <p className="text-sm">
              Agreed Salary: {app.tutor.expectedSalary} TK
            </p>

            <p className="text-xs text-gray-400 mt-2">
              Approved on:{" "}
              {new Date(app.paidAt || app.createdAt).toLocaleDateString()}
            </p>

            {/* OPTIONAL FUTURE ACTION */}
            <button
              disabled
              className="btn btn-sm btn-outline w-full mt-4 cursor-not-allowed"
            >
              Ongoing Tuition
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OngoingTuitions;
