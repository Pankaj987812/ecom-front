import axios from 'axios';

const api = axios.create({
    baseURL: 'https://ecom-back-ziot.onrender.com',
});

export default api;