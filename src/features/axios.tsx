import Axios from "axios";
import { AxiosRequestHeaders } from "axios";

interface AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

// Creating global axios instance
export const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

// Getting an existent instance of the user accessToken
const userToken = sessionStorage.getItem("accessToken");
console.log("user token for requests is " + userToken); 

// And intercepting it into the API requests within the global Axios object
function authRequestInterceptor(config: AxiosRequestConfig) {
  if (userToken) {
    console.log("global token is + " ,userToken)
    config.headers.authorization = `Bearer ${userToken}`;
  }
  return config;
}

// Use of the interceptor in all the requests
axios.interceptors.request.use(authRequestInterceptor);
