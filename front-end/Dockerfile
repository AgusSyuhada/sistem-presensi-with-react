# ----- TAHAP 1: Build Aplikasi React (TETAP SAMA) -----
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Setel variabel build-time API Anda (Ini milik Anda & sudah benar)
ENV REACT_APP_API_BASE=/api

# Build aplikasi untuk produksi
RUN npm run build

# ----- TAHAP 2: Sajikan dengan Nginx (INI YANG DIMODIFIKASI) -----
FROM nginx:1.25-alpine

# Salin file build statis dari tahap 1
COPY --from=build /app/build /usr/share/nginx/html

# --- PERUBAHAN DIMULAI DI SINI ---

# 1. Hapus konfigurasi default Nginx
RUN rm /etc/nginx/conf.d/default.conf

# 2. Salin file nginx.conf kustom Anda (yang Anda buat di folder frontend)
#    ke dalam container Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# --- PERUBAHAN SELESAI ---

# Nginx berjalan di port 80
EXPOSE 80

# Perintah default Nginx
CMD ["nginx", "-g", "daemon off;"]