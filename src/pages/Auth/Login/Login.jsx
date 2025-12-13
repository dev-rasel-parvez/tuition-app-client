import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin/SocialLogin";
import { useEffect } from "react";
import { redirectByRole } from "../../../utils/redirectByRole";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { signInUser, user } = useAuth();
  const { role } = useRole();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      await signInUser(data.email, data.password);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire("Login Failed", err.message, "error");
    }
  };

  // 🔥 ROLE BASED REDIRECT
  useEffect(() => {
    if (user && role) {
      navigate(redirectByRole(role), { replace: true });
    }
  }, [user, role, navigate]);

  return (
    <div className="card bg-base-100 max-w-sm mx-auto shadow-2xl">
      <form onSubmit={handleSubmit(handleLogin)} className="card-body">
        <input {...register("email")} placeholder="Email" className="input" />
        <input {...register("password")} type="password" placeholder="Password" className="input" />
        <button className="btn btn-neutral">Login</button>
        <p>
          New user? <Link to="/auth/register">Register</Link>
        </p>
      </form>

      <SocialLogin />
    </div>
  );
};

export default Login;
