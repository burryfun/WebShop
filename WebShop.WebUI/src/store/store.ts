import axios, { AxiosError } from "axios";
import { makeAutoObservable } from "mobx";
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
      const token = response.data.jwtToken;
      const parsedToken:api.IJwt = api.parseToken(token);
      
      localStorage.setItem('tokenExpiry', (parsedToken.exp * 1000).toString());
      localStorage.setItem('token', token);
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
        localStorage.removeItem('tokenExpiry');
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
    const tokenExpiry = Number(localStorage.getItem('tokenExpiry'));
    if (tokenExpiry) {
      this.setAuth(true);
    }
    if (tokenExpiry - Date.now() <= 5000) {
      const response = await axios.post<api.IAuthResponse>(`${api.API_URL}/refresh-token`, {}, { withCredentials: true });
      if (response.data.isSuccess) {
        const token = response.data.jwtToken;
        const parsedToken: api.IJwt = api.parseToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpiry', (parsedToken.exp * 1000).toString());
        this.setAuth(true);
      }
      else {
        this.setAuth(false);
      }
    }
  }
}