import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";

const ProfileEdit = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    photoURL: "",
  });

  const [photoFile, setPhotoFile] = useState(null);

  // LOAD PROFILE
  useEffect(() => {
    axiosSecure.get("/profile")
      .then(res => {
        setForm({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          photoURL: res.data.photoURL || "",
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      let finalPhotoURL = form.photoURL;

      // ✅ UPLOAD IMAGE IF NEW FILE SELECTED
      if (photoFile) {
        const fd = new FormData();
        fd.append("image", photoFile);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
          fd
        );

        finalPhotoURL = res.data.data.url;
      }

      await axiosSecure.patch("/profile", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        photoURL: finalPhotoURL, // ✅ SEND PHOTO URL
      });

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => navigate("/dashboard/profile"), 1600);

    } catch (err) {
      if (err.response?.status === 409) {
        Swal.fire("Error", "Email already exists", "error");
      } else {
        Swal.fire("Error", "Failed to save profile", "error");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-lg">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
      <h2 className="text-3xl font-bold mb-6">Edit Profile</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* PHOTO */}
        <div className="flex flex-col items-center gap-4">
          <img
            src={
              photoFile
                ? URL.createObjectURL(photoFile)
                : form.photoURL || "https://i.ibb.co/qW1s4HQ/user.png"
            }
            className="w-36 h-36 rounded-full border-4 border-pink-500"
          />

          <input
            type="file"
            className="file-input file-input-bordered"
            onChange={e => setPhotoFile(e.target.files[0])}
          />
        </div>

        {/* FORM */}
        <div className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Full Name"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Email"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Phone"
          />
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn bg-green-500 hover:bg-green-600 text-white"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

        <button
          onClick={() => navigate("/dashboard/profile")}
          className="btn btn-outline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProfileEdit;
