// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000",
// });

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // ❌ DO NOT redirect here
//       // Let AuthContext + routes handle auth state
//       console.warn("401 received — handled by route guards");
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;

// frontend/src/services/api.js

// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL, // ✅ dynamic (dev + prod)
//   withCredentials: true, // ✅ needed for auth + cookies
//   timeout: 15000,
// });

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Network / CORS / backend down
//     if (!error.response) {
//       console.error("🚨 Network error or server unreachable");
//       return Promise.reject(error);
//     }

//     // Auth errors
//     if (error.response.status === 401) {
//       console.warn("⚠️ Unauthorized – session expired or invalid credentials");
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;


import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 15000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (!err.response) {
      console.error("🚨 Network error or server unreachable");
    }
    return Promise.reject(err);
  }
);

export default api;
