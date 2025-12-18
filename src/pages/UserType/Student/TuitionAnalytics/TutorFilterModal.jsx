import { useState } from "react";

const TutorFilterModal = ({ filters, setFilters, close }) => {
  const [local, setLocal] = useState(filters);

  const applyFilter = () => {
    setFilters(local);
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-2xl">
        <h3 className="text-xl font-bold mb-4">Filter Tutors</h3>

        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="University"
            className="input input-bordered"
            onChange={e => setLocal({ ...local, university: e.target.value })}
          />
          <input
            placeholder="Department"
            className="input input-bordered"
            onChange={e => setLocal({ ...local, department: e.target.value })}
          />
          <input
            placeholder="Experience"
            className="input input-bordered"
            onChange={e => setLocal({ ...local, experience: e.target.value })}
          />
          <input
            placeholder="Running Year"
            className="input input-bordered"
            onChange={e => setLocal({ ...local, runningYear: e.target.value })}
          />
          <input
            placeholder="SSC Result"
            className="input input-bordered"
            onChange={e => setLocal({ ...local, ssc: e.target.value })}
          />
          <input
            placeholder="HSC Result"
            className="input input-bordered"
            onChange={e => setLocal({ ...local, hsc: e.target.value })}
          />
        </div>

        <div className="flex justify-between mt-6">
          <button className="btn btn-outline" onClick={close}>
            Close
          </button>
          <button className="btn btn-success" onClick={applyFilter}>
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorFilterModal;
