import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const timer = useRef(null);

  const [user, setUser] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    toast("Session expired due to inactivity.");

    navigate("/login");
  };

  const resetTimer = () => {
    clearTimeout(timer.current);

    const settings = JSON.parse(
      localStorage.getItem("settings") || "{}"
    );

    const minutes = settings.autoLogout || 15;

    timer.current = setTimeout(() => {
      if (localStorage.getItem("token")) {
        logout();
      }
    }, minutes * 60 * 1000);
  };

  const login = (arg1, arg2) => {
    if (typeof arg1 === "object") {
      localStorage.setItem(
        "user",
        JSON.stringify(arg1)
      );

      localStorage.setItem("token", arg2);

      setUser(arg1);

      resetTimer();

      return;
    }

    localStorage.setItem("token", arg1);

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    resetTimer();
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

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

    resetTimer();

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

export const useAuth = () => useContext(AuthContext);