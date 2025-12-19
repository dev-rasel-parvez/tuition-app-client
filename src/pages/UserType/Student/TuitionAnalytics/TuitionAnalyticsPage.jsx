import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import TutorDetailsModal from "./TutorDetailsModal";
import PaymentModal from "./PaymentModal";
import TutorFilterModal from "./TutorFilterModal";
import { FaFilter } from "react-icons/fa";
import Swal from "sweetalert2";

const TuitionAnalyticsPage = () => {
  const { tuitionId } = useParams();
  const axiosSecure = useAxiosSecure();

  const [applications, setApplications] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({});

  // ============================
  // LOAD APPLICATIONS
  // ============================
  const loadApplications = async () => {
    const res = await axiosSecure.get(`/tuitions/${tuitionId}/applications`);
    setApplications(res.data);
  };

  useEffect(() => {
    loadApplications();
  }, [tuitionId]);

  // ============================
  // PAYMENT SUCCESS
  // ============================
  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setSelectedTutor(null);
    loadApplications();
  };

  // ============================
  // ACCEPT HANDLER
  // ============================
  const handleAccept = (application) => {
    setSelectedTutor(application);
    setShowPayment(true);
  };

  // ============================
  // REJECT HANDLER
  // ============================
  const handleReject = async (applicationId) => {
    const confirm = await Swal.fire({
      title: "Reject Tutor?",
      text: "This tutor application will be rejected",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(
        `/student/applications/${applicationId}/reject`
      );
      Swal.fire("Rejected!", "Tutor rejected successfully", "success");
      setSelectedTutor(null);
      loadApplications();
    } catch (err) {
      Swal.fire("Error", "Failed to reject tutor", "error");
    }
  };

  // ============================
  // FILTER LOGIC
  // ============================
  const filteredApplications = applications.filter((app) => {
    const t = app.tutor;

    if (
      filters.university &&
      !t.university?.toLowerCase().includes(filters.university.toLowerCase())
    )
      return false;
    if (
      filters.department &&
      !t.department?.toLowerCase().includes(filters.department.toLowerCase())
    )
      return false;
    if (
      filters.experience &&
      Number(t.experience) < Number(filters.experience)
    )
      return false;
    if (filters.runningYear && t.runningYear !== filters.runningYear)
      return false;
    if (filters.ssc && String(t.ssc) !== filters.ssc) return false;
    if (filters.hsc && String(t.hsc) !== filters.hsc) return false;

    return true;
  });

  // ============================
  // CORE STATUS LOGIC
  // ============================
  const approvedApplication = filteredApplications.find(
    (app) => app.status === "approved"
  );

  const visibleApplications = approvedApplication
    ? [approvedApplication]
    : filteredApplications.filter((app) => app.status === "pending");

  const hasApproved = !!approvedApplication;

  const pendingCount = filteredApplications.filter(
    (app) => app.status === "pending"
  ).length;

  // ============================
  // FILTER UI HELPERS
  // ============================
  const removeFilter = (key) => {
    const updated = { ...filters };
    delete updated[key];
    setFilters(updated);
  };

  const clearAllFilters = () => {
    setFilters({});
  };

  return (
    <div className="p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          Tuition Analytics
          {!hasApproved && (
            <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
              {pendingCount} Tutor Applied
            </span>
          )}
        </h2>

        <button className="btn btn-outline" onClick={() => setShowFilter(true)}>
          <FaFilter /> Filters
        </button>
      </div>


      {/* FILTER SUMMARY */}
      {Object.keys(filters).length > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 items-center">
            {Object.entries(filters).map(([key, value]) => (
              <span
                key={key}
                className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {key}: {value}
                <button
                  onClick={() => removeFilter(key)}
                  className="font-bold hover:text-red-600"
                >
                  ×
                </button>
              </span>
            ))}

            <button
              onClick={clearAllFilters}
              className="text-red-600 text-sm underline ml-3"
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* APPLICATION CARDS */}
      <div className="grid md:grid-cols-3 gap-6">
        {visibleApplications.map((app) => (
          <div
            key={app._id}
            className="relative bg-white p-5 rounded-xl shadow hover:shadow-lg cursor-pointer"
            onClick={() => setSelectedTutor(app)}
          >
            {app.status === "approved" && (
              <span className="absolute top-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                Approved
              </span>
            )}

            <p className="text-sm text-gray-400">#{app.tutor.serial}</p>

            <img
              src={app.tutor.photoURL}
              className="w-20 h-20 rounded-full mx-auto"
              alt=""
            />

            <h3 className="text-md text-center mt-3">
              <span className="font-bold">Name:</span> {app.tutor.name}
            </h3>

            <p className="text-md text-center">
              <span className="font-bold">University:</span>{" "}
              {app.tutor.university}
            </p>

            <p className="text-md text-center">
              <span className="font-bold">Department:</span>{" "}
              {app.tutor.department}
            </p>

            <p className="text-md text-center">
              <span className="font-bold">Experience:</span>{" "}
              {app.tutor.experience} yrs
            </p>

            <p className="text-center font-semibold">
              Salary: {app.tutor.expectedSalary} TK
            </p>

            <button className="btn btn-sm btn-outline w-full mt-3">
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* FILTER MODAL */}
      {showFilter && (
        <TutorFilterModal
          filters={filters}
          setFilters={setFilters}
          close={() => setShowFilter(false)}
        />
      )}

      {/* DETAILS MODAL */}
      {selectedTutor && (
        <TutorDetailsModal
          app={selectedTutor}
          close={() => setSelectedTutor(null)}
          onAccept={() => handleAccept(selectedTutor)}
          onReject={handleReject}
          onContact={() => handleAccept(selectedTutor)}
        />
      )}

      {/* PAYMENT MODAL */}
      {showPayment && selectedTutor && (
        <PaymentModal
          applicationId={selectedTutor._id}
          amount={Number(selectedTutor.tutor.expectedSalary)} // 🔥 ADD THIS
          close={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}

    </div>
  );
};

export default TuitionAnalyticsPage;
