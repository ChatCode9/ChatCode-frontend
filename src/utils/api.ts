import axios from 'axios';

const API = axios.create({
  // baseURL: 'https//15.165.30.235:8080',
  baseURL: 'chatcode.store',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default API;
