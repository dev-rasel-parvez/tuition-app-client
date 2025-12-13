import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaFilter, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";

import Swal from "sweetalert2";

const Tutors = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [tutors, setTutors] = useState([]);
    const [page, setPage] = useState(1);
    const [showFilter, setShowFilter] = useState(false);
    const [total, setTotal] = useState(0);

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

    // -------------------------
    // LOAD TUTORS
    // -------------------------
    const loadTutors = async () => {
        let query = `/tutors?page=${page}&limit=12`;

        Object.entries(filters).forEach(([key, value]) => {
            if (value) query += `&${key}=${value}`;
        });

        const res = await axiosSecure.get(query);

        if (page === 1) {
            setTutors(res.data.tutors);
        } else {
            setTutors(prev => [...prev, ...res.data.tutors]);
        }

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

    // -------------------------
    // CONTACT TUTOR HANDLER
    // -------------------------
    const handleContact = (id) => {
        if (!user) {
            Swal.fire({
                icon: "warning",
                title: "Login Required",
                text: "Please login to view tutor details.",
                confirmButtonText: "Login Now"
            }).then(() => navigate("/auth/login"));
            return;
        }

        navigate(`/tutors/${id}`);
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
                </div>
            )}

            {/* FILTER POPUP */}
            {showFilter && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-11/12 md:w-2/3 lg:w-1/2 space-y-4">

                        <h3 className="text-xl font-bold mb-4">Filter Tutors</h3>

                        {/* FILTER FIELDS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input className="input input-bordered" placeholder="University"
                                onChange={(e) => setFilters({ ...filters, university: e.target.value })} />

                            <input className="input input-bordered" placeholder="Department"
                                onChange={(e) => setFilters({ ...filters, department: e.target.value })} />

                            <input className="input input-bordered" placeholder="Experience (years)"
                                onChange={(e) => setFilters({ ...filters, experience: e.target.value })} />

                            <input className="input input-bordered" placeholder="Running Year"
                                onChange={(e) => setFilters({ ...filters, runningYear: e.target.value })} />

                            <input className="input input-bordered" placeholder="SSC Result"
                                onChange={(e) => setFilters({ ...filters, ssc: e.target.value })} />

                            <input className="input input-bordered" placeholder="HSC Result"
                                onChange={(e) => setFilters({ ...filters, hsc: e.target.value })} />
                        </div>

                        <div className="flex justify-between mt-4">
                            <button className="btn btn-outline" onClick={() => setShowFilter(false)}>
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

            {/* TUTOR CARDS */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {tutors.map((t) => (
                    <motion.div
                        key={t._id}
                        className="bg-white p-6 rounded-xl shadow cursor-pointer flex flex-col justify-between min-h-[480px]"
                        onClick={() => handleContact(t._id)}
                    >
                        <div className="flex flex-col items-center text-center flex-grow">
                            <img
                                src={t.photoURL || "https://i.ibb.co/qW1s4HQ/user.png"}
                                className="w-24 h-24 rounded-full border-4 border-pink-500 shadow"
                                alt="profile"
                            />

                            <h3 className="text-xl font-bold mt-3 mb-3">{t.name}</h3>

                            <p className="text-gray-600"><strong>Tutor University:</strong> {t.university}</p>
                            <p className="text-gray-600"><strong>Tutor Department:</strong> {t.department}</p>

                            <div className="mt-4 w-full bg-gray-100 rounded-xl p-4 text-sm text-left">
                                <p><strong>SSC:</strong> {t.ssc}</p>
                                <p><strong>HSC:</strong> {t.hsc}</p>
                                <p><strong>Running Year:</strong> {t.runningYear}</p>
                                <p><strong>Experience:</strong> {t.experience} years</p>
                            </div>
                        </div>

                        <button className="btn btn-sm mt-3 bg-pink-600 text-white w-full">
                            Contact Tutor
                        </button>
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
