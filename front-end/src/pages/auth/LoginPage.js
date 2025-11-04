import React, { useEffect } from "react";
// Hapus useNavigate dan useState, karena sudah di-handle oleh hook
import { Helmet } from "react-helmet";
import { useAuthController } from "../../hooks/useAuthController"; // Impor "Controller"

// Hapus data 'users', karena sudah pindah ke Model

// Ini adalah "View" Anda
export default function LoginPage() {
  // Panggil Controller (hook) untuk mendapatkan semua state dan logika
  const {
    pegid,
    setPegid,
    password,
    setPassword,
    showPassword,
    isLoading,
    error,
    handleLogin,
    toggleShowPassword,
  } = useAuthController();

  useEffect(() => {
    document.title = "Sistem Presensi | Login";
  }, []);

  return (
    <div className="bg-[#F3F4F6] dark:bg-[#1F2937] flex items-center justify-center min-h-screen font-['Roboto',sans-serif]">
      {/* (Helmet ada di file Anda sebelumnya, tapi tidak di-import. 
         Jika Anda menggunakannya, pastikan untuk mengimpornya.)
      <Helmet>
        <title>Sistem Presensi | Login</title>
      </Helmet>
      */}
      
      <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-2xl rounded-lg overflow-hidden bg-white dark:bg-[#374151] m-4">
        <div className="w-full md:w-1/2 bg-[#4CAF50] flex items-center justify-center p-6 md:p-12">
          <img
            alt="Company Logo"
            className="w-24 h-24 md:w-48 md:h-48"
            src="./asset/logo-mi-al-faizein.png" // Pastikan path ini benar dari public folder
          />
        </div>
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#111827] dark:text-[#F9FAFB]">Login</h1>
          </div>
          
          {/* Ganti handleSubmit dengan handleLogin dari controller */}
          <form id="loginForm" onSubmit={handleLogin}>
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-medium text-[#111827] dark:text-[#F9FAFB]"
                htmlFor="pegid"
              >
                PEGID
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] bg-white dark:bg-[#374151] text-[#111827] dark:text-[#F9FAFB]"
                id="pegid"
                name="pegid"
                placeholder="Enter your PEGID"
                type="text"
                value={pegid} // Gunakan state dari controller
                onChange={(e) => setPegid(e.target.value)} // Gunakan setter dari controller
                required
                disabled={isLoading} // Tambahkan: nonaktifkan saat loading
              />
            </div>
            <div className="mb-6"> {/* Ubah margin dari mb-8 ke mb-6 agar konsisten */}
              <label
                className="block mb-2 text-sm font-medium text-[#111827] dark:text-[#F9FAFB]"
                htmlFor="password"
              >
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] bg-white dark:bg-[#374151] text-[#111827] dark:text-[#F9FAFB]"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"} // Gunakan state dari controller
                  value={password} // Gunakan state dari controller
                  onChange={(e) => setPassword(e.target.value)} // Gunakan setter dari controller
                  required
                  disabled={isLoading} // Tambahkan: nonaktifkan saat loading
                />
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  type="button"
                  tabIndex={-1}
                  onClick={toggleShowPassword} // Ganti dengan fungsi dari controller
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  <span className="material-icons text-[#6B7280] dark:text-[#9CA3AF] select-none">
                    {showPassword ? "visibility" : "visibility_off"}
                  </span>
                </button>
              </div>
            </div>
            
            {/* Tambahkan: Tampilkan pesan error jika ada */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              className="w-full bg-[#4CAF50] text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition duration-300 disabled:bg-gray-400"
              type="submit"
              disabled={isLoading} // Nonaktifkan tombol saat loading
            >
              {/* Ganti teks tombol saat loading */}
              {isLoading ? 'Memproses...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
