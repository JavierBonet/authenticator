import { UserLogin, UserRegister } from '../components/authentication/types';
import { config } from '../config';
import axios from 'axios';
import FetchApì from './fetchApi';

const baseUrl = `${config.backendUrl}/api/v1`;

axios.defaults.withCredentials = true;

class AuthenticationApi {
  private fetchApi: FetchApì;

  constructor(setToken: (token: string) => void, getToken: () => string) {
    this.fetchApi = FetchApì.getInstance(setToken, getToken);
  }

  async register(
    user: UserRegister
  ): Promise<{ success: boolean; message: string }> {
    const { passwordConfirmation, ...body } = user;

    return this.fetchApi
      .post(`${baseUrl}/register`, body)
      .then((response) => {
        return {
          success: true,
          message: response.data.message as string,
        };
      })
      .catch((error) => {
        return {
          success: false,
          message: error.response.data.message as string,
        };
      });
  }

  async login(
    user: UserLogin
  ): Promise<{ success: boolean; message: string; accessToken?: string }> {
    return this.fetchApi
      .post(`${baseUrl}/login`, user)
      .then((response) => {
        return {
          success: true,
          message: response.data.message as string,
          accessToken: response.headers['authorization'] as string,
        };
      })
      .catch((error) => {
        return {
          success: false,
          message: error.response.data.message as string,
        };
      });
  }

  async logout(): Promise<{
    message: string;
  }> {
    return this.fetchApi
      .post(`${baseUrl}/logout`)
      .then((response) => ({ message: response.data.message as string }))
      .catch((error) => ({ message: error.response.data.message as string }));
  }

  async refreshAccessToken() {
    return this.fetchApi.get(`${baseUrl}/refresh-access-token`);
  }
}

export default AuthenticationApi;
