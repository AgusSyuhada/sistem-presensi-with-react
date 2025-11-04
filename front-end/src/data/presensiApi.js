// Buat file baru: front-end/src/data/presensiApi.js
// (Mirip dengan authApi.js, asumsikan authApi sudah ada dan menggunakan axios)

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api/presensi'; // Sesuaikan dengan port backend Anda

// Buat instance axios dengan baseURL dan interceptor untuk autentikasi
const api = axios.create({
    baseURL: API_BASE_URL,
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