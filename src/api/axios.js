import axios from "axios";

// Use an explicit URL if provided, otherwise derive from the current host.
// Works on localhost, 192.168.x.x, or any LAN IP without a rebuild.
const baseURL =
  import.meta.env.VITE_API_URL ||
  `http://${window.location.hostname}:5000/api`;

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auto logout when JWT expires
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
    }

    return Promise.reject(error);
  }
);

export default api;