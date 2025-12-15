import { useEffect, useState } from "react";
import { FaEye, FaChartBar, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

import TuitionPreviewModal from "./TuitionPreviewModal";
import EditTuitionModal from "./EditTuitionModal";

const MyTuitions = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [tuitions, setTuitions] = useState([]);
    const [preview, setPreview] = useState(null);
    const [edit, setEdit] = useState(null);

    useEffect(() => {
        if (!user?.email) return;
        axiosSecure.get(`/my-tuitions/${user.email}`).then(res => {
            setTuitions(res.data);
        });
    }, [user?.email]);

    const deleteTuition = async (id) => {
        const ok = await Swal.fire({
            title: "Delete this tuition?",
            icon: "warning",
            showCancelButton: true,
        });
        if (!ok.isConfirmed) return;

        await axiosSecure.delete(`/tuitions/${id}`);
        setTuitions(prev => prev.filter(t => t._id !== id));
    };

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6">My Tuitions</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tuitions.map(t => (
                    <div key={t._id} className="border rounded-xl p-5 shadow">
                        <h3 className="text-pink-600 font-bold">{t.tuitionId}</h3>
                        <p>{t.title}</p>
                        <p>Status: <b>{t.status}</b></p>

                        <div className="grid grid-cols-2 gap-2 mt-4">
                            <button onClick={() => setPreview(t)} className="btn btn-outline">
                                <FaEye /> Preview
                            </button>

                            <button
                                className="btn btn-info btn-sm"
                                onClick={() =>
                                    navigate(`/dashboard/my-tuitions/${t._id}/analytics`)
                                }
                            >
                                Analytics
                            </button>

                            <button onClick={() => setEdit(t)} className="btn">
                                <FaEdit /> Edit
                            </button>

                            <button
                                onClick={() => deleteTuition(t._id)}
                                className="btn btn-error text-white"
                            >
                                <FaTrash /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {preview && <TuitionPreviewModal data={preview} close={() => setPreview(null)} />}
            {edit && <EditTuitionModal data={edit} close={() => setEdit(null)} />}
        </div>
    );
};

export default MyTuitions;
