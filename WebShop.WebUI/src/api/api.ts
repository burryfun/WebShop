import axios, { AxiosError, AxiosResponse } from "axios";

export namespace api {

  export const API_URL = process.env.REACT_APP_API_URL

  export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
  })
  
  $api.interceptors.request.use((config) => {
    if (!config?.headers) {
      throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  })

  $api.interceptors.response.use((config) => {
    return config;
  }, async (err) => {
    const error = err as AxiosError;
    const originalRequest = err.config;
    if (error.response?.status == 401 && error.config && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.post<api.IAuthResponse>(`${api.API_URL}/refresh-token`, {}, { withCredentials: true });
        localStorage.setItem('token', response.data.jwtToken);
      } catch(e) {
        console.log('NOT AUTHORIZED');
      }
    }
    throw err;
  })
  
  // REST REQUESTS
  
  export const getBrands = async () => {
    const response = await $api.get<IBrand[]>('/catalog');
    return response.data;
  }
  
  // MODELS
  export interface IBrand {
    id: string;
    name: string;
    smartphones: ISmartphone[];
  }
  
  export interface ISmartphone {
    id:	string;
    name:	string;
    description: string;
    price: number;
  }

  export interface IAuthResponse {
    isSuccess: boolean;
    message: string;
    jwtToken: string;
    refreshToken: string;
  }

}

