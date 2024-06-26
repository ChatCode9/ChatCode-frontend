import axios from 'axios';

const client = axios.create({
  baseURL: 'https://chatcode.store/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer/u0020eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnb29nbGVfMTA1OTI2MTA5NjIyNzQ5ODk0MzA4IiwidXNlcklkIjo4LCJhdmF0YXJJZCI6OSwicm9sZSI6IlJPTEVfVVNFUiIsImV4cCI6MTcxOTQwODU1OH0.JmlZ4X1aNIW5xc3AU9X40_b7xV-w-BN8WHLNF3-kdNaAmyIpQvOcxVIbRjgVdJuEgoVUKrwEp58epQPooT0OiA`,
  },
  withCredentials: true,
});

export default client;
