import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      username,
      email,
      password,
    };

    try {
      console.log("Registration:");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/register/",
        userData
      );
      setErrors({});
      setSuccessMessage(true);
      setEmail("");
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrors(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container pt-5">
      <div className="row justify-content-center ">
        <div className="col-md-6 bg-light-dark p-5 rounded">
          <h3 className="text-center mb-4">Create an Account</h3>
          {successMessage && (
            <div className="alert alert-success" role="alert">
              Registration successful! You can now log in.
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                required
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && (
                <div className="text-danger mt-1">{errors.username}</div>
              )}
            </div>
            <div className="mb-3">
              <input
                type="email"
                required
                className="form-control"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <div className="text-danger mt-1">{errors.email}</div>
              )}
            </div>
            <div className="mb-3">
              <input
                type="password"
                required
                minLength={8}
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <div className="text-danger mt-1">{errors.password}</div>
              )}
            </div>
            {loading ? (
              <button
                type="submit"
                className="btn btn-info d-block mx-auto"
                disabled
              >
                Please wait...
              </button>
            ) : (
              <button type="submit" className="btn btn-info d-block mx-auto">
                Register
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
