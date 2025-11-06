import React, { useEffect } from "react";
import { useVisitFormController } from "../../hooks/useVisitsController";
import Modal from "../../components/Modal"; // <-- 1. IMPORT MODAL

export default function VisitForm() {
    const {
        form,
        error,
        isSubmitting,
        modal, // <-- 2. DAPATKAN STATE MODAL
        handleChange,
        handleSubmit,
        closeModal // <-- 3. DAPATKAN FUNGSI CLOSE
    } = useVisitFormController();

    useEffect(() => {
        document.title = "MI Al Faizein - Form Kunjungan";
    }, []);

    return (
        <> {/* <-- 4. TAMBAHKAN FRAGMENT */}
            <div className="bg-[#F3F4F6] dark:bg-[#1F2937] min-h-screen text-[#111827] dark:text-[#F9FAFB] font-[Poppins,sans-serif]">
                {/* Header (Tidak berubah) */}
            <header className="bg-[#4CAF50] shadow-md">
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center h-16">
                        <div className="flex items-center">
                            <img
                                alt="MI AL FAIZEIN Logo"
                                className="h-8 w-auto"
                                src="/asset/logo-mi-al-faizein.png"
                            />
                            <span className="text-white text-lg font-semibold ml-3">
                                MI AL FAIZEIN
                            </span>
                        </div>
                    </div>
                </nav>
            </header>

                <main className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
                    <div className="w-full max-w-lg bg-white dark:bg-[#374151] rounded-lg shadow-lg p-6 md:p-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-[#111827] dark:text-[#F9FAFB]">
                            FORM KUNJUNGAN
                        </h1>

                        <form onSubmit={handleSubmit}>
                            {/* --- 5. PERUBAHAN: Hapus grid, ganti space-y-6 ke space-y-4 --- */}
                            <div className="space-y-4">

                                {/* --- Field ditumpuk ke bawah --- */}
                                <div>
                                    <label className="block text-sm font-medium" htmlFor="gelar_depan">Gelar Depan (Opsional)</label>
                                    <input
                                        className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] bg-white dark:bg-[#374151]"
                                        id="gelar_depan"
                                        name="gelar_depan"
                                        placeholder="Dr."
                                        type="text"
                                        value={form.gelar_depan}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium" htmlFor="nama_tamu">Nama Tamu*</label>
                                    <input
                                        className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] bg-white dark:bg-[#374151]"
                                        id="nama_tamu"
                                        name="nama_tamu"
                                        placeholder="Nama Lengkap"
                                        type="text"
                                        value={form.nama_tamu}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium" htmlFor="gelar_belakang">Gelar Belakang (Opsional)</label>
                                    <input
                                        className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] bg-white dark:bg-[#374151]"
                                        id="gelar_belakang"
                                        name="gelar_belakang"
                                        placeholder="S.Kom"
                                        type="text"
                                        value={form.gelar_belakang}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium" htmlFor="asal_instansi">Asal Instansi*</label>
                                    <input
                                        className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] bg-white dark:bg-[#374151]"
                                        id="asal_instansi"
                                        name="asal_instansi"
                                        placeholder="Nama Instansi"
                                        type="text"
                                        value={form.asal_instansi}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium" htmlFor="jenis_kelamin">Jenis Kelamin*</label>
                                    <select
                                        className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] bg-white dark:bg-[#374151]"
                                        id="jenis_kelamin"
                                        name="jenis_kelamin"
                                        value={form.jenis_kelamin}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option>Laki-laki</option>
                                        <option>Perempuan</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium" htmlFor="no_telp">No. Telepon*</label>
                                    <input
                                        className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] bg-white dark:bg-[#374151]"
                                        id="no_telp"
                                        name="no_telp"
                                        placeholder="08..."
                                        type="tel"
                                        value={form.no_telp}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium" htmlFor="tujuan">Tujuan Kunjungan*</label>
                                    <textarea
                                        className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] bg-white dark:bg-[#374151]"
                                        id="tujuan"
                                        name="tujuan"
                                        placeholder="Tujuan kunjungan..."
                                        rows={3}
                                        value={form.tujuan}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* --- AKHIR PERUBAHAN FORM --- */}

                                {error && (
                                    <div className="text-red-500 text-sm text-center">{error}</div>
                                )}
                                <div>
                                    <button
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4CAF50] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4CAF50] transition duration-150 ease-in-out disabled:opacity-50"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Menyimpan..." : "Simpan"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
            </div>

            {/* --- 6. RENDER MODAL DI SINI --- */}
            <Modal
                isOpen={modal.isOpen}
                onClose={closeModal}
                title="Sukses"
            >
                <p className="text-gray-700 dark:text-gray-300">
                    {modal.message}
                </p>
                <div className="flex justify-end gap-3 mt-5">
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-opacity-90 transition"
                    >
                        OK
                    </button>
                </div>
            </Modal>
        </>
    );
}