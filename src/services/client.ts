import axios from 'axios';

// TODO: 설정 필요
const client = axios.create({
  baseURL: 'https://gusrl6394.myds.me:4001/',
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
});

export default client;
