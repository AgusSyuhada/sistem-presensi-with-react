FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Install HANYA dependensi produksi
RUN npm install --production

COPY . .

EXPOSE 3001

# Jalankan aplikasi langsung, BUKAN 'npm run dev'
CMD ["node", "index.js"]