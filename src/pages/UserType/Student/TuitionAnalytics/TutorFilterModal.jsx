const TutorFilterModal = ({ filters, setFilters, close, apply }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-2xl">
        <h3 className="text-xl font-bold mb-4">Filter Tutors</h3>

        <div className="grid grid-cols-2 gap-4">
          {["university","department","experience","runningYear","ssc","hsc"].map(f => (
            <input
              key={f}
              className="input input-bordered"
              placeholder={f.replace(/([A-Z])/g," $1")}
              value={filters[f] || ""}
              onChange={e => setFilters({ ...filters, [f]: e.target.value })}
            />
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button className="btn btn-outline" onClick={close}>Close</button>
          <button className="btn btn-success text-white" onClick={apply}>
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorFilterModal;
