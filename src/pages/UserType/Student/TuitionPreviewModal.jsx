const TuitionPreviewModal = ({ data, close }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl max-w-lg w-full">
        <h3 className="text-2xl font-bold mb-4">Tuition Preview</h3>

        <p><b>Class:</b> {data.class}</p>
        <p><b>Subjects:</b> {data.subjects}</p>
        <p><b>Location:</b> {data.location}</p>
        <p><b>Schedule:</b> {data.schedule}</p>

        <button onClick={close} className="btn btn-outline mt-6 w-full">
          Close
        </button>
      </div>
    </div>
  );
};

export default TuitionPreviewModal;
