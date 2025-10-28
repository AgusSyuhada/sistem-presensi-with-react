const pool = require('../db');
const bcrypt = require('bcryptjs'); // Impor bcryptjs
const jwt = require('jsonwebtoken'); // Impor jsonwebtoken
require('dotenv').config(); // Impor dotenv untuk mengakses JWT_SECRET

// GET all tendik (Tetap sama)
exports.getAllTendik = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT t.*, j.nama_jabatan 
            FROM Tenaga_Kependidikan t
            LEFT JOIN Jabatan j ON t.id_jabatan = j.id_jabatan
            ORDER BY t.id_tendik ASC
        `);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET tendik by ID (Tetap sama)
exports.getTendikById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM Tenaga_Kependidikan WHERE id_tendik = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Tenaga Kependidikan not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ============================================
// PERBAIKAN 1: CREATE a new tendik (dengan Hashing Password)
// ============================================
exports.createTendik = async (req, res) => {
    try {
        // 1. Ambil semua data dari body, TERMASUK id_tendik (PEGID)
        const {
            id_tendik, // <-- Ditambahkan
            nama, email, password, id_jabatan, golongan, tanggal_masuk,
            gelar_depan, gelar_belakang, tempat_lahir, tanggal_lahir,
            agama, jenis_kelamin, pendidikan, status_tendik, no_telp, foto_profil
        } = req.body;

        // 2. Cek apakah tendik sudah ada
        const userExists = await pool.query('SELECT * FROM Tenaga_Kependidikan WHERE id_tendik = $1 OR email = $2', [id_tendik, email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: 'PEGID atau Email sudah terdaftar.' });
        }

        // 3. Hash password sebelum disimpan
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Simpan ke database
        const result = await pool.query(
            `INSERT INTO Tenaga_Kependidikan (
                id_tendik, nama, email, password, id_jabatan, golongan, tanggal_masuk, 
                gelar_depan, gelar_belakang, tempat_lahir, tanggal_lahir, 
                agama, jenis_kelamin, pendidikan, status_tendik, no_telp, foto_profil
             ) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) 
             RETURNING *`,
            [
                id_tendik, nama, email, hashedPassword, // <-- Gunakan hashedPassword
                id_jabatan, golongan, tanggal_masuk, 
                gelar_depan, gelar_belakang, tempat_lahir, tanggal_lahir, 
                agama, jenis_kelamin, pendidikan, status_tendik, no_telp, foto_profil
            ]
        );
        
        // Jangan kirim balik password hash di respons
        const newUser = result.rows[0];
        delete newUser.password; 

        res.status(201).json(newUser);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};


// ============================================
// FUNGSI BARU: Login Tendik (Sesuai SRS KF-GRU-01)
// ============================================
exports.loginTendik = async (req, res) => {
    try {
        // 1. Ambil id_tendik (PEGID) dan password dari body
        const { id_tendik, password } = req.body;

        // 2. Cari tendik di database berdasarkan id_tendik
        const result = await pool.query('SELECT * FROM Tenaga_Kependidikan WHERE id_tendik = $1', [id_tendik]);

        // 3. Cek apakah tendik ada
        if (result.rows.length === 0) {
            // Gunakan pesan error umum untuk keamanan
            return res.status(401).json({ error: 'PEGID atau Password salah.' });
        }
        
        const tendik = result.rows[0];

        // 4. Bandingkan password yang dikirim dengan hash di database
        const isMatch = await bcrypt.compare(password, tendik.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'PEGID atau Password salah.' });
        }

        // 5. Jika berhasil, buat JSON Web Token (JWT)
        const payload = {
            user: {
                id: tendik.id_tendik,
                nama: tendik.nama,
                // id_jabatan 1 = Operator, 2 = Staff (sesuai data dummy Anda)
                // Kita bisa gunakan ini untuk membedakan Admin (Operator) dan Guru (Staff)
                role: tendik.id_jabatan 
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }, // Token berlaku selama 1 jam
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ token });
            }
        );

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error saat login.' });
    }
};


// ============================================
// FUNGSI BARU: Registrasi Wajah (Sesuai SRS KF-GRU-03)
// ============================================
exports.registrasiWajah = async (req, res) => {
    try {
        // 1. Ambil face_descriptor dari body.
        // Frontend akan mengirim ini sebagai array angka.
        const { face_descriptor } = req.body;

        // 2. Ambil id_tendik dari user yang sedang login
        // (Ini didapat dari middleware 'protect' yang kita buat)
        const id_tendik = req.user.id;

        // 3. Cek apakah descriptor ada
        if (!face_descriptor || !Array.isArray(face_descriptor) || face_descriptor.length === 0) {
            return res.status(400).json({ error: 'Data face_descriptor tidak valid atau kosong.' });
        }

        // 4. Update kolom data_wajah di database
        // Tanda '$1' adalah untuk array descriptor, '$2' adalah untuk id_tendik
        const result = await pool.query(
            'UPDATE Tenaga_Kependidikan SET data_wajah = $1 WHERE id_tendik = $2 RETURNING id_tendik, nama, data_wajah',
            [face_descriptor, id_tendik]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User tidak ditemukan.' });
        }

        res.status(200).json({ 
            message: 'Registrasi wajah berhasil!',
            user: result.rows[0] 
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error saat registrasi wajah.' });
    }
};

// UPDATE a tendik (Tetap sama, tapi idealnya perlu diproteksi)
exports.updateTendik = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            nama, email, id_jabatan, golongan, tanggal_masuk,
            gelar_depan, gelar_belakang, tempat_lahir, tanggal_lahir,
            agama, jenis_kelamin, pendidikan, status_tendik, no_telp, foto_profil
        } = req.body;
        
        // Catatan: Fungsionalitas update password harus dibuat terpisah
        
        const result = await pool.query(
            `UPDATE Tenaga_Kependidikan SET 
             nama = $1, email = $2, id_jabatan = $3, golongan = $4, tanggal_masuk = $5, gelar_depan = $6, gelar_belakang = $7, tempat_lahir = $8, tanggal_lahir = $9, agama = $10, jenis_kelamin = $11, pendidikan = $12, status_tendik = $13, no_telp = $14, foto_profil = $15
             WHERE id_tendik = $16 RETURNING *`,
            [nama, email, id_jabatan, golongan, tanggal_masuk, gelar_depan, gelar_belakang, tempat_lahir, tanggal_lahir, agama, jenis_kelamin, pendidikan, status_tendik, no_telp, foto_profil, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Tenaga Kependidikan not found' });
        }
        
        const updatedUser = result.rows[0];
        delete updatedUser.password;

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE a tendik (Tetap sama, tapi idealnya perlu diproteksi)
exports.deleteTendik = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM Tenaga_Kependidikan WHERE id_tendik = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Tenaga Kependidikan not found' });
        }
        res.status(200).json({ message: 'Tenaga Kependidikan deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};