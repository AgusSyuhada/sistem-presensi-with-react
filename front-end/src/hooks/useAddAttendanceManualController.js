// Perbarui file: front-end/src/hooks/useAddAttendanceManualController.js

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { presensiApi } from "../data/presensiApi";
// 1. Impor 'tendikApi' yang sudah benar
import { tendikApi } from "../data/tendikApi";

// Helper (tetap sama)
const getTodayDate = () => new Date().toISOString().split('T')[0];
const getCurrentTime = () => new Date().toTimeString().split(' ')[0].substring(0, 5);

export const useAddAttendanceManualController = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [guruList, setGuruList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState({ isOpen: false, title: "", message: "" });
    const navigate = useNavigate();

    const [form, setForm] = useState({
        id_tendik: "",
        tanggal: getTodayDate(),
        waktu: getCurrentTime(),
        status: "Masuk",
        catatan: "",
    });

    // Efek untuk mengambil daftar guru
    useEffect(() => {
        setIsLoading(true);
        // 2. Panggil 'tendikApi.getAll()'
        tendikApi.getAll()
            .then(data => {
                // Backend Anda mengembalikan data guru lengkap, kita sesuaikan
                // Berdasarkan tendikController.js, 'id_tendik' adalah ID-nya
                const formattedList = data.map(guru => ({
                    id: guru.id_tendik, // Gunakan id_tendik sebagai value
                    nama: guru.nama,
                    pegid: guru.id_tendik // Tampilkan id_tendik sebagai PEGID
                }));
                setGuruList(formattedList);
                setError(null);
            })
            .catch(err => {
                setError("Gagal memuat daftar guru: " + (err.response?.data?.error || err.message));
                setGuruList([]);
            })
            .finally(() => setIsLoading(false));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // -----------------------------------------------------------------
        // PERUBAHAN DI SINI: Sesuaikan objek data dengan backend
        // -----------------------------------------------------------------

        // Backend 'createManualPresensiByAdmin' mengharapkan 'tanggal', BUKAN 'waktu'
        // Kita tidak perlu lagi menggabungkan tanggal & waktu (fullTimestamp)

        const dataToSubmit = {
            id_tendik: parseInt(form.id_tendik, 10), // Pastikan ID adalah angka
            tanggal: form.tanggal, // <-- PERUBAHAN: Kirim 'tanggal' (YYYY-MM-DD)
            status: form.status,
            catatan: form.catatan,
        };
        // -----------------------------------------------------------------
        // AKHIR PERUBAHAN
        // -----------------------------------------------------------------

        try {
            // Panggil API untuk tambah manual
            await presensiApi.createManual(dataToSubmit);
            setModal({
                isOpen: true,
                title: "Sukses",
                message: "Data presensi manual berhasil ditambahkan."
            });
        } catch (err) {
            // Tangkap error 409 (Conflict) jika data sudah ada
            if (err.response?.status === 409) {
                setError(err.response.data.error || "Guru ini sudah memiliki data presensi di tanggal tersebut.");
            } else {
                const apiError = err.response?.data?.error || err.message;
                setError(apiError);
                setModal({
                    isOpen: true,
                    title: "Error",
                    message: "Gagal menyimpan data: " + apiError
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        const isSuccess = modal.title === "Sukses";
        setModal({ isOpen: false, title: "", message: "" });
        if (isSuccess) {
            navigate("/dashboard/manage-attendance");
        }
    };

    return {
        sidebarOpen,
        setSidebarOpen,
        form,
        guruList, // Ini sekarang akan berisi { id, nama, pegid }
        isLoading,
        error,
        modal,
        handleChange,
        handleSubmit,
        closeModal,
    };
};