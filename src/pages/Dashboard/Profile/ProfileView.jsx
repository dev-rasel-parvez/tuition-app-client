import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ProfileView = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axiosSecure.get("/profile").then(res => setProfile(res.data));
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">My Profile</h2>

        <button
          onClick={() => navigate("/dashboard/profile/edit")}
          className="btn bg-lime-400 hover:bg-lime-500 text-black font-semibold"
        >
          Edit Profile
        </button>
      </div>

      {/* PROFILE CARD */}
      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* AVATAR */}
        <img
          src={profile.photoURL || "https://i.ibb.co/qW1s4HQ/user.png"}
          alt="Profile"
          className="w-40 h-40 rounded-full border-4 border-pink-500 shadow"
        />

        {/* INFO */}
        <div className="space-y-3 text-lg">
          <p><b>Name:</b> {profile.name}</p>
          <p><b>Email:</b> {profile.email}</p>
          <p><b>Phone:</b> {profile.phone || "N/A"}</p>
          <p><b>Role:</b> {profile.role}</p>
          <p><b>Status:</b> {profile.status}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
