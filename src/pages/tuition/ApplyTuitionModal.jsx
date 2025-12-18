import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ApplyTuitionModal = ({ tuition, profile, close }) => {
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const experience = form.experience.value;
    const expectedSalary = form.expectedSalary.value;

    try {
      const res = await axiosSecure.post(
        `/tuitions/${tuition.tuitionId}/apply`,
        {
          qualifications: {
            ssc: profile.ssc,
            hsc: profile.hsc,
            university: profile.university,
            department: profile.department,
          },
          experience,
          expectedSalary,
        }
      );

      if (res.data.applied) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted",
          text: "Your application is now pending.",
        });
        close();
      } else {
        Swal.fire({
          icon: "info",
          title: "Already Applied",
          text: res.data.message || "You already applied.",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Could not submit application.",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 relative">
        <button onClick={close} className="absolute top-3 right-3 text-xl">
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">Apply for Tuition</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Read-only */}
          <input value={profile.name} readOnly className="input input-bordered w-full" />
          <input value={profile.email} readOnly className="input input-bordered w-full" />

          <input value={`SSC Result: ${profile.ssc}`} readOnly className="input input-bordered w-full bg-gray-50" />
          <input value={`HSC Result: ${profile.hsc}`} readOnly className="input input-bordered w-full bg-gray-50" />
          <input value={`University: ${profile.university}`} readOnly className="input input-bordered w-full bg-gray-50" />
          <input value={`Department: ${profile.department}`} readOnly className="input input-bordered w-full bg-gray-50" />

          {/* Editable */}
          <input
            name="experience"
            required
            placeholder="Experience (years)"
            className="input input-bordered w-full"
          />
          <input
            name="expectedSalary"
            required
            placeholder="Expected Salary"
            className="input input-bordered w-full"
          />

          <button className="btn btn-success w-full text-white">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyTuitionModal;
