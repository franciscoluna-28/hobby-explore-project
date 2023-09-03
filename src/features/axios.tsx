import Axios from "axios";
import { AxiosRequestHeaders } from "axios";
import { useEffect } from "react";

interface AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

// Creating global axios instance
export function useGlobalAxiosInstance(token: string, onTokenExpired: () => void) {
  useEffect(() => {
    function authRequestInterceptor(config: AxiosRequestConfig) {
      console.log("token used for requests is " + token);
      if (token) {
        console.log("global token is ", token);
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    }

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Handle token expiration here
          console.log("Token expired. Logging out...");
          onTokenExpired();
        }
        return Promise.reject(error);
      }
    );

    const requestInterceptor = axios.interceptors.request.use(
      authRequestInterceptor
    );

    return () => {
      // Clean up by ejecting the interceptors when the component unmounts
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [token, onTokenExpired]); // Run this effect when token or onTokenExpired changes
}