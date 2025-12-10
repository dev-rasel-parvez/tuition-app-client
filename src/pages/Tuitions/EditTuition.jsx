import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const EditTuition = () => {
  const { tuitionId } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);

  // ------------------------------
  // FETCH TUITION DETAILS
  // ------------------------------
  const loadTuition = useCallback(async () => {
    try {
      const res = await axiosSecure.get(`/tuitions/${tuitionId}`);
      setForm(res.data);
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Failed to load tuition!", "error");
    }
  }, [axiosSecure, tuitionId]);

  useEffect(() => {
    loadTuition();
  }, [loadTuition]);

  // ------------------------------
  // HANDLE INPUT CHANGE
  // ------------------------------
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ------------------------------
  // SAVE UPDATED TUITION (🔥 FIXED)
  // ------------------------------
  const handleSave = async () => {
    try {
      const updateData = { ...form };
      delete updateData._id; // ❗ MUST REMOVE THIS FIELD

      await axiosSecure.put(`/tuitions/${tuitionId}`, updateData);

      Swal.fire({
        icon: "success",
        title: "Updated successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/dashboard/my-tuitions");
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Update failed!", "error");
    }
  };

  if (!form) return <p>Loading...</p>;

  // ------------------------------
  // RENDER FORM
  // ------------------------------
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Edit Tuition</h2>

      <div className="space-y-3">

        <input
          name="title"
          className="input input-bordered w-full"
          value={form.title || ""}
          onChange={handleChange}
          placeholder="Title"
        />

        <input
          name="class"
          className="input input-bordered w-full"
          value={form.class || ""}
          onChange={handleChange}
          placeholder="Class"
        />

        <input
          name="subjects"
          className="input input-bordered w-full"
          value={form.subjects || ""}
          onChange={handleChange}
          placeholder="Subjects"
        />

        <input
          name="budget"
          className="input input-bordered w-full"
          value={form.budget || ""}
          onChange={handleChange}
          placeholder="Budget"
        />

        <input
          name="location"
          className="input input-bordered w-full"
          value={form.location || ""}
          onChange={handleChange}
          placeholder="Location"
        />

        <input
          name="schedule"
          className="input input-bordered w-full"
          value={form.schedule || ""}
          onChange={handleChange}
          placeholder="Schedule"
        />

        <input
          name="university"
          className="input input-bordered w-full"
          value={form.university || ""}
          onChange={handleChange}
          placeholder="University"
        />

        <input
          name="uniSubject"
          className="input input-bordered w-full"
          value={form.uniSubject || ""}
          onChange={handleChange}
          placeholder="Department"
        />

        <textarea
          name="notes"
          className="textarea textarea-bordered w-full"
          value={form.notes || ""}
          onChange={handleChange}
          placeholder="Notes"
        />
      </div>

      <button className="btn btn-primary mt-4" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default EditTuition;
