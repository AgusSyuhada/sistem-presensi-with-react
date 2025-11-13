// front-end/src/hooks/useAttendanceController.js

import { useState, useEffect } from "react";
import { presensiApi } from "../data/presensiApi"; // API Anda
import { faceApi } from "../data/faceApi";       // API Wajah
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

// Opsi status (Shared, dari file Anda)
export const statusOptions = [
    { value: "Masuk", label: "Masuk", bg: "bg-green-200", color: "text-green-800" },
    { value: "Pulang", label: "Pulang", bg: "bg-blue-200", color: "text-blue-800" },
    { value: "Sakit", label: "Sakit", bg: "bg-yellow-200", color: "text-yellow-800" },
    { value: "Izin", label: "Izin", bg: "bg-red-200", color: "text-red-800" },
];

// Helper Style (Shared, dari file Anda)
export function getStatusStyle(status) {
    const opt = statusOptions.find((o) => o.value === status) || statusOptions[0];
    return `${opt.color} ${opt.bg}`;
}

/**
 * Helper untuk mendapatkan Geolocation sebagai Promise
 */
const getGeolocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation tidak didukung oleh browser Anda."));
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                resolve(`${latitude},${longitude}`);
            },
            (error) => {
                reject(new Error(`Gagal mendapatkan lokasi: ${error.message}`));
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    });
};


// ====================================================================
// HOOK 1: UNTUK PRESENSI (MARK ATTENDANCE) - INI YANG KITA GANTI
// ====================================================================

export const useAttendanceController = (videoRef) => {
    const [stream, setStream] = useState(null);
    const [currentFacingMode, setCurrentFacingMode] = useState("user");
    const [cameraError, setCameraError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [flashEnabled, setFlashEnabled] = useState(false);

    const [modal, setModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        isSuccess: false,
        id_presensi: null // Untuk navigasi setelah sukses
    });

    const navigate = useNavigate();

    // Fungsi untuk menyalakan kamera
    const startCamera = async (facingMode) => {
        try {
            if (stream) { stream.getTracks().forEach(track => track.stop()); }
            const constraints = { video: { facingMode }, audio: false };
            const newStream = await navigator.mediaDevices.getUserMedia(constraints);
            setStream(newStream);
            setCameraError(false);
        } catch (err) {
            console.error("Camera Error:", err);
            setCameraError(true);
        }
    };

    useEffect(() => {
        startCamera(currentFacingMode);
        return () => {
            if (stream) { stream.getTracks().forEach(track => track.stop()); }
        };
    }, [currentFacingMode]);

    // Fungsi untuk memutar kamera
    const handleRotate = () => {
        setCurrentFacingMode(prev => (prev === "user" ? "environment" : "user"));
    };

    // Fungsi untuk simulasi flash
    const handleFlash = () => {
        setFlashEnabled(true);
        setTimeout(() => setFlashEnabled(false), 150); // Durasi flash
    };

    /**
     * Alur Presensi Lengkap:
     * 1. Ambil foto
     * 2. Verifikasi wajah via faceApi.verify() (Backend memanggil /face/verify)
     * 3. Jika OK, ambil id_tendik
     * 4. Ambil koordinat GPS
     * 5. Kirim (id_tendik + koordinat) ke presensiApi.create() (Backend memanggil /presensi)
     */
    const handleCapture = async () => {
        if (!videoRef.current || !stream) {
            setModal({ isOpen: true, title: 'Error', message: 'Kamera belum siap.' });
            return;
        }
        setIsSubmitting(true);

        try {
            // 1. Ambil gambar dari video
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));

            // 2. Buat FormData untuk verifikasi (hanya foto)
            const formData = new FormData();
            formData.append('foto', blob, 'verify.jpg'); // Sesuai 'faceRoutes.js'

            // 3. Panggil API Verifikasi Wajah (Langkah 1)
            const verifyResponse = await faceApi.verify(formData);
            const { id_tendik } = verifyResponse.data.data;
            if (!id_tendik) {
                throw new Error("Wajah terverifikasi, namun ID Tendik tidak ditemukan.");
            }

            // 4. Ambil Lokasi (Langkah 2)
            const koordinat_lokasi = await getGeolocation();

            // 5. Kirim data presensi (Langkah 3)
            const presensiData = { id_tendik, koordinat_lokasi };
            // Panggil API dari presensiApi.js (POST /api/presensi)
            const presensiResponse = await presensiApi.create(presensiData);

            // 6. Sukses: Tampilkan modal
            setModal({
                isOpen: true,
                title: 'Presensi Berhasil',
                message: presensiResponse.message || 'Presensi Anda telah dicatat.',
                isSuccess: true,
                id_presensi: presensiResponse.data.id_presensi
            });

        } catch (error) {
            // 7. Gagal: Tampilkan modal error
            setModal({
                isOpen: true,
                title: 'Presensi Gagal',
                message: error.response?.data?.error || error.response?.data?.message || error.message,
                isSuccess: false
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Fungsi untuk menutup modal
    const closeModal = () => {
        const { isSuccess, id_presensi } = modal; // Ambil data sebelum reset
        setModal({ isOpen: false, title: '', message: '', isSuccess: false });

        // Jika sukses, navigasi ke halaman respons
        if (isSuccess && id_presensi) {
            navigate(`/attendance-response/${id_presensi}`);
        }
    };

    return {
        stream,
        cameraError,
        isSubmitting,
        modal,
        flashEnabled,
        handleRotate,
        handleFlash,
        handleCapture, // Kirim fungsi capture yang benar
        closeModal
    };
};

// ====================================================================
// HOOK 2: UNTUK RIWAYAT (HISTORY) - INI MILIK ANDA (Tidak diubah)
// ====================================================================

export const useAttendanceHistoryController = () => {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Sistem Presensi | Riwayat Presensi";
        if (!user) {
            setError("Anda harus login untuk melihat riwayat presensi");
            setIsLoading(false);
            navigate("/login", { replace: true });
            return;
        }
        setIsLoading(true);

        // PENTING: Ini memanggil getByUserId(user.id)
        // Pastikan backend Anda punya route GET /api/presensi/user/:id_tendik
        presensiApi.getByUserId(user.id)
            .then(data => setHistory(data))
            .catch(err => setError("Gagal memuat data riwayat presensi: " + (err.response?.data?.error || err.message)))
            .finally(() => setIsLoading(false));
    }, [user, navigate]);

    return {
        history,
        isLoading,
        error,
        sidebarOpen,
        setSidebarOpen,
        getStatusStyle,
    };
};

// ====================================================================
// HOOK 3: UNTUK ADMIN - INI MILIK ANDA (Tidak diubah)
// ====================================================================

export const useAttendanceAdminController = () => {
    const [presensi, setPresensi] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingIdx, setEditingIdx] = useState(null);
    const [editStatus, setEditStatus] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [modal, setModal] = useState({
        isOpen: false,
        title: "",
        message: "",
        onConfirm: null,
    });

    useEffect(() => {
        document.title = "Sistem Presensi | Kelola Data Presensi";
        setIsLoading(true);
        presensiApi.getAll()
            .then(data => {
                setPresensi(data.map((d, idx) => ({ ...d, originalIndex: idx })));
            })
            .catch(err => setError("Gagal memuat data: " + (err.response?.data?.error || err.message)))
            .finally(() => setIsLoading(false));
    }, []);

    const handleEdit = (index) => {
        setEditingIdx(index);
        setEditStatus(presensi[index].status);
    };

    const handleCancel = () => setEditingIdx(null);

    const handleSave = (index) => {
        const item = presensi[index];
        setIsLoading(true);

        const updateData = { status: editStatus, catatan: '' }; // Sesuaikan dengan backend

        presensiApi.updateStatus(item.id_presensi || item.id, updateData)
            .then(updatedItem => {
                const updatedList = [...presensi];
                updatedList[index].status = updatedItem.status; // Pastikan backend mengembalikan status baru
                setPresensi(updatedList);
                setEditingIdx(null);
                setModal({
                    isOpen: true,
                    title: "Sukses",
                    message: `Status berhasil diubah menjadi: ${editStatus}`,
                    onConfirm: null,
                });
            })
            .catch(err => setError("Gagal menyimpan data: " + (err.response?.data?.error || err.message)))
            .finally(() => setIsLoading(false));
    };

    const handleDelete = (index) => {
        setModal({
            isOpen: true,
            title: "Konfirmasi Hapus",
            message: "Yakin ingin menghapus data ini?",
            onConfirm: () => performDelete(index),
        });
    };

    const performDelete = (index) => {
        // ... (Logika delete Anda, saat ini di-skip) ...
        alert('DELETE belum diimplementasikan di backend');
        setIsLoading(false);
    };

    const closeModal = () => {
        setModal({ isOpen: false, title: "", message: "", onConfirm: null });
    };

    return {
        presensi,
        isLoading,
        error,
        editingIdx,
        editStatus,
        setEditStatus,
        sidebarOpen,
        setSidebarOpen,
        modal,
        handleEdit,
        handleCancel,
        handleSave,
        handleDelete,
        closeModal,
        statusOptions,
        getStatusStyle,
    };
};