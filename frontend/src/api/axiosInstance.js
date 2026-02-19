import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_API_BASEURL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

//Request interceptor to add token to headers
//Config is the request object
axiosInstance.interceptors.request.use(
  function (config) {
    const accessTokenName = import.meta.env.VITE_ACCESS_TOKEN_NAME;
    const accessToken = localStorage.getItem(accessTokenName);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

//Response interceptor to add refresh token logic
//if response is 401, try to get new access token using refresh token
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    const accessTokenName = import.meta.env.VITE_ACCESS_TOKEN_NAME;
    const refreshTokenName = import.meta.env.VITE_REFRESH_TOKEN_NAME;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshTokenName = import.meta.env.VITE_REFRESH_TOKEN_NAME;
      const refreshToken = localStorage.getItem(refreshTokenName);
      try {
        const response = await axiosInstance.post("/account/token/refresh/", {
          refresh: refreshToken,
        });

        localStorage.setItem(accessTokenName, response.data.access);
        originalRequest.headers["Authorization"] =
          `Bearer ${response.data.access}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        localStorage.removeItem(accessTokenName);
        localStorage.removeItem(refreshTokenName);
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
