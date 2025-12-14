import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";

const AdminRegister = () => {
  const { register, handleSubmit } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [creating, setCreating] = useState(false);

  const handleAdminRegister = async (data) => {
    setCreating(true);

    try {
      await registerUser(data.email, data.password);

      let photoURL = "";
      if (data.photo?.length) {
        const formData = new FormData();
        formData.append("image", data.photo[0]);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
          formData
        );
        photoURL = res.data.data.url;
      }

      await updateUserProfile({
        displayName: data.name,
        photoURL,
      });

      await axiosSecure.post("/users", {
        name: data.name,
        email: data.email,
        role: "admin",
        photoURL,
        provider: "email",
      });

      Swal.fire({
        icon: "success",
        title: "Admin Created",
        text: "Waiting for approval...",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/auth/login", { replace: true });
      }, 1500);

    } catch (error) {
      Swal.fire("Registration Failed", error.message, "error");
      setCreating(false);
    }
  };

  return (
    <div className="card bg-base-100 max-w-sm mx-auto shadow-xl mt-10 relative">
      {creating && (
        <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-50">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-3 font-semibold">Creating admin account...</p>
        </div>
      )}

      <h2 className="text-2xl font-bold text-center mt-4">Admin Registration</h2>

      <form onSubmit={handleSubmit(handleAdminRegister)} className="card-body">
        <input {...register("name")} placeholder="Full Name" className="input" />
        <input {...register("email")} placeholder="Email" className="input" />
        <input type="file" {...register("photo")} className="file-input" />
        <input type="password" {...register("password")} placeholder="Password" className="input" />

        <button className="btn btn-neutral w-full" disabled={creating}>
          Register Admin
        </button>

        <p className="text-center mt-2">
          Already admin? <Link to="/auth/login" className="underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default AdminRegister;
