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
export function useGlobalAxiosInstance(token: string) {
  useEffect(() => {
    function authRequestInterceptor(config: AxiosRequestConfig) {
      console.log("token used for requests is " + token);
      if (token) {
        console.log("global token is ", token);
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    }

    const requestInterceptor = axios.interceptors.request.use(
      authRequestInterceptor
    );

    return () => {
      // Clean up by ejecting the interceptor when the component unmounts
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [token]); // Run this effect only once, when the component mounts
}
