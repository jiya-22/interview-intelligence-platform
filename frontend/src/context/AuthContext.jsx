import { useEffect, useState } from "react";
import apiRequest from "../services/api";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    if (!token) {
      return;
    }

    apiRequest("/api/v1/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((profile) => setUser(profile.data))
      .catch(() => {
        localStorage.removeItem("accessToken");
        setToken(null);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [token]);

  async function login(email, password) {
    setLoading(true);

    try {
      const data = await apiRequest("/api/v1/users/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      localStorage.setItem("accessToken", data.accessToken);

      setToken(data.accessToken);

      const profile = await apiRequest("/api/v1/users/me", {
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      });

      setUser(profile.data);

      return data;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await apiRequest("/api/v1/users/logout", {
        method: "POST",
      });
    } finally {
      localStorage.removeItem("accessToken");
      setToken(null);
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

