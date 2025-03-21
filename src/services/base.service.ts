import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import i18n from 'i18next';

export const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

class Services {
  axios: any;
  interceptors: null;

  constructor() {
    this.axios = axios;
    this.interceptors = null;
    this.axios.defaults.withCredentials = false;
  }

  saveLocalStorage(data: any) {
    const { token } = data;
    const dataSave = {
      token,
    };
    localStorage.setItem('user', JSON.stringify(dataSave));
  }

  clearLocalStorage() {
    localStorage.removeItem('user');
  }

  attachAcceptLanguageToHeader() {
    this.interceptors = this.axios.interceptors.request.use(
      function (config: any) {
        config.headers['Accept-Language'] = i18n.language.split('_')[0];
        return config;
      },
      function (error: any) {
        return Promise.reject(error);
      }
    );
  }

  attachTokenToHeader(token?: string) {
    if (!token) {
      token = localStorage.getItem('token') as string;
    }
    if (token) {
      this.interceptors = this.axios.interceptors.request.use(
        function (config: any) {
          config.headers.Authorization = `Bearer ${token}`;
          return config;
        },
        function (error: any) {
          return Promise.reject(error);
        }
      );
    }
  }

  removeInterceptors() {
    this.axios.interceptors.request.eject(this.interceptors);
  }

  handleResponse(response: AxiosResponse, error: AxiosError, isSuccess: boolean): Promise<AxiosResponse> {
    if (isSuccess) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(error.response);
    }
  }

  async get(url: string, config?: AxiosRequestConfig) {
    try {
      const response = await this.axios.get(url, config);
      return this.handleResponse(response, {} as AxiosError, true);
    } catch (error: any) {
      return this.handleResponse({} as AxiosResponse, error, false);
    }
  }

  async post(url: string, data?: any, config?: AxiosRequestConfig) {
    try {
      const response = await this.axios.post(url, data, config);
      return this.handleResponse(response, {} as AxiosError, true);
    } catch (error: any) {
      return this.handleResponse({} as AxiosResponse, error, false);
    }
  }

  async delete(url: string, config?: AxiosRequestConfig) {
    try {
      const response = await this.axios.delete(url, config);
      return this.handleResponse(response, {} as AxiosError, true);
    } catch (error: any) {
      return this.handleResponse({} as AxiosResponse, error, false);
    }
  }

  async put(url: string, data?: any, config?: AxiosRequestConfig) {
    try {
      const response = await this.axios.put(url, data, config);
      return this.handleResponse(response, {} as AxiosError, true);
    } catch (error: any) {
      return this.handleResponse({} as AxiosResponse, error, false);
    }
  }

  handleResponseStatus = (response?: AxiosResponse<any, any>) => {
    if (!response) return Promise.reject(response);
    if (response?.status >= 200 && response?.status < 300) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  };
}

export const HeaderUTF8Option = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-HTTP-Method-Override': 'GET',
  },
};

export default new Services();
