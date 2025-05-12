import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useContext(AuthContext);
  
  // Not logged in at all
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  // Admin access check
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" />;
  }
  
  // User is authenticated (and is admin if adminOnly is true)
  return children;
};

export default ProtectedRoute;
