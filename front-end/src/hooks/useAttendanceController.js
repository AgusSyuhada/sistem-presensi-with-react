// Modifikasi file: front-end/src/hooks/useAttendanceController.js
// (Ganti import dan logika dari data dummy ke presensiApi real)
// Hapus import attendance.js dan attendanceData.js yang lama, ganti dengan presensiApi
// Hapus statusOptions dan getStatusStyle dari import attendance, pindahkan ke sini atau buat shared

import { useState, useEffect } from "react";
import { presensiApi } from "../data/presensiApi"; // Import API baru
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

// Opsi status (Shared, pindah dari attendanceData.js)
export const statusOptions = [
    { value: "masuk", label: "Masuk", bg: "bg-green-200", color: "text-green-800" }, // Sesuaikan dengan backend
    { value: "pulang", label: "Pulang", bg: "bg-blue-200", color: "text-blue-800" },
    { value: "sakit", label: "Sakit", bg: "bg-yellow-200", color: "text-yellow-800" },
    { value: "izin", label: "Izin", bg: "bg-red-200", color: "text-red-800" },
    // Tambahkan jika ada status lain seperti 'Alpa'
];

// Helper Style (Shared, pindah dari attendanceData.js)
export function getStatusStyle(status) {
    const opt = statusOptions.find((o) => o.value === status) || statusOptions[0]; // Default ke Masuk
    return `${opt.color} ${opt.bg}`;
}

export const useAttendanceUserController = () => {
    const [stream, setStream] = useState(null);
    const [currentFacingMode, setCurrentFacingMode] = useState("user");
    const [flashEnabled, setFlashEnabled] = useState(false);
    const [cameraError, setCameraError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        document.title = "MI Al Faizein - Presensi";
        startCamera(currentFacingMode);

        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
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
            setStream(newStream);
            setCameraError(false);
            setFlashEnabled(false);
        } catch (err) {
            setCameraError(true);
        }
    };

    const handleFlash = () => {
        setFlashEnabled((prev) => !prev);
        alert(!flashEnabled ? "Flash diaktifkan (simulasi)" : "Flash dinonaktifkan (simulasi)");
    };

    const handleRotate = () => {
        setCurrentFacingMode((prev) => (prev === "user" ? "environment" : "user"));
    };

    const handleCapture = async () => {
        if (!stream) {
            alert("Kamera belum siap!");
            return;
        }
        if (!user) {
            alert("Anda harus login untuk melakukan presensi!");
            navigate("/login");
            return;
        }
        setIsSubmitting(true);

        // === PERUBAHAN: Data untuk POST ke API real ===
        // Asumsikan Anda punya face_descriptor dari face recognition (misalnya via library seperti face-api.js)
        // Di sini simulasi, ganti dengan data real dari capture
        const face_descriptor = [/* array descriptor wajah dari capture */]; // Placeholder
        const koordinat_lokasi = "lat,lng"; // Dapatkan dari geolocation

        const presensiData = {
            face_descriptor,
            koordinat_lokasi,
        };

        try {
            const response = await presensiApi.create(presensiData);
            navigate(`/attendance-response/${response.data.id_presensi}`); // Sesuaikan dengan response backend
        } catch (error) {
            alert("Gagal menyimpan presensi: " + (error.response?.data?.error || error.message));
        }
        setIsSubmitting(false);
    };

    return {
        stream,
        currentFacingMode,
        flashEnabled,
        cameraError,
        isSubmitting,
        handleFlash,
        handleRotate,
        handleCapture,
        startCamera,
    };
};

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
        // === PERUBAHAN: Gunakan route baru getByUserId ===
        presensiApi.getByUserId(user.id) // Asumsikan user.id adalah id_tendik
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
        // === PERUBAHAN: Gunakan getAll untuk admin ===
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

        // === PERUBAHAN: Data untuk PUT ===
        const updateData = { status: editStatus, catatan: '' }; // Sesuaikan dengan backend

        presensiApi.updateStatus(item.id_presensi || item.id, updateData) // Sesuaikan id
            .then(updatedItem => {
                const updatedList = [...presensi];
                updatedList[index].status = updatedItem.status;
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
        const item = presensi[index];
        setIsLoading(true);

        // === PERUBAHAN: Jika ada DELETE route, gunakan ===
        // presensiApi.delete(item.id_presensi || item.id)
        //   .then(() => {
        //     setPresensi(presensi.filter((_, i) => i !== index));
        //     ...
        //   })

        // Karena backend belum punya DELETE, skip atau tambahkan di backend dulu
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