const pool = require('../db');

// GET all kunjungan
exports.getAllKunjungan = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Kunjungan ORDER BY waktu DESC');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET kunjungan by ID
exports.getKunjunganById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM Kunjungan WHERE id_kunjungan = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Kunjungan not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// CREATE a new kunjungan
exports.createKunjungan = async (req, res) => {
    try {
        const {
            nama_tamu,
            asal_instansi,
            tujuan,
            jenis_kelamin,
            gelar_depan,
            gelar_belakang,
            no_telp,
            foto
        } = req.body;

        const result = await pool.query(
            `INSERT INTO Kunjungan (
                nama_tamu, asal_instansi, tujuan, jenis_kelamin,
                gelar_depan, gelar_belakang, no_telp, foto
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [nama_tamu, asal_instansi, tujuan, jenis_kelamin, gelar_depan, gelar_belakang, no_telp, foto]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE a kunjungan
exports.updateKunjungan = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            nama_tamu,
            asal_instansi,
            tujuan,
            jenis_kelamin,
            gelar_depan,
            gelar_belakang,
            no_telp,
            foto
        } = req.body;

        const result = await pool.query(
            `UPDATE Kunjungan
             SET nama_tamu = $1, asal_instansi = $2, tujuan = $3, jenis_kelamin = $4,
                 gelar_depan = $5, gelar_belakang = $6, no_telp = $7, foto = $8
             WHERE id_kunjungan = $9 RETURNING *`,
            [nama_tamu, asal_instansi, tujuan, jenis_kelamin, gelar_depan, gelar_belakang, no_telp, foto, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Kunjungan not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE a kunjungan
exports.deleteKunjungan = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM Kunjungan WHERE id_kunjungan = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Kunjungan not found' });
        }
        res.status(200).json({ message: 'Kunjungan deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};