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

export default function TambahAkunGuru() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        pegid: "",
        nama: "",
        jabatan: "",
        password: "",
        tempatLahir: "",
        tanggalLahir: "",
        tanggalMasuk: "",
    });

    useEffect(() => {
        document.title = "Sistem Presensi | Tambah Akun Guru";
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simpan data ke backend di sini
        alert("Akun guru berhasil ditambahkan!");
        // Reset form jika perlu
        setForm({
            pegid: "",
            nama: "",
            jabatan: "",
            password: "",
            tempatLahir: "",
            tanggalLahir: "",
            tanggalMasuk: "",
        });
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
                />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-[#f5f5f5] dark:bg-[#374151] p-4 md:p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-[#18181B] dark:text-[#F9FAFB]">TAMBAH AKUN GURU</h1>
                    </div>
                    <div className="bg-white dark:bg-[#1F2937] p-4 md:p-6 rounded-lg shadow-md">
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
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
                                            onClick={() => setShowPassword((v) => !v)}
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
                                    className="w-full bg-[#4caf50] text-white font-bold py-2.5 px-4 rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}