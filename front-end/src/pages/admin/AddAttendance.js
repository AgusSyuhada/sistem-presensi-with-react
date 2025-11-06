// front-end/src/pages/admin/AddAttendance.js
// (Nama file Anda sudah benar, ini isinya)

import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Modal from "../../components/Modal";
// 1. Impor controller BARU untuk presensi manual
import { useAddAttendanceManualController } from "../../hooks/useAddAttendanceManualController";
// 2. Impor statusOptions dari hook yang sudah ada
import { statusOptions } from "../../hooks/useAttendanceController";

// Menu sidebar (tetap sama)
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
];

export default function TambahPresensiManual() {
    // 3. Panggil controller BARU
    const {
        sidebarOpen,
        setSidebarOpen,
        form,
        guruList, // Daftar guru untuk dropdown
        isLoading,
        error,
        modal,
        handleChange,
        handleSubmit,
        closeModal,
    } = useAddAttendanceManualController();

    return (
        <div className="font-sans flex flex-col h-screen bg-[#f5f5ff] dark:bg-[#1F2937]">
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
                {/* 4. Ganti activeMenu */}
                <Sidebar
                    open={sidebarOpen}
                    setOpen={setSidebarOpen}
                    menuList={sidebarMenu}
                    activeMenu="kelola-presensi"
                />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-[#f5f5f5] dark:bg-[#374151] p-4 md:p-6">
                    <div className="flex justify-between items-center mb-6">
                        {/* 5. Ganti Judul */}
                        <h1 className="text-2xl font-bold text-[#18181B] dark:text-[#F9FAFB]">TAMBAH PRESENSI MANUAL</h1>
                        {/* 6. Ganti Link Kembali */}
                        <Link
                            to="/dashboard/manage-attendance"
                            className="flex items-center text-sm text-[#4caf50] hover:underline"
                        >
                            <span className="material-icons mr-1 text-base">arrow_back</span>
                            Kembali
                        </Link>
                    </div>

                    {/* Tampilkan pesan Error jika ada */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <strong className="font-bold">Error!</strong>
                            <span className="block sm:inline"> {error}</span>
                        </div>
                    )}

                    <div className="bg-white dark:bg-[#1F2937] p-4 md:p-6 rounded-lg shadow-md">
                        {/* 7. Form BARU untuk Presensi Manual */}
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                {/* Input Guru (Dropdown) */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="id_tendik">
                                        Guru / Tendik
                                    </label>
                                    <select
                                        id="id_tendik"
                                        name="id_tendik"
                                        className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4caf50]"
                                        value={form.id_tendik}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Pilih Guru</option>
                                        {guruList.map((guru) => (
                                            <option key={guru.id} value={guru.id}>
                                                {guru.nama} ({guru.pegid})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Input Tanggal */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="tanggal">
                                        Tanggal Presensi
                                    </label>
                                    <input
                                        id="tanggal"
                                        name="tanggal"
                                        type="date"
                                        className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4caf50]"
                                        value={form.tanggal}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Input Waktu */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="waktu">
                                        Waktu Presensi
                                    </label>
                                    <input
                                        id="waktu"
                                        name="waktu"
                                        type="time"
                                        className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4caf50]"
                                        value={form.waktu}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Input Status (Dropdown) */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="status">
                                        Status Presensi
                                    </label>
                                    <select
                                        id="status"
                                        name="status"
                                        className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4caf50]"
                                        value={form.status}
                                        onChange={handleChange}
                                        required
                                    >
                                        {statusOptions.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Input Catatan */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="catatan">
                                        Catatan (Opsional)
                                    </label>
                                    <textarea
                                        id="catatan"
                                        name="catatan"
                                        rows={3}
                                        className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4caf50]"
                                        placeholder="Misal: Lupa presensi pagi"
                                        value={form.catatan}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className={`w-full bg-[#4caf50] text-white font-bold py-2.5 px-4 rounded-lg hover:bg-green-600 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Menyimpan..." : "Simpan Presensi"}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>

            {/* Modal (tidak berubah) */}
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