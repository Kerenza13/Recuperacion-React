import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Protected({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default Protected;
