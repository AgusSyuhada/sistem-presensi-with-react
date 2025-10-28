-- Hapus tabel Laporan jika sudah ada
DROP TABLE IF EXISTS Laporan;

-- Hapus tipe ENUM jika sudah ada (untuk development)
DROP TYPE IF EXISTS status_presensi;

-- ============================================
-- SKEMA DATABASE (PERBAIKAN)
-- ============================================

-- Membuat Tipe ENUM untuk status
CREATE TYPE status_presensi AS ENUM ('masuk', 'pulang', 'sakit', 'izin');

-- Membuat Tabel Jabatan
CREATE TABLE Jabatan (
    id_jabatan SERIAL PRIMARY KEY,
    nama_jabatan VARCHAR(50) NOT NULL
);

-- Membuat Tabel Tenaga Kependidikan (DENGAN TAMBAHAN data_wajah)
CREATE TABLE Tenaga_Kependidikan (
    id_tendik VARCHAR(20) PRIMARY KEY, -- Sesuai revisi Anda (PEG ID)
    nama VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    id_jabatan INT,
    golongan VARCHAR(20),
    tanggal_masuk DATE,
    gelar_depan VARCHAR(50),
    gelar_belakang VARCHAR(50),
    tempat_lahir VARCHAR(50),
    tanggal_lahir DATE,
    agama VARCHAR(20),
    jenis_kelamin VARCHAR(20),
    pendidikan VARCHAR(10),
    status_tendik VARCHAR(20),
    no_telp VARCHAR(20),
    foto_profil VARCHAR(255),
    data_wajah REAL[] NULL,  -- <-- PERBAIKAN 1: Untuk Face Recognition Vector
    FOREIGN KEY (id_jabatan) REFERENCES Jabatan(id_jabatan) ON DELETE SET NULL
);

-- Membuat Tabel Presensi (DENGAN TIPE ENUM dan kolom catatan)
CREATE TABLE Presensi (
    id_presensi SERIAL PRIMARY KEY,
    waktu TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status status_presensi NOT NULL, -- <-- PERBAIKAN 3: Menggunakan ENUM
    koordinat_lokasi VARCHAR(255),
    catatan VARCHAR(255) NULL,    -- <-- PERBAIKAN 2: Untuk Admin (Sakit/Izin)
    id_tendik VARCHAR(20),        -- Sesuai revisi Anda (PEG ID)
    FOREIGN KEY (id_tendik) REFERENCES Tenaga_Kependidikan(id_tendik) ON DELETE CASCADE
);

-- Membuat Tabel Kunjungan (Tamu)
CREATE TABLE Kunjungan (
    id_kunjungan SERIAL PRIMARY KEY,
    nama_tamu VARCHAR(255) NOT NULL,
    asal_instansi VARCHAR(255),
    tujuan VARCHAR(100),
    waktu TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    jenis_kelamin VARCHAR(20),
    gelar_depan VARCHAR(50),
    gelar_belakang VARCHAR(50),
    no_telp VARCHAR(20),
    foto VARCHAR(255)
);


-- ============================================
-- INSERT DATA DUMMY (DISESUAIKAN)
-- ============================================

-- INSERT DATA JABATAN
INSERT INTO Jabatan (nama_jabatan) VALUES 
('Operator'),
('Staff');


-- INSERT DATA TENAGA KEPENDIDIKAN (Kolom data_wajah diisi NULL)
INSERT INTO Tenaga_Kependidikan (
    id_tendik, nama, email, "password", id_jabatan, golongan, tanggal_masuk,
    gelar_depan, gelar_belakang, tempat_lahir, tanggal_lahir,
    agama, jenis_kelamin, pendidikan, status_tendik, no_telp, foto_profil, data_wajah
) VALUES 
('20157483926104', 'Ahmad Hidayat', 'ahmad.hidayat@example.com', '$2a$10$dummyhash1', 1, 'III/a', '2020-01-15', 'Drs.', 'M.Pd', 'Jakarta', '1985-03-12', 'Islam', 'Laki-laki', 'S2', 'PNS', '081234567890', 'https://i.pravatar.cc/150?img=12', NULL),
('19384729561038', 'Siti Nurhaliza', 'siti.nurhaliza@example.com', '$2a$10$dummyhash2', 2, 'III/b', '2019-06-20', NULL, 'S.Kom', 'Bandung', '1990-07-22', 'Islam', 'Perempuan', 'S1', 'PNS', '081234567891', 'https://i.pravatar.cc/150?img=5', NULL),
('21469273851047', 'Budi Santoso', 'budi.santoso@example.com', '$2a$10$dummyhash3', 1, 'II/d', '2021-03-10', NULL, 'S.T', 'Surabaya', '1992-11-05', 'Islam', 'Laki-laki', 'S1', 'PPPK', '081234567892', 'https://i.pravatar.cc/150?img=13', NULL),
('18275639841029', 'Dewi Lestari', 'dewi.lestari@example.com', '$2a$10$dummyhash4', 2, 'III/c', '2018-09-01', 'Dr.', 'M.Si', 'Yogyakarta', '1987-04-18', 'Islam', 'Perempuan', 'S2', 'PNS', '081234567893', 'https://i.pravatar.cc/150?img=9', NULL),
('22836174592063', 'Eko Prasetyo', 'eko.prasetyo@example.com', '$2a$10$dummyhash5', 1, 'II/c', '2022-01-05', NULL, 'S.E', 'Semarang', '1993-08-30', 'Kristen', 'Laki-laki', 'S1', 'Kontrak', '081234567894', 'https://i.pravatar.cc/150?img=14', NULL),
('20594837261058', 'Fitriani Wulandari', 'fitriani.w@example.com', '$2a$10$dummyhash6', 2, 'III/a', '2020-07-12', NULL, 'S.Pd', 'Medan', '1991-02-14', 'Islam', 'Perempuan', 'S1', 'PNS', '081234567895', 'https://i.pravatar.cc/150?img=10', NULL),
('21748296351072', 'Gunawan Wijaya', 'gunawan.w@example.com', '$2a$10$dummyhash7', 1, 'II/d', '2021-11-20', NULL, 'A.Md', 'Makassar', '1994-09-25', 'Katolik', 'Laki-laki', 'D3', 'PPPK', '081234567896', 'https://i.pravatar.cc/150?img=15', NULL),
('19562847391086', 'Hana Pertiwi', 'hana.pertiwi@example.com', '$2a$10$dummyhash8', 2, 'III/b', '2019-04-08', NULL, 'S.Sos', 'Palembang', '1989-12-10', 'Islam', 'Perempuan', 'S1', 'PNS', '081234567897', 'https://i.pravatar.cc/150?img=1', NULL),
('22937164825093', 'Irfan Maulana', 'irfan.maulana@example.com', '$2a$10$dummyhash9', 1, 'II/c', '2022-05-15', NULL, 'S.Kom', 'Pekanbaru', '1995-06-18', 'Islam', 'Laki-laki', 'S1', 'Kontrak', '081234567898', 'https://i.pravatar.cc/150?img=33', NULL),
('20681539274102', 'Julia Rahmawati', 'julia.r@example.com', '$2a$10$dummyhash10', 2, 'III/a', '2020-10-22', NULL, 'S.Psi', 'Denpasar', '1990-03-27', 'Hindu', 'Perempuan', 'S1', 'PNS', '081234567899', 'https://i.pravatar.cc/150?img=20', NULL),
('21859374621085', 'Kevin Aditya', 'kevin.aditya@example.com', '$2a$10$dummyhash11', 1, 'II/d', '2021-08-30', NULL, 'S.T', 'Manado', '1993-01-15', 'Kristen', 'Laki-laki', 'S1', 'PPPK', '081234567800', 'https://i.pravatar.cc/150?img=51', NULL),
('18427596831094', 'Linda Kusuma', 'linda.kusuma@example.com', '$2a$10$dummyhash12', 2, 'III/c', '2018-12-05', 'Ir.', 'M.T', 'Banjarmasin', '1986-10-08', 'Islam', 'Perempuan', 'S2', 'PNS', '081234567801', 'https://i.pravatar.cc/150?img=23', NULL),
('123456789', 'Administrator', 'admin@gmail.com.com', '123123123', 1, 'III/c', '2018-12-05', 'Ir.', 'M.T', 'Banjarmasin', '1986-10-08', 'Islam', 'Perempuan', 'S2', 'PNS', '081234567801', 'https://i.pravatar.cc/150?img=23', NULL);


-- INSERT DATA PRESENSI (Kolom catatan diisi NULL)
-- (Pastikan statusnya sesuai dengan ENUM: 'masuk', 'pulang', 'sakit', 'izin')
INSERT INTO Presensi (waktu, status, koordinat_lokasi, id_tendik, catatan) VALUES 
('2024-10-15 07:45:00', 'masuk', '0.5071,101.4478', '20157483926104', NULL),
('2024-10-15 16:30:00', 'pulang', '0.5071,101.4478', '20157483926104', NULL),
('2024-10-15 07:52:00', 'masuk', '0.5075,101.4482', '19384729561038', NULL),
('2024-10-15 16:25:00', 'pulang', '0.5075,101.4482', '19384729561038', NULL),
('2024-10-15 07:48:00', 'masuk', '0.5069,101.4475', '21469273851047', NULL),
('2024-10-15 16:35:00', 'pulang', '0.5069,101.4475', '21469273851047', NULL),
('2024-10-15 07:55:00', 'masuk', '0.5072,101.4479', '18275639841029', NULL),
('2024-10-15 16:20:00', 'pulang', '0.5072,101.4479', '18275639841029', NULL),
('2024-10-15 07:50:00', 'masuk', '0.5070,101.4476', '22836174592063', NULL),
('2024-10-15 16:28:00', 'pulang', '0.5070,101.4476', '22836174592063', NULL),
('2024-10-16 07:46:00', 'masuk', '0.5073,101.4480', '20594837261058', NULL),
('2024-10-16 16:32:00', 'pulang', '0.5073,101.4480', '20594837261058', NULL),
('2024-10-16 07:51:00', 'masuk', '0.5071,101.4477', '21748296351072', NULL),
('2024-10-16 16:27:00', 'pulang', '0.5071,101.4477', '21748296351072', NULL),
('2024-10-16 07:49:00', 'masuk', '0.5074,101.4481', '19562847391086', NULL),
('2024-10-16 16:33:00', 'pulang', '0.5074,101.4481', '19562847391086', NULL),
('2024-10-16 07:47:00', 'masuk', '0.5072,101.4479', '22937164825093', NULL),
('2024-10-16 16:29:00', 'pulang', '0.5072,101.4479', '22937164825093', NULL),
('2024-10-16 07:53:00', 'masuk', '0.5070,101.4478', '20681539274102', NULL),
('2024-10-16 16:31:00', 'pulang', '0.5070,101.4478', '20681539274102', NULL);


-- TABEL LAPORAN DIHAPUS, INSERT DATA LAPORAN TIDAK DIPERLUKAN LAGI


-- INSERT DATA KUNJUNGAN (Tetap sama)
INSERT INTO Kunjungan (
    nama_tamu, asal_instansi, tujuan, waktu, jenis_kelamin,
    gelar_depan, gelar_belakang, no_telp, foto
) VALUES 
('Andi Setiawan', 'PT Maju Jaya', 'Rapat Kerja Sama', '2024-10-14 09:30:00', 'Laki-laki', 'Dr.', 'M.BA', '082134567890', 'https://i.pravatar.cc/150?img=60'),
('Mega Putri', 'Dinas Pendidikan Kota', 'Konsultasi Program', '2024-10-14 10:15:00', 'Perempuan', NULL, 'S.Pd', '082134567891', 'https://i.pravatar.cc/150?img=25'),
('Rahmat Hidayat', 'Universitas Negeri', 'Penelitian', '2024-10-14 13:00:00', 'Laki-laki', 'Prof.', 'Ph.D', '082134567892', 'https://i.pravatar.cc/150?img=61'),
('Sari Wulandari', 'CV Berkah Jaya', 'Pengajuan Proposal', '2024-10-15 08:45:00', 'Perempuan', NULL, 'S.E', '082134567893', 'https://i.pravatar.cc/150?img=26'),
('Tommy Wijaya', 'Bank Mandiri', 'Sosialisasi Program', '2024-10-15 11:20:00', 'Laki-laki', NULL, 'S.Ak', '082134567894', 'https://i.pravatar.cc/150?img=62'),
('Rina Marlina', 'Yayasan Harapan', 'Kunjungan Sosial', '2024-10-15 14:30:00', 'Perempuan', 'Dra.', 'M.Pd', '082134567895', 'https://i.pravatar.cc/150?img=27'),
('Bambang Supriadi', 'Politeknik Riau', 'Koordinasi Magang', '2024-10-16 09:00:00', 'Laki-laki', 'Ir.', 'M.T', '082134567896', 'https://i.pravatar.cc/150?img=63'),
('Desy Ratnasari', 'PT Telkom Indonesia', 'Instalasi Jaringan', '2024-10-16 10:45:00', 'Perempuan', NULL, 'S.T', '082134567897', 'https://i.pravatar.cc/150?img=28'),
('Hendra Gunawan', 'Kementerian Agama', 'Verifikasi Data', '2024-10-16 13:15:00', 'Laki-laki', 'Drs.', 'M.Si', '082134567898', 'httpsG://i.pravatar.cc/150?img=64'),
('Nurul Fadilah', 'SMK Negeri 1', 'Studi Banding', '2024-10-16 14:00:00', 'Perempuan', NULL, 'S.Pd', '082134567899', 'https://i.pravatar.cc/150?img=29'),
('Agus Salim', 'PT Indosat Ooredoo', 'Penawaran Layanan', '2024-10-16 15:30:00', 'Laki-laki', NULL, 'S.Kom', '082134567800', 'https://i.pravatar.cc/150?img=65'),
('Ika Permata', 'Puskesmas Kota', 'Pemeriksaan Kesehatan', '2024-10-16 16:00:00', 'Perempuan', NULL, 'S.Kep', '082134567801', 'https://i.pravatar.cc/150?img=30');



-- SQL untuk melihat tabel --
SELECT * FROM jabatan;

SELECT * FROM tenaga_kependidikan;

SELECT * FROM presensi;

SELECT * FROM laporan;

SELECT * FROM kunjungan;

DELETE FROM "presensi" WHERE id_presensi > 20;



-- -- Nonaktifkan sementara constraint FK
-- SET session_replication_role = 'replica';

-- -- Drop semua tabel dengan urutan aman
-- DROP TABLE IF EXISTS Laporan CASCADE;
-- DROP TABLE IF EXISTS Presensi CASCADE;
-- DROP TABLE IF EXISTS Tenaga_Kependidikan CASCADE;
-- DROP TABLE IF EXISTS Jabatan CASCADE;
-- DROP TABLE IF EXISTS Kunjungan CASCADE;

-- DROP TABLE IF EXISTS status_presensi CASCADE

-- -- Aktifkan kembali constraint FK
-- SET session_replication_role = 'origin';
