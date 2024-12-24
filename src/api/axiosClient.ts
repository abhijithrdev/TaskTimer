import axios from "axios";
import {
  deleteToken,
  getToken,
  saveToken,
  TOKEN_KEYS,
} from "../services/tokenStorage";

const BASE_URL = "https://mavehiringserver.azurewebsites.net";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(async (config) => {
  const accessToken = await getToken(TOKEN_KEYS.ACCESS);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = await getToken(TOKEN_KEYS.REFRESH);

      if (refreshToken) {
        try {
          const response = await axios.post(BASE_URL + "/api/auth/refresh", {
            refresh_token: refreshToken,
          });

          const { access_token, refresh_token } = response.data;

          await saveToken(TOKEN_KEYS.ACCESS, access_token);
          await saveToken(TOKEN_KEYS.REFRESH, refresh_token);

          error.config.headers.Authorization = `Bearer ${access_token}`;
          return axios.request(error.config);
        } catch (refreshError) {
          console.error("Failed to refresh token:", refreshError);

          await deleteToken(TOKEN_KEYS.ACCESS);
          await deleteToken(TOKEN_KEYS.REFRESH);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
