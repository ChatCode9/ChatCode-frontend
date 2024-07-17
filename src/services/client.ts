import axios from 'axios';

import { AXIOS_BASE_URL } from '../constants/api';
const token =
  'Bearer/u0020eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnb29nbGVfMTA1OTI2MTA5NjIyNzQ5ODk0MzA4IiwidXNlcklkIjo4LCJhdmF0YXJJZCI6OSwicm9sZSI6IlJPTEVfVVNFUiIsImV4cCI6MTcyMTIzMDY1Nn0.WnJgvktscWOW7PZBdRPMjiY9flTU3sQG9NgPX_BmfiJdHHcw96mSGl2aj-5ScZgdZPqxazSD_GTR3EXDv1kQKw';
const client = axios.create({
  baseURL: AXIOS_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${token}`,
  },
  withCredentials: true,
});

export default client;
