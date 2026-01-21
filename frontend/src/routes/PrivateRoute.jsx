import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { loggedIn } = useContext(AuthContext);
  return loggedIn ? children : <Navigate to="/login" />;
}
