import axios from 'axios';

// TODO: 설정 필요
const client = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
