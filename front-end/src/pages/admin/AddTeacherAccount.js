import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Modal from "../../components/Modal";
import { useAddGuruController } from "../../hooks/useAddTeacherController";

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
];

export default function TambahAkunGuru() {
    // Panggil controller
    const {
        sidebarOpen,
        setSidebarOpen,
        showPassword,
        toggleShowPassword,
        form,
        isLoading,
        error,
        modal,
        handleChange,
        handleSubmit,
        closeModal,
    } = useAddGuruController();

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
                {/* Gunakan activeMenu yang benar */}
                <Sidebar
                    open={sidebarOpen}
                    setOpen={setSidebarOpen}
                    menuList={sidebarMenu}
                    activeMenu="kelola-akun-guru"
                />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-[#f5f5f5] dark:bg-[#374151] p-4 md:p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-[#18181B] dark:text-[#F9FAFB]">TAMBAH AKUN GURU</h1>
                        <Link
                            to="/dashboard/manage-accounts"
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
                        {/* Hubungkan form dengan controller */}
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                {/* ... (semua input form di-wire ke controller) ... */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="pegid">
                                        PEGID
                                    </label>
                                    <input
                                        id="pegid"
                                        name="pegid"
                                        type="text"
                                        className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4caf50]"
                                        placeholder="Masukkan PEGID"
                                        value={form.pegid}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="nama">
                                        Nama
                                    </label>
                                    <input
                                        id="nama"
                                        name="nama"
                                        type="text"
                                        className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4caf50]"
                                        placeholder="Masukkan Nama"
                                        value={form.nama}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="jabatan">
                                        Jabatan
                                    </label>
                                    <input
                                        id="jabatan"
                                        name="jabatan"
                                        type="text"
                                        className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4caf50]"
                                        placeholder="Masukkan Jabatan"
                                        value={form.jabatan}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="password">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            className="w-full px-3 py-2 pr-10 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4caf50]"
                                            placeholder="Masukkan Password"
                                            value={form.password}
                                            onChange={handleChange}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={toggleShowPassword}
                                            tabIndex={-1}
                                            aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                                        >
                                            <span className="material-icons text-gray-500 dark:text-gray-400 select-none">
                                                {showPassword ? "visibility" : "visibility_off"}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="tempatLahir">
                                        Tempat Lahir
                                    </label>
                                    <input
                                        id="tempatLahir"
                                        name="tempatLahir"
                                        type="text"
                                        className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4caf50]"
                                        placeholder="Masukkan Tempat Lahir"
                                        value={form.tempatLahir}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="tanggalLahir">
                                        Tanggal Lahir
                                    </label>
                                    <input
                                        id="tanggalLahir"
                                        name="tanggalLahir"
                                        type="date"
                                        className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4caf50]"
                                        value={form.tanggalLahir}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="tanggalMasuk">
                                        Tanggal Masuk
                                    </label>
                                    <input
                                        id="tanggalMasuk"
                                        name="tanggalMasuk"
                                        type="date"
                                        className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4caf50]"
                                        value={form.tanggalMasuk}
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
                                    {isLoading ? "Menyimpan..." : "Simpan"}
                                </button>
                            </div>
                        </form>
                    </div>
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
