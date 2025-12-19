import { FaTimes } from "react-icons/fa";

const maskPhone = (phone) =>
  phone ? phone.replace(/^(\d{3})\d+(\d{2})$/, "$1****$2") : "Hidden";


const maskEmail = (email) =>
  email ? email.replace(/(.{2}).+(@.+)/, "$1****$2") : "Hidden";

const TutorDetailsModal = ({
  app,
  close,
  onAccept = () => { },
  onReject = () => { },
  onContact = () => { },
}) => {
  if (!app) return null;

  const { tutor, status } = app;
  const isApproved = status === "approved";
  console.log(tutor)
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 relative">

        {/* CLOSE */}
        <button onClick={close} className="absolute right-4 top-4">
          <FaTimes />
        </button>

        {/* AVATAR */}
        <img
          src={tutor.photoURL}
          className="w-24 h-24 rounded-full mx-auto"
          alt={tutor.name}
        />

        <h2 className="text-md text-center mt-3">
          <span className="font-bold">Name:</span> {tutor.name}
        </h2>

        <p className="text-md text-center">
          <span className="font-bold">University:</span> {tutor.university}
        </p>

        <p className="text-md text-center">
          <span className="font-bold">Department:</span> {tutor.department}
        </p>

        <p className="text-md text-center">
          <span className="font-bold">SSC Result:</span> {tutor.ssc}
        </p>

        <p className="text-md text-center">
          <span className="font-bold">HSC Result:</span> {tutor.hsc}
        </p>

        <div className="mt-4 text-sm space-y-1">
          <p>Experience: {tutor.experience} years</p>
          <p>Expected Salary: {tutor.expectedSalary} TK</p>
          <p>
            Status:{" "}
            <b className={isApproved ? "text-green-600" : ""}>
              {status}
            </b>
          </p>
        </div>

        <hr className="my-4" />

        <div className="text-sm space-y-1">
          <p>
            📞 {isApproved ? tutor.contactPhone : maskPhone(tutor.contactPhone)}
          </p>
          <p>
            📧 {isApproved ? tutor.email : maskEmail(tutor.email)}
          </p>
        </div>

        {/* ACTION BUTTONS — ONLY IF NOT APPROVED */}
        {!isApproved && (
          <>
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                className="btn btn-error"
                onClick={() => onReject(app._id)}
              >
                ❌ Reject
              </button>

              <button
                className="btn btn-success"
                onClick={() => onAccept(app)}
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
          </>
        )}
      </div>
    </div>
  );
};

export default TutorDetailsModal;
