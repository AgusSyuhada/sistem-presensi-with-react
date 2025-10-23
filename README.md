# Sistem Presensi - Backend

Ini adalah layanan backend untuk aplikasi sistem presensi. Proyek ini dijalankan menggunakan Docker dan Docker Compose.

## Prasyarat 📋

Sebelum memulai, pastikan Anda telah menginstal dan menjalankan:

  * [Docker Desktop](https://www.docker.com/products/docker-desktop/) (yang sudah termasuk Docker Compose)

-----

## Cara Menjalankan 🚀

1.  **Pastikan Docker Berjalan:** Buka aplikasi Docker Desktop dan pastikan statusnya "Running" (berjalan).

2.  **Buka Terminal:** Buka terminal atau CMD Anda.

3.  **Masuk ke Direktori Proyek:** Arahkan terminal ke folder *root* backend ini (folder yang berisi file `docker-compose.yml`).

4.  **Jalankan Docker Compose:** Gunakan perintah berikut untuk membangun *image* dan menyalakan semua layanan (API & Database).

    ```bash
    docker-compose up --build
    ```

Setelah selesai, API Anda akan dapat diakses di `http://localhost:3001` dan database akan terekspos di port `5432`.

-----

## Cara Menghentikan 🛑

1.  **Buka Terminal:** Gunakan terminal yang sama atau buka terminal baru di direktori *root* proyek.

2.  **Jalankan Perintah Down:** Gunakan perintah berikut untuk menghentikan dan menghapus kontainer.

    ```bash
    docker-compose down -v
    ```

**Catatan Penting:**

  * Perintah `docker-compose down -v` akan menghentikan kontainer **DAN** menghapus *volume* (yaitu, semua data di dalam database `db_data` akan terhapus).
  * Jika Anda hanya ingin menghentikan kontainer **tanpa** menghapus data, gunakan perintah:
    ```bash
    docker-compose down
    ```