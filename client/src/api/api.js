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

const api = axios.create({
  baseURL: "http://localhost:4000/api"
});

// REQUEST INTERCEPTOR
api.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// RESPONSE INTERCEPTOR
api.interceptors.response.use(

  (response) => {
    return response;
  },

  (error) => {

    if (error.response && error.response.status === 401) {

      // token expired or invalid
      localStorage.removeItem("token");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }

);

export default api;