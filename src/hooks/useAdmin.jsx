import useAuth from "./useAuth";
import useRole from "./useRole";
import { isSuperAdmin } from "../utils/isSuperAdmin";

const useAdmin = () => {
  const { user } = useAuth();
  const { role, status, loading } = useRole();

  const isSuper = isSuperAdmin(user?.email);
  const isApprovedAdmin = role === "admin" && status === "approved";

  return {
    loading,
    isSuper,
    isApprovedAdmin
  };
};

export default useAdmin;
