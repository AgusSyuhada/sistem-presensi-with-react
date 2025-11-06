import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { kunjunganApi } from "../data/kunjunganApi";

// ==========================================================
// Hook 1: Untuk Form Kunjungan Publik (VisitForm.js)
// ==========================================================
export const useVisitFormController = () => {
    const [form, setForm] = useState({
        gelar_depan: "",
        nama_tamu: "",
        gelar_belakang: "",
        asal_instansi: "",
        tujuan: "",
        jenis_kelamin: "Laki-laki",
        no_telp: "",
        foto: "",
    });
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // --- 1. TAMBAHKAN STATE UNTUK MODAL ---
    const [modal, setModal] = useState({ isOpen: false, message: "" });
    const [createdVisitId, setCreatedVisitId] = useState(null);
    // --- AKHIR TAMBAHAN ---

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        if (!form.nama_tamu || !form.asal_instansi || !form.tujuan || !form.no_telp) {
            setError("Harap isi semua field yang wajib diisi.");
            setIsSubmitting(false);
            return;
        }

        try {
            const newVisit = await kunjunganApi.create(form);

            // --- 2. TAMPILKAN MODAL SAAT SUKSES (BUKAN NAVIGASI) ---
            setCreatedVisitId(newVisit.id_kunjungan); // Simpan ID untuk navigasi
            setModal({
                isOpen: true,
                message: "Data kunjungan Anda telah berhasil disimpan."
            });
            // --- AKHIR PERUBAHAN ---

        } catch (err) {
            setError("Gagal menyimpan data kunjungan: " + (err.response?.data?.error || err.message));
        }
        setIsSubmitting(false);
    };

    // --- 3. TAMBAHKAN FUNGSI CLOSEMODAL UNTUK NAVIGASI ---
    const closeModal = () => {
        setModal({ isOpen: false, message: "" });
        if (createdVisitId) {
            navigate(`/visit-response/${createdVisitId}`);
        }
    };
    // --- AKHIR TAMBAHAN ---

    return {
        form,
        error,
        isSubmitting,
        modal, // Ekspor modal
        handleChange,
        handleSubmit,
        closeModal // Ekspor fungsi close
    };
};

// ==========================================================
// Hook 2: Untuk Halaman Admin (ManageVisits.js)
// ==========================================================
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
        kunjunganApi.getAll()
            .then((data) => {
                setKunjunganList(data);
            })
            .catch((err) => setError("Gagal memuat data kunjungan: " + (err.response?.data?.error || err.message)))
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
        kunjunganApi.delete(id)
            .then(() => {
                setKunjunganList((prevList) => prevList.filter((k) => k.id_kunjungan !== id));
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