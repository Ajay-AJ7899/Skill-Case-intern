import apiClient from './axios';

export const getVideos = () => apiClient.get('/videos');

export const getVideoById = (id) => apiClient.get(`/videos/${id}`);

export const likeVideo = (id) => apiClient.post(`/videos/${id}/like`);

export const getComments = (id) => apiClient.get(`/videos/${id}/comments`);

export const postComment = (id, payload) =>
  apiClient.post(`/videos/${id}/comment`, payload);

export const bookmarkVideo = (id) => apiClient.post(`/videos/${id}/bookmark`);
