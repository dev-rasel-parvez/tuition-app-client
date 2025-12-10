import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const TuitionsPost = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleTuitionPost = async (data) => {
    data.postedBy = user?.email;

    const confirm = await Swal.fire({
      title: "Confirm Tuition Post?",
      text: "Do you want to publish this tuition requirement?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Publish",
    });

    if (!confirm.isConfirmed) return;

    const res = await axiosSecure.post("/tuitions", data);

    if (res.data.insertedId) {
      Swal.fire({
        icon: "success",
        title: "Tuition Posted Successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      reset();

      // Redirect to My Tuitions (tuitionId auto-handled by backend)
      navigate("/dashboard/my-tuitions");
    }
  };

  return (
    <div>
      <h2 className="text-4xl font-bold mb-6">Post Your Tuition!</h2>

      <form onSubmit={handleSubmit(handleTuitionPost)} className="space-y-10">

        {/* GRID 2 COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* LEFT SIDE */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Tutor want for</h3>

            <label className="label mt-2">Tuition Title</label>
            <input
              {...register("title")}
              placeholder="Example: Class 5 Bangla Tutor Needed"
              className="input input-bordered w-full"
            />

            <label className="label mt-2">Class / Grade</label>
            <input
              {...register("class")}
              placeholder="Example: Class 5"
              className="input input-bordered w-full"
            />

            <label className="label mt-2">Subject(s)</label>
            <input
              {...register("subjects")}
              placeholder="Bangla, Math, English"
              className="input input-bordered w-full"
            />

            <label className="label mt-2">Budget (Monthly)</label>
            <input
              type="number"
              {...register("budget")}
              placeholder="5000–8000"
              className="input input-bordered w-full"
            />

            <label className="label mt-2">Location / Area</label>
            <input
              {...register("location")}
              placeholder="Mirpur, Dhanmondi"
              className="input input-bordered w-full"
            />

            <label className="label mt-2">Preferred Schedule</label>
            <input
              {...register("schedule")}
              placeholder="Example: 3 days/week, evening"
              className="input input-bordered w-full"
            />
          </div>

          {/* RIGHT SIDE */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Tutor Requirements</h3>

            <label className="label mt-2">SSC Result</label>
            <input
              {...register("sscResult")}
              placeholder="Example: 4.50"
              className="input input-bordered w-full"
            />

            <label className="label mt-2">HSC Result</label>
            <input
              {...register("hscResult")}
              placeholder="Example: 4.75"
              className="input input-bordered w-full"
            />

            <label className="label mt-2">University</label>
            <input
              {...register("university")}
              placeholder="DU / BUET / NSU / AIUB"
              className="input input-bordered w-full"
            />

            <label className="label mt-2">Department / Subject</label>
            <input
              {...register("uniSubject")}
              placeholder="CSE / English / BBA"
              className="input input-bordered w-full"
            />

            <label className="label mt-2">Running Year</label>
            <select {...register("runningYear")} className="select select-bordered w-full">
              <option value="">Select Running Year</option>
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
              <option>Masters</option>
            </select>

            <label className="label mt-2">Years of Experience</label>
            <input
              type="number"
              {...register("experience")}
              placeholder="Example: 2"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div>
          <label className="label mt-2">Additional Notes (Optional)</label>
          <textarea
            {...register("notes")}
            placeholder="Any additional requirements..."
            rows={4}
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <button className="btn btn-primary">Post Tuition</button>
      </form>
    </div>
  );
};

export default TuitionsPost;
