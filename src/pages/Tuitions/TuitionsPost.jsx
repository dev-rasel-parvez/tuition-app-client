import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const TuitionsPost = () => {
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const handleTuitionPost = async (data) => {
    data.postedBy = user?.email;
    data.createdAt = new Date();

    Swal.fire({
      title: "Confirm Tuition Post?",
      text: "Do you want to publish this tuition requirement?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Publish",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.post("/tuitions", data);

        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Tuition Posted Successfully!",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  return (
    <div className="">
      <h2 className="text-4xl font-bold">Post Tuition Requirement</h2>

      <form
        onSubmit={handleSubmit(handleTuitionPost)}
        className="mt-10 p-4 text-black"
      >
        {/* Tuition Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <fieldset className="fieldset">
            <label className="label">Class / Grade</label>
            <input
              type="text"
              {...register("class")}
              className="input"
              placeholder="Example: Class 8 / O-Level"
            />

            <label className="label">Subject(s)</label>
            <input
              type="text"
              {...register("subjects")}
              className="input"
              placeholder="Math, English, Physics"
            />

            <label className="label">Budget (Monthly)</label>
            <input
              type="number"
              {...register("budget")}
              className="input"
              placeholder="Example: 5000–8000"
            />

            <label className="label">Location / Area</label>
            <input
              type="text"
              {...register("location")}
              className="input"
              placeholder="Mirpur, Dhanmondi, etc."
            />

            <label className="label">Preferred Schedule</label>
            <input
              type="text"
              {...register("schedule")}
              className="input"
              placeholder="3 days/week, Evening"
            />
          </fieldset>

          {/* Tutor Requirement Section */}
          <fieldset className="fieldset">
            <h3 className="text-2xl font-semibold">Tutor Requirements</h3>

            <label className="label">SSC Result</label>
            <input
              type="text"
              {...register("sscResult")}
              className="input"
              placeholder="GPA / Grade"
            />

            <label className="label">HSC Result</label>
            <input
              type="text"
              {...register("hscResult")}
              className="input"
              placeholder="GPA / Grade"
            />

            <label className="label">University</label>
            <input
              type="text"
              {...register("university")}
              className="input"
              placeholder="DU / BUET / NSU / AIUB"
            />

            <label className="label">Department / Subject</label>
            <input
              type="text"
              {...register("uniSubject")}
              className="input"
              placeholder="CSE / English / BBA"
            />

            <label className="label">Running Year</label>
            <select {...register("runningYear")} className="select select-bordered">
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
              <option value="Masters">Masters</option>
            </select>

            <label className="label">Years of Experience</label>
            <input
              type="number"
              {...register("experience")}
              className="input"
              placeholder="Example: 2 years"
            />
          </fieldset>
        </div>

        {/* Student Note */}
        <div className="mt-12">
          <label className="label">Additional Notes (Optional)</label>
          <textarea
            {...register("notes")}
            rows={4}
            className="textarea textarea-bordered w-full"
            placeholder="Any extra instructions for tutor…"
          ></textarea>
        </div>

        {/* Submit Button */}
        <input
          type="submit"
          className="btn btn-primary mt-8 text-black"
          value="Post Tuition"
        />
      </form>
    </div>
  );
};

export default TuitionsPost;
