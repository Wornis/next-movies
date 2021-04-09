import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.API_HOST,
  headers: { 'content-type': 'application/json' },
  responseType: 'json',
  withCredentials: true,
  params: {
    api_key: process.env.API_KEY,
  },
});

export default axiosInstance;
