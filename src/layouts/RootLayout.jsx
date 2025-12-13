import { Outlet, useNavigate, useLocation } from "react-router-dom";
import NavBar from "../pages/Shared/NavBar/NavBar";
import Footer from "../pages/Shared/Footer/Footer";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import { useEffect } from "react";
import { redirectByRole } from "../utils/redirectByRole";

const RootLayout = () => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 🔥 AUTO REDIRECT AFTER LOGIN
    if (user && !loading && !roleLoading) {
      // prevent redirect loop
      if (!location.pathname.startsWith("/dashboard")) {
        navigate(redirectByRole(role), { replace: true });
      }
    }
  }, [user, role, loading, roleLoading, navigate, location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {!user && <NavBar />}

      <main className="flex-1">
        <Outlet />
      </main>

      {!user && <Footer />}
    </div>
  );
};

export default RootLayout;
