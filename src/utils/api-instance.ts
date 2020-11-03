import axios, { AxiosRequestConfig } from 'axios';

export const serverApi = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });

serverApi.interceptors.request.use(config => {
  if (process.env.REACT_APP_API_DELAY) {
    return delayApiRequest(config);
  }
  return config;
});

async function delayApiRequest(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
  const delayMs = Number(process.env.REACT_APP_API_DELAY);
  return new Promise(resolve => setTimeout(() => resolve(config), delayMs));
}
