import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

export default function Header() {
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    const accessTokenName = import.meta.env.VITE_ACCESS_TOKEN_NAME;
    const refreshTokenName = import.meta.env.VITE_REFRESH_TOKEN_NAME;
    localStorage.removeItem(accessTokenName);
    localStorage.removeItem(refreshTokenName);
    setLoggedIn(false);
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar container pt-3 pb-3">
        <Link to="/" className="navbar-brand">
          Finance Dashboard
        </Link>

        <div>
          {loggedIn ? (
            <>
              <Button class="btn-info" url="/dashboard" text="Dashboard" />
              &nbsp; &nbsp;
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Button class="btn-outline-info" url="/login" text="Login" />
              &nbsp; &nbsp;
              <Button class="btn-info" url="/register" text="Register" />
            </>
          )}
        </div>
      </nav>
    </>
  );
}
