import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  Keys,
  deleteLocalStorageKey,
} from '../components/authentication/common/utils/localStorage';

class FetchApi {
  private static instance: FetchApi;
  private setToken: (token: string) => void;
  private getToken: () => string;

  private constructor(
    setToken: (token: string) => void,
    getToken: () => string
  ) {
    this.setToken = setToken;
    this.getToken = getToken;

    // Intercept request and add necessary headers
    axios.interceptors.request.use((request) => {
      const accessToken = this.getToken();
      if (accessToken && accessToken !== '') {
        request.headers.Authorization = `Bearer ${accessToken}`;
      }
      return request;
    });

    // Intercept response and set access token
    axios.interceptors.response.use(
      (response) => {
        const accessToken = response.headers['authorization'];
        if (
          accessToken &&
          accessToken !== '' &&
          this.getToken() !== accessToken
        ) {
          console.log('accessToken: ', accessToken);
          console.log('getTOken: ', this.getToken());
          this.setToken(accessToken);
        }
        return response;
      },
      (error) => {
        if (error?.response?.status === 401) {
          deleteLocalStorageKey(Keys.SignedIn);
          window.location.replace('/signin?redirected=true');
        } else {
          throw error;
        }
      }
    );
  }

  static getInstance(
    setToken: (token: string) => void,
    getToken: () => string
  ) {
    if (!this.instance) {
      this.instance = new FetchApi(setToken, getToken);
    }
    return this.instance;
  }

  async get<T>(url: string) {
    return axios.get<any, AxiosResponse<T, any>, any>(url, { timeout: 5000 });
  }

  async post(url: string, data?: any, options?: AxiosRequestConfig<any>) {
    return axios.post(url, data, { ...options, timeout: 5000 });
  }
}

export default FetchApi;
