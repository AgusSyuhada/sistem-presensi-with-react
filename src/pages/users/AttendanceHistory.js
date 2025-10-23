import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";

const dataDummy = [
  {
    pegid: "123 456 789",
    nama: "Lorem Ipsum",
    tanggal: "12-08-2025",
    waktu: "09:16",
    status: "Presensi",
  },
  {
    pegid: "123 456 789",
    nama: "Lorem Ipsum",
    tanggal: "12-08-2025",
    waktu: "09:16",
    status: "Presensi",
  },
  {
    pegid: "123 456 789",
    nama: "Lorem Ipsum",
    tanggal: "12-08-2025",
    waktu: "09:16",
    status: "Presensi",
  },
  {
    pegid: "123 456 789",
    nama: "Lorem Ipsum",
    tanggal: "12-08-2025",
    waktu: "09:16",
    status: "Presensi",
  },
  {
    pegid: "123 456 789",
    nama: "Lorem Ipsum",
    tanggal: "12-08-2025",
    waktu: "09:16",
    status: "Presensi",
  },
  {
    pegid: "123 456 789",
    nama: "Lorem Ipsum",
    tanggal: "12-08-2025",
    waktu: "09:16",
    status: "Presensi",
  },
  {
    pegid: "123 456 789",
    nama: "Lorem Ipsum",
    tanggal: "12-08-2025",
    waktu: "09:16",
    status: "Presensi",
  },
  {
    pegid: "123 456 789",
    nama: "Lorem Ipsum",
    tanggal: "12-08-2025",
    waktu: "09:16",
    status: "Presensi",
  },
  {
    pegid: "123 456 789",
    nama: "Lorem Ipsum",
    tanggal: "12-08-2025",
    waktu: "09:16",
    status: "Presensi",
  },
  {
    pegid: "123 456 789",
    nama: "Lorem Ipsum",
    tanggal: "12-08-2025",
    waktu: "09:16",
    status: "Presensi",
  },
  {
    pegid: "123 456 789",
    nama: "Lorem Ipsum",
    tanggal: "12-08-2025",
    waktu: "09:16",
    status: "Presensi",
  },
  {
    pegid: "123 456 789",
    nama: "Lorem Ipsum",
    tanggal: "12-08-2025",
    waktu: "09:16",
    status: "Presensi",
  },
  {
    pegid: "123 456 789",
    nama: "Lorem Ipsum",
    tanggal: "12-08-2025",
    waktu: "09:16",
    status: "Presensi",
  },
  {
    pegid: "123 456 789",
    nama: "Lorem Ipsum",
    tanggal: "12-08-2025",
    waktu: "09:16",
    status: "Presensi",
  },
  {
    pegid: "123 456 789",
    nama: "Lorem Ipsum",
    tanggal: "12-08-2025",
    waktu: "09:16",
    status: "Presensi",
  },
];

const sidebarMenu = [
  {
    key: "riwayat-presensi",
    label: "History Presensi",
    icon: "history",
    href: "/dashboard/attendance-history",
  },
  {
    key: "profil",
    label: "Profil",
    icon: "person",
    href: "/dashboard/profile",
  },
];

function getStatusStyle(status) {
  switch (status) {
    case "Presensi":
      return "text-green-800 bg-green-200";
    case "Izin":
      return "text-blue-800 bg-blue-200";
    case "Sakit":
      return "text-yellow-800 bg-yellow-200";
    case "Alpa":
      return "text-red-800 bg-red-200";
    default:
      return "text-gray-800 bg-gray-200";
  }
}

export default function RiwayatPresensi() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = "Sistem Presensi | Riwayat Presensi";
  }, []);

  return (
    <div className="font-sans flex flex-col h-screen bg-[#f5f5f5] dark:bg-[#1F2937]">
      {/* Header */}
      <header className="h-16 bg-[#4caf50] flex items-center px-4 z-20 shrink-0 relative">
        {/* Hamburger */}
        <button
          className="md:hidden text-white mr-3 focus:outline-none"
          onClick={() => setSidebarOpen((v) => !v)}
          id="hamburger"
          aria-label={sidebarOpen ? "Tutup menu" : "Buka menu"}
          type="button"
        >
          <span className="material-icons" id="hamburger-icon">
            menu
          </span>
        </button>
        {/* Logo + Title Desktop */}
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
        {/* Sidebar */}
        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          menuList={sidebarMenu}
          activeMenu="riwayat-presensi"
        />

        {/* Overlay (mobile only) */}
        {sidebarOpen && (
          <div
            id="overlay"
            className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#f5f5f5] dark:bg-[#374151] p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#18181B] dark:text-[#F9FAFB]">
              RIWAYAT PRESENSI
            </h1>
          </div>
          <div className="bg-white dark:bg-[#1F2937] p-4 md:p-6 rounded-lg shadow-md overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm border-collapse border border-[#E4E4E7] dark:border-[#374151]">
              <thead className="bg-gray-100 dark:bg-[#374151]">
                <tr>
                  <th className="p-4 font-medium text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">
                    No
                  </th>
                  <th className="p-4 font-medium text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">
                    PEGID
                  </th>
                  <th className="p-4 font-medium text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">
                    Nama
                  </th>
                  <th className="p-4 font-medium text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">
                    Tanggal Presensi
                  </th>
                  <th className="p-4 font-medium text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">
                    Waktu Presensi
                  </th>
                  <th className="p-4 font-medium text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">
                    Status Presensi
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataDummy.map((row, idx) => (
                  <tr key={idx} className="border-b border-[#E4E4E7] dark:border-[#374151]">
                    <td className="p-4 text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">
                      {idx + 1}
                    </td>
                    <td className="p-4 text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">
                      {row.pegid}
                    </td>
                    <td className="p-4 text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">
                      {row.nama}
                    </td>
                    <td className="p-4 text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">
                      {row.tanggal}
                    </td>
                    <td className="p-4 text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">
                      {row.waktu}
                    </td>
                    <td className="p-4 border border-[#E4E4E7] dark:border-[#374151]">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(
                          row.status
                        )}`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {dataDummy.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center p-6 text-gray-400 dark:text-gray-500"
                    >
                      Tidak ada data presensi
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}