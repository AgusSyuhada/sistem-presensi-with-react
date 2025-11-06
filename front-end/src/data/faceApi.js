// front-end/src/data/faceApi.js
import axios from 'axios';

// Dapatkan /api dari .env
const API_BASE = process.env.REACT_APP_API_BASE;

// Buat instance axios baru khusus untuk /face
const api = axios.create({
    baseURL: `${API_BASE}/face` // -> http://localhost:3000/api/face
});

// Interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('presensi_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const faceApi = {
    /**
     * @param {FormData} formData - Harus berisi 'id_tendik' dan 'foto' (file blob)
     */
    register: (formData) => {
        return api.post('/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

/**
     * @param {FormData} formData - Harus berisi 'foto' (file blob)
     */
    verify: (formData) => {
        return api.post('/verify', formData);
    }
};