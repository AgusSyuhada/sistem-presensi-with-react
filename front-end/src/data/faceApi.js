import axios from 'axios';

// 1. Ambil dari .env, BUKAN hardcode
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3001/api';

// Buat instance axios
const api = axios.create({
    // 2. Susun baseURL seperti di authApi.js (API_BASE + /presensi)
    baseURL: `${API_BASE}/face`,
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