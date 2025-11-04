require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/test', express.static(path.join(__dirname, 'test')));

const jabatanRoutes = require('./routes/jabatanRoutes');
const tendikRoutes = require('./routes/tendikRoutes');
const presensiRoutes = require('./routes/presensiRoutes');
const kunjunganRoutes = require('./routes/kunjunganRoutes');
const faceRoutes = require('./routes/faceRoutes');

app.use('/api/jabatan', jabatanRoutes);
app.use('/api/tendik', tendikRoutes);
app.use('/api/presensi', presensiRoutes);
app.use('/api/kunjungan', kunjunganRoutes);
app.use('/api/face', faceRoutes);

app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the Presensi API!' });
});

app.listen(PORT, () => {
    console.log(`Server berjalan: http://localhost:${PORT}`);
});