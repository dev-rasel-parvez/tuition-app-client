import useAuth from '../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import Swal from "sweetalert2";
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const SocialLogin = () => {
    const { signInGoogle } = useAuth();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInGoogle()
            .then(result => {

                const userInfo = {
                    email: result.user.email,
                    name: result.user.displayName,
                    photoURL: result.user.photoURL,
                    phone: null,                // Google doesn't give phone
                    role: "student",            // Default role
                    createdAt: new Date()
                };

                // Save user (ignore if already exists)
                axiosSecure.post('/users', userInfo)
                    .catch(() => { })  // ignore duplicate errors
                    .finally(() => {

                        Swal.fire({
                            icon: "success",
                            title: "Logged in with Google!",
                            timer: 1800,
                            showConfirmButton: false,
                            position: "top-end"
                        });

                        const redirectPath = location.state?.from?.pathname || "/dashboard";
                        navigate(redirectPath, { replace: true });
                    });

            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Google Login Failed",
                    text: error.message,
                });
            });
    };

    return (
        <div className='text-center pb-8'>
            <p className='mb-2'>OR</p>

            <button 
                onClick={handleGoogleSignIn}
                className="btn bg-white text-black border-[#e5e5e5]"
            >
                Login with Google
            </button>
        </div>
    );
};

export default SocialLogin;
