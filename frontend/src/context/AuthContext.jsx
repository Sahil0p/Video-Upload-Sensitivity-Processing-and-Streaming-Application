// import { createContext, useEffect, useState } from "react";
// import axios from "../services/api";

// export const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("token"));

//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//     }
//   }, [token]);

//   const login = (data) => {
//     setUser(data.user);
//     setToken(data.token);
//     localStorage.setItem("token", data.token);
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("token");
//     delete axios.defaults.headers.common.Authorization;
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

import { createContext, useEffect, useState } from "react";
import axios from "../services/api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  // Attach token on load & refresh
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, [token]);

  const login = (data) => {
    setUser(data.user);
    setToken(data.token);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    delete axios.defaults.headers.common.Authorization;
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
