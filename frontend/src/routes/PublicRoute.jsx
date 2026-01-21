import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const { loggedIn } = useContext(AuthContext);
  return !loggedIn ? children : <Navigate to="/dashboard" />;
}
