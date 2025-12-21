import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaFilter, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";


const AvailableTuitions = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { role, loading: roleLoading } = useRole();


  const [tuitions, setTuitions] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);

  // TOP BAR
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date_desc");

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

  // ==========================================================
  // LOAD TUITIONS
  // ==========================================================
  const loadTuitions = async () => {
    let query = `/tuitions?limit=12&page=${page}&sort=${sort}`;

    if (search) query += `&search=${search}`;

    Object.entries(filters).forEach(([key, value]) => {
      if (value) query += `&${key}=${value}`;
    });

    const res = await axiosSecure.get(query);

    if (page === 1) {
      setTuitions(res.data.tuitions);
    } else {
      setTuitions((prev) => [...prev, ...res.data.tuitions]);
    }

    setTotal(res.data.total);
  };

  useEffect(() => {
    loadTuitions();
  }, [page, filters, sort, search]);

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

  const handleDetailsClick = (tuitionId) => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to apply.",
        confirmButtonText: "Login Now",
      }).then(() => navigate("/auth/login"));
      return;
    }
    navigate(`/dashboard/tuitions/${tuitionId}`);
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">

      {/* ================= TOP BAR ================= */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-700">
          Tuitions Found: <span className="text-pink-600">{total}</span>
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by subject / location"
            className="input input-bordered w-full sm:w-72"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <select
            className="select select-bordered w-full sm:w-48"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
          >
            <option value="date_desc">Newest First</option>
            <option value="date_asc">Oldest First</option>
            <option value="budget_asc">Budget: Low → High</option>
            <option value="budget_desc">Budget: High → Low</option>
          </select>

          <button
            className="btn bg-[#003D40] text-white flex items-center gap-2 px-6"
            onClick={() => setShowFilter(true)}
          >
            <FaFilter /> Filters
          </button>
        </div>
      </div>

      {/* ================= ACTIVE FILTERS ================= */}
      {Object.keys(activeFilters).length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([key, value]) => (
            <span
              key={key}
              className="px-3 py-1 bg-green-200 rounded-full text-sm flex items-center gap-2"
            >
              {key}: {value}
              <FaTimes
                className="cursor-pointer"
                onClick={() => setFilters({ ...filters, [key]: "" })}
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
      )}

      {/* ================= TUITIONS GRID ================= */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {tuitions.map((t) => (
          <div
            key={t._id}
            onClick={() => handleDetailsClick(t.tuitionId)}
            className="rounded-xl overflow-hidden shadow border hover:shadow-2xl transition bg-white cursor-pointer h-full grid grid-rows-[140px_1fr_130px]"

          >
            {/* ===== HEADER (FIXED HEIGHT) ===== */}
            <div className="bg-blue-50 p-5">
              <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
                {t.title}
              </h3>

              <p className="mt-1">
                <strong>Class:</strong> {t.class}
              </p>

              <p>
                <strong>Subject:</strong> {t.subjects}
              </p>

              <p className="text-sm text-gray-600">
                Tuition No: <strong>{t.tuitionId}</strong>
              </p>
            </div>

            {/* ===== DETAILS (EQUAL HEIGHT) ===== */}
            <div className="p-5 space-y-2 text-gray-700">
              <p>📍 <strong>Location:</strong> {t.location}</p>
              <p>📅 <strong>Schedule:</strong> {t.schedule}</p>
              <p>🎓 <strong>Tutor University:</strong> {t.university}</p>
              <p>🏫 <strong>Department:</strong> {t.uniSubject}</p>
            </div>

            {/* ===== FOOTER (FIXED HEIGHT + SAFE LAYOUT) ===== */}
            <div className="bg-green-50 p-5 relative h-[130px]">

              {/* LEFT */}
              <div>
                <p className="text-2xl font-bold text-green-700">
                  {t.budget} TK
                </p>
                <p className="text-sm text-gray-600 line-clamp-1">
                  <strong>Posted By:</strong> {t.postedByName}
                </p>
              </div>

              {/* APPLY BUTTON (FIXED POSITION) */}
              <div className="absolute right-5 top-5 h-[34px]">
                <span
                  className={`
        bg-blue-600 text-white text-sm
        px-5 py-2 rounded-md
        ${(!user || role === "tutor") ? "visible" : "invisible"}
      `}
                >
                  Apply Now
                </span>
              </div>

              {/* TIME (BOTTOM RIGHT) */}
              <p className="absolute right-5 bottom-7 text-sm text-gray-500">
                ⏱ {timeAgo(t.createdAt)}
              </p>
            </div>


          </div>



        ))}
      </div>

      {/* ================= LOAD MORE ================= */}
      <div className="flex justify-center mt-10">
        <button
          className="btn btn-success text-white px-8"
          onClick={() => setPage(page + 1)}
        >
          Load More
        </button>
      </div>

      {/* ================= FILTER POPUP ================= */}
      {showFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-11/12 md:w-2/3 lg:w-1/2 space-y-6">
            <h3 className="text-xl font-bold">Filter Options</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ["class", "Class"],
                ["subjects", "Subject"],
                ["budgetMin", "Budget Min"],
                ["budgetMax", "Budget Max"],
                ["location", "Location"],
                ["schedule", "Schedule"],
                ["university", "University"],
                ["uniSubject", "Department"],
              ].map(([key, label]) => (
                <input
                  key={key}
                  className="input input-bordered"
                  placeholder={label}
                  value={filters[key]}
                  onChange={(e) =>
                    setFilters({ ...filters, [key]: e.target.value })
                  }
                />
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button
                className="btn btn-outline"
                onClick={() => setShowFilter(false)}
              >
                Close
              </button>

              <button
                className="btn bg-lime-400 hover:bg-lime-500 text-black"
                onClick={() => {
                  setPage(1);
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
    </div>
  );
};

export default AvailableTuitions;
