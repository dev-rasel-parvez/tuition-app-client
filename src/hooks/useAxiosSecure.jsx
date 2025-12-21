import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (currentUser) {
          const token = await currentUser.getIdToken(); // ✅ CORRECT
          config.headers.authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const resInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        const status = error?.response?.status;

        if (status === 401 || status === 403) {
          await logOut();
          navigate("/auth/login", { replace: true });
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
