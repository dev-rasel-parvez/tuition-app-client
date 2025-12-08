import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from "sweetalert2";
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(result => {
                Swal.fire({
                    icon: "success",
                    title: "Login Successful!",
                    text: "Welcome back to eTuitionBd",
                    timer: 1800,
                    showConfirmButton: false,
                    position: "top-end"
                });

                const redirectPath = location.state?.from?.pathname || "/dashboard";
                navigate(redirectPath, { replace: true });
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: error.message,
                    confirmButtonColor: "#d33"
                });
            });
    };

    return (
        <div className="card bg-base-100 w-full mx-auto pt-3 max-w-sm shrink-0 shadow-2xl">
            <h3 className="text-3xl text-center">Welcome back</h3>
            <p className='text-center'>Please Login</p>

            <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
                <fieldset className="fieldset">

                    {/* Email */}
                    <label className="label">Email</label>
                    <input type="email"
                        {...register('email', { required: true })}
                        className="input"
                        placeholder="Email" />
                    {errors.email && <p className='text-red-500'>Email is required</p>}

                    {/* Password */}
                    <label className="label">Password</label>
                    <input type="password"
                        {...register('password', { required: true })}
                        className="input"
                        placeholder="Password" />
                    {errors.password && <p className='text-red-500'>Password is required</p>}

                    <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>

                <p>
                    New to <span className='text-red-500'>eTuitionBd</span>?{" "}
                    <Link className='text-blue-400 underline' to="/register">Register</Link>
                </p>
            </form>

            <SocialLogin />
        </div>
    );
};

export default Login;
