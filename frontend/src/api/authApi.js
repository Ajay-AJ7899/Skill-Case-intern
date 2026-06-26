import apiClient from './axios';

export const register = (payload) => apiClient.post('/auth/register', payload);

export const login = (payload) => apiClient.post('/auth/login', payload);

export const getCurrentUser = () => apiClient.get('/auth/me');
