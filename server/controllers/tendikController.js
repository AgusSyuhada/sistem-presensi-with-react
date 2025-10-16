const pool = require('../db');

// GET all tendik
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

// GET tendik by ID
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

// CREATE a new tendik
exports.createTendik = async (req, res) => {
    try {
        const {
            nama, email, password, id_jabatan, golongan, tanggal_masuk,
            gelar_depan, gelar_belakang, tempat_lahir, tanggal_lahir,
            agama, jenis_kelamin, pendidikan, status_tendik, no_telp, foto_profil
        } = req.body;
        // Note: In a real app, hash the password before saving!
        const result = await pool.query(
            `INSERT INTO Tenaga_Kependidikan (nama, email, password, id_jabatan, golongan, tanggal_masuk, gelar_depan, gelar_belakang, tempat_lahir, tanggal_lahir, agama, jenis_kelamin, pendidikan, status_tendik, no_telp, foto_profil) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *`,
            [nama, email, password, id_jabatan, golongan, tanggal_masuk, gelar_depan, gelar_belakang, tempat_lahir, tanggal_lahir, agama, jenis_kelamin, pendidikan, status_tendik, no_telp, foto_profil]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE a tendik
exports.updateTendik = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            nama, email, id_jabatan, golongan, tanggal_masuk,
            gelar_depan, gelar_belakang, tempat_lahir, tanggal_lahir,
            agama, jenis_kelamin, pendidikan, status_tendik, no_telp, foto_profil
        } = req.body;
        const result = await pool.query(
            `UPDATE Tenaga_Kependidikan SET 
             nama = $1, email = $2, id_jabatan = $3, golongan = $4, tanggal_masuk = $5, gelar_depan = $6, gelar_belakang = $7, tempat_lahir = $8, tanggal_lahir = $9, agama = $10, jenis_kelamin = $11, pendidikan = $12, status_tendik = $13, no_telp = $14, foto_profil = $15
             WHERE id_tendik = $16 RETURNING *`,
            [nama, email, id_jabatan, golongan, tanggal_masuk, gelar_depan, gelar_belakang, tempat_lahir, tanggal_lahir, agama, jenis_kelamin, pendidikan, status_tendik, no_telp, foto_profil, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Tenaga Kependidikan not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE a tendik
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