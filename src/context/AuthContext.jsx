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

  
    //  Logout
 const logout = async () => {
   console.log("Logout called");
  try {
    await api.post("/auth/logout");
  } catch (err) {
    console.error(err);
  }

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  setUser(null);

  toast("Logged out successfully.");

  navigate("/login");
};
    //  Load System Settings (Admin Only)
  const loadSystemSettings = async () => {
    try {
      const { data } = await api.get("/admin/settings");

      autoLogoutMinutes.current =
        data.data.autoLogout || 15;

    } catch (err) {
      console.error(err);

      autoLogoutMinutes.current = 15;
    }
  };

  //  Reset Timer

const resetTimer = () => {
  clearTimeout(timer.current);

  timer.current = setTimeout(async () => {
    await logout();
  }, autoLogoutMinutes.current * 60 * 1000);
};

const loadUserSettings = () => {
  const saved = localStorage.getItem("settings");

  if (saved) {
    const settings = JSON.parse(saved);
    autoLogoutMinutes.current = settings.autoLogout || 15;
  } else {
    autoLogoutMinutes.current = 15;
  }
};
    //  Login
  
  const login = async (userData, token) => {
    localStorage.setItem("token", token);

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);

    if (userData.role === "admin") {
  await loadSystemSettings();
} else {
  loadUserSettings();
}
     console.log("Timer started:", autoLogoutMinutes.current);

    resetTimer();
  };
    //  Initial Load
  useEffect(() => {
    const initialize = async () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        setUser(parsedUser);

        if (parsedUser.role === "admin") {
          await loadSystemSettings();
        } else {
          loadUserSettings();
        }

        resetTimer();
      }
    };

    initialize();

    const events = [
  "keydown",
  "mousedown",
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
    resetTimer,
    isAuthenticated: !!user,
  }}
>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);