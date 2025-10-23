import React from "react";
import Sidebar from "../../components/Sidebar";
import Modal from "../../components/Modal";
import { useLaporanController } from "../../hooks/useReportsController"; // Impor controller

// sidebarMenu dengan rute yang benar
const sidebarMenu = [
    {
        key: "kelola-presensi",
        label: "Kelola Presensi",
        icon: "history",
        href: "/dashboard/manage-attendance",
    },
    {
        key: "kelola-akun-guru",
        label: "Kelola Akun Guru",
        icon: "supervisor_account",
        href: "/dashboard/manage-accounts",
    },
    {
        key: "kelola-kunjungan",
        label: "Kelola Kunjungan",
        icon: "groups",
        href: "/dashboard/manage-visits",
    },
    {
        key: "kelola-laporan",
        label: "Kelola Laporan",
        icon: "description",
        href: "/dashboard/manage-reports",
    },
]

export default function ManageReports() { // Ganti nama fungsi komponen jika perlu
    // Panggil Controller
    const {
        sidebarOpen,
        setSidebarOpen,
        tanggalMulai,
        setTanggalMulai,
        tanggalAkhir,
        setTanggalAkhir,
        laporanData,
        isLoading,
        showTable,
        modal,
        getStatusStyle,
        handlePreview,
        handleExport, // Pastikan ini diambil dari controller
        closeModal,
    } = useLaporanController();

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
                    activeMenu="kelola-laporan"
                />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-[#f5f5f5] dark:bg-[#374151] p-4 md:p-6">
                    <div className="mb-6">
                        {/* Ganti judul jika perlu */}
                        <h1 className="text-2xl font-bold text-[#18181B] dark:text-[#F9FAFB]">KELOLA LAPORAN PRESENSI</h1>
                    </div>

                    {/* Filter Form */}
                    <div className="bg-white dark:bg-[#1F2937] p-4 md:p-6 rounded-lg shadow-md mb-6">
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4" onSubmit={handlePreview}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="tanggalMulai">Tanggal Mulai</label>
                                <input
                                    id="tanggalMulai"
                                    type="date"
                                    className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4caf50]"
                                    value={tanggalMulai}
                                    onChange={e => setTanggalMulai(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="tanggalAkhir">Tanggal Akhir</label>
                                <input
                                    id="tanggalAkhir"
                                    type="date"
                                    className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4caf50]"
                                    value={tanggalAkhir}
                                    onChange={e => setTanggalAkhir(e.target.value)}
                                    min={tanggalMulai} // Tanggal akhir tidak bisa sebelum tanggal mulai
                                    required
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 mt-5 md:col-span-2 md:justify-end">
                                <button
                                    type="submit"
                                    className={`w-full sm:w-auto flex items-center justify-center bg-blue-500 text-white px-4 md:px-6 py-2 rounded-lg hover:bg-blue-600 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={isLoading}
                                >
                                    <span className="material-icons mr-2 text-base">{isLoading ? 'hourglass_top' : 'visibility'}</span>
                                    {isLoading ? 'Memuat...' : 'Preview'}
                                </button>
                                {/* Tombol Export diubah ke XLSX */}
                                <button
                                    type="button"
                                    className={`w-full sm:w-auto flex items-center justify-center bg-green-600 text-white px-4 md:px-6 py-2 rounded-lg hover:bg-green-700 transition ${laporanData.length === 0 || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={() => handleExport('xlsx')} // Panggil handleExport dengan format 'xlsx'
                                    disabled={laporanData.length === 0 || isLoading}
                                >
                                    <span className="material-icons mr-2 text-base">save_alt</span>
                                    Export .XLSX {/* Ubah teks tombol */}
                                </button>
                                {/* Tombol Export CSV bisa ditambahkan lagi jika perlu */}
                                {/* <button
                                    type="button"
                                    className={`w-full sm:w-auto flex items-center justify-center bg-gray-600 text-white px-4 md:px-6 py-2 rounded-lg hover:bg-gray-700 transition ${laporanData.length === 0 || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={() => handleExport('csv')}
                                    disabled={laporanData.length === 0 || isLoading}
                                >
                                    <span className="material-icons mr-2 text-base">save_alt</span>
                                    Export .CSV
                                </button> */}
                            </div>
                        </form>
                    </div>

                    {/* Tabel Laporan (Hanya tampil jika showTable true) */}
                    {!isLoading && showTable && (
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
                                    {laporanData.map((row, idx) => (
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
                                    {/* Pesan jika tidak ada data */}
                                    {laporanData.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="text-center p-6 text-gray-400 dark:text-gray-500">
                                                Tidak ada data presensi ditemukan untuk rentang tanggal yang dipilih.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pesan jika tabel belum ditampilkan */}
                    {!isLoading && !showTable && (
                        <div className="text-center p-6 bg-white dark:bg-[#1F2937] rounded-lg shadow-md">
                            <span className="text-gray-500 dark:text-gray-400">Silakan pilih rentang tanggal dan klik "Preview" untuk melihat laporan.</span>
                        </div>
                    )}
                </main>
            </div>

            {/* Render Modal */}
            <Modal isOpen={modal.isOpen} onClose={closeModal} title={modal.title}>
                <p className="text-gray-700 dark:text-gray-300">{modal.message}</p>
                <div className="flex justify-end gap-3 mt-5">
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-[#4caf50] text-white rounded-lg hover:bg-opacity-90 transition"
                    >
                        OK
                    </button>
                </div>
            </Modal>
        </div>
    );
}
