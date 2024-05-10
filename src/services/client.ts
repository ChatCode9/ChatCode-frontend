import axios from 'axios';

// TODO: 설정 필요
const client = axios.create({
  baseURL: 'http://15.165.30.235:8080/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
