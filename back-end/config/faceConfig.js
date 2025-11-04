require('dotenv').config();

const FACE_SERVICE_URL = process.env.FACE_SERVICE_URL;

if (!FACE_SERVICE_URL) {
    throw new Error('FACE_SERVICE_URL tidak dikonfigurasi di .env');
}

module.exports = {
    FACE_SERVICE_URL
};