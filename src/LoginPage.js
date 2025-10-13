import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const users = {
  "123456789": { password: "password123", role: "admin" },
  "987654321": { password: "password123", role: "user" }
};

export default function LoginPage() {
  const [pegid, setPegid] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users[pegid.trim()];
    if (user && user.password === password) {
      if (user.role === "admin") {
        navigate("/kelola-data-presensi");
      } else {
        navigate("/riwayat-presensi");
      }
    } else {
      alert("PEGID atau kata sandi salah!");
    }
  };

  return (
    <div className="bg-[#F3F4F6] dark:bg-[#1F2937] flex items-center justify-center min-h-screen font-['Roboto',sans-serif]">
      <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-2xl rounded-lg overflow-hidden bg-white dark:bg-[#374151] m-4">
        <div className="w-full md:w-1/2 bg-[#4CAF50] flex items-center justify-center p-6 md:p-12">
          <img
            alt="Company Logo"
            className="w-24 h-24 md:w-48 md:h-48"
            src="./asset/logo-mi-al-faizein.png"
          />
        </div>
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#111827] dark:text-[#F9FAFB]">Login</h1>
          </div>
          <form id="loginForm" onSubmit={handleSubmit}>
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
                value={pegid}
                onChange={(e) => setPegid(e.target.value)}
                required
              />
            </div>
            <div className="mb-8">
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
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  <span className="material-icons text-[#6B7280] dark:text-[#9CA3AF] select-none">
                    {showPassword ? "visibility" : "visibility_off"}
                  </span>
                </button>
              </div>
            </div>
            <button
              className="w-full bg-[#4CAF50] text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition duration-300"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}