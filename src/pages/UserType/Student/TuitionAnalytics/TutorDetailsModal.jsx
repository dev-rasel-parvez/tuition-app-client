const maskPhone = p => p.slice(0,6) + "*****" + p.slice(-2);

const TutorDetailsModal = ({ tutor, close }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-md w-full">
        <img src={tutor.photoURL} className="w-24 h-24 rounded-full mx-auto" />
        <h3 className="text-xl font-bold text-center mt-2">{tutor.name}</h3>

        <p><b>University:</b> {tutor.university}</p>
        <p><b>Department:</b> {tutor.department}</p>
        <p><b>Experience:</b> {tutor.experience} years</p>
        <p><b>Phone:</b> {maskPhone(tutor.contactPhone)}</p>

        <p className="text-xs text-gray-500 mt-3">
          ৳1000 will be adjusted with first month salary
        </p>

        <button className="btn btn-success w-full mt-4">
          Proceed to Payment
        </button>

        <button className="btn btn-outline w-full mt-2" onClick={close}>
          Close
        </button>
      </div>
    </div>
  );
};

export default TutorDetailsModal;
