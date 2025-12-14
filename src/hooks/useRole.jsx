import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [role, setRole] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}/role`).then(res => {
        setRole(res.data.role);
        setStatus(res.data.status);
        setLoading(false);
      });
    }
  }, [user]);

  return { role, status, loading };
};

export default useRole;
