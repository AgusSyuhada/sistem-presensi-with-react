import React from "react";
import { Link } from "react-router-dom"; // 1. Impor Link
import Sidebar from "../../components/Sidebar";
import Modal from "../../components/Modal";
import { useGuruController } from "../../hooks/useTeacherController"; // 2. Impor Controller

// 3. sidebarMenu dengan href (rute) yang sudah diperbarui
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

export default function KelolaAkunGuru() {
    // 4. Panggil Controller untuk semua state dan logika
    const {
        guruList,
        isLoading,
        error,
        sidebarOpen,
        setSidebarOpen,
        modal,
        handleDelete,
        closeModal,
    } = useGuruController();

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
                    activeMenu="kelola-akun-guru"
                />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-[#f5f5f5] dark:bg-[#374151] p-4 md:p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-[#18181B] dark:text-[#F9FAFB]">KELOLA AKUN GURU</h1>

                        {/* 5. Ubah <a> menjadi <Link> dan perbarui 'to' (rute) */}
                        <Link
                            to="/dashboard/manage-accounts/add"
                            className="md:flex items-center hidden bg-[#4caf50] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                        >
                            <span className="material-icons mr-2">person_add</span>
                            Tambah Akun
                        </Link>
                        <Link
                            to="/dashboard/manage-accounts/add"
                            className="md:hidden bg-[#4caf50] text-white w-10 h-10 rounded-lg flex items-center justify-center hover:bg-green-600 transition"
                            title="Tambah Akun"
                        >
                            <span className="material-icons">person_add</span>
                        </Link>
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
                                        <th className="p-4 font-medium text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">No</th>
                                        <th className="p-4 font-medium text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">PEGID</th>
                                        <th className="p-4 font-medium text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">Nama</th>
                                        <th className="p-4 font-medium text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">Jabatan</th>
                                        <th className="p-4 font-medium text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {guruList.map((row, idx) => (
                                        <tr key={row.id} className="border-b border-[#E4E4E7] dark:border-[#374151]">
                                            <td className="p-4 text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">{idx + 1}</td>
                                            <td className="p-4 text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">{row.pegid}</td>
                                            <td className="p-4 text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">{row.nama}</td>
                                            <td className="p-4 text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">{row.jabatan}</td>
                                            <td className="p-4 border border-[#E4E4E7] dark:border-[#374151] text-center">
                                                <div className="flex justify-center space-x-2">
                                                    {/* 6. Ubah <a> menjadi <Link> dan perbarui 'to' (rute) dengan ID */}
                                                    <Link
                                                        to={`/dashboard/manage-accounts/edit/${row.id}`}
                                                        className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600 transition"
                                                        title="Edit"
                                                    >
                                                        <span className="material-icons text-sm">edit</span>
                                                    </Link>
                                                    <button
                                                        className="delete-btn w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition"
                                                        onClick={() => handleDelete(row.id)} // 7. Gunakan ID
                                                        title="Hapus"
                                                    >
                                                        <span className="material-icons text-sm">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {guruList.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="text-center p-6 text-gray-400 dark:text-gray-500">Tidak ada data akun guru</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>

            {/* 8. Render Modal */}
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
