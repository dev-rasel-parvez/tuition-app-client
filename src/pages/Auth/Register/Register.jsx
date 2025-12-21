import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { redirectByRole } from "../../../utils/redirectByRole";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [creating, setCreating] = useState(false);
  const selectedRole = watch("role");

  const handleRegistration = async (data) => {
    setCreating(true);

    try {
      // 1️⃣ Firebase Auth
      await registerUser(data.email, data.password);

      // 2️⃣ Upload Image
      let photoURL = "";
      if (data.photo?.length) {
        const formData = new FormData();
        formData.append("image", data.photo[0]);

        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
          formData
        );
        photoURL = imgRes.data.data.url;
      }

      // 3️⃣ Update Firebase Profile
      await updateUserProfile({
        displayName: data.name,
        photoURL,
      });

      // 4️⃣ Save user to MongoDB
      const userInfo = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        photoURL,
        provider: "email",
        createdAt: new Date(),
      };

      if (data.role === "tutor") {
        Object.assign(userInfo, {
          university: data.university,
          department: data.department,
          experience: data.experience,
          runningYear: data.runningYear,
          ssc: data.ssc,
          hsc: data.hsc,
          contactPhone: data.contactPhone,
        });
      }

      await axiosSecure.post("/users", userInfo);

      // ✅ Success message
      Swal.fire({
        icon: "success",
        title: "Account Created",
        text: "Redirecting to dashboard...",
        timer: 1200,
        showConfirmButton: false,
      });

      // 🚀 INSTANT redirect (no waiting)
      setTimeout(() => {
        navigate(redirectByRole(data.role), { replace: true });
      }, 1200);

    } catch (error) {
      Swal.fire("Registration Failed", error.message, "error");
      setCreating(false);
    }
  };

  return (
    <div className="card bg-base-100 max-w-sm mx-auto shadow-2xl relative">
      {creating && (
        <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-50">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-3 font-semibold">Creating your account...</p>
        </div>
      )}

      <h3 className="text-3xl font-bold text-center mt-4">Create Account</h3>

      <form onSubmit={handleSubmit(handleRegistration)} className="card-body">
        <input {...register("name", { required: true })} placeholder="Full Name" className="input" />
        <input {...register("email", { required: true })} placeholder="Email" className="input" />
        <input {...register("phone", { required: true })} placeholder="Phone" className="input" />

        <select {...register("role")} className="select select-bordered ">
          <option className="bg-gray-100 font-bold" value="student">Student / Guardian</option>
          <option className="bg-gray-100 font-bold" value="tutor">Tutor</option>
        </select>

        {selectedRole === "tutor" && (
          <div className="space-y-2 border p-3 rounded">
            <input {...register("university")} placeholder="University" className="input" />
            <input {...register("department")} placeholder="Department" className="input" />
            <input {...register("experience")} placeholder="Experience" className="input" />
            <input {...register("runningYear")} placeholder="Running Year" className="input" />
            <input {...register("ssc")} placeholder="SSC Result" className="input" />
            <input {...register("hsc")} placeholder="HSC Result" className="input" />
            <input {...register("contactPhone")} placeholder="Contact Phone" className="input" />
          </div>
        )}

        <input type="file" {...register("photo")} className="file-input" />

        <input
          type="password"
          {...register("password", { required: true, minLength: 6 })}
          placeholder="Password"
          className="input"
        />

        <button className="btn btn-neutral" disabled={creating}>
          Register
        </button>

        <p className="text-center">
          Already have an account? <Link to="/auth/login" className="underline">Login</Link>
        </p>
      </form>

      <SocialLogin />
    </div>
  );
};

export default Register;
