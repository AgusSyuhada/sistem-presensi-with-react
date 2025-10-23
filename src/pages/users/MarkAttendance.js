import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Presensi() {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [currentFacingMode, setCurrentFacingMode] = useState("user");
    const [flashEnabled, setFlashEnabled] = useState(false);
    const [cameraError, setCameraError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "MI Al Faizein - Presensi";
        startCamera(currentFacingMode);

        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
        // eslint-disable-next-line
    }, [currentFacingMode]);

    const startCamera = async (facingMode = "user") => {
        try {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
            const constraints = {
                video: { facingMode: facingMode },
                audio: false,
            };
            const newStream = await navigator.mediaDevices.getUserMedia(constraints);
            if (videoRef.current) {
                videoRef.current.srcObject = newStream;
            }
            setStream(newStream);
            setCameraError(false);
            setFlashEnabled(false);
        } catch (err) {
            setCameraError(true);
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
        }
    };

    const handleFlash = () => {
        setFlashEnabled((prev) => !prev);
        alert(!flashEnabled ? "Flash diaktifkan (simulasi)" : "Flash dinonaktifkan (simulasi)");
    };

    const handleRotate = () => {
        setCurrentFacingMode((prev) => (prev === "user" ? "environment" : "user"));
    };

    const handleCapture = () => {
        if (!stream) {
            alert("Kamera belum siap!");
            return;
        }
        navigate("/response-presensi");
    };

    return (
        <div className="flex flex-col h-screen font-[Poppins,sans-serif] bg-[#F3F4F6] dark:bg-[#1F2937] text-[#111827] dark:text-[#F9FAFB]">
            {/* Header */}
            <header className="bg-[#4CAF50] shadow-md shrink-0">
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

            {/* Main Content */}
            <main className="flex-grow flex flex-col min-h-0">
                {/* Camera Preview */}
                <div className="flex-grow flex items-center justify-center bg-black relative overflow-hidden">
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
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
                </div>

                {/* Controls */}
                <div className="bg-[#4CAF50] p-6 shrink-0">
                    <div className="flex items-center justify-center space-x-4">
                        <button
                            type="button"
                            onClick={handleFlash}
                            className="bg-white/30 p-3 rounded-full aspect-square flex items-center justify-center text-white"
                        >
                            <span className="material-symbols-outlined text-2xl select-none">
                                {flashEnabled ? "flash_on" : "flash_off"}
                            </span>
                        </button>
                        <button
                            type="button"
                            onClick={handleCapture}
                            className="p-4 bg-white rounded-full aspect-square flex items-center justify-center"
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
    );
}