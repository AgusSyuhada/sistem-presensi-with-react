import { useState, useEffect } from "react";
import {
    fetchPresensiApi,
    updatePresensiApi,
    deletePresensiApi,
    createPresensiApi,
    statusOptions,
    getStatusStyle
} from "../data/attendance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

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

        const now = new Date();
        const tanggal = now.toISOString().split('T')[0];
        const waktu = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        const newData = {
            pegid: user.pegid, // Use authenticated user's pegid ("123456789")
            nama: user.nama || "Unknown User", // Use authenticated user's name
            tanggal: tanggal,
            waktu: waktu,
            status: "Presensi",
            lokasi: "MI Al Faizein",
        };

        try {
            const newAttendance = await createPresensiApi(newData);
            navigate(`/attendance-response/${newAttendance.id}`);
        } catch (error) {
            alert("Gagal menyimpan presensi");
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
        fetchPresensiApi()
            .then(data => {
                const filteredHistory = data.filter(item => item.pegid === user.pegid);
                setHistory(filteredHistory);
            })
            .catch(err => setError("Gagal memuat data riwayat presensi"))
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
        fetchPresensiApi()
            .then(data => {
                setPresensi(data.map((d, idx) => ({ ...d, originalIndex: idx })));
            })
            .catch(err => setError("Gagal memuat data"))
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

        updatePresensiApi(item.id, editStatus)
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
            .catch(err => setError("Gagal menyimpan data"))
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

        deletePresensiApi(item.id)
            .then(() => {
                setPresensi(presensi.filter((_, i) => i !== index));
                setEditingIdx(null);
                setModal({
                    isOpen: true,
                    title: "Sukses",
                    message: "Data berhasil dihapus!",
                    onConfirm: null,
                });
            })
            .catch(err => setError("Gagal menghapus data"))
            .finally(() => setIsLoading(false));
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