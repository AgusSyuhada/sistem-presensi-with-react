import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { faceApi } from '../data/faceApi'; // Gunakan API yang baru dibuat

export const useFaceRegistrationController = (videoRef) => {
    const [stream, setStream] = useState(null);
    const [currentFacingMode, setCurrentFacingMode] = useState("user");
    const [cameraError, setCameraError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [flashEnabled, setFlashEnabled] = useState(false);

    // State untuk mengelola modal
    const [modal, setModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        isSuccess: false // Untuk tahu apakah harus navigasi saat ditutup
    });

    const { user } = useAuth();
    const navigate = useNavigate();

    // Fungsi untuk menyalakan kamera
    const startCamera = async (facingMode) => {
        try {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
            const constraints = { video: { facingMode: facingMode }, audio: false };
            const newStream = await navigator.mediaDevices.getUserMedia(constraints);
            setStream(newStream);
            setCameraError(false);
        } catch (err) {
            console.error("Camera Error:", err);
            setCameraError(true);
        }
    };

    // Nyalakan kamera saat komponen dimuat
    useEffect(() => {
        startCamera(currentFacingMode);
        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [currentFacingMode]);

    // Fungsi untuk memutar kamera
    const handleRotate = () => {
        setCurrentFacingMode((prev) => (prev === "user" ? "environment" : "user"));
    };

    const handleFlash = () => {
        setFlashEnabled(true);
        setTimeout(() => {
            setFlashEnabled(false);
        }, 150); // Durasi flash
    };

    // Fungsi untuk mengambil gambar dan registrasi
    const handleRegisterCapture = async () => {
        if (!videoRef.current || !stream) {
            setModal({ isOpen: true, title: 'Error', message: 'Kamera belum siap.' });
            return;
        }
        if (!user || !user.id) {
            setModal({ isOpen: true, title: 'Error', message: 'Sesi tidak valid, silakan login kembali.' });
            return;
        }

        setIsSubmitting(true);

        try {
            // 1. Ambil gambar dari video sebagai Blob
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));

            // 2. Buat FormData sesuai ekspektasi backend (faceRoutes.js & faceController.js)
            const formData = new FormData();
            formData.append('id_tendik', user.id); // Ini akan jadi req.body.id_tendik
            formData.append('foto', blob, 'registration.jpg'); // Ini akan jadi req.file (nama field 'foto')

            // 3. Panggil API registrasi
            const response = await faceApi.register(formData);

            // 4. Tampilkan modal sukses
            setModal({
                isOpen: true,
                title: 'Registrasi Berhasil',
                message: response.data.message || 'Wajah Anda telah berhasil didaftarkan.',
                isSuccess: true
            });

        } catch (error) {
            // 5. Tampilkan modal error
            setModal({
                isOpen: true,
                title: 'Registrasi Gagal',
                message: error.response?.data?.error || error.message || 'Terjadi kesalahan.',
                isSuccess: false
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Fungsi untuk menutup modal
    const closeModal = () => {
        const wasSuccess = modal.isSuccess; // Cek status sebelum di-reset
        setModal({ isOpen: false, title: '', message: '', isSuccess: false });

        // Jika sukses, navigasi kembali ke profil
        if (wasSuccess) {
            navigate('/dashboard/profile');
        }
    };

    return {
        stream,
        cameraError,
        isSubmitting,
        modal,
        flashEnabled, // <-- 3. Ekspor state flash
        handleRotate,
        handleFlash, // <-- 4. Ekspor fungsi flash
        handleRegisterCapture,
        closeModal
    };
};