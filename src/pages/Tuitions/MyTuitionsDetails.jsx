/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaEdit, FaTrash, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const MyTuitionsDetails = () => {
  const { tuitionId } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [t, setT] = useState(null);

  // -----------------------------
  // SAFE + CLEAN useCallback WRAPPED FETCH
  // -----------------------------
  const loadTuition = useCallback(
    async (signal) => {
      try {
        const res = await axiosSecure.get(`/tuitions/${tuitionId}`, { signal });
        setT(res.data);
      } catch (err) {
        if (err.name !== "CanceledError") console.error(err);
      }
    },
    [axiosSecure, tuitionId]
  );

  // -----------------------------
  // CLEAN EFFECT (NO WARNINGS)
  // -----------------------------
  useEffect(() => {
    const controller = new AbortController();
    loadTuition(controller.signal);

    return () => controller.abort();
  }, [loadTuition]);

  // -----------------------------
  // DELETE TUITION
  // -----------------------------
  const handleDelete = async () => {
    const c = await Swal.fire({
      title: "Delete this tuition?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!c.isConfirmed) return;

    await axiosSecure.delete(`/tuitions/${tuitionId}`);
    navigate("/dashboard/my-tuitions");
  };

  if (!t) return <p>Loading...</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">

      <h2 className="text-4xl font-bold mb-4">{t.title}</h2>
      <p className="text-gray-500 mb-4">Tuition ID: {t.tuitionId}</p>

      <div className="space-y-2 bg-white p-6 rounded-xl shadow-lg">
        <p><strong>Class:</strong> {t.class}</p>
        <p><strong>Subjects:</strong> {t.subjects}</p>
        <p><strong>Budget:</strong> {t.budget}</p>
        <p><strong>Location:</strong> {t.location}</p>
        <p><strong>Schedule:</strong> {t.schedule}</p>

        <p><strong>University:</strong> {t.university}</p>
        <p><strong>Department:</strong> {t.uniSubject}</p>
        <p><strong>Notes:</strong> {t.notes}</p>
      </div>

      <div className="flex gap-4 mt-6">

        <Link
          to={`/dashboard/edit-tuition/${tuitionId}`}
          className="btn flex items-center gap-2"
        >
          <FaEdit /> Edit
        </Link>

        <button
          onClick={handleDelete}
          className="btn btn-error text-white flex items-center gap-2"
        >
          <FaTrash /> Delete
        </button>

        <Link
          to={`/applications/${tuitionId}`}
          className="btn btn-info text-white flex items-center gap-2"
        >
          <FaUsers /> View Applications
        </Link>

      </div>
    </div>
  );
};

export default MyTuitionsDetails;
