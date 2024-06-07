import axios from 'axios';
import axiosRetry from 'axios-retry';
import { API_URL } from './api.constants';

export const getContentType = () => ({
  'Content-Type': 'application/json'
});

export const axiosClassic = axios.create({
  baseURL: API_URL,
  headers: getContentType(),
  withCredentials: true,
});

axiosRetry(axiosClassic, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000; // время между повторными запросами
  },
  retryCondition: (error) => {
    return error.response.status === 503 || error.code === 'ECONNABORTED';
  }
});
