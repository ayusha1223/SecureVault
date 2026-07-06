import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const timer = useRef(null);
  const autoLogoutMinutes = useRef(15);

  const [user, setUser] = useState(null);

  /* ===========================================
     Logout
  =========================================== */

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    toast("Session expired due to inactivity.");

    navigate("/login");
  };

  /* ===========================================
     Load System Settings
  =========================================== */

const loadSystemSettings = async () => {
  try {
    const { data } = await api.get("/admin/settings");

    console.log("SETTINGS FROM SERVER");
    console.log(data);

    autoLogoutMinutes.current =
      data.data.autoLogout || 15;

    console.log(
      "AUTO LOGOUT:",
      autoLogoutMinutes.current
    );
  } catch (err) {
    console.error(err);

    autoLogoutMinutes.current = 15;
  }
};

  /* ===========================================
     Reset Timer
  =========================================== */

const resetTimer = () => {
  clearTimeout(timer.current);

  console.log("RESET:", new Date().toLocaleTimeString());

  timer.current = setTimeout(() => {
    console.log("LOGGING OUT");

    logout();
  }, autoLogoutMinutes.current * 60 * 1000);
};
  /* ===========================================
     Login
  =========================================== */

  const login = async (userData, token) => {
    localStorage.setItem("token", token);

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);

    await loadSystemSettings();

    resetTimer();
  };

  /* ===========================================
     Initial Load
  =========================================== */

  useEffect(() => {
    const initialize = async () => {
      const storedUser =
        localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));

       if (userData.role === "admin") {
  await loadSystemSettings();
} else {
  autoLogoutMinutes.current = 15;
}

resetTimer();
      }
    };

    initialize();

    const events = [
      "mousemove",
      "keydown",
      "mousedown",
      "scroll",
      "touchstart",
    ];

    events.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    return () => {
      clearTimeout(timer.current);

      events.forEach((event) =>
        window.removeEventListener(
          event,
          resetTimer
        )
      );
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);