// front-end/src/hooks/useEditTeacherController.js

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { tendikApi } from "../data/tendikApi";

// Helper untuk format tanggal YYYY-MM-DD
const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    try {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    } catch (e) {
        return ""; // Kembalikan string kosong jika tanggal tidak valid
    }
};

export const useEditTeacherController = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Untuk loading halaman & submit
    const [error, setError] = useState(null);
    const [modal, setModal] = useState({ isOpen: false, title: "", message: "" });
    
    const navigate = useNavigate();
    const { id } = useParams(); // Ambil 'id' dari URL

    // 1. STATE FORM LENGKAP (sesuai updateTendik)
    // Password tidak dimasukkan di sini, ditangani terpisah jika perlu
    const [form, setForm] = useState({
        id_tendik: "", 
        nama: "",
        email: "",
        id_jabatan: 2,
        golongan: "",
        tanggal_masuk: "",
        gelar_depan: "",
        gelar_belakang: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        agama: "Islam",
        jenis_kelamin: "Laki-laki",
        pendidikan: "",
        status_tendik: "Aktif",
        no_telp: "",
        foto_profil: null,
    });

    // 2. Ambil data guru berdasarkan ID
    useEffect(() => {
        document.title = "Sistem Presensi | Edit Akun";
        setIsLoading(true);
        
        tendikApi.getById(id)
            .then(data => {
                // 3. Isi form dengan data yang ada
                // Gunakan helper untuk format tanggal
                setForm({
                    id_tendik: data.id_tendik,
                    nama: data.nama || "",
                    email: data.email || "",
                    id_jabatan: data.id_jabatan || 2,
                    golongan: data.golongan || "",
                    tanggal_masuk: formatDateForInput(data.tanggal_masuk),
                    gelar_depan: data.gelar_depan || "",
                    gelar_belakang: data.gelar_belakang || "",
                    tempat_lahir: data.tempat_lahir || "",
                    tanggal_lahir: formatDateForInput(data.tanggal_lahir),
                    agama: data.agama || "Islam",
                    jenis_kelamin: data.jenis_kelamin || "Laki-laki",
                    pendidikan: data.pendidikan || "",
                    status_tendik: data.status_tendik || "Aktif",
                    no_telp: data.no_telp || "",
                    foto_profil: data.foto_profil || null,
                });
                setError(null);
            })
            .catch(err => {
                setError("Gagal memuat data guru: " + (err.response?.data?.error || err.message));
            })
            .finally(() => setIsLoading(false));
    }, [id]); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setError(null);
    };

    // 4. Kirim data update saat submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Gunakan 'isLoading' untuk submit
        setError(null);

        // Data yang dikirim (sesuai API updateTendik)
        const dataToUpdate = { ...form };
        
        // Hapus field yang tidak ada di 'updateTendik' body
        delete dataToUpdate.id_tendik; 
        delete dataToUpdate.password; // Pastikan password tidak terkirim

        try {
            await tendikApi.update(id, dataToUpdate); //
            setModal({
                isOpen: true,
                title: "Sukses",
                message: "Data akun berhasil diperbarui."
            });
        } catch (err) {
            const apiError = err.response?.data?.error || err.message;
            setError(apiError);
        } finally {
            setIsLoading(false); // Selesai submit
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
        form, setForm, 
        handleChange,
        isLoading, // Menggantikan 'isSubmitting'
        error,
        modal, closeModal,
        handleSubmit,
        
        // Dummy password handlers (backend update tidak menangani password)
        showPassword: false,
        toggleShowPassword: () => {},
    };
};