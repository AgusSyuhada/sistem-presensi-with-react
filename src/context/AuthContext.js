import React, { createContext, useState, useEffect } from 'react';
import { authApi } from '../data/auth'; // API dummy Anda

// Kunci untuk menyimpan data di localStorage
const SESSION_KEY = 'sistem_presensi_user';

// Buat Context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State reaktif untuk pengguna
  const [loading, setLoading] = useState(true); // State untuk pengecekan sesi awal

  // Saat aplikasi pertama kali dimuat, cek localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(SESSION_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Gagal memuat sesi:", error);
      localStorage.removeItem(SESSION_KEY); // Hapus sesi jika rusak
    }
    // Selesai mengecek, aplikasi bisa ditampilkan
    setLoading(false); 
  }, []);

  /**
   * Fungsi untuk login
   */
  const login = async (pegid, password) => {
    try {
      // 1. Panggil API (dummy)
      const userData = await authApi.login(pegid, password); // Akan error jika gagal
      
      // 2. Simpan ke localStorage
      localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
      
      // 3. Update state reaktif
      setUser(userData);
      
      return userData; // Kembalikan data untuk navigasi
    } catch (error) {
      throw error; // Lempar error agar bisa ditangkap oleh controller
    }
  };

  /**
   * Fungsi untuk logout
   */
  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
    // Navigasi ke /login akan di-handle oleh ProtectedRoute secara otomatis
  };

  // Nilai yang akan diberikan ke komponen di bawahnya
  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user, // boolean praktis
  };

  // Jangan render aplikasi sampai pengecekan sesi selesai
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Memuat...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

