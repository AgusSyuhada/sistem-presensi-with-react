import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Ganti authApi dan setSession, ganti dengan useAuth
import { useAuth } from './useAuth'; 

// Ini adalah "Controller" khusus untuk halaman Login
export const useAuthController = () => {
  // State untuk form input
  const [pegid, setPegid] = useState("");
  const [password, setPassword] = useState("");
  
  // State untuk UI feedback
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { login } = useAuth(); // <-- Dapatkan fungsi login dari Context

  /**
   * Menangani submit form login.
   */
  const handleLogin = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    setIsLoading(true); // Mulai loading
    setError(null);     // Hapus error sebelumnya

    try {
      // Panggil fungsi login dari context
      // Fungsi ini sudah menangani API call dan penyimpanan sesi
      const user = await login(pegid, password);

      // Logika sukses: Arahkan berdasarkan peran
      if (user.role === "admin") {
        navigate("/dashboard/manage-attendance");
      } else {
        navigate("/dashboard/attendance-history");
      }
    } catch (err) {
      // Logika gagal: Tampilkan pesan error
      setError(err.message || "Terjadi kesalahan");
    } finally {
      // Selalu berhenti loading, baik sukses maupun gagal
      setIsLoading(false);
    }
  };

  /**
   * Toggle visibilitas password
   */
  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  // Kembalikan semua state dan fungsi yang dibutuhkan oleh "View"
  return {
    pegid,
    setPegid,
    password,
    setPassword,
    showPassword,
    isLoading,
    error,
    handleLogin,
    toggleShowPassword,
  };
};

