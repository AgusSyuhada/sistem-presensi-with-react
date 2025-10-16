import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import KelolaDataPresensi from "./pages/admin/KelolaDataPresensi";
import KelolaAkunGuru from "./pages/admin/KelolaAkunGuru";
import TambahAkunGuru from "./pages/admin/TambahAkunGuru";
import EditAkunGuru from "./pages/admin/EditAkunGuru";
import KelolaDataKunjungan from "./pages/admin/KelolaDataKunjungan";
import KelolaLaporan from "./pages/admin/KelolaLaporan";
import RiwayatPresensi from "./pages/users/RiwayatPresensi";
import Profil from "./pages/users/Profil";
import FormKunjungan from "./pages/guest/FormKunjungan";
import Presensi from "./pages/users/Presensi";
import ResponsePresensi from "./pages/response/ResponsePresensi";
import ResponseKunjungan from "./pages/response/ResponseKunjungan";
import { useEffect } from 'react';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/kelola-data-presensi" element={<KelolaDataPresensi />} />
        <Route path="/kelola-akun-guru" element={<KelolaAkunGuru />} />
        <Route path="/tambah-akun-guru" element={<TambahAkunGuru />} />
        <Route path="/edit-akun-guru" element={<EditAkunGuru />} />
        <Route path="/kelola-data-kunjungan" element={<KelolaDataKunjungan />} />
        <Route path="/kelola-laporan" element={<KelolaLaporan />} />
        <Route path="/riwayat-presensi" element={<RiwayatPresensi />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/form-kunjungan" element={<FormKunjungan />} />
        <Route path="/presensi" element={<Presensi />} />
        <Route path="/response-presensi" element={<ResponsePresensi />} />
        <Route path="/response-kunjungan" element={<ResponseKunjungan />} />
        <Route path="*" element={<Navigate to="/login" replace />} /> {/* default route */}
      </Routes>
    </Router>
  );
}