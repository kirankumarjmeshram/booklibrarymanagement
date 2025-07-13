import axios from 'axios';

const instance = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL:"https://librarymanagementserver-07f5.onrender.com",
  withCredentials: true
});

export default instance;
