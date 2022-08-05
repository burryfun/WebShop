import axios, { AxiosError } from "axios";
import { comparer, makeAutoObservable } from "mobx";
import { api } from "../api/api";
import { AuthService } from "../services/AuthService";

export default class Store {
  isAuth = false;

  errorStatus?= 0;
  errorMessage?= 'ErrorMesage';
  errorDescription?= 'ErrorDescription';

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response?.data.jwtToken);
      this.setAuth(true);
      return response;
    } catch (e) {
      const err = e as AxiosError<api.IAuthResponse>;
      this.handleError(err);
      return err;
    }
  }

  async register(email: string, password: string, confirmPassword: string) {
    try {
      const response = await AuthService.register(email, password, confirmPassword);
      return response;
    } catch (e) {
      const err = e as AxiosError<api.IAuthResponse>;
      this.handleError(err);
      return err;
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();

      if (response.status === 200) {
        localStorage.removeItem('token');
        this.setAuth(false);
      }

      return response;
    } catch (e) {
      const err = e as AxiosError<api.IAuthResponse>;
      this.handleError(err);
      return err;
    }

  }

  handleError(err: AxiosError<api.IAuthResponse>) {
    console.log(err);
    this.errorStatus = err.response?.status;
    this.errorMessage = err.message;
    this.errorDescription = err.response?.data.message;
  }

  async checkAuth() {
    const response = await axios.post<api.IAuthResponse>(`${api.API_URL}/refresh-token`, {}, { withCredentials: true });
    if (response.data.isSuccess) {
      localStorage.setItem('token', response.data.jwtToken);
      this.setAuth(true);
    }
  }
}