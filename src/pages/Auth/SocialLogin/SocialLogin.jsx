import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect } from "react";
import { redirectByRole } from "../../../utils/redirectByRole";

const SocialLogin = () => {
  const { signInGoogle, user } = useAuth();
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInGoogle();

      await axiosSecure.post("/users", {
        email: result.user.email,
        name: result.user.displayName,
        photoURL: result.user.photoURL,
        role: "student", // ✅ DEFAULT
        provider: "google",
        createdAt: new Date(),
      }).catch(() => {});

      Swal.fire({
        icon: "success",
        title: "Google Login Successful",
        timer: 1500,
        showConfirmButton: false,
      });

    } catch (error) {
      Swal.fire("Google Login Failed", error.message, "error");
    }
  };

  // 🔥 ROLE BASED REDIRECT
  useEffect(() => {
    if (user && role) {
      navigate(redirectByRole(role), { replace: true });
    }
  }, [user, role, navigate]);

  return (
    <button onClick={handleGoogleSignIn} className="btn w-full">
      Login with Google
    </button>
  );
};

export default SocialLogin;
