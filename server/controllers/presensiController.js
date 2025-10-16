const pool = require('../db');

// GET all presensi
exports.getAllPresensi = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT p.*, t.nama AS nama_tendik
            FROM Presensi p
            LEFT JOIN Tenaga_Kependidikan t ON p.id_tendik = t.id_tendik
            ORDER BY p.waktu DESC
        `);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET presensi by ID
exports.getPresensiById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`
            SELECT p.*, t.nama AS nama_tendik
            FROM Presensi p
            LEFT JOIN Tenaga_Kependidikan t ON p.id_tendik = t.id_tendik
            WHERE p.id_presensi = $1
        `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Presensi not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// CREATE a new presensi
exports.createPresensi = async (req, res) => {
    try {
        const { status, koordinat_lokasi, id_tendik } = req.body;

        // Validasi status
        if (!['masuk', 'pulang'].includes(status)) {
            return res.status(400).json({ error: "Status must be 'masuk' or 'pulang'" });
        }

        const result = await pool.query(
            `INSERT INTO Presensi (status, koordinat_lokasi, id_tendik)
             VALUES ($1, $2, $3) RETURNING *`,
            [status, koordinat_lokasi, id_tendik]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE a presensi
exports.updatePresensi = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, koordinat_lokasi, id_tendik } = req.body;

        if (!['masuk', 'pulang'].includes(status)) {
            return res.status(400).json({ error: "Status must be 'masuk' or 'pulang'" });
        }

        const result = await pool.query(
            `UPDATE Presensi
             SET status = $1, koordinat_lokasi = $2, id_tendik = $3
             WHERE id_presensi = $4 RETURNING *`,
            [status, koordinat_lokasi, id_tendik, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Presensi not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE a presensi
exports.deletePresensi = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM Presensi WHERE id_presensi = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Presensi not found' });
        }
        res.status(200).json({ message: 'Presensi deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};