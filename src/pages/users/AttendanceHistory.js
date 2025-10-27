import React from "react";
import Sidebar from "../../components/Sidebar";
import { useAttendanceHistoryController } from "../../hooks/useAttendanceController";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; // Corrected import path

const sidebarMenu = [
  {
    key: "riwayat-presensi",
    label: "Riwayat Presensi",
    icon: "history",
    href: "/dashboard/attendance-history",
  },
  {
    key: "profile",
    label: "Profile",
    icon: "person",
    href: "/dashboard/profile",
  },
];

export default function AttendanceHistory() {
  const { history, isLoading, error, sidebarOpen, setSidebarOpen, getStatusStyle } = useAttendanceHistoryController();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    navigate("/login", { replace: true });
    return null;
  }

  return (
    <div className="font-sans flex flex-col h-screen bg-[#f5f5f5] dark:bg-[#1F2937]">
      {/* Header */}
      <header className="h-16 bg-[#4caf50] flex items-center px-4 z-20 shrink-0 relative">
        <button
          className="md:hidden text-white mr-3 focus:outline-none"
          onClick={() => setSidebarOpen((v) => !v)}
          id="hamburger"
          aria-label={sidebarOpen ? "Tutup menu" : "Buka menu"}
          type="button"
        >
          <span className="material-icons" id="hamburger-icon">menu</span>
        </button>
        <div className="hidden md:flex items-center">
          <img
            alt="MI ALFAIZEIN Logo"
            className="h-8 w-8 mr-3"
            src="/asset/logo-mi-al-faizein.png"
          />
          <span className="text-white text-xl font-bold">MI AL FAIZEIN</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          menuList={sidebarMenu}
          activeMenu="riwayat-presensi"
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#f5f5f5] dark:bg-[#374151] p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#18181B] dark:text-[#F9FAFB]">
              RIWAYAT PRESENSI
            </h1>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}

          {/* Loading */}
          {isLoading && (
            <div className="text-center p-6">
              <span className="text-gray-500 dark:text-gray-400">Memuat data...</span>
            </div>
          )}

          {/* Table */}
          {!isLoading && (
            <div className="bg-white dark:bg-[#1F2937] p-4 md:p-6 rounded-lg shadow-md overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-sm border-collapse border border-[#E4E4E7] dark:border-[#374151]">
                <thead className="bg-gray-100 dark:bg-[#374151]">
                  <tr>
                    <th className="p-4 font-medium text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">No</th>
                    <th className="p-4 font-medium text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">PEGID</th>
                    <th className="p-4 font-medium text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">Nama Guru</th>
                    <th className="p-4 font-medium text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">Tanggal Presensi</th>
                    <th className="p-4 font-medium text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">Waktu Presensi</th>
                    <th className="p-4 font-medium text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">Status Presensi</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((row, idx) => (
                    <tr key={row.id} className="border-b border-[#E4E4E7] dark:border-[#374151]">
                      <td className="p-4 text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">{idx + 1}</td>
                      <td className="p-4 text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">{row.pegid}</td>
                      <td className="p-4 text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">{row.nama}</td>
                      <td className="p-4 text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">{row.tanggal}</td>
                      <td className="p-4 text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">{row.waktu}</td>
                      <td className="p-4 border border-[#E4E4E7] dark:border-[#374151]">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(row.status)}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {history.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center p-6 text-gray-400 dark:text-gray-500">
                        Tidak ada data presensi
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}