// front-end/src/data/authApi.js
const API_BASE = process.env.REACT_APP_API_BASE;

/**
 * Fungsi helper ini HANYA bertugas:
 * 1. Cek jika response.ok
 * 2. Parse text menjadi JSON
 * 3. Melempar error jika gagal
 */
const handleResponse = async (response) => {
    const text = await response.text();
    if (!response.ok) {
        let errorMsg = 'Terjadi kesalahan';
        try {
            const errorData = JSON.parse(text);
            errorMsg = errorData.error || errorMsg;
        } catch { }
        throw new Error(errorMsg);
    }

    if (!text) throw new Error('Respons kosong');

    try {
        // HANYA parse dan kembalikan. JANGAN validasi isi data di sini.
        const data = JSON.parse(text);
        return data;
    } catch (e) {
        // Ini HANYA akan error jika parsing-nya gagal
        throw new Error('Respons bukan JSON valid');
    }
};

export const authApi = {
    login: async (pegid, password) => {
        const response = await fetch(`${API_BASE}/tendik/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_tendik: pegid, password }),
        });
        
        // 1. Dapatkan data (yang seharusnya { token: "..." })
        const data = await handleResponse(response);

        // 2. Lakukan validasi SPESIFIK untuk login DI SINI
        if (!data.token) {
            throw new Error('Token tidak diterima dari server saat login');
        }
        
        // 3. Kembalikan data yang sudah divalidasi
        return data;
    },

    fetchProfile: async (id_tendik) => {
        const token = localStorage.getItem('presensi_token');
        
        const response = await fetch(`${API_BASE}/tendik/${id_tendik}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        
        // Panggil helper. Ini akan mengembalikan data profil
        // atau melempar error jika 401, 500, atau bukan JSON.
        // Tidak perlu validasi token lagi di sini.
        return handleResponse(response);
    }
};