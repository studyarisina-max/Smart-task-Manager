import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = axios.create({

  baseURL: 'https://internship-11-ju1d.onrender.com/api',
  timeout: 10000, 
});

// Automatically add the token to every request
API.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
  } catch (err) {
    console.error("Token retrieval failed", err);
  }
  return config;
});

export default API;