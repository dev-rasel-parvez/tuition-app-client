const maskPhone = (phone = "") =>
  phone ? phone.slice(0, 6) + "*****" + phone.slice(-2) : "";

const TuitionAnalyticsModal = ({ data, close }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl max-w-lg w-full">
        <h3 className="text-xl font-bold mb-4">Tutor Applications</h3>

        {(!data.applications || data.applications.length === 0) && (
          <p className="text-gray-500">No tutor applied yet.</p>
        )}

        {data.applications?.map(app => (
          <div key={app._id} className="flex gap-3 border p-3 rounded mb-2">
            <img
              src={app.tutor?.photoURL}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold">{app.tutor?.name}</p>
              <p className="text-sm">{maskPhone(app.tutor?.contactPhone)}</p>
            </div>
          </div>
        ))}

        <p className="text-xs text-gray-500 mt-4">
          ৳1000 will be adjusted with first month salary
        </p>

        <button onClick={close} className="btn btn-outline mt-4 w-full">
          Close
        </button>
      </div>
    </div>
  );
};

export default TuitionAnalyticsModal;
