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
      } catch (e) {
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

  export const postBrand = async (brand: IBrand) => {
    const response = await $api.post('/catalog', brand);
    return response.data;
  }

  export const postBrandImage = async (brandImage: IImage) => {
    const response = await $api.post('/images', brandImage, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }


  export const getSmartphones = async (brandName: string) => {
    const response = await $api.get<ISmartphone[]>(`/catalog/${brandName}`);
    return response.data;
  }

  export const postSmartphone = async (brandName: string, smartphone: ISmartphone) => {
    const response = await $api.post(`/catalog/${brandName}`, smartphone);
    return response.data;
  }
  
  export const postSmartphoneImage = async (brandName: string, smartphoneImage: IImage) => {
    const response = await $api.post(`/images/${brandName}`, smartphoneImage, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }


  // Cart requests
  export const getCart = async (smartphonesId:string[]) => {
    const response = await $api.post<ICartResponse[]>('/cart', {smartphonesId});
    return response.data;
  }

  export const checkout = async (request:ICheckoutRequest) => {
    const response = await $api.post<ICheckoutResponse[]>('/checkout', request);
    return response.data;
  }

  // MODELS
  export interface IBrand {
    id: string;
    name: string;
    smartphones?: ISmartphone[];
  }

  export interface ISmartphone {
    id: string;
    name: string;
    description: string;
    price: number;
  }

  export interface IAuthResponse {
    isSuccess: boolean;
    message: string;
    jwtToken: string;
    refreshToken: string;
  }

  export interface ICartResponse {
    smartphoneId: string;
    smartphoneName: string;
    smartphonePrice: number;
    brandName: string;
  }

  export interface ICheckoutRequest {
    phone: string;
    address: string;
    total: number;
    smartphonesId: string[];
  }

  export interface ICheckoutResponse {
    isSuccess: boolean;
    message: string;
    smartphones: ISmartphone[];
  }

  export interface IImage {
    name?: string;
    image?: File;
  }
}

