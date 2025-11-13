import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useFaceRegistrationController } from "../../hooks/useFaceRegistrationController"; // <-- 1. Gunakan hook baru
import Modal from "../../components/Modal"; // <-- 2. Impor Modal

export default function RegisterFace() {
    const videoRef = useRef(null);
    const {
        stream,
        cameraError,
        isSubmitting,
        modal,
        flashEnabled, // <-- 1. Dapatkan state flash
        handleRotate,
        handleFlash, // <-- 2. Dapatkan fungsi flash
        handleRegisterCapture,
        closeModal
    } = useFaceRegistrationController(videoRef); // <-- 1. Gunakan hook baru

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <> {/* Tambahkan Fragment agar bisa menampung Modal */}
            <div className="flex flex-col h-screen font-[Poppins,sans-serif] bg-[#F3F4F6] dark:bg-[#1F2937] text-[#111827] dark:text-[#F9FAFB]">

                {/* Header (Sudah benar dengan tombol kembali) */}
                <header className="bg-[#4CAF50] shadow-md shrink-0">
                    <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Tombol kembali di kiri, Judul di tengah */}
                        <div className="flex items-center justify-between h-16">
                            {/* Tombol Kembali */}
                            <Link to="/dashboard/profile" className="text-white p-2 rounded-full hover:bg-white/10">
                                <span className="material-symbols-outlined">arrow_back</span>
                            </Link>

                            {/* Logo + Judul Tengah */}
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

                            {/* Placeholder agar judul tetap di tengah */}
                            <div className="w-10"></div>
                        </div>
                    </nav>
                </header>

                {/* Main Content */}
                <main className="flex-grow flex flex-col min-h-0">
                    {/* Camera Preview */}
                    <div className="bg-gray-100 dark:bg-gray-800 p-2 text-center shadow-sm">
                        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                            Registrasi Wajah
                        </h2>
                    </div>
                    <div className="flex-grow flex items-center justify-center bg-black relative overflow-hidden">
                        <video
                            ref={videoRef}
                            // Layout kamera (object-contain) sudah benar
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

                    {/* Kontrol (Tombol Flash dihapus) */}
                    <div className="bg-[#4CAF50] p-6 shrink-0">
                        <div className="flex items-center justify-center space-x-4">
                            <button
                                type="button"
                                onClick={handleFlash}
                                className="bg-white/30 p-3 rounded-full aspect-square flex items-center justify-center text-white"
                            >
                                <span className="material-symbols-outlined text-2xl select-none">
                                    {/* Ikon bisa flash_on atau flash_auto, sesuai selera */}
                                    flash_on
                                </span>
                            </button>
                            <button
                                type="button"
                                onClick={handleRegisterCapture} // <-- 6. Gunakan fungsi registrasi
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

            {/* 7. Render Modal */}
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