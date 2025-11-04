import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchGuruByIdApi, updateGuruApi } from "../data/teacher";

export const useEditGuruController = () => {
    const { id } = useParams(); // Ambil ID dari URL
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Mulai dengan loading
    const [isSubmitting, setIsSubmitting] = useState(false); // Loading khusus submit
    const [error, setError] = useState(null);
    const [modal, setModal] = useState({ isOpen: false, title: "", message: "" });

    const [form, setForm] = useState({
        pegid: "",
        nama: "",
        jabatan: "",
        password: "", // Kosongkan password demi keamanan
        tempatLahir: "",
        tanggalLahir: "",
        tanggalMasuk: "",
    });

    // Efek untuk mengambil data guru saat halaman dimuat
    useEffect(() => {
        document.title = "Sistem Presensi | Edit Akun Guru";
        setIsLoading(true);
        fetchGuruByIdApi(id)
            .then(dataGuru => {
                // Ubah format tanggal untuk input type="date"
                const tglLahir = dataGuru.tanggalLahir ? new Date(dataGuru.tanggalLahir).toISOString().split('T')[0] : "";
                const tglMasuk = dataGuru.tanggalMasuk ? new Date(dataGuru.tanggalMasuk).toISOString().split('T')[0] : "";

                setForm({
                    ...dataGuru,
                    password: "", // Jangan tampilkan password lama
                    tanggalLahir: tglLahir,
                    tanggalMasuk: tglMasuk,
                });
            })
            .catch(err => {
                setError(err.message || "Gagal memuat data guru");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        // Siapkan data update
        // Jika password kosong, jangan kirim field password
        const dataToUpdate = { ...form };
        if (dataToUpdate.password === "") {
            delete dataToUpdate.password;
        }

        updateGuruApi(id, dataToUpdate)
            .then(guruUpdated => {
                setIsSubmitting(false);
                setModal({
                    isOpen: true,
                    title: "Sukses",
                    message: `Akun guru '${guruUpdated.nama}' berhasil diperbarui!`,
                });
            })
            .catch(err => {
                setIsSubmitting(false);
                setError(err.message || "Gagal memperbarui akun");
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
        isLoading, // Loading halaman
        isSubmitting, // Loading form
        error,
        modal,
        handleChange,
        handleSubmit,
        closeModal: closeModalAndNavigate,
    };
};
