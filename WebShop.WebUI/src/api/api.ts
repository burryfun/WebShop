import axios, { AxiosError, AxiosResponse } from "axios";

export namespace api {

  export const API_URL = process.env.REACT_APP_API_URL

  export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
  })



  export const parseToken = (accessToken: string): any => {
    let payload = '';
    let tokenData = {};

    try {
      payload = accessToken.split('.')[1];
      tokenData = JSON.parse(atob(payload));
    } catch (e: any) {
      throw new Error(e);
    }
    return tokenData
  }

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
        const response = axios.post<api.IAuthResponse>(`${api.API_URL}/refresh-token`, {}, { withCredentials: true });
        const token = (await response).data.jwtToken;
        const parsedToken: IJwt = api.parseToken(token);

        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpiry', (parsedToken.exp * 1000).toString());

        if (!error.config?.headers) {
          throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
        }
        error.config.headers['Authorization'] = `Bearer ${token}`;
        return axios.request(error.config);
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

  export const deleteBrand = async (brandId: string) => {
    const response = await $api.delete(`/catalog?id=${brandId}`);
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


  export const getSmartphones = async (brandName: string, queryParameters?: IQueryParameters) => {
    if (queryParameters) {
      const response = await $api.get<ISmartphone[]>(`/catalog/${brandName}?PageNumber=${queryParameters.pageNumber}&PageSize=${queryParameters.pageSize}&SortBy=${queryParameters.sortBy}`);
      return response;
    } else {
      const response = await $api.get<ISmartphone[]>(`/catalog/${brandName}`);
      return response;
    }
  }

  export const postSmartphone = async (brandName: string, smartphone: ISmartphone) => {
    const response = await $api.post(`/catalog/${brandName}`, smartphone);
    return response.data;
  }

  export const deleteSmartphone = async (brandName: string, smartphoneId: string) => {
    const response = await $api.delete(`/catalog/${brandName}?SmartphoneId=${smartphoneId}`);
    return response.data;
  }

  export const updateSmartphone = async (brandName: string, smartphone: ISmartphone) => {
    const response = await $api.put(`/catalog/${brandName}`, smartphone);
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
  export const getCart = async (smartphonesId: string[]) => {
    const response = await $api.post<ICart[]>('/cart', { smartphonesId });
    return response.data;
  }

  export const checkout = async (request: ICheckoutRequest) => {
    try {
      const response = await $api.post<ICheckoutResponse[]>('/checkout', request);
      return response;
    } catch (e) {
      const err = e as AxiosError<api.IAuthResponse>;
      console.log(err);
      return err;
    }
  }

  export const getMyOrders = async () => {
    const response = await $api.get<IOrder[]>('/myorders');
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
    discount: number;
    amount?: number;
  }

  export interface IAuthResponse {
    isSuccess: boolean;
    message: string;
    jwtToken: string;
    refreshToken: string;
  }

  export interface ICart {
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

  export interface IOrder {
    phone: string;
    address: string;
    total: number;
    created: string;
    smartphones: ISmartphone[];
  }

  export interface IQueryParameters {
    pageNumber: number;
    pageSize: number;
    sortBy?: string;
  }

  export interface IJwt {
    exp: number;
    iat: string;
    id: string;
    nbf: string;
  }

}

