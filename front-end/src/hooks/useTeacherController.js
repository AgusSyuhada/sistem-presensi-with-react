import { useState, useEffect } from "react";
import { fetchGuruApi, deleteGuruApi } from "../data/teacher";

export const useGuruController = () => {
    const [guruList, setGuruList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
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
        document.title = "Sistem Presensi | Kelola Akun Guru";
        setIsLoading(true);
        fetchGuruApi()
            .then(data => {
                setGuruList(data);
            })
            .catch(err => setError("Gagal memuat data guru"))
            .finally(() => setIsLoading(false));
    }, []);

    // --- Logika Halaman (Handlers) ---

    // Hapus (Menampilkan konfirmasi)
    const handleDelete = (id) => {
        setModal({
            isOpen: true,
            title: "Konfirmasi Hapus",
            message: "Yakin ingin menghapus data akun ini?",
            onConfirm: () => performDelete(id), // Panggil performDelete saat dikonfirmasi
        });
    };

    // Logika hapus (setelah dikonfirmasi)
    const performDelete = (id) => {
        setIsLoading(true); // Bisa ditambahkan loading per-baris nanti

        deleteGuruApi(id)
            .then(() => {
                // Update state lokal
                setGuruList(prevList => prevList.filter(guru => guru.id !== id));
                setModal({
                    isOpen: true,
                    title: "Sukses",
                    message: "Data akun berhasil dihapus!",
                    onConfirm: null,
                });
            })
            .catch(err => {
                setError(err.message || "Gagal menghapus data");
            })
            .finally(() => setIsLoading(false));
    };

    // Menutup modal
    const closeModal = () => {
        setModal({ isOpen: false, title: "", message: "", onConfirm: null });
    };

    // Kembalikan semua state dan fungsi yang dibutuhkan oleh View
    return {
        guruList,
        isLoading,
        error,
        sidebarOpen,
        setSidebarOpen,
        modal,
        handleDelete,
        closeModal,
    };
};
