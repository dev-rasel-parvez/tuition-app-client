import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyApplications = () => {
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);

  const loadApplications = () => {
    axiosSecure.get("/tutor/my-applications").then(res => {
      setApplications(res.data);
    });
  };

  useEffect(() => {
    loadApplications();
  }, []);

  // -----------------------------
  // WITHDRAW
  // -----------------------------
  const handleWithdraw = async (id) => {
    const confirm = await Swal.fire({
      title: "Withdraw application?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, withdraw",
    });

    if (!confirm.isConfirmed) return;

    await axiosSecure.delete(`/tutor/applications/${id}`);
    Swal.fire("Withdrawn!", "", "success");
    loadApplications();
  };

  // -----------------------------
  // EDIT
  // -----------------------------
  const handleEdit = async (app) => {
    const { value } = await Swal.fire({
      title: "Edit Application",
      html: `
        <input id="exp" class="swal2-input" value="${app.tutor.experience}">
        <input id="salary" class="swal2-input" value="${app.tutor.expectedSalary}">
      `,
      preConfirm: () => {
        return {
          experience: document.getElementById("exp").value,
          expectedSalary: document.getElementById("salary").value,
        };
      },
      showCancelButton: true,
    });

    if (!value) return;

    await axiosSecure.patch(`/tutor/applications/${app._id}`, value);
    Swal.fire("Updated!", "", "success");
    loadApplications();
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">My Applications</h2>

      {applications.length === 0 && (
        <p className="text-gray-500">No applications found.</p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {applications.map(app => (
          <div key={app._id} className="bg-white p-5 rounded-xl shadow border">
            <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
              {app.status.toUpperCase()}
            </span>

            <h3 className="font-bold text-lg mt-3">
              Class {app.tuition.class} – {app.tuition.subjects}
            </h3>

            <p className="text-sm">Location: {app.tuition.location}</p>
            <p className="text-sm">Budget: {app.tuition.budget} TK</p>

            <hr className="my-3" />

            <p className="text-sm">
              Experience: {app.tutor.experience} years
            </p>
            <p className="text-sm">
              Expected Salary: {app.tutor.expectedSalary} TK
            </p>

            <p className="text-xs text-gray-400 mt-2">
              Applied on: {new Date(app.createdAt).toLocaleDateString()}
            </p>

            {/* ACTION BUTTONS */}
            {app.status === "pending" && (
              <div className="flex gap-2 mt-4">
                <button
                  className="btn btn-sm btn-outline w-1/2"
                  onClick={() => handleEdit(app)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-error w-1/2"
                  onClick={() => handleWithdraw(app._id)}
                >
                  Withdraw
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplications;
