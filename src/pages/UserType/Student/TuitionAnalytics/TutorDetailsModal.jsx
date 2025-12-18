import { FaTimes } from "react-icons/fa";

const maskPhone = phone =>
  phone ? phone.replace(/(\+880\d{3})\d{4}(\d{2})/, "$1****$2") : "";

const maskEmail = email =>
  email ? email.replace(/(.{2}).+(@.+)/, "$1****$2") : "";

const TutorDetailsModal = ({ app, close, onAccept, onReject, onContact }) => {
  const { tutor } = app;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 relative">

        <button onClick={close} className="absolute right-4 top-4">
          <FaTimes />
        </button>

        <img
          src={tutor.photoURL}
          className="w-24 h-24 rounded-full mx-auto"
        />

        <h2 className="text-xl font-bold text-center mt-3">
          {tutor.name}
        </h2>

        <p className="text-center text-gray-500">
          {tutor.university} – {tutor.department}
        </p>

        <div className="mt-4 text-sm space-y-1">
          <p>Experience: {tutor.experience} years</p>
          <p>Expected Salary: {tutor.expectedSalary} TK</p>
        </div>

        <hr className="my-4" />

        <div className="text-sm space-y-1">
          <p>📞 {maskPhone(tutor.phone)}</p>
          <p>📧 {maskEmail(tutor.email)}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            className="btn btn-error"
            onClick={() => onReject(app._id)}
          >
            ❌ Reject
          </button>

          <button
            className="btn btn-success"
            onClick={() => onAccept(app._id)}
          >
            ✅ Accept
          </button>
        </div>

        <button
          className="btn btn-outline w-full mt-3"
          onClick={onContact}
        >
          See Contact Details
        </button>
      </div>
    </div>
  );
};

export default TutorDetailsModal;
