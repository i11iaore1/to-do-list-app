import axios from "axios";
import { ACCESS_TOKEN, API_URL } from "./constants";

export const createApi = (storedAs) => {
  const api = axios.create({
    baseURL: API_URL,
  });

  api.interceptors.request.use(
    (config) => {
      let token = null;
      if (storedAs === 1) {
        token = localStorage.getItem(ACCESS_TOKEN);
      } else {
        if (storedAs === 2) {
          token = sessionStorage.getItem(ACCESS_TOKEN);
        }
      }
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return api;
};

export default createApi;
