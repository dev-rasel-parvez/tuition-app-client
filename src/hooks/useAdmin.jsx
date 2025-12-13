import useAuth from "./useAuth";
import useRole from "./useRole";
import { isSuperAdmin } from "../utils/isSuperAdmin";

const useAdmin = () => {
  const { user } = useAuth();
  const { role, status } = useRole();

  const isAdmin = role === "admin" && status === "approved";
  const isSuper = isSuperAdmin(user?.email);

  return { isAdmin, isSuper };
};

export default useAdmin;
