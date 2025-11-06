// front-end/src/hooks/useTeacherController.js

import { useState, useEffect } from "react";
// 1. Impor API yang sebenarnya
import { tendikApi } from "../data/tendikApi";

export const useTeacherController = () => {
    const [guruList, setGuruList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [modal, setModal] = useState({
        isOpen: false,
        title: "",
        message: "",
        onConfirm: null,
    });

    useEffect(() => {
        document.title = "Sistem Presensi | Kelola Akun Guru";
        setIsLoading(true);

        // 2. Panggil tendikApi.getAll()
        tendikApi.getAll()
            .then(data => {
                // Berdasarkan backend, data sudah berisi 'nama_jabatan'
                setGuruList(data);
            })
            .catch(err => setError("Gagal memuat data guru: " + (err.response?.data?.error || err.message)))
            .finally(() => setIsLoading(false));
    }, []);

    const handleDelete = (id) => {
        setModal({
            isOpen: true,
            title: "Konfirmasi Hapus",
            message: "Yakin ingin menghapus data akun ini?",
            onConfirm: () => performDelete(id),
        });
    };

    const performDelete = (id) => {
        setIsLoading(true);

        // 3. Panggil tendikApi.delete()
        tendikApi.delete(id)
            .then(() => {
                // 4. Sesuaikan filter dengan 'id_tendik' dari backend
                setGuruList(prevList => prevList.filter(guru => guru.id_tendik !== id));
                setModal({
                    isOpen: true,
                    title: "Sukses",
                    message: "Data akun berhasil dihapus!",
                    onConfirm: null,
                });
            })
            .catch(err => {
                setError("Gagal menghapus data: " + (err.response?.data?.error || err.message));
            })
            .finally(() => setIsLoading(false));
    };

    const closeModal = () => {
        setModal({ isOpen: false, title: "", message: "", onConfirm: null });
    };

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