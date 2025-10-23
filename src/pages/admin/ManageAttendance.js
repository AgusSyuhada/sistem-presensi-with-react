import React from "react";
import Sidebar from "../../components/Sidebar";
import Modal from "../../components/Modal";
// 1. Impor Controller (Hook)
import { usePresensiController } from "../../hooks/useAttendanceController";

// Menu tetap di sini karena spesifik untuk View ini
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

export default function KelolaDataPresensi() {
    // 2. Panggil Controller untuk mendapatkan semua state dan logika
    const {
        presensi,
        isLoading,
        error,
        editingIdx,
        editStatus,
        setEditStatus,
        sidebarOpen,
        setSidebarOpen,
        modal,
        handleEdit,
        handleCancel,
        handleSave,
        handleDelete,
        closeModal,
        statusOptions,
        getStatusStyle,
    } = usePresensiController();

    // 3. Tampilkan UI berdasarkan state dari controller
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
                    <span className="material-icons" id="hamburger-icon">
                        menu
                    </span>
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
                    activeMenu="kelola-presensi"
                />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-[#f5f5f5] dark:bg-[#374151] p-4 md:p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-[#18181B] dark:text-[#F9FAFB]">
                            KELOLA PRESENSI
                        </h1>
                    </div>

                    {/* Tampilkan pesan Error jika ada */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <strong className="font-bold">Error!</strong>
                            <span className="block sm:inline"> {error}</span>
                        </div>
                    )}

                    {/* Tampilkan Loading spinner/text */}
                    {isLoading && (
                        <div className="text-center p-6">
                            <span className="text-gray-500 dark:text-gray-400">Loading data...</span>
                        </div>
                    )}

                    {/* Tampilkan tabel hanya jika tidak loading */}
                    {!isLoading && (
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
                                        <th className="p-4 font-medium text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {presensi.map((row, idx) => (
                                        <tr
                                            key={row.id} // Gunakan ID unik
                                            className="border-b border-[#E4E4E7] dark:border-[#374151]"
                                        >
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
                                                {editingIdx === idx ? (
                                                    <select
                                                        className="status-select w-full p-1 text-xs border rounded dark:bg-[#374151] dark:text-[#F9FAFB] dark:border-[#6B7280]"
                                                        value={editStatus}
                                                        onChange={(e) => setEditStatus(e.target.value)}
                                                    >
                                                        {statusOptions.map((opt) => (
                                                            <option key={opt.value} value={opt.value}>
                                                                {opt.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <span
                                                        className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(
                                                            row.status
                                                        )}`}
                                                    >
                                                        {row.status}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4 border border-[#E4E4E7] dark:border-[#374151] text-center">
                                                <div className="flex justify-center space-x-2">
                                                    {editingIdx === idx ? (
                                                        <>
                                                            <button
                                                                className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition"
                                                                onClick={() => handleSave(idx)}
                                                                title="Simpan"
                                                            >
                                                                <span className="material-icons text-sm">
                                                                    save
                                                                </span>
                                                            </button>
                                                            <button
                                                                className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center hover:bg-gray-600 transition"
                                                                onClick={handleCancel}
                                                                title="Batal"
                                                            >
                                                                <span className="material-icons text-sm">
                                                                    close
                                                                </span>
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button
                                                                className="edit-btn w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600 transition"
                                                                onClick={() => handleEdit(idx)}
                                                                title="Edit"
                                                            >
                                                                <span className="material-icons text-sm">
                                                                    edit
                                                                </span>
                                                            </button>
                                                            <button
                                                                className="delete-btn w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition"
                                                                onClick={() => handleDelete(idx)}
                                                                title="Hapus"
                                                            >
                                                                <span className="material-icons text-sm">
                                                                    delete
                                                                </span>
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {presensi.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="text-center p-6 text-gray-400 dark:text-gray-500"
                                            >
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

            {/* Render Modal (logikanya sudah ada di controller) */}
            <Modal isOpen={modal.isOpen} onClose={closeModal} title={modal.title}>
                <p className="text-gray-700 dark:text-gray-300">{modal.message}</p>
                <div className="flex justify-end gap-3 mt-5">
                    {modal.onConfirm ? (
                        <>
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                            >
                                Batal
                            </button>
                            <button
                                onClick={() => {
                                    modal.onConfirm();
                                    closeModal();
                                }}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            >
                                Ya, Hapus
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={closeModal}
                            className="px-4 py-2 bg-[#4caf50] text-white rounded-lg hover:bg-opacity-90 transition"
                        >
                            OK
                        </button>
                    )}
                </div>
            </Modal>
        </div>
    );
}

