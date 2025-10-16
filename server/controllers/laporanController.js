const pool = require('../db');

// GET all laporan
exports.getAllLaporan = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT l.*, p.status AS status_presensi, p.waktu AS waktu_presensi, t.nama AS nama_tendik
            FROM Laporan l
            LEFT JOIN Presensi p ON l.id_presensi = p.id_presensi
            LEFT JOIN Tenaga_Kependidikan t ON p.id_tendik = t.id_tendik
            ORDER BY l.id_laporan ASC
        `);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET laporan by ID
exports.getLaporanById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`
            SELECT l.*, p.status AS status_presensi, p.waktu AS waktu_presensi, t.nama AS nama_tendik
            FROM Laporan l
            LEFT JOIN Presensi p ON l.id_presensi = p.id_presensi
            LEFT JOIN Tenaga_Kependidikan t ON p.id_tendik = t.id_tendik
            WHERE l.id_laporan = $1
        `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Laporan not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// CREATE a new laporan
exports.createLaporan = async (req, res) => {
    try {
        const { waktu_awal, waktu_akhir, id_presensi } = req.body;

        const result = await pool.query(
            `INSERT INTO Laporan (waktu_awal, waktu_akhir, id_presensi)
             VALUES ($1, $2, $3) RETURNING *`,
            [waktu_awal, waktu_akhir, id_presensi]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE a laporan
exports.updateLaporan = async (req, res) => {
    try {
        const { id } = req.params;
        const { waktu_awal, waktu_akhir, id_presensi } = req.body;

        const result = await pool.query(
            `UPDATE Laporan
             SET waktu_awal = $1, waktu_akhir = $2, id_presensi = $3
             WHERE id_laporan = $4 RETURNING *`,
            [waktu_awal, waktu_akhir, id_presensi, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Laporan not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE a laporan
exports.deleteLaporan = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM Laporan WHERE id_laporan = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Laporan not found' });
        }
        res.status(200).json({ message: 'Laporan deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};