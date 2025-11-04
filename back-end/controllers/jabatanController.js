const pool = require('../db');

// GET all jabatan
exports.getAllJabatan = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Jabatan ORDER BY id_jabatan ASC');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET jabatan by ID
exports.getJabatanById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM Jabatan WHERE id_jabatan = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Jabatan not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// CREATE a new jabatan
exports.createJabatan = async (req, res) => {
    try {
        const { nama_jabatan } = req.body;
        const result = await pool.query(
            'INSERT INTO Jabatan (nama_jabatan) VALUES ($1) RETURNING *',
            [nama_jabatan]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE a jabatan
exports.updateJabatan = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama_jabatan } = req.body;
        const result = await pool.query(
            'UPDATE Jabatan SET nama_jabatan = $1 WHERE id_jabatan = $2 RETURNING *',
            [nama_jabatan, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Jabatan not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE a jabatan
exports.deleteJabatan = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM Jabatan WHERE id_jabatan = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Jabatan not found' });
        }
        res.status(200).json({ message: 'Jabatan deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};