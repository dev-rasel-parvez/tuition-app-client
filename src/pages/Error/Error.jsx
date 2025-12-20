import { Link, useRouteError } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
  const error = useRouteError();

  const status = error?.status || 404;
  const message =
    error?.statusText ||
    error?.message ||
    "The page you are looking for does not exist.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <FaExclamationTriangle className="text-red-500 text-6xl mx-auto mb-4" />

        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {status}
        </h1>

        <p className="text-gray-600 mb-6">
          {message}
        </p>

        <div className="flex gap-3 justify-center">
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>

          <button
            className="btn btn-outline"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
