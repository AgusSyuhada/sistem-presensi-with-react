import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";

const sidebarMenu = [
    {
        key: "riwayat-presensi",
        label: "History Presensi",
        icon: "history",
        href: "/riwayat-presensi",
    },
    {
        key: "profil",
        label: "Profil",
        icon: "person",
        href: "/profil",
    },
];

export default function Profil() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        document.title = "Sistem Presensi | Profil";
    }, []);

    // Data profil dummy
    const profil = {
        pegid: "123 456 789",
        nama: "John Doe",
        jabatan: "Guru",
        tempatLahir: "Jakarta",
        tanggalLahir: "01-01-1990",
        tanggalMasuk: "15-07-2015",
        foto: "/asset/pexels-justin-shaifer-501272-1222271.jpg",
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
                {/* Sidebar */}
                <Sidebar
                    open={sidebarOpen}
                    setOpen={setSidebarOpen}
                    menuList={sidebarMenu}
                    activeMenu="profil"
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
                    {/* Judul + Tombol Face ID */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-[#18181B] dark:text-[#F9FAFB]">PROFIL</h1>
                        {/* Desktop: ikon + teks | Mobile: hanya ikon */}
                        <button className="md:flex items-center hidden bg-[#4caf50] text-white px-4 py-2 rounded-lg">
                            <span className="material-icons mr-2">face</span>
                            Registrasi Wajah
                        </button>
                        <button className="md:hidden bg-[#4caf50] text-white w-10 h-10 rounded-lg flex items-center justify-center">
                            <span className="material-icons">face</span>
                        </button>
                    </div>

                    <div className="bg-white dark:bg-[#1F2937] p-4 md:p-6 rounded-lg shadow-md">
                        <div className="flex justify-center mb-6">
                            <img
                                alt="Foto Profil"
                                className="h-24 w-24 md:h-32 md:w-32 rounded-full object-cover"
                                src={profil.foto}
                            />
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">PEGID</label>
                                <div className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md cursor-not-allowed">
                                    {profil.pegid}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Nama</label>
                                <div className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md cursor-not-allowed">
                                    {profil.nama}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Jabatan</label>
                                <div className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md cursor-not-allowed">
                                    {profil.jabatan}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Tempat Lahir</label>
                                <div className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md cursor-not-allowed">
                                    {profil.tempatLahir}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Tanggal Lahir</label>
                                <div className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md cursor-not-allowed">
                                    {profil.tanggalLahir}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Tanggal Masuk</label>
                                <div className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md cursor-not-allowed">
                                    {profil.tanggalMasuk}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}