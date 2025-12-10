import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit, FaEye, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const MyTuitions = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  // ------------------------------
  // LOAD TUITIONS
  // ------------------------------
  const loadMyTuitions = async () => {
    try {
      const res = await axiosSecure.get(`/my-tuitions/${user?.email}`);
      setList(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  // FIXED EFFECT (No cascading renders)
  // ------------------------------
  useEffect(() => {
    if (!user?.email) return;

    let ignore = false;

    const fetchData = async () => {
      const res = await axiosSecure.get(`/my-tuitions/${user.email}`);
      if (!ignore) {
        setList(res.data);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      ignore = true; // clean-up to avoid React warnings
    };
  }, [user?.email]);

  // ------------------------------
  // DELETE TUITION
  // ------------------------------
  const handleDelete = async (tuitionId) => {
    const c = await Swal.fire({
      title: "Delete this tuition?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (!c.isConfirmed) return;

    await axiosSecure.delete(`/tuitions/${tuitionId}`);
    loadMyTuitions(); // refresh list
  };

  // ------------------------------
  // LOADING UI
  // ------------------------------
  if (loading) {
    return (
      <div className="text-center text-xl mt-20">
        Loading your tuitions...
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">My Tuitions</h2>

      {list.length === 0 && (
        <div className="text-center text-gray-500 mt-10 text-lg">
          You have not posted any tuitions yet.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((t) => (
          <div
            key={t.tuitionId}
            className="p-5 bg-white rounded-xl shadow hover:shadow-2xl transition border"
          >
            <h3 className="text-xl font-bold text-pink-600">{t.tuitionId}</h3>
            <p className="text-lg font-semibold">{t.title}</p>

            <div className="mt-4 flex flex-col gap-2">
              <Link
                to={`/tuitions/${t.tuitionId}`}
                className="btn btn-outline btn-sm flex items-center gap-2"
              >
                <FaEye /> View
              </Link>

              <Link
                to={`/dashboard/edit-tuition/${t.tuitionId}`}
                className="btn btn-sm flex items-center gap-2"
              >
                <FaEdit /> Edit
              </Link>

              <Link
                to={`/applications/${t.tuitionId}`}
                className="btn btn-info btn-sm text-white flex items-center gap-2"
              >
                <FaUsers /> Applications
              </Link>

              <button
                onClick={() => handleDelete(t.tuitionId)}
                className="btn btn-error btn-sm text-white flex items-center gap-2"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTuitions;
