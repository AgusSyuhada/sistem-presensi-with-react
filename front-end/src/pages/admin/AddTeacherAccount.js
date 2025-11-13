import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Modal from "../../components/Modal";
import { useAddTeacherController } from "../../hooks/useAddTeacherController";

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
    // 1. Controller sudah terhubung
    const {
        sidebarOpen, setSidebarOpen,
        showPassword, toggleShowPassword,
        form, isLoading, error, modal,
        handleChange, handleSubmit, closeModal,
    } = useAddTeacherController();

    return (
        <div className="font-sans flex flex-col h-screen bg-[#f5f5ff] dark:bg-[#1F2937]">
            {/* Header (tetap sama) */}
            <header className="h-16 bg-[#4caf50] flex items-center px-4 z-20 shrink-0 relative">
                <button className="md:hidden text-white mr-3 focus:outline-none" onClick={() => setSidebarOpen((v) => !v)} id="hamburger" aria-label={sidebarOpen ? "Tutup menu" : "Buka menu"} type="button">
                    <span className="material-icons" id="hamburger-icon">menu</span>
                </button>
                <div className="hidden md:flex items-center">
                    <img alt="MI ALFAIZEIN Logo" className="h-8 w-8 mr-3" src="/asset/logo-mi-al-faizein.png" />
                    <span className="text-white text-xl font-bold">MI AL FAIZEIN</span>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} menuList={sidebarMenu} activeMenu="kelola-akun-guru" />

                <main className="flex-1 overflow-y-auto bg-[#f5f5f5] dark:bg-[#374151] p-4 md:p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-[#18181B] dark:text-[#F9FAFB]">TAMBAH AKUN GURU</h1>
                        <Link to="/dashboard/manage-accounts" className="flex items-center text-sm text-[#4caf50] hover:underline">
                            <span className="material-icons mr-1 text-base">arrow_back</span>
                            Kembali
                        </Link>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <strong className="font-bold">Error!</strong>
                            <span className="block sm:inline"> {error}</span>
                        </div>
                    )}

                    <div className="bg-white dark:bg-[#1F2937] p-4 md:p-6 rounded-lg shadow-md">
                        {/* 2. Form terhubung dengan handleSubmit */}
                        <form onSubmit={handleSubmit}>
                            {/* 3. Grid untuk layout yang lebih rapi */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">

                                {/* Ganti 'pegid' ke 'id_tendik' */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="id_tendik">PEGID (ID Tendik)</label>
                                    <input id="id_tendik" name="id_tendik" type="text" className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md" placeholder="Masukkan PEGID" value={form.id_tendik} onChange={handleChange} required />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="nama">Nama Lengkap</label>
                                    <input id="nama" name="nama" type="text" className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md" placeholder="Masukkan Nama" value={form.nama} onChange={handleChange} required />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="email">Email</label>
                                    <input id="email" name="email" type="email" className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md" placeholder="Masukkan Email" value={form.email} onChange={handleChange} required />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="password">Password</label>
                                    <div className="relative">
                                        <input id="password" name="password" type={showPassword ? "text" : "password"} className="w-full px-3 py-2 pr-10 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md" placeholder="Masukkan Password" value={form.password} onChange={handleChange} required />
                                        <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={toggleShowPassword} tabIndex={-1} aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}>
                                            <span className="material-icons text-gray-500 dark:text-gray-400 select-none">{showPassword ? "visibility" : "visibility_off"}</span>
                                        </button>
                                    </div>
                                </div>

                                <hr className="md:col-span-2 my-2 border-gray-200 dark:border-gray-700" />

                                {/* Ganti input Jabatan menjadi <select> */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="id_jabatan">Jabatan</label>
                                    <select id="id_jabatan" name="id_jabatan" className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md" value={form.id_jabatan} onChange={handleChange} required>
                                        <option value={1}>Operator</option>
                                        <option value={2}>Staff</option>
                                        {/* Tambahkan jabatan lain jika ada */}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="golongan">Golongan</label>
                                    <input id="golongan" name="golongan" type="text" className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md" placeholder="Contoh: III/a" value={form.golongan} onChange={handleChange} />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="tanggal_masuk">Tanggal Masuk</label>
                                    <input id="tanggal_masuk" name="tanggal_masuk" type="date" className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md" value={form.tanggal_masuk} onChange={handleChange} />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="status_tendik">Status Tendik</label>
                                    <select id="status_tendik" name="status_tendik" className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md" value={form.status_tendik} onChange={handleChange}>
                                        <option value="Aktif">Aktif</option>
                                        <option value="Non-Aktif">Non-Aktif</option>
                                        <option value="Cuti">Cuti</option>
                                    </select>
                                </div>

                                <hr className="md:col-span-2 my-2 border-gray-200 dark:border-gray-700" />

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="gelar_depan">Gelar Depan</label>
                                    <input id="gelar_depan" name="gelar_depan" type="text" className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md" placeholder="Contoh: Drs." value={form.gelar_depan} onChange={handleChange} />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="gelar_belakang">Gelar Belakang</label>
                                    <input id="gelar_belakang" name="gelar_belakang" type="text" className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md" placeholder="Contoh: S.Pd." value={form.gelar_belakang} onChange={handleChange} />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="tempat_lahir">Tempat Lahir</label>
                                    <input id="tempat_lahir" name="tempat_lahir" type="text" className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md" placeholder="Masukkan Tempat Lahir" value={form.tempat_lahir} onChange={handleChange} />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="tanggal_lahir">Tanggal Lahir</label>
                                    <input id="tanggal_lahir" name="tanggal_lahir" type="date" className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md" value={form.tanggal_lahir} onChange={handleChange} />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="jenis_kelamin">Jenis Kelamin</label>
                                    <select id="jenis_kelamin" name="jenis_kelamin" className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md" value={form.jenis_kelamin} onChange={handleChange}>
                                        <option value="Laki-laki">Laki-laki</option>
                                        <option value="Perempuan">Perempuan</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="agama">Agama</label>
                                    <select id="agama" name="agama" className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md" value={form.agama} onChange={handleChange}>
                                        <option value="Islam">Islam</option>
                                        <option value="Kristen Protestan">Kristen Protestan</option>
                                        <option value="Kristen Katolik">Kristen Katolik</option>
                                        <option value="Hindu">Hindu</option>
                                        <option value="Buddha">Buddha</option>
                                        <option value="Konghucu">Konghucu</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="pendidikan">Pendidikan Terakhir</label>
                                    <input id="pendidikan" name="pendidikan" type="text" className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md" placeholder="Contoh: S1 Pendidikan Agama Islam" value={form.pendidikan} onChange={handleChange} />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="no_telp">No. Telepon</label>
                                    <input id="no_telp" name="no_telp" type="tel" className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-[#374151] border border-gray-300 dark:border-gray-600 rounded-md" placeholder="Masukkan No. Telepon" value={form.no_telp} onChange={handleChange} />
                                </div>

                            </div>

                            <div className="mt-6">
                                <button type="submit" className={`w-full bg-[#4caf50] text-white font-bold py-2.5 px-4 rounded-lg hover:bg-green-600 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isLoading}>
                                    {isLoading ? "Menyimpan..." : "Simpan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>

            {/* Modal (tetap sama) */}
            <Modal isOpen={modal.isOpen} onClose={closeModal} title={modal.title}>
                <p className="text-gray-700 dark:text-gray-300">{modal.message}</p>
                <div className="flex justify-end gap-3 mt-5">
                    <button onClick={closeModal} className="px-4 py-2 bg-[#4caf50] text-white rounded-lg hover:bg-opacity-90 transition">OK</button>
                </div>
            </Modal>
        </div>
    );
}