import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaFilter, FaTimes } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const AvailableTuitions = () => {
  const axiosSecure = useAxiosSecure();

  const [tuitions, setTuitions] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [showFilter, setShowFilter] = useState(false);

  const [filters, setFilters] = useState({
    class: "",
    subjects: "",
    budgetMin: "",
    budgetMax: "",
    location: "",
    schedule: "",
    university: "",
    uniSubject: "",
  });

  const activeFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v !== "")
  );

  const loadTuitions = async () => {
    let query = `/tuitions?limit=12&page=${page}`;

    Object.entries(filters).forEach(([key, value]) => {
      if (value) query += `&${key}=${value}`;
    });

    const res = await axiosSecure.get(query);

    if (page === 1) {
      setTuitions(res.data);
    } else {
      setTuitions((prev) => [...prev, ...res.data]);
    }

    setTotal(res.data.length);
  };

  useEffect(() => {
    loadTuitions();
  }, [page, filters]);

  const timeAgo = (timestamp) => {
    const created = new Date(timestamp);
    const now = new Date();
    const diffMin = Math.floor((now - created) / 60000);
    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin} min ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr} hours ago`;
    return `${Math.floor(diffHr / 24)} days ago`;
  };

  const clearFilters = () => {
    setFilters({
      class: "",
      subjects: "",
      budgetMin: "",
      budgetMax: "",
      location: "",
      schedule: "",
      university: "",
      uniSubject: "",
    });
    setPage(1);
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">

      {/* TOP HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">
          Latest Tuitions: <span className="text-pink-600">{tuitions.length}</span>
        </h2>

        <button
          className="btn bg-[#003D40] text-white flex items-center gap-2"
          onClick={() => setShowFilter(true)}
        >
          <FaFilter /> Filters
        </button>
      </div>

      {/* ACTIVE FILTER TAGS */}
      {Object.keys(activeFilters).length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">

            {Object.entries(activeFilters).map(([key, value]) => (
              <span
                key={key}
                className="px-3 py-1 bg-green-200 rounded-full text-sm flex items-center gap-2"
              >
                {key}: {value}
                <FaTimes
                  className="cursor-pointer"
                  onClick={() =>
                    setFilters({ ...filters, [key]: "" })
                  }
                />
              </span>
            ))}

            <button
              className="ml-3 text-sm underline text-red-600"
              onClick={clearFilters}
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* FILTER POPUP */}
      {showFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">

          <div className="bg-white p-6 rounded-xl shadow-xl w-11/12 md:w-2/3 lg:w-1/2 space-y-4">

            <h3 className="text-xl font-bold mb-4">Filter Options</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="input input-bordered" placeholder="Class"
                onChange={(e) => setFilters({ ...filters, class: e.target.value })}
              />
              <input className="input input-bordered" placeholder="Subject"
                onChange={(e) => setFilters({ ...filters, subjects: e.target.value })}
              />
              <input className="input input-bordered" placeholder="Budget Min"
                onChange={(e) => setFilters({ ...filters, budgetMin: e.target.value })}
              />
              <input className="input input-bordered" placeholder="Budget Max"
                onChange={(e) => setFilters({ ...filters, budgetMax: e.target.value })}
              />
              <input className="input input-bordered" placeholder="Location"
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              />
              <input className="input input-bordered" placeholder="Schedule"
                onChange={(e) => setFilters({ ...filters, schedule: e.target.value })}
              />
              <input className="input input-bordered" placeholder="University"
                onChange={(e) => setFilters({ ...filters, university: e.target.value })}
              />
              <input className="input input-bordered" placeholder="Department"
                onChange={(e) => setFilters({ ...filters, uniSubject: e.target.value })}
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex justify-between mt-4">
              <button
                className="btn btn-outline"
                onClick={() => setShowFilter(false)}
              >
                Close
              </button>

              <button
                className="btn btn-primary"
                onClick={() => {
                  setPage(1);   // reset to first page
                  loadTuitions();
                  setShowFilter(false);
                }}
              >
                Apply Filter
              </button>
            </div>
          </div>

        </div>
      )}

      {/* GRID CARDS */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {tuitions.map((t) => (
          <Link
            to={`/tuitions/${t.tuitionId}`}
            key={t._id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-2xl transition border"
          >

            <h3 className="text-2xl font-bold">{t.title}</h3>

            <p><strong>Class:</strong> {t.class}</p>
            <p><strong>Subjects:</strong> {t.subjects}</p>
            <p><strong>Budget:</strong> {t.budget}</p>
            <p><strong>Location:</strong> {t.location}</p>
            <p><strong>Schedule:</strong> {t.schedule}</p>
            <p><strong>Tutor University:</strong> {t.university}</p>
            <p><strong>Tutor Department:</strong> {t.uniSubject}</p>
            <p><strong>Tuition No:</strong> {t.tuitionId}</p>
            <p><strong>Posted By:</strong> {t.postedBy}</p>

            <p className="text-sm text-gray-400 mt-2">
              Posted: {timeAgo(t.createdAt)}
            </p>
          </Link>
        ))}
      </div>

      {/* LOAD MORE */}
      <div className="flex justify-center mt-10">
        <button
          className="btn btn-success text-white px-8"
          onClick={() => setPage(page + 1)}
        >
          Load More
        </button>
      </div>

    </div>
  );
};

export default AvailableTuitions;
