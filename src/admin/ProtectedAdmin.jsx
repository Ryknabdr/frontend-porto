import { Navigate } from "react-router-dom";

export default function ProtectedAdmin({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/raihan-login" replace />;
  }

  return children;
}