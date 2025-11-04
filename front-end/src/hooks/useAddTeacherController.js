import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGuruApi } from "../data/teacher";

export const useAddGuruController = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState({ isOpen: false, title: "", message: "" });

    const navigate = useNavigate();

    const [form, setForm] = useState({
        pegid: "",
        nama: "",
        jabatan: "",
        password: "",
        tempatLahir: "",
        tanggalLahir: "",
        tanggalMasuk: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        createGuruApi(form)
            .then(guruBaru => {
                setIsLoading(false);
                setModal({
                    isOpen: true,
                    title: "Sukses",
                    message: `Akun guru '${guruBaru.nama}' berhasil ditambahkan!`,
                });
                // Reset form
                setForm({
                    pegid: "", nama: "", jabatan: "", password: "",
                    tempatLahir: "", tanggalLahir: "", tanggalMasuk: "",
                });
            })
            .catch(err => {
                setIsLoading(false);
                setError(err.message || "Gagal menambahkan akun");
            });
    };

    const closeModalAndNavigate = () => {
        setModal({ isOpen: false, title: "", message: "" });
        // Arahkan kembali ke daftar setelah modal ditutup
        navigate("/dashboard/manage-accounts");
    };

    const toggleShowPassword = () => setShowPassword(v => !v);

    return {
        sidebarOpen,
        setSidebarOpen,
        showPassword,
        toggleShowPassword,
        form,
        isLoading,
        error,
        modal,
        handleChange,
        handleSubmit,
        closeModal: closeModalAndNavigate, // Ganti closeModal standar
    };
};
