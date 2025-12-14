import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  }).toUpperCase();

const TuitionDetailsPage  = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [tuition, setTuition] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axiosSecure.get(`/admin/tuitions/${id}`).then(res => {
      setTuition(res.data.tuition);
      setApplications(res.data.applications || []);
    });
  }, [id]);

  if (!tuition) return <p>Loading...</p>;

  return (
    <div className="space-y-6">

      {/* =====================
          TUITION OVERVIEW
      ===================== */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="text-2xl font-bold">Tuition Overview</h2>

          <div className="grid md:grid-cols-3 gap-4 mt-3">
            <p><b>ID:</b> {tuition.tuitionId}</p>
            <p><b>Post Date:</b> {formatDate(tuition.createdAt)}</p>
            <p><b>Status:</b> <span className="badge badge-success">{tuition.status}</span></p>

            <p><b>Class:</b> {tuition.class}</p>
            <p><b>Subjects:</b> {tuition.subjects}</p>
            <p><b>Location:</b> {tuition.location}</p>

            <p><b>Schedule:</b> {tuition.schedule}</p>
          </div>
        </div>
      </div>

      {/* =====================
          POSTED BY
      ===================== */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h3 className="text-xl font-bold">Posted By</h3>

          <div className="flex items-center gap-4 mt-3">
            <img
              src={tuition.postedBy?.photoURL}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <p className="font-bold">{tuition.postedBy?.name}</p>
              <p>{tuition.postedBy?.email}</p>
              <p>{tuition.postedBy?.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* =====================
          TUTORS APPLIED
      ===================== */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h3 className="text-xl font-bold">Tutors Applied</h3>

          {applications.length === 0 && (
            <p className="text-gray-500">No tutors applied yet</p>
          )}

          <div className="space-y-3 mt-3">
            {applications.map(app => (
              <div key={app._id} className="flex items-center justify-between border p-3 rounded">
                <div className="flex items-center gap-3">
                  <img src={app.tutor.photoURL} className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-bold">{app.tutor.name}</p>
                    <p className="text-sm">{app.tutor.university}</p>
                  </div>
                </div>

                <span className="badge badge-outline">
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =====================
          ACTIVITY TIMELINE
      ===================== */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h3 className="text-xl font-bold">Activity Timeline</h3>

          <ul className="timeline timeline-vertical mt-4">
            <li>
              <span className="timeline-start badge badge-info">Posted</span>
              <span className="timeline-end">{formatDate(tuition.createdAt)}</span>
            </li>

            {tuition.approvedAt && (
              <li>
                <span className="timeline-start badge badge-success">Approved</span>
                <span className="timeline-end">{formatDate(tuition.approvedAt)}</span>
              </li>
            )}

            {tuition.hiredTutor && (
              <li>
                <span className="timeline-start badge badge-primary">Tutor Hired</span>
                <span className="timeline-end">{formatDate(tuition.hiredAt)}</span>
              </li>
            )}
          </ul>
        </div>
      </div>

    </div>
  );
};

export default TuitionDetailsPage ;
