import axios from 'axios';

// 1. Ambil dari .env, BUKAN hardcode
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3001/api';

// Buat instance axios
const api = axios.create({
    // 2. Susun baseURL seperti di authApi.js (API_BASE + /presensi)
    baseURL: `${API_BASE}/kunjungan`,
});

// Interceptor untuk menambahkan token (untuk route admin)
api.interceptors.request.use((config) => {
    // Hanya tambahkan token jika BUKAN request public 'POST'
    if (config.method !== 'post') {
        const token = localStorage.getItem('presensi_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const kunjunganApi = {
    /**
     * POST /api/kunjungan (Publik, tanpa token)
     * Digunakan oleh VisitForm.js
     */
    create: (data) => api.post('/', data).then(res => res.data),

    /**
     * GET /api/kunjungan (Admin, butuh token)
     */
    getAll: () => api.get('/').then(res => res.data),

    /**
     * GET /api/kunjungan/:id (Admin, butuh token)
     */
    getById: (id) => api.get(`/${id}`).then(res => res.data),

    /**
     * DELETE /api/kunjungan/:id (Admin, butuh token)
     */
    delete: (id) => api.delete(`/${id}`).then(res => res.data),
};