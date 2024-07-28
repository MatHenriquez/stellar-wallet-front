import { AxiosInstance } from 'axios';
import AxiosServiceBuilder from '../axios-service-builder';

export interface IAxiosServiceBuilder {
  WithBaseUrl(baseUrl: string): AxiosServiceBuilder;
  WithTimeout(timeout: number): AxiosServiceBuilder;
  WithAccesToken(accessToken: string | null): AxiosServiceBuilder;
  Build(): AxiosInstance;
}
