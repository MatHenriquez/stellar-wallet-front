import axios, { AxiosInstance } from 'axios';
import { REQUEST_HEADER_AUTH_KEY, TOKEN_TYPE } from '../constants/app-constants';
import { IAxiosServiceBuilder } from './interfaces/axios-service-builder.interface';

class AxiosServiceBuilder implements IAxiosServiceBuilder {
  private ApiBaseUrl = '';
  private ApiCallTimeout = 0;
  private AccessToken: string | null = '';

  public static Create() {
    return new AxiosServiceBuilder();
  }

  public WithBaseUrl(baseUrl: string) {
    this.ApiBaseUrl = baseUrl;
    return this;
  }

  public WithTimeout(timeout: number) {
    this.ApiCallTimeout = timeout;
    return this;
  }

  public WithAccesToken(accessToken: string | null) {
    this.AccessToken = accessToken;
    return this;
  }

  public Build(): AxiosInstance {
    const axiosInstance = axios.create({
      timeout: this.ApiCallTimeout,
      baseURL: this.ApiBaseUrl,
    });

    if (this.AccessToken) {
      axiosInstance.interceptors.request.use((config) => {
        config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE} ${this.AccessToken}`;
        return config;
      });
    }

    return axiosInstance;
  }
}

export default AxiosServiceBuilder;
