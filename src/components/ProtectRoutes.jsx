// src/components/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useSelector((state) => state.auth);

  // If user not logged in, redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // If adminOnly is true but user is not admin, redirect to home
  if (adminOnly && user.role !== "admin") return <Navigate to="/" replace />;

  return children;
}
