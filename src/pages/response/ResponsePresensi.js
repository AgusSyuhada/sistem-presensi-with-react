import React from "react";
import { useNavigate } from "react-router-dom";

export default function ResponsePresensi() {
    const navigate = useNavigate();

    // Dummy data, bisa diganti dengan props/context sesuai kebutuhan
    const nama = "Lorem Ipsum";
    const tanggal = "12-08-2025";
    const lokasi = "Lorem Ipsum";

    return (
        <main className="min-h-screen flex items-center justify-center p-4 bg-[#F3F4F6] dark:bg-[#1F2937] text-[#111827] dark:text-[#F9FAFB] font-[Poppins,sans-serif]">
            <div className="w-full max-w-md bg-white dark:bg-[#374151] rounded-lg shadow-lg p-6 md:p-8 text-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-[#111827] dark:text-[#F9FAFB]">
                    Presensi Berhasil
                </h1>
                <div className="flex justify-center items-center my-6">
                    <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                        <span
                            className="material-symbols-outlined text-green-500"
                            style={{ fontSize: 60 }}
                        >
                            check
                        </span>
                    </div>
                </div>
                <div className="text-left my-8 space-y-2 text-[#111827] dark:text-[#F9FAFB]">
                    <p>
                        <span className="font-semibold">Nama:</span> {nama}
                    </p>
                    <p>
                        <span className="font-semibold">Tanggal:</span> {tanggal}
                    </p>
                    <p>
                        <span className="font-semibold">Lokasi:</span> {lokasi}
                    </p>
                </div>
                <button
                    className="inline-flex items-center justify-center w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#4CAF50] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4CAF50] transition duration-150 ease-in-out"
                    onClick={() => navigate("/presensi")}
                >
                    <span className="material-symbols-outlined mr-2">arrow_back</span>
                    Kembali ke Kamera
                </button>
            </div>
        </main>
    );
}