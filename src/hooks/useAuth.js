import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth() {
  const API_BASE = import.meta.env.VITE_APP_API_BASE;
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/members/info`, {
          withCredentials: true,
        });

        if (res.status === 200) {
          setIsLogin(true);
        }
      } catch (error) {
        if (error.status == 401) {
          setIsLogin(false);
        }
      }
    };

    checkLogin();
  }, []);

  return isLogin;
}
