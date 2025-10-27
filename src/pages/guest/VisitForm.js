import React, { useEffect } from "react";
import { useVisitFormController } from "../../hooks/useVisitsController";

export default function VisitForm() {
    const { form, error, isSubmitting, handleChange, handleSubmit } = useVisitFormController();

    useEffect(() => {
        document.title = "MI Al Faizein - Form Kunjungan";
    }, []);

    return (
        <div className="bg-[#F3F4F6] dark:bg-[#1F2937] min-h-screen text-[#111827] dark:text-[#F9FAFB] font-[Poppins,sans-serif]">
            {/* Header */}
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
            {/* Main */}
            <main className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white dark:bg-[#374151] rounded-lg shadow-lg p-6 md:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-[#111827] dark:text-[#F9FAFB]">
                        FORM KUNJUNGAN
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div>
                                <label
                                    className="block text-sm font-medium text-[#111827] dark:text-[#F9FAFB]"
                                    htmlFor="nama"
                                >
                                    Nama
                                </label>
                                <div className="mt-1">
                                    <input
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] bg-white dark:bg-[#374151] text-[#111827] dark:text-[#F9FAFB]"
                                        id="nama"
                                        name="nama"
                                        placeholder="Nama"
                                        type="text"
                                        value={form.nama}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-medium text-[#111827] dark:text-[#F9FAFB]"
                                    htmlFor="instansi"
                                >
                                    Asal Instansi
                                </label>
                                <div className="mt-1">
                                    <input
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] bg-white dark:bg-[#374151] text-[#111827] dark:text-[#F9FAFB]"
                                        id="instansi"
                                        name="instansi"
                                        placeholder="Asal Instansi"
                                        type="text"
                                        value={form.instansi}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-medium text-[#111827] dark:text-[#F9FAFB]"
                                    htmlFor="tujuan"
                                >
                                    Tujuan
                                </label>
                                <div className="mt-1">
                                    <input
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] bg-white dark:bg-[#374151] text-[#111827] dark:text-[#F9FAFB]"
                                        id="tujuan"
                                        name="tujuan"
                                        placeholder="Tujuan"
                                        type="text"
                                        value={form.tujuan}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            {error && (
                                <div className="text-red-500 text-sm text-center">{error}</div>
                            )}
                            <div>
                                <button
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4CAF50] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4CAF50] transition duration-150 ease-in-out"
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
    );
}