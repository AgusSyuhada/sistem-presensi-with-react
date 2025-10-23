import { useState, useEffect } from "react";
import { fetchKunjunganApi, deleteKunjunganApi } from "../data/visits";

export const useKunjunganController = () => {
    const [kunjunganList, setKunjunganList] = useState([]);
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
        document.title = "Sistem Presensi | Kelola Kunjungan";
        setIsLoading(true);
        fetchKunjunganApi()
            .then(data => {
                setKunjunganList(data);
            })
            .catch(err => setError("Gagal memuat data kunjungan"))
            .finally(() => setIsLoading(false));
    }, []);

    // --- Logika Halaman (Handlers) ---

    // Hapus (Menampilkan konfirmasi)
    const handleDelete = (id) => {
        setModal({
            isOpen: true,
            title: "Konfirmasi Hapus",
            message: "Yakin ingin menghapus data kunjungan ini?",
            onConfirm: () => performDelete(id), // Panggil performDelete saat dikonfirmasi
        });
    };

    // Logika hapus (setelah dikonfirmasi)
    const performDelete = (id) => {
        // Bisa tambahkan loading spesifik
        
        deleteKunjunganApi(id)
            .then(() => {
                // Update state lokal
                setKunjunganList(prevList => prevList.filter(k => k.id !== id));
                setModal({
                    isOpen: true,
                    title: "Sukses",
                    message: "Data kunjungan berhasil dihapus!",
                    onConfirm: null,
                });
            })
            .catch(err => {
                setError(err.message || "Gagal menghapus data");
            });
    };

    // Menutup modal
    const closeModal = () => {
        setModal({ isOpen: false, title: "", message: "", onConfirm: null });
    };

    // Kembalikan semua state dan fungsi yang dibutuhkan oleh View
    return {
        kunjunganList,
        isLoading,
        error,
        sidebarOpen,
        setSidebarOpen,
        modal,
        handleDelete,
        closeModal,
    };
};
