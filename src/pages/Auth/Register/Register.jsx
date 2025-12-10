import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const selectedRole = watch("role"); // Detect selected role

  const handleRegistration = async (data) => {
    try {
      // 1. Create Firebase Auth User
      const result = await registerUser(data.email, data.password);

      // 2. Upload Profile Photo
      let photoURL = "";
      if (data.photo?.length > 0) {
        const formData = new FormData();
        formData.append("image", data.photo[0]);

        const imageAPI = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        const imgRes = await axios.post(imageAPI, formData);
        photoURL = imgRes.data.data.url;
      }

      // 3. Firebase Profile Update
      await updateUserProfile({
        displayName: data.name,
        photoURL: photoURL,
      });

      // 4. Prepare MongoDB user object
      const userInfo = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        photoURL: photoURL,
        createdAt: new Date(),
      };

      // 5. Add Tutor Only Fields
      if (data.role === "tutor") {
        userInfo.university = data.university;
        userInfo.department = data.department;
        userInfo.experience = data.experience;
        userInfo.runningYear = data.runningYear;
        userInfo.ssc = data.ssc;
        userInfo.hsc = data.hsc;
        userInfo.contactEmail = data.contactEmail;   // NEW FIELD
        userInfo.contactPhone = data.contactPhone;   // NEW FIELD
      }

      // 6. Save to MongoDB
      await axiosSecure.post("/users", userInfo);

      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "Welcome to eTuitionBd",
        timer: 1800,
        position: "top-end",
        showConfirmButton: false,
      });

      navigate(location.state?.from?.pathname || "/dashboard", { replace: true });

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="card bg-base-100 pt-4 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center font-bold">Create Your Account</h3>
      <p className="text-center">Register to continue</p>

      <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">

          {/* FULL NAME */}
          <label className="label">Full Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Your Full Name"
          />
          {errors.name && <p className="text-red-500">Name is required.</p>}

          {/* EMAIL */}
          <label className="label">Email Address</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required.</p>}

          {/* PHONE */}
          <label className="label">Phone Number</label>
          <input
            type="text"
            {...register("phone", { required: true })}
            className="input"
            placeholder="Phone Number"
          />
          {errors.phone && <p className="text-red-500">Phone is required.</p>}

          {/* ROLE SELECT */}
          <label className="label">Register As</label>
          <select {...register("role", { required: true })} className="select select-bordered">
            <option value="student">Student / Guardian</option>
            <option value="tutor">Tutor</option>
          </select>

          {/* ------------------------------ */}
          {/* TUTOR EXTRA FIELDS */}
          {/* ------------------------------ */}
          {selectedRole === "tutor" && (
            <div className="space-y-3 mt-4 border p-3 rounded-lg bg-gray-50">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input {...register("university", { required: true })} className="input input-bordered" placeholder="University" />
                <input {...register("department", { required: true })} className="input input-bordered" placeholder="Department" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input {...register("experience", { required: true })} className="input input-bordered" placeholder="Experience (years)" />
                <input {...register("runningYear", { required: true })} className="input input-bordered" placeholder="Running Year" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input {...register("ssc", { required: true })} className="input input-bordered" placeholder="SSC Result" />
                <input {...register("hsc", { required: true })} className="input input-bordered" placeholder="HSC Result" />
              </div>

              {/* NEW CONTACT FIELDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  {...register("contactEmail", { required: true })}
                  className="input input-bordered"
                  placeholder="Tutor Contact Email"
                />

                <input
                  {...register("contactPhone", { required: true })}
                  className="input input-bordered"
                  placeholder="Tutor Contact Phone"
                />
              </div>
            </div>
          )}

          {/* PHOTO */}
          <label className="label">Profile Photo</label>
          <input type="file" {...register("photo")} className="file-input" />

          {/* PASSWORD */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
            })}
            className="input"
            placeholder="Password"
          />

          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>

        <p className="text-center mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">Login</Link>
        </p>
      </form>

      <SocialLogin />
    </div>
  );
};

export default Register;
