import { useContext, useState } from "react";
import axios from "axios";
import { Title } from "react-head";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const baseURL = import.meta.env.VITE_BACKEND_API_BASEURL;
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const useData = { username, password };

    try {
      const response = await axios.post(baseURL + "/token/", useData);
      const accessTokenName = import.meta.env.VITE_ACCESS_TOKEN_NAME;
      const refreshTokenName = import.meta.env.VITE_REFRESH_TOKEN_NAME;
      localStorage.setItem(accessTokenName, response.data.access);
      localStorage.setItem(refreshTokenName, response.data.refresh);
      setLoggedIn(true);
      navigate("/");
    } catch (error) {
      seterrorMsg("Invalid Creadentials! Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Title>Login - Finance Dashboard</Title>
      <div className="container pt-5">
        <div className="row justify-content-center ">
          <div className="col-md-6 bg-light-dark p-5 rounded">
            <h3 className="text-center mb-4">Login</h3>
            {errorMsg && (
              <div className="alert alert-danger" role="alert">
                {errorMsg}
              </div>
            )}
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  required
                  minLength={8}
                  className="form-control"
                  placeholder="Password"
                  value={[password]}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {loading ? (
                <button
                  type="submit"
                  className="btn btn-info d-block mx-auto"
                  disabled
                >
                  Login ...
                </button>
              ) : (
                <button type="submit" className="btn btn-info d-block mx-auto">
                  Submit
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
