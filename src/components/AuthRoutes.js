import React from 'react';
import { Navigate } from 'react-router-dom';
// Ganti getSession dengan useAuth
import { useAuth } from '../hooks/useAuth'; 

/**
 * Komponen untuk melindungi route yang memerlukan autentikasi.
 * @param {{ children: React.ReactNode, allowedRole: "admin" | "user" }} props
 */
export const ProtectedRoute = ({ children, allowedRole }) => {
  // Gunakan hook useAuth untuk mendapatkan state pengguna secara reaktif
  const { user } = useAuth();

  // 1. Jika tidak ada pengguna (belum login), redirect ke /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Jika sesi ada, tapi role tidak sesuai
  if (user.role !== allowedRole) {
    // Redirect ke dashboard mereka masing-masing (mencegah akses silang)
    if (user.role === 'admin') {
      return <Navigate to="/dashboard/manage-attendance" replace />;
    } else {
      return <Navigate to="/dashboard/attendance-history" replace />;
    }
  }

  // 3. Jika sesi ada dan role sesuai
  return children;
};

/**
 * Komponen untuk route publik yang tidak boleh diakses setelah login (seperti /login).
 * @param {{ children: React.ReactNode }} props
 */
export const GuestRoute = ({ children }) => {
  // Gunakan hook useAuth
  const { user } = useAuth();

  // Jika ada sesi, redirect ke dashboard yang sesuai
  if (user) {
    if (user.role === 'admin') {
      return <Navigate to="/dashboard/manage-attendance" replace />;
    } else {
      return <Navigate to="/dashboard/attendance-history" replace />;
    }
  }

  // Jika tidak ada sesi, tampilkan halaman (misal: halaman login)
  return children;
};

