import Lottie from "react-lottie";
import forbiddenAnimation from "../../assets/json/forbidden.json";
import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <Lottie
        options={{
          loop: false,
          autoplay: true,
          animationData: forbiddenAnimation,
        }}
        height={200}
        width={200}
      />

      <h1 className="text-3xl font-bold text-red-500 mt-4">
        You Are Forbidden to Access This Page
      </h1>

      <p className="text-lg text-gray-500 dark:text-gray-300 mt-2">
        Please contact the administrator if you believe this is an error.
      </p>

      <div className="my-4 flex gap-3">
        <Link to="/" className="btn btn-primary">
          Go to Home
        </Link>
        <Link to="/dashboard" className="btn btn-outline">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
