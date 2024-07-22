import axios from 'axios';

import { AXIOS_BASE_URL } from '../constants/api';

const token = '';
const client = axios.create({
  baseURL: AXIOS_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${token}`,
  },
  withCredentials: true,
});

export default client;
