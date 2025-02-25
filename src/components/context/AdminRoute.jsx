import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  return isAuthenticated && user?.role === "admin" ? children : <Navigate to="/" />;
}