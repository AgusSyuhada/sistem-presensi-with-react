require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import routes
const jabatanRoutes = require('./routes/jabatanRoutes');
const tendikRoutes = require('./routes/tendikRoutes');
const presensiRoutes = require('./routes/presensiRoutes');
const laporanRoutes = require('./routes/laporanRoutes');
const kunjunganRoutes = require('./routes/kunjunganRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Gunakan routes
app.use('/api/jabatan', jabatanRoutes);
app.use('/api/tendik', tendikRoutes);
// Lakukan hal yang sama untuk routes lainnya...
app.use('/api/presensi', presensiRoutes);
app.use('/api/laporan', laporanRoutes);
app.use('/api/kunjungan', kunjunganRoutes);

// Endpoint dasar untuk cek server
app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the Presensi API!' });
});


app.listen(PORT, () => {
    console.log(`🚀 Server API berjalan di http://localhost:${PORT}`);
});