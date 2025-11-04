const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const { FACE_SERVICE_URL } = require('../config/faceConfig');

const registerWajah = async (req, res) => {
    const { id_tendik } = req.body;
    const loggedInUserId = req.user.id;

    if (!id_tendik || id_tendik !== loggedInUserId) {
        if (req.file) fs.unlinkSync(req.file.path);
        return res.status(403).json({ 
            error: 'Akses ditolak. Anda hanya bisa mendaftarkan wajah Anda sendiri.' 
        });
    }

    if (!req.file) {
        return res.status(400).json({ error: 'Foto wajah wajib diunggah' });
    }

    const form = new FormData();
    form.append('id_tendik', id_tendik);
    form.append('file', fs.createReadStream(req.file.path));

    try {
        const response = await axios.post(`${FACE_SERVICE_URL}/register`, form, {
            headers: form.getHeaders(),
            timeout: 10000
        });

        fs.unlinkSync(req.file.path);
        res.json(response.data);
    } catch (err) {
        if (req.file) fs.unlinkSync(req.file.path);
        console.error('Face Register Error:', err.message);
        res.status(500).json({ 
            error: err.response?.data?.message || 'Gagal mendaftarkan wajah' 
        });
    }
};

const verifyPresensi = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Foto wajib diunggah' });
    }

    const form = new FormData();
    form.append('file', fs.createReadStream(req.file.path));

    try {
        const response = await axios.post(`${FACE_SERVICE_URL}/verify`, form, {
            headers: form.getHeaders(),
            timeout: 10000
        });

        fs.unlinkSync(req.file.path);

        if (response.data.verified) {
            res.json({
                success: true,
                message: "Presensi berhasil!",
                data: {
                    id_tendik: response.data.id_tendik,
                    nama: response.data.nama,
                    confidence: response.data.confidence
                }
            });
        } else {
            res.status(401).json({ 
                success: false, 
                message: response.data.message || 'Wajah tidak dikenali' 
            });
        }
    } catch (err) {
        if (req.file) fs.unlinkSync(req.file.path);
        console.error('Face Verify Error:', err.message);
        res.status(500).json({ 
            error: err.response?.data?.message || 'Gagal memverifikasi wajah' 
        });
    }
};

module.exports = { registerWajah, verifyPresensi };