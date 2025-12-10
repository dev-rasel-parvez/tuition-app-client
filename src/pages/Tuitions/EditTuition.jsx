import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const EditTuition = () => {
  const { tuitionId } = useParams();   // ✅ FIXED
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [form, setForm] = useState({});

  const load = async () => {
    const res = await axiosSecure.get(`/tuitions/${tuitionId}`);   // ✅ FIXED
    setForm(res.data);
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await axiosSecure.put(`/tuitions/${tuitionId}`, form);   // ✅ FIXED

    Swal.fire({
      icon: "success",
      title: "Updated!",
      timer: 1500,
      showConfirmButton: false
    });

    navigate(`/tuition/${tuitionId}`);   // ✅ FIXED
  };

  if (!form.class) return "Loading...";

  return (
    <div className="p-8 max-w-3xl mx-auto">

      <h2 className="text-3xl font-bold mb-4">Edit Tuition</h2>

      <div className="space-y-3">

        <input name="title" className="input input-bordered w-full"
          value={form.title} onChange={handleChange} placeholder="Title" />

        <input name="class" className="input input-bordered w-full"
          value={form.class} onChange={handleChange} placeholder="Class" />

        <input name="subjects" className="input input-bordered w-full"
          value={form.subjects} onChange={handleChange} placeholder="Subjects" />

        <input name="budget" className="input input-bordered w-full"
          value={form.budget} onChange={handleChange} placeholder="Budget" />

        <input name="location" className="input input-bordered w-full"
          value={form.location} onChange={handleChange} placeholder="Location" />

        <input name="schedule" className="input input-bordered w-full"
          value={form.schedule} onChange={handleChange} placeholder="Schedule" />

        <input name="university" className="input input-bordered w-full"
          value={form.university} onChange={handleChange} placeholder="University" />

        <input name="uniSubject" className="input input-bordered w-full"
          value={form.uniSubject} onChange={handleChange} placeholder="Department" />

        <textarea name="notes" className="textarea textarea-bordered w-full"
          value={form.notes} onChange={handleChange} placeholder="Notes" />
      </div>

      <button className="btn btn-primary mt-4" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default EditTuition;
