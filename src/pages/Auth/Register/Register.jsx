import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect } from "react";
import { redirectByRole } from "../../../utils/redirectByRole";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile, user } = useAuth();
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const selectedRole = watch("role");

  // 🔥 ROLE BASED REDIRECT (AFTER REGISTER)
  useEffect(() => {
    if (user && role) {
      navigate(redirectByRole(role), { replace: true });
    }
  }, [user, role, navigate]);

  const handleRegistration = async (data) => {
    try {
      // 1️⃣ Firebase Auth
      await registerUser(data.email, data.password);

      // 2️⃣ Upload Image (optional)
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

      // 4️⃣ Prepare DB User
      const userInfo = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        photoURL,
        createdAt: new Date(),
        provider: "email",
      };

      // Tutor extra fields
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

      // 5️⃣ Save to MongoDB
      await axiosSecure.post("/users", userInfo);

      Swal.fire({
        icon: "success",
        title: "Account Created Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="card bg-base-100 max-w-sm mx-auto shadow-2xl">
      <h3 className="text-3xl font-bold text-center mt-4">Create Account</h3>

      <form onSubmit={handleSubmit(handleRegistration)} className="card-body">

        <input
          {...register("name", { required: true })}
          placeholder="Full Name"
          className="input"
        />
        {errors.name && <p className="text-red-500">Name required</p>}

        <input
          {...register("email", { required: true })}
          placeholder="Email"
          className="input"
        />

        <input
          {...register("phone", { required: true })}
          placeholder="Phone"
          className="input"
        />

        <select {...register("role")} className="select select-bordered">
          <option value="student">Student / Guardian</option>
          <option value="tutor">Tutor</option>
        </select>

        {/* Tutor Extra Fields */}
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

        <button className="btn btn-neutral">Register</button>

        <p className="text-center">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </form>

      <SocialLogin />
    </div>
  );
};

export default Register;
