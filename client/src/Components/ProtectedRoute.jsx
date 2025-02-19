import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Please log in to access this page.");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
