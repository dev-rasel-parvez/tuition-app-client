import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const LIMIT = 15;

// =====================
// DATE FORMATTER
// =====================
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
        .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "2-digit",
        })
        .toUpperCase();
};

const TuitionManagement = () => {
    const axiosSecure = useAxiosSecure();

    const [tuitions, setTuitions] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [viewTuition, setViewTuition] = useState(null);

    const totalPages = Math.ceil(total / LIMIT);
    const navigate = useNavigate();

    // =====================
    // LOAD TUITIONS
    // =====================
    const loadTuitions = async (currentPage = 1) => {
        const res = await axiosSecure.get(
            `/admin/tuitions?page=${currentPage}&limit=${LIMIT}`
        );

        setTuitions(res.data.tuitions);
        setTotal(res.data.total);
        setPage(res.data.page);
    };

    useEffect(() => {
        loadTuitions(page);
    }, [page]);

    // =====================
    // SEARCH (CLIENT SIDE)
    // =====================
    const filteredTuitions = tuitions.filter((t) =>
        `${t.tuitionId} ${t.class} ${t.subjects} ${t.location} ${t.status}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    // =====================
    // CONFIRM HELPER
    // =====================
    const confirmAction = async (title, text) => {
        const res = await Swal.fire({
            title,
            text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        });
        return res.isConfirmed;
    };

    // =====================
    // APPROVE
    // =====================
    const handleApprove = async (id) => {
        if (!(await confirmAction("Approve tuition?", "Tutors will see this post")))
            return;

        await axiosSecure.patch(`/admin/tuitions/${id}/status`, {
            status: "approved",
        });

        loadTuitions(page);
    };

    // =====================
    // REJECT
    // =====================
    const handleReject = async (id) => {
        const { value: reason } = await Swal.fire({
            title: "Reject tuition",
            input: "textarea",
            inputPlaceholder: "Reason (optional)",
            showCancelButton: true,
        });

        if (reason === undefined) return;

        await axiosSecure.patch(`/admin/tuitions/${id}/status`, {
            status: "rejected",
            rejectReason: reason,
        });

        loadTuitions(page);
    };

    const badge = (status) => {
        if (status === "approved") return "badge badge-success";
        if (status === "pending") return "badge badge-warning";
        return "badge badge-error";
    };

    return (
        <div>
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                    Tuition Management
                    <span className="ml-2 badge badge-neutral">Total: {total}</span>
                </h2>

                <input
                    className="input input-bordered w-80"
                    placeholder="Search tuition"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* TABLE */}
            <table className="table">
                <thead>
                    <tr>
                        <th>Tuition ID</th>
                        <th>Post Date</th>
                        <th>Class</th>
                        <th>Subjects</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th className="text-right">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredTuitions.map((t) => (
                        <tr key={t._id}>
                            <td className="font-semibold">{t.tuitionId}</td>

                            <td className="text-gray-600">
                                {t.createdAt ? formatDate(t.createdAt) : "—"}
                            </td>

                            <td>{t.class}</td>
                            <td>{t.subjects}</td>
                            <td>{t.location}</td>

                            <td>
                                <span className={badge(t.status)}>{t.status}</span>
                            </td>

                            <td className="text-right space-x-2">
                                <button
                                    className="btn btn-xs"
                                    onClick={() => navigate(`/dashboard/tuitions/${t._id}`)}
                                >
                                    View
                                </button>


                                {t.status !== "approved" && (
                                    <button
                                        className="btn btn-xs btn-success"
                                        onClick={() => handleApprove(t._id)}
                                    >
                                        Approve
                                    </button>
                                )}

                                {t.status !== "rejected" && (
                                    <button
                                        className="btn btn-xs btn-warning"
                                        onClick={() => handleReject(t._id)}
                                    >
                                        Reject
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* PAGINATION */}
            <div className="flex justify-center mt-6 gap-2">
                <button
                    className="btn btn-sm"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Prev
                </button>

                {[...Array(totalPages).keys()].map((p) => (
                    <button
                        key={p}
                        className={`btn btn-sm ${page === p + 1 ? "btn-active" : ""}`}
                        onClick={() => setPage(p + 1)}
                    >
                        {p + 1}
                    </button>
                ))}

                <button
                    className="btn btn-sm"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>

            {/* VIEW MODAL */}
            {viewTuition && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-2">Tuition Details</h3>

                        <p><b>Tuition ID:</b> {viewTuition.tuitionId}</p>
                        <p><b>Post Date:</b> {formatDate(viewTuition.createdAt)}</p>
                        <p><b>Class:</b> {viewTuition.class}</p>
                        <p><b>Subjects:</b> {viewTuition.subjects}</p>
                        <p><b>Location:</b> {viewTuition.location}</p>
                        <p><b>Schedule:</b> {viewTuition.schedule}</p>
                        <p><b>Status:</b> {viewTuition.status}</p>

                        {viewTuition.rejectReason && (
                            <p className="text-red-500 mt-2">
                                <b>Reject Reason:</b> {viewTuition.rejectReason}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TuitionManagement;
