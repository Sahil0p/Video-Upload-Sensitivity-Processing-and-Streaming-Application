// import axios from "axios";

// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_URL,
//   });
  

// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response?.status === 401) {
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(err);
//   }
// );

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // ❌ DO NOT redirect here
      // Let AuthContext + routes handle auth state
      console.warn("401 received — handled by route guards");
    }
    return Promise.reject(error);
  }
);

export default api;
