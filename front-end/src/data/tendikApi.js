// front-end/src/data/tendikApi.js

import axios from 'axios';

// 1. Ambil dari .env, BUKAN hardcode
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3001/api'; 

// Buat instance axios
const api = axios.create({
    // 2. Susun baseURL seperti di authApi.js (API_BASE + /tendik)
    baseURL: `${API_BASE}/tendik`, 
});

// Interceptor untuk menambahkan token (meniru presensiApi.js)
// Ini diperlukan karena route GET / di tendikRoutes.js dilindungi 'protect'
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('presensi_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Interceptor response (meniru presensiApi.js)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('presensi_token');
            localStorage.removeItem('presensi_user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// 2. Ekspor fungsi API yang sesuai dengan tendikRoutes.js
export const tendikApi = {
    // GET /api/tendik (cocok dengan tendikController.getAllTendik)
    getAll: () => api.get('/').then(res => res.data),

    // GET /api/tendik/:id (cocok dengan tendikController.getTendikById)
    getById: (id) => api.get(`/${id}`).then(res => res.data),

    // POST /api/tendik (cocok dengan tendikController.createTendik)
    create: (data) => api.post('/', data).then(res => res.data),
    
    // PUT /api/tendik/:id (cocok dengan tendikController.updateTendik)
    update: (id, data) => api.put(`/${id}`, data).then(res => res.data),

    // DELETE /api/tendik/:id (cocok dengan tendikController.deleteTendik)
    delete: (id) => api.delete(`/${id}`).then(res => res.data),
};