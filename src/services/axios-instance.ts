import { appConfig } from '@/config/app-config';
import AxiosServiceBuilder from '../utils/axios-service-builder';
import { accessToken } from '@/constants/app-constants';

const axiosInstance = AxiosServiceBuilder.Create()
  .WithBaseUrl(appConfig.apiUrl)
  .WithTimeout(appConfig.apiTimeout)
  .WithAccesToken(accessToken())
  .Build();

export default axiosInstance;
