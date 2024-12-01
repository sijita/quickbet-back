import axios from 'axios';
import { API_URL } from './constants';

export const axiosClient = axios.create({
  baseURL: API_URL,
});

axiosClient.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${process.env.TMDB_API_KEY}`;

    return config;
  },
  (error) => Promise.reject(error),
);
