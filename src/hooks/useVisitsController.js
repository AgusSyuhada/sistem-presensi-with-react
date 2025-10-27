import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchKunjunganApi, deleteKunjunganApi, createVisitApi, validateVisitData } from "../data/visits";

// Hook for user-side form submission (from original useVisitController.js)
export const useVisitFormController = () => {
    const [form, setForm] = useState({
        nama: "",
        instansi: "",
        tujuan: "",
    });
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const validation = validateVisitData(form);
        if (!validation.isValid) {
            setError(validation.message);
            setIsSubmitting(false);
            return;
        }

        try {
            const newVisit = await createVisitApi(form);
            navigate(`/visit-response/${newVisit.id}`);
        } catch (error) {
            setError("Gagal menyimpan data kunjungan");
        }
        setIsSubmitting(false);
    };

    return { form, error, isSubmitting, handleChange, handleSubmit };
};

// Hook for admin-side management (from original useKunjunganController in useVisitsController.js)
export const useVisitAdminController = () => {
    const [kunjunganList, setKunjunganList] = useState([]);
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
        document.title = "Sistem Presensi | Kelola Kunjungan";
        setIsLoading(true);
        fetchKunjunganApi()
            .then((data) => {
                setKunjunganList(data);
            })
            .catch((err) => setError("Gagal memuat data kunjungan"))
            .finally(() => setIsLoading(false));
    }, []);

    const handleDelete = (id) => {
        setModal({
            isOpen: true,
            title: "Konfirmasi Hapus",
            message: "Yakin ingin menghapus data kunjungan ini?",
            onConfirm: () => performDelete(id),
        });
    };

    const performDelete = (id) => {
        deleteKunjunganApi(id)
            .then(() => {
                setKunjunganList((prevList) => prevList.filter((k) => k.id !== id));
                setModal({
                    isOpen: true,
                    title: "Sukses",
                    message: "Data kunjungan berhasil dihapus!",
                    onConfirm: null,
                });
            })
            .catch((err) => {
                setError(err.message || "Gagal menghapus data");
            });
    };

    const closeModal = () => {
        setModal({ isOpen: false, title: "", message: "", onConfirm: null });
    };

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