// front-end/src/hooks/useAddTeacherController.js

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tendikApi } from "../data/tendikApi";

export const useAddTeacherController = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState({ isOpen: false, title: "", message: "" });
    const navigate = useNavigate();

    // 1. STATE FORM LENGKAP (sesuai createTendik)
    const [form, setForm] = useState({
        id_tendik: "",
        nama: "",
        email: "",
        password: "",
        id_jabatan: 2, // Default ke 'Guru' (misalnya 2)
        golongan: "",
        tanggal_masuk: "",
        gelar_depan: "",
        gelar_belakang: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        agama: "Islam", // Default
        jenis_kelamin: "Laki-laki", // Default
        pendidikan: "",
        status_tendik: "Aktif", // Default
        no_telp: "",
        foto_profil: null, // Atau string kosong
    });

    const toggleShowPassword = () => setShowPassword(v => !v);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Validasi frontend (bisa dilenkapi)
        if (!form.id_tendik || !form.nama || !form.password || !form.email) {
            setError("PEGID, Nama, Email, dan Password wajib diisi.");
            setIsLoading(false);
            return;
        }

        try {
            // 2. Panggil API create dengan SEMUA data form
            //    (tendikApi.create akan mengirim ini)
            await tendikApi.create(form);

            setModal({
                isOpen: true,
                title: "Sukses",
                message: "Akun guru baru berhasil ditambahkan."
            });
        } catch (err) {
            const apiError = err.response?.data?.error || err.message;
            setError(apiError);
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        const isSuccess = modal.title === "Sukses";
        setModal({ isOpen: false, title: "", message: "" });
        if (isSuccess) {
            navigate("/dashboard/manage-accounts");
        }
    };

    return {
        sidebarOpen, setSidebarOpen,
        showPassword, toggleShowPassword,
        form, handleChange,
        isLoading, error,
        modal, closeModal,
        handleSubmit,
    };
};