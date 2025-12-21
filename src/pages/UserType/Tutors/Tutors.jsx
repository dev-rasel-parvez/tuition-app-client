import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaFilter, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useRole from "../../../hooks/useRole";


const Tutors = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [tutors, setTutors] = useState([]);
    const [page, setPage] = useState(1);
    const [showFilter, setShowFilter] = useState(false);
    const [total, setTotal] = useState(0);
    const { role } = useRole();

    const [filters, setFilters] = useState({
        university: "",
        department: "",
        experience: "",
        runningYear: "",
        ssc: "",
        hsc: "",
    });

    const activeFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== "")
    );

    // ===============================
    // LOAD TUTORS
    // ===============================
    const loadTutors = async () => {
        let query = `/tutors?page=${page}&limit=12`;

        Object.entries(filters).forEach(([key, value]) => {
            if (value) query += `&${key}=${value}`;
        });

        const res = await axiosSecure.get(query);

        if (page === 1) setTutors(res.data.tutors);
        else setTutors((prev) => [...prev, ...res.data.tutors]);

        setTotal(res.data.total);
    };

    useEffect(() => {
        loadTutors();
    }, [page, filters]);

    const clearFilters = () => {
        setFilters({
            university: "",
            department: "",
            experience: "",
            runningYear: "",
            ssc: "",
            hsc: "",
        });
        setPage(1);
    };

    const handleContact = (id) => {
        // ❌ Tutors cannot open tutor details
        if (role === "tutor") return;

        if (!user) {
            Swal.fire({
                icon: "warning",
                title: "Login Required",
                text: "Please login to view tutor details.",
                confirmButtonText: "Login Now",
            }).then(() => navigate("/auth/login"));
            return;
        }

        navigate(`/dashboard/tutors/${id}`);
    };


    return (
        <div className="p-8 min-h-screen bg-gray-50">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-700">
                    Tutors Found: <span className="text-pink-600">{total}</span>
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

            {/* ================= FILTER POPUP ================= */}
            {showFilter && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-11/12 md:w-2/3 lg:w-1/2 space-y-4">
                        <h3 className="text-xl font-bold">Filter Tutors</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                className="input input-bordered"
                                placeholder="University"
                                value={filters.university}
                                onChange={(e) =>
                                    setFilters({ ...filters, university: e.target.value })
                                }
                            />

                            <input
                                className="input input-bordered"
                                placeholder="Department"
                                value={filters.department}
                                onChange={(e) =>
                                    setFilters({ ...filters, department: e.target.value })
                                }
                            />

                            <input
                                className="input input-bordered"
                                placeholder="Experience (years)"
                                value={filters.experience}
                                onChange={(e) =>
                                    setFilters({ ...filters, experience: e.target.value })
                                }
                            />

                            <input
                                className="input input-bordered"
                                placeholder="Running Year"
                                value={filters.runningYear}
                                onChange={(e) =>
                                    setFilters({ ...filters, runningYear: e.target.value })
                                }
                            />

                            <input
                                className="input input-bordered"
                                placeholder="SSC Result"
                                value={filters.ssc}
                                onChange={(e) =>
                                    setFilters({ ...filters, ssc: e.target.value })
                                }
                            />

                            <input
                                className="input input-bordered"
                                placeholder="HSC Result"
                                value={filters.hsc}
                                onChange={(e) =>
                                    setFilters({ ...filters, hsc: e.target.value })
                                }
                            />
                        </div>

                        <div className="flex justify-between pt-4">
                            <button
                                className="btn btn-outline"
                                onClick={() => setShowFilter(false)}
                            >
                                Close
                            </button>

                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    setPage(1);
                                    loadTutors();
                                    setShowFilter(false);
                                }}
                            >
                                Apply Filter
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ================= TUTOR CARDS ================= */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {tutors.map((t) => (
                    <motion.div
                        onClick={role !== "tutor" ? () => handleContact(t._id) : undefined}
                        className={`
    bg-white rounded-2xl shadow transition overflow-hidden
    ${role === "tutor" ? "cursor-not-allowed opacity-90" : "cursor-pointer hover:shadow-xl"}
  `}
                    >

                        {/* TOP */}
                        <div className="bg-blue-50 p-6 text-center">
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow">
                                <img
                                    src={t.photoURL}
                                    alt={t.name}
                                    className="w-full h-full object-cover object-center"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src =
                                            "https://i.ibb.co/qW1s4HQ/user.png";
                                    }}
                                />
                            </div>

                            <h3 className="text-xl font-bold mt-3">{t.name}</h3>
                        </div>

                        {/* BODY */}
                        <div className="p-5 space-y-2 text-sm">
                            <p>🎓 <strong>University:</strong> {t.university}</p>
                            <p>🏫 <strong>Department:</strong> {t.department}</p>
                            <p>📘 <strong>SSC:</strong> {t.ssc}</p>
                            <p>📗 <strong>HSC:</strong> {t.hsc}</p>

                            <div className="flex justify-between items-center">
                                <p>📅 <strong>Running Year:</strong> {t.runningYear}</p>
                                {role !== "tutor" && (
                                    <span className="bg-green-600 text-white px-5 py-2 rounded-md text-xs">
                                        Contact
                                    </span>
                                )}

                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="bg-green-50 px-5 py-4 flex justify-between items-center">
                            <p className="text-green-700 font-semibold">
                                👨‍🏫 {t.experience} years experience
                            </p>
                            <p className="text-gray-600 text-sm">✔ Verified Tutor</p>
                        </div>
                    </motion.div>
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

export default Tutors;
