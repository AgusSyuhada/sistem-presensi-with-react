const pool = require('../db');
const geolib = require('geolib'); // Untuk menghitung jarak
require('dotenv').config();

// ============================================
// FUNGSI INTI: Melakukan Presensi (Sesuai SRS KF-SYS-01)
// ============================================
exports.createPresensi = async (req, res) => {
    try {
        // 1. Terima data dari useAttendanceController
        const { id_tendik, koordinat_lokasi } = req.body;

        // 2. Validasi input
        if (!id_tendik || !koordinat_lokasi) {
            return res.status(400).json({ error: 'ID Tendik dan koordinat lokasi diperlukan.' });
        }
        
        // 3. Verifikasi Wajah (SUDAH DILAKUKAN!)
        // Kita tidak perlu lagi memvalidasi wajah di sini.
        // Kita percaya bahwa 'id_tendik' yang dikirim valid
        // karena sudah diverifikasi oleh 'faceApi.verify' (Python)
        // sebelum fungsi ini dipanggil.

        const matchedTendikId = id_tendik;

        // 4. Validasi Lokasi (Geofencing Poligon)
        const [lat, lng] = koordinat_lokasi.split(',').map(Number);
        const userCoords = {
            latitude: lat,
            longitude: lng
        };

        const schoolPolygonString = process.env.SCHOOL_POLYGON_JSON;
        if (!schoolPolygonString) {
            return res.status(500).json({ error: 'Konfigurasi poligon sekolah tidak ditemukan di server.' });
        }
        
        const schoolPolygonCoords = JSON.parse(schoolPolygonString)[0].map(coord => {
            return { latitude: coord[1], longitude: coord[0] }; 
        });

        const isInside = geolib.isPointInPolygon(userCoords, schoolPolygonCoords);

        if (!isInside) {
            return res.status(403).json({ 
                error: 'Di luar lokasi yang diizinkan. Anda tidak berada di dalam area sekolah.'
            });
        }
        
        // 5. Logika Masuk / Pulang (Presensi 2x)
        const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
        
        const presensiHariIni = await pool.query(
            "SELECT * FROM Presensi WHERE id_tendik = $1 AND DATE(waktu) = $2 ORDER BY waktu ASC",
            [matchedTendikId, today]
        );

        let statusPresensi;
        
        if (presensiHariIni.rows.length === 0) {
            statusPresensi = 'Masuk';
        } else if (presensiHariIni.rows.length === 1 && presensiHariIni.rows[0].status === 'Masuk') {
            statusPresensi = 'Pulang';
        } else {
            return res.status(400).json({ error: 'Anda sudah melakukan presensi Masuk dan Pulang hari ini.' });
        }

        // 6. Simpan ke Database
        const newPresensi = await pool.query(
            "INSERT INTO Presensi (status, koordinat_lokasi, id_tendik) VALUES ($1, $2, $3) RETURNING *",
            [statusPresensi, koordinat_lokasi, matchedTendikId]
        );
        
        // Ambil nama untuk respons
        const tendikData = await pool.query("SELECT nama FROM Tenaga_Kependidikan WHERE id_tendik = $1", [matchedTendikId]);

        res.status(201).json({
            message: `Presensi '${statusPresensi}' berhasil!`,
            data: newPresensi.rows[0],
            tendik: {
                id: matchedTendikId,
                nama: tendikData.rows[0]?.nama || ''
            },
            lokasi: {
                diizinkan: true
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error saat melakukan presensi.' });
    }
};

// ============================================
// FUNGSI ADMIN: Mengelola Presensi
// ============================================

// GET all presensi (Untuk Admin)
// (Bagian ini tidak berubah)
exports.getAllPresensi = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT p.*, t.nama 
            FROM Presensi p
            JOIN Tenaga_Kependidikan t ON p.id_tendik = t.id_tendik
            ORDER BY p.waktu DESC
        `);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// presensiController.js (Tambahkan fungsi baru di akhir file, tanpa ubah yang lain)
exports.getPresensiByUserId = async (req, res) => {
    try {
        const { id_tendik } = req.params;

        const result = await pool.query(`
            SELECT p.*, t.nama 
            FROM Presensi p
            JOIN Tenaga_Kependidikan t ON p.id_tendik = t.id_tendik
            WHERE p.id_tendik = $1
            ORDER BY p.waktu DESC
        `, [id_tendik]);

        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE status by Admin (Sesuai SRS KF-ADM-02)
// (Bagian ini tidak berubah)
exports.updateStatusByAdmin = async (req, res) => {
    try {
        const { id_presensi } = req.params;
        const { status, catatan } = req.body; // status 'Sakit' atau 'Izin'

        if (status !== 'Sakit' && status !== 'Izin') {
            return res.status(400).json({ error: "Status hanya boleh 'Sakit' atau 'Izin'." });
        }

        const result = await pool.query(
            "UPDATE Presensi SET status = $1, catatan = $2 WHERE id_presensi = $3 RETURNING *",
            [status, catatan, id_presensi]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Data presensi tidak ditemukan.' });
        }

        res.status(200).json({
            message: `Status presensi berhasil diubah menjadi '${status}'.`,
            data: result.rows[0]
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// ============================================
// FUNGSI BARU (ADMIN): Membuat presensi manual (Sakit/Izin)
// ============================================
exports.createManualPresensiByAdmin = async (req, res) => {
    try {
        // 1. Ambil data dari body
        const { id_tendik, status, catatan, tanggal } = req.body;

        // 2. Validasi input
        if (!id_tendik || !status || !tanggal) {
            return res.status(400).json({ error: 'id_tendik, status, dan tanggal diperlukan.' });
        }
        if (status !== 'Sakit' && status !== 'Izin') {
            return res.status(400).json({ error: "Status manual hanya boleh 'Sakit' atau 'Izin'." });
        }

        // 3. Cek apakah sudah ada presensi untuk guru ini di tanggal ini
        const presensiAda = await pool.query(
            "SELECT * FROM Presensi WHERE id_tendik = $1 AND DATE(waktu) = $2",
            [id_tendik, tanggal]
        );

        if (presensiAda.rows.length > 0) {
            return res.status(409).json({ 
                error: 'Guru ini sudah memiliki data presensi di tanggal tersebut.',
                data: presensiAda.rows
            });
        }

        // 4. Buat data presensi baru
        // Kita set 'waktu' ke tanggal yang diberikan + jam 7 pagi (sebagai placeholder)
        const waktuPresensi = new Date(`${tanggal}T07:00:00`);

        const newPresensi = await pool.query(
            "INSERT INTO Presensi (id_tendik, status, catatan, waktu, koordinat_lokasi) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [id_tendik, status, catatan, waktuPresensi, 'MANUAL_INPUT']
        );

        res.status(201).json({
            message: `Presensi manual '${status}' berhasil dibuat.`,
            data: newPresensi.rows[0]
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error saat membuat presensi manual.' });
    }
};

// GET Laporan Presensi (Sesuai SRS KF-ADM-04)
// (Bagian ini tidak berubah)
exports.getLaporanPresensi = async (req, res) => {
    try {
        const { mulai, akhir } = req.query;

        if (!mulai || !akhir) {
            return res.status(400).json({ error: 'Parameter query ?mulai=YYYY-MM-DD&akhir=YYYY-MM-DD diperlukan.' });
        }

        const result = await pool.query(
            `SELECT p.id_presensi, p.waktu, p.status, p.catatan, p.koordinat_lokasi, t.id_tendik, t.nama, j.nama_jabatan
             FROM Presensi p
             JOIN Tenaga_Kependidikan t ON p.id_tendik = t.id_tendik
             JOIN Jabatan j ON t.id_jabatan = j.id_jabatan
             WHERE DATE(p.waktu) BETWEEN $1 AND $2
             ORDER BY t.nama, p.waktu ASC`,
            [mulai, akhir]
        );

        res.status(200).json(result.rows);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};