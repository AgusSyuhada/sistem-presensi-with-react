import { useState, useEffect } from "react";
import {
    fetchPresensiApi,
    updatePresensiApi,
    deletePresensiApi,
    statusOptions, // Impor statusOptions untuk select
    getStatusStyle // Impor helper
} from "../data/attendance";

export const usePresensiController = () => {
    const [presensi, setPresensi] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // State untuk UI
    const [editingIdx, setEditingIdx] = useState(null); // Menyimpan index yang diedit
    const [editStatus, setEditStatus] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // State untuk Modal
    const [modal, setModal] = useState({
        isOpen: false,
        title: "",
        message: "",
        onConfirm: null,
    });

    // --- Efek untuk memuat data saat komponen mount ---
    useEffect(() => {
        document.title = "Sistem Presensi | Kelola Data Presensi";
        setIsLoading(true);
        fetchPresensiApi()
            .then(data => {
                setPresensi(data.map((d, idx) => ({ ...d, originalIndex: idx }))); // Simpan index asli
            })
            .catch(err => setError("Gagal memuat data"))
            .finally(() => setIsLoading(false));
    }, []);

    // --- Logika Halaman (Handlers) ---

    // Edit
    const handleEdit = (index) => {
        setEditingIdx(index);
        setEditStatus(presensi[index].status);
    };

    // Batal edit
    const handleCancel = () => setEditingIdx(null);

    // Simpan perubahan
    const handleSave = (index) => {
        const item = presensi[index];
        setIsLoading(true);

        updatePresensiApi(item.id, editStatus)
            .then(updatedItem => {
                // Update state lokal
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

    // Hapus (Menampilkan konfirmasi)
    const handleDelete = (index) => {
        setModal({
            isOpen: true,
            title: "Konfirmasi Hapus",
            message: "Yakin ingin menghapus data ini?",
            onConfirm: () => performDelete(index), // Panggil performDelete saat dikonfirmasi
        });
    };

    // Logika hapus (setelah dikonfirmasi)
    const performDelete = (index) => {
        const item = presensi[index];
        setIsLoading(true);

        deletePresensiApi(item.id)
            .then(() => {
                // Update state lokal
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

    // Menutup modal
    const closeModal = () => {
        setModal({ isOpen: false, title: "", message: "", onConfirm: null });
    };

    // Kembalikan semua state dan fungsi yang dibutuhkan oleh View
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
        statusOptions, // Kirim ke View
        getStatusStyle, // Kirim ke View
    };
};
