// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:4000/api"
// });

// api.interceptors.request.use((config) => {

//   const token = localStorage.getItem("token");

//   if(token){
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// }); 

// export default api;






import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true 
});

// Request interceptor runs before every request
api.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor runs after every response
// api.interceptors.response.use(

//   (response) => {
//     return response;
//   },

// (error) => {
//   console.log("Interceptor error:", error);

//   if (error.response) {
//     console.log("Status:", error.response.status);
//   }

//   if (error.response && error.response.status === 401) {
//     toast.error("Jwt token expired,need login to continue");
    
//     setTimeout(()=>{
//     localStorage.removeItem("token");
//       // window.location.href = "/login";
//       console.log("jwt expired");
//     },2000)
    
//   }

//   return Promise.reject(error);
// }

// );


// api.interceptors.response.use(
//   (response) => response,

//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const res = await axios.post(
//           "http://localhost:4000/api/auth/refresh",
//           {},
//           { withCredentials: true }
//         );
//        console.log("refresh token working correctly");
       
//         const newAccessToken = res.data.accessToken;

//         localStorage.setItem("token", newAccessToken);

//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

//         return api(originalRequest);

//       } catch (err) {
//         localStorage.removeItem("token");
//         window.location.href = "/login";
//       }
//     }

//     return Promise.reject(error);
//   }
// );


api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          "http://localhost:4000/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;

        localStorage.setItem("token", newAccessToken);

        // retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);

      } catch (err) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;

