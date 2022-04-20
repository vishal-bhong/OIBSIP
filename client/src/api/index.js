import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const UserLogin = (formData) => API.post('/user/login', formData);
export const UserSignup = (formData) => API.post('/user/signup', formData);

export const AdminLogin = (formData) => API.post('/admin/login', formData);
export const AdminSignup = (formData) => API.post('/admin/signup', formData);
