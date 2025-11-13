// front-end/src/data/presensiApi.js

import axios from 'axios';

// 1. Ambil dari .env, BUKAN hardcode
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3001/api';

// Buat instance axios
const api = axios.create({
    // 2. Susun baseURL seperti di authApi.js (API_BASE + /presensi)
    baseURL: `${API_BASE}/presensi`,
});

// Interceptor untuk menambahkan token ke setiap request (jika protect middleware aktif)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('presensi_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Handle error global (opsional, untuk logging atau redirect jika 401)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token invalid/expired, logout dan redirect ke login
            localStorage.removeItem('presensi_token');
            localStorage.removeItem('presensi_user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const presensiApi = {
    // GET /api/presensi (untuk admin get all)
    getAll: () => api.get('/').then(res => res.data),

    // GET /api/presensi/user/:id_tendik (route baru untuk get by user ID)
    getByUserId: (id_tendik) => api.get(`/user/${id_tendik}`).then(res => res.data),

    // POST /api/presensi (untuk create presensi user)
    create: (data) => api.post('/', data).then(res => res.data),

    // PUT /api/presensi/:id_presensi (untuk update status by admin)
    updateStatus: (id_presensi, data) => api.put(`/${id_presensi}`, data).then(res => res.data),

    // DELETE /api/presensi/:id_presensi (untuk delete by admin, jika ditambahkan)
    // delete: (id_presensi) => api.delete(`/${id_presensi}`).then(res => res.data),

    // GET /api/presensi/laporan?mulai=...&akhir=... (untuk laporan)
    getLaporan: (mulai, akhir) => api.get(`/laporan?mulai=${mulai}&akhir=${akhir}`).then(res => res.data),

    // POST /api/presensi/manual (untuk manual by admin)
    createManual: (data) => api.post('/manual', data).then(res => res.data),
};