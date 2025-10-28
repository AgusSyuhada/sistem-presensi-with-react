const pool = require('../db');
const geolib = require('geolib'); // Untuk menghitung jarak
require('dotenv').config();

// ============================================
// FUNGSI INTI: Melakukan Presensi (Sesuai SRS KF-SYS-01)
// ============================================
exports.createPresensi = async (req, res) => {
    try {
        const { face_descriptor, koordinat_lokasi } = req.body;

        if (!face_descriptor || !koordinat_lokasi) {
            return res.status(400).json({ error: 'Data face_descriptor dan koordinat_lokasi diperlukan.' });
        }

        // --- 1. Validasi Wajah (Face Recognition) ---
        // (Bagian ini tidak berubah)
        const allFacesResult = await pool.query('SELECT id_tendik, nama, data_wajah FROM Tenaga_Kependidikan WHERE data_wajah IS NOT NULL');
        
        if (allFacesResult.rows.length === 0) {
            return res.status(404).json({ error: 'Tidak ada data wajah terdaftar di sistem.' });
        }

        const getDistance = (descA, descB) => {
            let sum = 0;
            for (let i = 0; i < descA.length; i++) {
                sum += (descA[i] - descB[i]) ** 2;
            }
            return Math.sqrt(sum);
        };

        let bestMatch = null;
        let minDistance = 0.6; // Threshold.

        for (const tendik of allFacesResult.rows) {
            if (tendik.data_wajah && tendik.data_wajah.length === face_descriptor.length) {
                const distance = getDistance(face_descriptor, tendik.data_wajah);
                
                if (distance < minDistance) {
                    minDistance = distance;
                    bestMatch = tendik;
                }
            }
        }

        if (!bestMatch) {
            return res.status(401).json({ error: 'Wajah Tidak Terdaftar atau Tidak Dikenali.' });
        }
        
        const matchedTendikId = bestMatch.id_tendik;

        // ============================================
        // === PERUBAHAN DIMULAI DI SINI ===
        // ============================================

        // --- 2. Validasi Lokasi (Geofencing Poligon) ---
        const [lat, lng] = koordinat_lokasi.split(',').map(Number);

        // Koordinat user (ini tetap sama)
        const userCoords = {
            latitude: lat,
            longitude: lng
        };

        // Ambil poligon dari .env dan parse sebagai JSON
        const schoolPolygonString = process.env.SCHOOL_POLYGON_JSON;
        if (!schoolPolygonString) {
            return res.status(500).json({ error: 'Konfigurasi poligon sekolah tidak ditemukan di server.' });
        }

        // Konversi string poligon dari GeoJSON [lng, lat] ke format geolib [lat, lng]
        // Kita ambil [0] karena GeoJSON membungkus poligon di dalam array
        const schoolPolygonCoords = JSON.parse(schoolPolygonString)[0].map(coord => {
            // GeoJSON [lng, lat] -> geolib { latitude: lat, longitude: lng }
            return { latitude: coord[1], longitude: coord[0] }; 
        });

        // Cek apakah titik user berada di dalam poligon
        const isInside = geolib.isPointInPolygon(userCoords, schoolPolygonCoords);

        if (!isInside) {
            return res.status(403).json({ 
                error: 'Di luar lokasi yang diizinkan. Anda tidak berada di dalam area sekolah.'
            });
        }
        
        // ============================================
        // === PERUBAHAN SELESAI DI SINI ===
        // ============================================


        // --- 3. Logika Masuk / Pulang (Presensi 2x) ---
        // (Bagian ini tidak berubah)
        const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
        
        const presensiHariIni = await pool.query(
            "SELECT * FROM Presensi WHERE id_tendik = $1 AND DATE(waktu) = $2 ORDER BY waktu ASC",
            [matchedTendikId, today]
        );

        let statusPresensi;
        
        if (presensiHariIni.rows.length === 0) {
            statusPresensi = 'masuk';
        } else if (presensiHariIni.rows.length === 1 && presensiHariIni.rows[0].status === 'masuk') {
            statusPresensi = 'pulang';
        } else {
            return res.status(400).json({ error: 'Anda sudah melakukan presensi masuk dan pulang hari ini.' });
        }

        // --- 4. Simpan ke Database ---
        const newPresensi = await pool.query(
            "INSERT INTO Presensi (status, koordinat_lokasi, id_tendik) VALUES ($1, $2, $3) RETURNING *",
            [statusPresensi, koordinat_lokasi, matchedTendikId]
        );

        res.status(201).json({
            message: `Presensi '${statusPresensi}' berhasil!`,
            data: newPresensi.rows[0],
            tendik: {
                id: bestMatch.id_tendik,
                nama: bestMatch.nama
            },
            lokasi: {
                // 'distance' dihapus karena tidak relevan lagi
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

// UPDATE status by Admin (Sesuai SRS KF-ADM-02)
// (Bagian ini tidak berubah)
exports.updateStatusByAdmin = async (req, res) => {
    try {
        const { id_presensi } = req.params;
        const { status, catatan } = req.body; // status 'sakit' atau 'izin'

        if (status !== 'sakit' && status !== 'izin') {
            return res.status(400).json({ error: "Status hanya boleh 'sakit' atau 'izin'." });
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
        if (status !== 'sakit' && status !== 'izin') {
            return res.status(400).json({ error: "Status manual hanya boleh 'sakit' atau 'izin'." });
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