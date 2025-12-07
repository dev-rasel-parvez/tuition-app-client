import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleRegistration = async (data) => {
    try {
      // 1. Create Firebase User
      const result = await registerUser(data.email, data.password);

      // 2. Upload profile image (optional)
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

      // 3. Update Firebase Profile
      await updateUserProfile({
        displayName: data.name,
        photoURL: photoURL,
      });

      // 4. Save user in MongoDB
      const userInfo = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role, // Student or Tutor
        photoURL: photoURL,
        createdAt: new Date(),
      };

      const dbRes = await axiosSecure.post("/users", userInfo);
      console.log("User saved to database", dbRes.data);

      // 5. Redirect after register
      const redirectPath = location.state?.from?.pathname || "/";
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card bg-base-100 pt-4 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center">Create Your Account</h3>
      <p className="text-center">Register to continue</p>

      <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">

          {/* Name */}
          <label className="label">Full Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Your Full Name"
          />
          {errors.name && <p className="text-red-500">Name is required.</p>}

          {/* Email */}
          <label className="label">Email Address</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required.</p>}

          {/* Phone */}
          <label className="label">Phone Number</label>
          <input
            type="text"
            {...register("phone", { required: true })}
            className="input"
            placeholder="Phone Number"
          />
          {errors.phone && <p className="text-red-500">Phone is required.</p>}

          {/* Role Selection */}
          <label className="label">Register As</label>
          <select
            {...register("role", { required: true })}
            className="select select-bordered"
          >
            <option value="student">Student/Guardians</option>
            <option value="tutor">Tutor</option>
          </select>
          {errors.role && <p className="text-red-500">Select a role.</p>}

          {/* Photo Upload */}
          <label className="label">Profile Photo</label>
          <input
            type="file"
            {...register("photo", { required: false })}
            className="file-input"
          />

          {/* Password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
            })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required.</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be at least 6 characters.
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Password must include uppercase, lowercase, number & special character.
            </p>
          )}

          {/* Submit Button */}
          <button className="btn btn-neutral mt-4">Register</button>

        </fieldset>

        <p>
          Already have an account?{" "}
          <Link
            state={location.state}
            className="text-blue-400 underline"
            to="/login"
          >
            Login
          </Link>
        </p>
      </form>

      <SocialLogin />
    </div>
  );
};

export default Register;
