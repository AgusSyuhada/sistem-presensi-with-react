// front-end/src/hooks/useReportsController.js

import { useState } from "react";
// 1. Impor presensiApi ASLI (dari file presensiApi.js Anda)
import { presensiApi } from "../data/presensiApi";
// 2. Impor getStatusStyle dari controller utamanya (atau sumber aslinya)
import { getStatusStyle } from "./useAttendanceController";
import * as XLSX from 'xlsx';

// Fungsi exportToXLSX (TETAP SAMA, tidak perlu diubah)
const exportToXLSX = (data, filename) => {
    try {
        console.log("Exporting data to XLSX:", data);
        if (!Array.isArray(data) || data.length === 0 || typeof data[0] !== 'object') {
            throw new Error("Data tidak valid untuk ekspor XLSX.");
        }
        const ws = XLSX.utils.json_to_sheet(data);
        console.log("Worksheet created");
        const wb = XLSX.utils.book_new();
        console.log("Workbook created");
        XLSX.utils.book_append_sheet(wb, ws, "Laporan Presensi");
        console.log("Worksheet appended");
        XLSX.writeFile(wb, `${filename}.xlsx`);
        console.log("File write triggered");
    } catch (error) {
        console.error("Error exporting to XLSX:", error);
        throw error;
    }
};

// Fungsi exportToCSV (TETAP SAMA, opsional)
const exportToCSV = (data, filename) => {
    // ... (Logika CSV Anda tetap sama) ...
};


export const useLaporanController = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [tanggalMulai, setTanggalMulai] = useState("");
    const [tanggalAkhir, setTanggalAkhir] = useState("");
    const [laporanData, setLaporanData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [showTable, setShowTable] = useState(false);

    const [modal, setModal] = useState({
        isOpen: false,
        title: "",
        message: "",
    });

    const handlePreview = (e) => {
        e.preventDefault();

        if (!tanggalMulai || !tanggalAkhir) {
            setModal({
                isOpen: true,
                title: "Error",
                message: "Silakan pilih tanggal mulai dan tanggal akhir.",
            });
            return;
        }

        setIsLoading(true);
        setShowTable(false);
        console.log(`Preview button clicked. Fetching from ${tanggalMulai} to ${tanggalAkhir}`);

        // 3. INI PERUBAHAN UTAMA: Panggil presensiApi.getLaporan
        presensiApi.getLaporan(tanggalMulai, tanggalAkhir)
            .then(data => {
                console.log("Preview data received:", data);
                setLaporanData(data);
                setShowTable(true);
            })
            .catch(err => {
                console.error("Preview fetch error:", err);
                // Gunakan error dari API jika ada
                const apiError = err.response?.data?.error || err.message || "Gagal memuat data laporan.";
                setModal({ isOpen: true, title: "Error", message: apiError });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    // Fungsi handleExport (TETAP SAMA, tidak perlu diubah)
    // Fungsi ini akan otomatis bekerja dengan data baru di 'laporanData'
    const handleExport = (format) => {
        console.log(`Export button clicked. Format: ${format}`);
        if (laporanData.length === 0) {
            setModal({
                isOpen: true,
                title: "Perhatian",
                message: "Tidak ada data untuk diekspor. Silakan klik 'Preview' terlebih dahulu.",
            });
            return;
        }

        const filename = `laporan_presensi_${tanggalMulai}_sd_${tanggalAkhir}`;

        try {
            if (format === 'xlsx') {
                exportToXLSX(laporanData, filename);
            } else if (format === 'csv') {
                exportToCSV(laporanData, filename);
            } else {
                throw new Error("Format ekspor tidak didukung");
            }

            setModal({
                isOpen: true,
                title: "Sukses",
                message: `Laporan berhasil diekspor sebagai file ${format.toUpperCase()}.`,
            });

        } catch (err) {
            setModal({
                isOpen: true,
                title: "Error Ekspor",
                message: `Gagal mengekspor file ${format.toUpperCase()}: ${err.message}`,
            });
        }
    };

    const closeModal = () => {
        setModal({ isOpen: false, title: "", message: "" });
    };

    return {
        sidebarOpen,
        setSidebarOpen,
        tanggalMulai,
        setTanggalMulai,
        tanggalAkhir,
        setTanggalAkhir,
        laporanData,
        isLoading,
        showTable,
        modal,
        getStatusStyle, // Ini sekarang diimpor dari useAttendanceController
        handlePreview,
        handleExport,
        closeModal,
    };
};