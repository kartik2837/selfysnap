
// import axios from 'axios';


// //  export const DEPLOYED_URL = "https://selfysnap-tqir.onrender.com"


//   export const DEPLOYED_URL = "http://localhost:8080"


// // export const DEPLOYED_URL = "https://selfy-1.onrender.com"

// // export const DEPLOYED_URL = "https://selfysnap-virid.vercel.app"

// // change api

// export const api = axios.create({
//   baseURL: DEPLOYED_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Attach JWT token from localStorage to every request if present
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('jwt');
//     if (token) {
//       config.headers = config.headers || {};
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );
















import axios from "axios";

// export const DEPLOYED_URL = "http://localhost:8080";
export const DEPLOYED_URL = "https://selfysnap-8zi6.onrender.com";


export const api = axios.create({
  baseURL: DEPLOYED_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, // 🔥 15 sec timeout
});

/* ═══════════════════════════════════════════════
   🔥 REQUEST INTERCEPTOR
   ═══════════════════════════════════════════════ */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ═══════════════════════════════════════════════
   🔥 RESPONSE INTERCEPTOR (retry + error handling)
   ═══════════════════════════════════════════════ */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    // 🔥 Retry on network error / 5xx (max 2 times)
    if (
      config &&
      !config._retry &&
      (!error.response || error.response.status >= 500)
    ) {
      config._retry = (config._retry || 0) + 1;
      if (config._retry <= 2) {
        await new Promise((r) => setTimeout(r, 500 * config._retry));
        return api(config);
      }
    }

    // 🔥 Auto logout on 401
    if (error.response?.status === 401) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("userRole");
    }

    return Promise.reject(error);
  }
);

export default api;
