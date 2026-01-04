import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// API helper fonksiyonları
export const api = {
  // Tüm kullanıcıları getir
  getUsers: async () => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  },

  // Tekil kullanıcı getir
  getUserById: async (id) => {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  },

  // Yeni kullanıcı ekle
  createUser: async (userData) => {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  },

  // Kullanıcı güncelle (bonus)
  updateUser: async (id, userData) => {
    const response = await axios.put(`${API_URL}/users/${id}`, userData);
    return response.data;
  },

  // Kullanıcı sil (bonus)
  deleteUser: async (id) => {
    const response = await axios.delete(`${API_URL}/users/${id}`);
    return response.data;
  }
};

