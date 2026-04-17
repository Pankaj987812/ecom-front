import axios from 'axios';

const api = axios.create({
    baseURL: 'https://ecom-back-ziot.onrender.com/api',
});

export default api;