import axios from 'axios';

import { AXIOS_BASE_URL } from '../constants/api';

const client = axios.create({
  baseURL: AXIOS_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default client;
