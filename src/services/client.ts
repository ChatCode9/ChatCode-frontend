import axios from 'axios';

// TODO: 설정 필요
const client = axios.create({
  baseURL: 'https://chatcode.store/',
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
});

export default client;
