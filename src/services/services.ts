import axios, { AxiosResponse, AxiosInstance } from 'axios';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { env } from '../environment/env';
import RequestException from '../models/RequestException';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: env.app.url,
});

axiosInstance.interceptors.request.use(
  (config) => {
    nprogress.start();
    if (localStorage.getItem('jwtSecurityToken')) {
      config.headers.Authorization = localStorage.getItem('jwtSecurityToken');
    }
    return config;
  },
  (error) => {
    nprogress.done();
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    nprogress.done();
    return response;
  },
  (error: RequestException) => {
    nprogress.done();
    return Promise.reject(handleResponseWithError(error));
  }
);

function handleResponseWithError(error: RequestException): RequestException {
  if (error.response) {
    if (error.response.status === 401) {
      setTimeout(() => {
        localStorage.clear();
        window.location.reload();
      }, 3000);
    } else if (error.response.status === 403) {
      error.response.data.message =
        'Seu usuário não possui permissão de acesso a esta rotina.';
    }
  }

  return error;
}

export interface DefaultResponse {
  thisPage: number;
  lastPage: number;
  totalRecords: number;
  records: any[];
}

const API = {
  get<T>(endpoint: string): Promise<AxiosResponse<T>> {
    return axiosInstance.get<T>(endpoint);
  },
  post(endpoint: string, payload: any): Promise<AxiosResponse<any>> {
    return axiosInstance.post(endpoint, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  delete(endpoint: string, id: number): Promise<AxiosResponse<any>> {
    return axiosInstance.delete(`${endpoint}/${id}`);
  },
  put(endpoint: string, payload: any): Promise<AxiosResponse<any>> {
    return axiosInstance.put(endpoint, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  all(requests: any[]): Promise<any[]> {
    return Promise.all(requests);
  },
};

export default API;
