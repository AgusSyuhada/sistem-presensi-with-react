import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import KelolaDataPresensi from "./KelolaDataPresensi";
// import RiwayatPresensi from "./RiwayatPresensi"; // nanti buat sendiri

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/kelola-data-presensi" element={<KelolaDataPresensi />} />
        {/* <Route path="/riwayat-presensi" element={<RiwayatPresensi />} /> */}
        <Route path="*" element={<Navigate to="/login" replace />} /> {/* default route */}
      </Routes>
    </Router>
  );
}