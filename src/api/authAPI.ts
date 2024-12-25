import { saveToken, TOKEN_KEYS } from "../services/tokenStorage";
import apiClient from "./axiosClient";

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export const login = async (credentials: LoginCredentials): Promise<void> => {
  try {
    const response = await apiClient.post<LoginResponse>(
      "/api/auth/login",
      credentials
    );

    const { access_token, refresh_token } = response.data;
    await saveToken(TOKEN_KEYS.ACCESS, access_token);
    await saveToken(TOKEN_KEYS.REFRESH, refresh_token);

    console.log("Login successful!", response);
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
