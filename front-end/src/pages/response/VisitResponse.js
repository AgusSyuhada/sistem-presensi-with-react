import React from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";

export default function VisitResponse({ visitData }) {
    const navigate = useNavigate();
    const { id } = useParams();

    // Redirect to /visit-form if no visitData or invalid ID
    if (!visitData || !id) {
        return <Navigate to="/visit-form" replace />;
    }

    return (
        <main className="min-h-screen flex items-center justify-center p-4 bg-[#F3F4F6] dark:bg-[#1F2937] text-[#111827] dark:text-[#F9FAFB] font-[Poppins,sans-serif]">
            <div className="w-full max-w-md bg-white dark:bg-[#374151] rounded-lg shadow-lg p-6 md:p-8 text-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-[#111827] dark:text-[#F9FAFB]">
                    Kunjungan Berhasil
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
                <p className="text-base text-[#111827] dark:text-[#F9FAFB] mb-4">
                    Data kunjungan Anda telah berhasil disimpan. Terima kasih telah mengisi form.
                </p>
                {visitData && (
                    <div className="mb-6 text-left">
                        <h2 className="text-base font-semibold text-[#111827] dark:text-[#F9FAFB] mb-2">
                            Detail Kunjungan:
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-base text-[#111827] dark:text-[#F9FAFB]">
                            <li>
                                <span className="font-medium">Nama:</span> {visitData.nama}
                            </li>
                            <li>
                                <span className="font-medium">Asal Instansi:</span> {visitData.instansi}
                            </li>
                            <li>
                                <span className="font-medium">Tujuan:</span> {visitData.tujuan}
                            </li>
                        </ul>
                    </div>
                )}
                <button
                    className="inline-flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4CAF50] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4CAF50] transition duration-150 ease-in-out"
                    onClick={() => navigate("/visit-form")}
                >
                    <span className="material-symbols-outlined mr-2">arrow_back</span>
                    Kembali ke Form
                </button>
            </div>
        </main>
    );
}