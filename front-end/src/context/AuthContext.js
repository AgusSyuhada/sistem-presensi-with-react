// front-end/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { authApi } from '../data/authApi';
import { jwtDecode } from 'jwt-decode'; // <-- IMPORT BARU

const SESSION_KEY = 'presensi_token';
const USER_KEY = 'presensi_user';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem(SESSION_KEY);
      const storedUser = localStorage.getItem(USER_KEY);

      // Validasi sebelum parse
      if (token && storedUser && storedUser !== 'undefined' && storedUser !== 'null') {

        // --- TAMBAHAN VALIDASI TOKEN ---
        // Cek apakah token masih valid (belum expired)
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          // Token expired
          throw new Error('Token expired');
        }
        // --- AKHIR TAMBAHAN ---

        const parsedUser = JSON.parse(storedUser);

        // --- PERUBAHAN: Disesuaikan dengan payload backend ---
        // Payload Anda di backend berisi 'id', bukan 'id_tendik'
        if (parsedUser && typeof parsedUser === 'object' && parsedUser.id) {
          setUser(parsedUser);
        } else {
          throw new Error('User invalid');
        }
      }
    } catch (e) {
      console.error('Gagal memuat sesi:', e);
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(USER_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (pegid, password) => {
    try {
      // --- PERUBAHAN LOGIKA LOGIN ---

      // 1. authApi.login sekarang hanya mengembalikan { token }
      const { token } = await authApi.login(pegid, password);

      // 2. Decode token untuk mendapatkan payload
      // Backend Anda membuat payload: { user: { id, nama, role } }
      const decodedPayload = jwtDecode(token);

      // 3. Ekstrak data user dari payload
      const userData = decodedPayload.user;

      // 4. Validasi userData dari token
      if (!userData || typeof userData !== 'object' || !userData.id) {
        throw new Error('Data user tidak valid dari token');
      }

      // 5. Simpan token dan user
      localStorage.setItem(SESSION_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(userData));

      // 6. Set state
      setUser(userData);
      return userData; // Kembalikan user data agar useAuthController bisa redirect

      // --- AKHIR PERUBAHAN LOGIKA LOGIN ---

    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Memuat...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;