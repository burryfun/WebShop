import { AxiosError } from "axios";
import { api } from "../api/api";

export class AuthService {

  static async login(email: string, password: string) {
    const response = api.$api.post<api.IAuthResponse>('/login', { email, password });
    return response;
  }

  static async register(email: string, password: string, confirmPassword: string) {
    const response = api.$api.post<api.IAuthResponse>('/register', { email, password, confirmPassword });
    return response;
  }

  static async logout() {
    const response = await api.$api.post('/logout');
    return response;
  }

}