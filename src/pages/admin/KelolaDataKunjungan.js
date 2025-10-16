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

const dataKunjunganDummy = [
    { nama: "Lorem Ipsum", instansi: "Lorem Ipsum", tujuan: "Lorem Ipsum" },
    { nama: "Lorem Ipsum", instansi: "Lorem Ipsum", tujuan: "Lorem Ipsum" },
    { nama: "Lorem Ipsum", instansi: "Lorem Ipsum", tujuan: "Lorem Ipsum" },
    { nama: "Lorem Ipsum", instansi: "Lorem Ipsum", tujuan: "Lorem Ipsum" },
    { nama: "Lorem Ipsum", instansi: "Lorem Ipsum", tujuan: "Lorem Ipsum" },
    { nama: "Lorem Ipsum", instansi: "Lorem Ipsum", tujuan: "Lorem Ipsum" },
    { nama: "Lorem Ipsum", instansi: "Lorem Ipsum", tujuan: "Lorem Ipsum" },
    { nama: "Lorem Ipsum", instansi: "Lorem Ipsum", tujuan: "Lorem Ipsum" },
    { nama: "Lorem Ipsum", instansi: "Lorem Ipsum", tujuan: "Lorem Ipsum" },
    { nama: "Lorem Ipsum", instansi: "Lorem Ipsum", tujuan: "Lorem Ipsum" },
    { nama: "Lorem Ipsum", instansi: "Lorem Ipsum", tujuan: "Lorem Ipsum" },
    { nama: "Lorem Ipsum", instansi: "Lorem Ipsum", tujuan: "Lorem Ipsum" },
    { nama: "Lorem Ipsum", instansi: "Lorem Ipsum", tujuan: "Lorem Ipsum" },
    { nama: "Lorem Ipsum", instansi: "Lorem Ipsum", tujuan: "Lorem Ipsum" },
    { nama: "Lorem Ipsum", instansi: "Lorem Ipsum", tujuan: "Lorem Ipsum" },
];

export default function KelolaDataKunjungan() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dataKunjungan, setDataKunjungan] = useState(dataKunjunganDummy);

    useEffect(() => {
        document.title = "Sistem Presensi | Kelola Kunjungan";
    }, []);

    const handleDelete = (idx) => {
        if (window.confirm("Yakin ingin menghapus data kunjungan ini?")) {
            setDataKunjungan(dataKunjungan.filter((_, i) => i !== idx));
            alert("Data kunjungan berhasil dihapus!");
        }
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
                    activeMenu="kelola-kunjungan"
                />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-[#f5f5f5] dark:bg-[#374151] p-4 md:p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-[#18181B] dark:text-[#F9FAFB]">KELOLA KUNJUNGAN</h1>
                    </div>
                    <div className="bg-white dark:bg-[#1F2937] p-4 md:p-6 rounded-lg shadow-md overflow-x-auto">
                        <table className="w-full min-w-[600px] text-left text-sm border-collapse border border-[#E4E4E7] dark:border-[#374151]">
                            <thead className="bg-gray-100 dark:bg-[#374151]">
                                <tr>
                                    <th className="p-4 font-medium text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">No</th>
                                    <th className="p-4 font-medium text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">Nama</th>
                                    <th className="p-4 font-medium text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">Asal Instansi</th>
                                    <th className="p-4 font-medium text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">Tujuan</th>
                                    <th className="p-4 font-medium text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataKunjungan.map((row, idx) => (
                                    <tr key={idx} className="border-b border-[#E4E4E7] dark:border-[#374151]">
                                        <td className="p-4 text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">{idx + 1}</td>
                                        <td className="p-4 text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">{row.nama}</td>
                                        <td className="p-4 text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">{row.instansi}</td>
                                        <td className="p-4 text-[#18181B] dark:text-[#F9FAFB] border border-[#E4E4E7] dark:border-[#374151]">{row.tujuan}</td>
                                        <td className="p-4 border border-[#E4E4E7] dark:border-[#374151] text-center">
                                            <button
                                                className="delete-btn w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition"
                                                onClick={() => handleDelete(idx)}
                                                title="Hapus"
                                            >
                                                <span className="material-icons text-sm">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {dataKunjungan.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="text-center p-6 text-gray-400 dark:text-gray-500">Tidak ada data kunjungan</td>
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