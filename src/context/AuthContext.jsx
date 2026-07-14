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
  const [loading, setLoading] = useState(true);

  /* ===========================================
     Logout
  =========================================== */
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      // Session may already be gone - clear locally regardless
    }

    localStorage.removeItem("user");

    setUser(null);

    toast("Logged out successfully.");

    navigate("/login");
  };

  /* ===========================================
     Load System Settings (Admin Only)
  =========================================== */
  const loadSystemSettings = async () => {
    try {
      const { data } = await api.get("/admin/settings");
      autoLogoutMinutes.current = data.data.autoLogout || 15;
    } catch (err) {
      autoLogoutMinutes.current = 15;
    }
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

  /* ===========================================
     Idle Timer
  =========================================== */
  const resetTimer = () => {
    clearTimeout(timer.current);

    timer.current = setTimeout(async () => {
      await logout();
    }, autoLogoutMinutes.current * 60 * 1000);
  };

  /* ===========================================
     Login
     The access token is set by the server as an
     HttpOnly cookie and is never stored in JS.
  =========================================== */
  const login = async (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);

    if (userData.role === "admin") {
      await loadSystemSettings();
    } else {
      loadUserSettings();
    }

    resetTimer();
  };

  /* ===========================================
     Initial Load
     Restore the session from the server, not from
     localStorage - the cookie is the source of truth.
  =========================================== */
  useEffect(() => {
    const initialize = async () => {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setLoading(false);
        return;
      }

      try {
        // Confirm the HttpOnly cookie is still valid
        const { data } = await api.get("/users/profile");

        const currentUser = data.data || JSON.parse(storedUser);

        setUser(currentUser);

        if (currentUser.role === "admin") {
          await loadSystemSettings();
        } else {
          loadUserSettings();
        }

        resetTimer();
      } catch (err) {
        // Cookie expired or absent - drop the stale local copy
        localStorage.removeItem("user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initialize();

    const events = ["keydown", "mousedown", "touchstart"];

    events.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    return () => {
      clearTimeout(timer.current);

      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
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
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);