import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const EditTuitionModal = ({ data, close }) => {
  const axiosSecure = useAxiosSecure();

  const [form, setForm] = useState({
    title: data.title || "",
    class: data.class || "",
    subjects: data.subjects || "",
    budget: data.budget || "",
    location: data.location || "",
    schedule: data.schedule || "",
    sscResult: data.sscResult || "",
    hscResult: data.hscResult || "",
    university: data.university || "",
    uniSubject: data.uniSubject || "",
    runningYear: data.runningYear || "",
    experience: data.experience || ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const updateTuition = async () => {
    try {
      await axiosSecure.patch(`/tuitions/${data._id}`, form);

      Swal.fire({
        icon: "success",
        title: "Updated Successfully",
        timer: 1500,
        showConfirmButton: false
      });

      close();
      window.location.reload();
    } catch (err) {
      Swal.fire("Error", "Failed to update tuition", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold mb-4">Edit Tuition</h3>

        {/* TITLE */}
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Tuition Title"
          className="input input-bordered w-full mb-3"
        />

        {/* CLASS & SUBJECT */}
        <div className="grid grid-cols-2 gap-3">
          <input
            name="class"
            value={form.class}
            onChange={handleChange}
            placeholder="Class"
            className="input input-bordered"
          />
          <input
            name="subjects"
            value={form.subjects}
            onChange={handleChange}
            placeholder="Subjects"
            className="input input-bordered"
          />
        </div>

        {/* BUDGET & LOCATION */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          <input
            name="budget"
            value={form.budget}
            onChange={handleChange}
            placeholder="Monthly Budget"
            className="input input-bordered"
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="input input-bordered"
          />
        </div>

        {/* SCHEDULE */}
        <input
          name="schedule"
          value={form.schedule}
          onChange={handleChange}
          placeholder="Schedule (e.g. 3 days/week)"
          className="input input-bordered w-full mt-3"
        />

        {/* SSC & HSC */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          <input
            name="sscResult"
            value={form.sscResult}
            onChange={handleChange}
            placeholder="SSC Result"
            className="input input-bordered"
          />
          <input
            name="hscResult"
            value={form.hscResult}
            onChange={handleChange}
            placeholder="HSC Result"
            className="input input-bordered"
          />
        </div>

        {/* UNIVERSITY INFO */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          <input
            name="university"
            value={form.university}
            onChange={handleChange}
            placeholder="University"
            className="input input-bordered"
          />
          <input
            name="uniSubject"
            value={form.uniSubject}
            onChange={handleChange}
            placeholder="Department"
            className="input input-bordered"
          />
        </div>

        {/* RUNNING YEAR & EXPERIENCE */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          <input
            name="runningYear"
            value={form.runningYear}
            onChange={handleChange}
            placeholder="Running Year"
            className="input input-bordered"
          />
          <input
            name="experience"
            value={form.experience}
            onChange={handleChange}
            placeholder="Experience (years)"
            className="input input-bordered"
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            onClick={updateTuition}
            className="btn btn-success text-white w-full"
          >
            Save Changes
          </button>

          <button
            onClick={close}
            className="btn btn-outline w-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTuitionModal;
