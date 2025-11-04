// front-end/src/data/authApi.js
const API_BASE = process.env.REACT_APP_API_BASE;

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
        const data = JSON.parse(text);

        // --- PERUBAHAN DI SINI ---
        // Backend hanya mengirim { token }, jadi kita validasi itu.
        if (!data.token) {
            throw new Error('Token tidak diterima dari server');
        }
        return data; // Mengembalikan { token }
        // --- AKHIR PERUBAHAN ---

    } catch (e) {
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
        // Ini akan mengembalikan { token }
        return handleResponse(response);
    },
};