import axios from 'axios';

// Sesuaikan dengan port backend Anda
const API_BASE_URL = process.env.REACT_APP_API_BASE || 'http://localhost:3000/api';

// Buat instance axios khusus untuk /kunjungan
const api = axios.create({
    baseURL: `${API_BASE_URL}/kunjungan`
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