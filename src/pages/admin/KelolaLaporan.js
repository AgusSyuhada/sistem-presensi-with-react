import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";

const sidebarMenu = [
    {
        key: "kelola-presensi",
        label: "Kelola Presensi",
        icon: "history",
        href: "/kelola-data-presensi",
    },
    {
        key: "kelola-akun-guru",
        label: "Kelola Akun Guru",
        icon: "supervisor_account",
        href: "/kelola-akun-guru",
    },
    {
        key: "kelola-kunjungan",
        label: "Kelola Kunjungan",
        icon: "groups",
        href: "/kelola-data-kunjungan",
    },
    {
        key: "kelola-laporan",
        label: "Kelola Laporan",
        icon: "description",
        href: "/kelola-laporan",
    },
]

const laporanDummy = [
    { pegid: "123 456 789", nama: "Lorem Ipsum", tanggal: "12-08-2025", waktu: "09:16", status: "Presensi" },
    { pegid: "123 456 789", nama: "Lorem Ipsum", tanggal: "12-08-2025", waktu: "09:16", status: "Presensi" },
    { pegid: "123 456 789", nama: "Lorem Ipsum", tanggal: "12-08-2025", waktu: "09:16", status: "Presensi" },
    { pegid: "123 456 789", nama: "Lorem Ipsum", tanggal: "12-08-2025", waktu: "09:16", status: "Presensi" },
    { pegid: "123 456 789", nama: "Lorem Ipsum", tanggal: "12-08-2025", waktu: "09:16", status: "Presensi" },
    { pegid: "123 456 789", nama: "Lorem Ipsum", tanggal: "12-08-2025", waktu: "09:16", status: "Presensi" },
];

export default function KelolaLaporan() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [tanggalMulai, setTanggalMulai] = useState("");
    const [tanggalAkhir, setTanggalAkhir] = useState("");
    const [data, setData] = useState(laporanDummy);

    useEffect(() => {
        document.title = "Sistem Presensi | Kelola Laporan";
    }, []);

    const handlePreview = (e) => {
        e.preventDefault();
        // Filter data berdasarkan tanggal jika diperlukan
        alert("Preview laporan berdasarkan filter tanggal.");
    };

    const handleExport = (e) => {
        e.preventDefault();
        // Export data ke file (misal CSV/Excel)
        alert("Export laporan berhasil!");
    };

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
                <Sidebar
                    open={sidebarOpen}
                    setOpen={setSidebarOpen}
                    menuList={sidebarMenu}
                    activeMenu="kelola-laporan"
                />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-[#f5f5f5] dark:bg-[#374151] p-4 md:p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-[#18181B] dark:text-[#F9FAFB]">KELOLA LAPORAN</h1>
                    </div>

                    {/* Filter Form */}
                    <div className="bg-white dark:bg-[#1F2937] p-4 md:p-6 rounded-lg shadow-md mb-6">
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4" onSubmit={handlePreview}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Tanggal Mulai</label>
                                <input
                                    type="date"
                                    className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4caf50]"
                                    value={tanggalMulai}
                                    onChange={e => setTanggalMulai(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Tanggal Akhir</label>
                                <input
                                    type="date"
                                    className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4caf50]"
                                    value={tanggalAkhir}
                                    onChange={e => setTanggalAkhir(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-row gap-3 mt-5 md:justify-end md:col-span-2">
                                <button
                                    type="submit"
                                    className="w-full md:w-auto flex items-center justify-center bg-blue-500 text-white md:px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                                >
                                    <span className="material-icons mr-2 text-base">visibility</span>
                                    Preview
                                </button>
                                <button
                                    type="button"
                                    className="w-full md:w-auto flex items-center justify-center bg-[#4caf50] text-white md:px-6 py-2 rounded-lg hover:bg-green-600 transition"
                                    onClick={handleExport}
                                >
                                    <span className="material-icons mr-2 text-base">save_alt</span>
                                    Export
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Tabel Laporan */}
                    <div className="bg-white dark:bg-[#1F2937] p-4 md:p-6 rounded-lg shadow-md overflow-x-auto">
                        <table className="w-full min-w-[800px] text-left text-sm border-collapse border border-[#E4E4E7] dark:border-[#374151]">
                            <thead className="bg-gray-100 dark:bg-[#374151]">
                                <tr>
                                    <th className="p-4 font-medium text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">No</th>
                                    <th className="p-4 font-medium text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">PEGID</th>
                                    <th className="p-4 font-medium text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">Nama</th>
                                    <th className="p-4 font-medium text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">Tanggal Presensi</th>
                                    <th className="p-4 font-medium text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">Waktu Presensi</th>
                                    <th className="p-4 font-medium text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">Status Presensi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, idx) => (
                                    <tr key={idx} className="border-b border-[#E4E4E7] dark:border-[#374151]">
                                        <td className="p-4 text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">{idx + 1}</td>
                                        <td className="p-4 text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">{row.pegid}</td>
                                        <td className="p-4 text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">{row.nama}</td>
                                        <td className="p-4 text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">{row.tanggal}</td>
                                        <td className="p-4 text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">{row.waktu}</td>
                                        <td className="p-4 border border-[#E4E4E7] dark:border-[#374151]">
                                            <span className="px-3 py-1 text-xs font-medium text-green-800 dark:text-green-100 bg-green-200 dark:bg-green-700 rounded-full">
                                                {row.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {data.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="text-center p-6 text-gray-400 dark:text-gray-500">Tidak ada data laporan</td>
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