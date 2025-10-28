# 1. Gunakan image Node.js versi 18 yang ringan
FROM node:18-alpine

# 2. Tetapkan direktori kerja di dalam container
WORKDIR /app

# 3. Salin package.json dan package-lock.json
# Ini memanfaatkan caching Docker
COPY package*.json ./

# 4. Install semua dependensi
RUN npm install

# 5. Salin sisa kode aplikasi Anda
COPY . .

# 6. Jalankan server menggunakan nodemon
CMD ["npm", "run", "dev"]