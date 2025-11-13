// front-end/src/pages/users/MarkAttendance.js

import React, { useEffect, useRef } from "react";
// 1. Panggil hook yang benar (file yang baru saja kita edit)
import { useAttendanceController } from "../../hooks/useAttendanceController";
import Modal from "../../components/Modal"; // 2. Impor Modal

export default function MarkAttendance() {
    const videoRef = useRef(null);

    // 3. Panggil hook DENGAN videoRef
    const {
        stream,
        cameraError,
        isSubmitting,
        modal,
        flashEnabled,
        handleRotate,
        handleFlash,
        handleCapture,
        closeModal
    } = useAttendanceController(videoRef);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <> {/* Tambahkan Fragment untuk Modal */}
            <div className="flex flex-col h-screen font-[Poppins,sans-serif] bg-[#F3F4F6] dark:bg-[#1F2937] text-[#111827] dark:text-[#F9FAFB]">

                {/* Header (Tanpa tombol kembali, sesuai permintaan) */}
                <header className="bg-[#4CAF50] shadow-md shrink-0">
                    <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-center h-16">
                            <div className="flex items-center">
                                <img
                                    alt="MI AL FAIZEIN Logo"
                                    className="h-8 w-auto"
                                    src="/asset/logo-mi-al-faizein.png"
                                    fetchPriority="high"
                                />
                                <span className="text-white text-lg font-semibold ml-3">
                                    MI AL FAIZEIN
                                </span>
                            </div>
                        </div>
                    </nav>
                </header>

                {/* Main Content */}
                <main className="flex-grow flex flex-col min-h-0">

                    {/* Sub-header (Seperti RegisterFace) */}
                    <div className="bg-gray-100 dark:bg-gray-800 p-2 text-center shadow-sm">
                        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                            Presensi
                        </h2>
                    </div>

                    {/* Camera Preview (Layout 'object-contain') */}
                    <div className="flex-grow flex items-center justify-center bg-black relative overflow-hidden">
                        <video
                            ref={videoRef}
                            className="w-full h-full object-contain"
                            playsInline
                            muted
                            autoPlay
                            style={{ background: "#000" }}
                        />
                        {cameraError && (
                            <div className="absolute inset-0 flex items-center justify-center text-white bg-black/70">
                                Kamera tidak tersedia
                            </div>
                        )}
                        {flashEnabled && (
                            <div className="absolute inset-0 bg-white opacity-70 pointer-events-none"></div>
                        )}
                    </div>

                    {/* Kontrol (3 Tombol, sama seperti RegisterFace) */}
                    <div className="bg-[#4CAF50] p-6 shrink-0">
                        <div className="flex items-center justify-center space-x-4">
                            <button
                                type="button"
                                onClick={handleFlash}
                                className="bg-white/30 p-3 rounded-full aspect-square flex items-center justify-center text-white"
                            >
                                <span className="material-symbols-outlined text-2xl select-none">
                                    flash_on
                                </span>
                            </button>
                            <button
                                type="button"
                                onClick={handleCapture}
                                disabled={isSubmitting}
                                className="p-4 bg-white rounded-full aspect-square flex items-center justify-center disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined text-4xl text-[#4CAF50] select-none">
                                    photo_camera
                                </span>
                            </button>
                            <button
                                type="button"
                                onClick={handleRotate}
                                className="bg-white/30 p-3 rounded-full aspect-square flex items-center justify-center text-white"
                            >
                                <span className="material-symbols-outlined text-2xl select-none">
                                    cameraswitch
                                </span>
                            </button>
                        </div>
                    </div>
                </main>
            </div>

            {/* Modal untuk Pop-up Sukses/Error */}
            <Modal
                isOpen={modal.isOpen}
                onClose={closeModal}
                title={modal.title}
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