import axios, { AxiosInstance } from 'axios';
import { REQUEST_HEADER_AUTH_KEY, TOKEN_TYPE } from '../constants/app-constants';
import { IAxiosServiceBuilder } from './interfaces/axios-service-builder.interface';

class AxiosServiceBuilder implements IAxiosServiceBuilder {
  private ApiBaseUrl = '';
  private ApiCallTimeout = 0;

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

  public Build(): AxiosInstance {
    const axiosInstance = axios.create({
      timeout: this.ApiCallTimeout,
      baseURL: this.ApiBaseUrl,
    });

    axiosInstance.defaults.headers['Content-Type'] = 'application/json';

    axiosInstance.interceptors.request.use((config) => {
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE} ${accessToken}`;
      return config;
    });

    return axiosInstance;
  }
}

export default AxiosServiceBuilder;
