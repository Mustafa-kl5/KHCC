import { useNavigate } from "react-router-dom";

const ErrorBoundary = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-4">Oops! Page not found.</p>
      <div
        className="text-blue-500 hover:underline cursor-pointer"
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        Login Again
      </div>
    </div>
  );
};

export default ErrorBoundary;
