// front-end/src/components/AuthRoutes.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Tentukan ID Jabatan Admin (sesuaikan jika angkanya beda)
const ADMIN_ROLE_ID = 1;

export const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useAuth();

  // 1. Jika tidak ada pengguna (belum login), redirect ke /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Jika sesi ada, tapi role tidak sesuai
  //    Sekarang membandingkan ANGKA vs ANGKA (misal: user.role (2) !== allowedRole (1))
  if (user.role !== allowedRole) {

    // Logika redirect juga harus pakai ANGKA
    if (user.role === ADMIN_ROLE_ID) {
      return <Navigate to="/dashboard/manage-attendance" replace />;
    } else {
      return <Navigate to="/dashboard/attendance-history" replace />;
    }
  }

  // 3. Jika sesi ada dan role sesuai (misal: 2 === 2)
  return children;
};

export const GuestRoute = ({ children }) => {
  const { user } = useAuth();

  // Jika ada sesi, redirect ke dashboard yang sesuai
  if (user) {
    // Logika redirect juga harus pakai ANGKA
    if (user.role === ADMIN_ROLE_ID) {
      return <Navigate to="/dashboard/manage-attendance" replace />;
    } else {
      return <Navigate to="/dashboard/attendance-history" replace />;
    }
  }

  // Jika tidak ada sesi, tampilkan halaman (misal: halaman login)
  return children;
};