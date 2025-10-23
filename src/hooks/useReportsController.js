import { useState } from "react";
// Impor fungsi fetch dari model laporan.js (yang sekarang memanggil attendanceData.js)
import { fetchLaporanApi, getStatusStyle } from "../data/reports"; 
import * as XLSX from 'xlsx'; // 1. Impor library xlsx yang sudah diinstal

// Helper untuk export XLSX
const exportToXLSX = (data, filename) => {
    try {
        console.log("Exporting data to XLSX:", data); // Logging
        // 2. Buat worksheet dari data array of objects
        // Pastikan data adalah array of objects
        if (!Array.isArray(data) || data.length === 0 || typeof data[0] !== 'object') {
             throw new Error("Data tidak valid untuk ekspor XLSX.");
        }
        const ws = XLSX.utils.json_to_sheet(data);
        console.log("Worksheet created"); // Logging
        // 3. Buat workbook baru
        const wb = XLSX.utils.book_new();
        console.log("Workbook created"); // Logging
        // 4. Tambahkan worksheet ke workbook
        XLSX.utils.book_append_sheet(wb, ws, "Laporan Presensi"); // "Laporan Presensi" adalah nama sheet
        console.log("Worksheet appended"); // Logging
        // 5. Tulis workbook dan trigger download
        XLSX.writeFile(wb, `${filename}.xlsx`);
        console.log("File write triggered"); // Logging
    } catch (error) {
        console.error("Error exporting to XLSX:", error); // Logging error
        throw error; // Lemparkan kembali error agar bisa ditangkap di handleExport
    }
};

// Helper CSV (opsional, bisa dihapus jika tidak perlu)
const exportToCSV = (data, filename) => {
     try {
        const header = Object.keys(data[0]).join(",");
        const rows = data.map(row => 
            Object.values(row).map(value => 
                typeof value === 'string' && value.includes(',') ? `"${value}"` : value
            ).join(",")
        ).join("\n");
        const csvContent = `data:text/csv;charset=utf-8,${header}\n${rows}`;
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${filename}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Error exporting to CSV:", error);
        throw error;
    }
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
        console.log(`Preview button clicked. Fetching from ${tanggalMulai} to ${tanggalAkhir}`); // Logging

        fetchLaporanApi(tanggalMulai, tanggalAkhir)
            .then(data => {
                console.log("Preview data received:", data); // Logging
                setLaporanData(data);
                setShowTable(true); 
            })
            .catch(err => {
                console.error("Preview fetch error:", err); // Logging
                setModal({ isOpen: true, title: "Error", message: err.message || "Gagal memuat data laporan." });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    // 6. Modifikasi handleExport
    const handleExport = (format) => {
        console.log(`Export button clicked. Format: ${format}`); // Logging
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
            // Panggil fungsi export yang sesuai
            if (format === 'xlsx') {
                exportToXLSX(laporanData, filename); 
            } else if (format === 'csv'){
                 exportToCSV(laporanData, filename); // CSV opsional
            } else {
                 throw new Error("Format ekspor tidak didukung");
            }
            
            // Tampilkan modal sukses hanya jika tidak ada error
            setModal({
                isOpen: true,
                title: "Sukses",
                message: `Laporan berhasil diekspor sebagai file ${format.toUpperCase()}.`,
            });
            
        } catch (err) {
            // Error sudah di-log di dalam fungsi export helper
            setModal({
                isOpen: true,
                title: "Error Ekspor", // Judul lebih spesifik
                message: `Gagal mengekspor file ${format.toUpperCase()}: ${err.message}`,
            });
        }
    };

    const closeModal = () => {
        setModal({ isOpen: false, title: "", message: "" });
    };

    // Kembalikan semua state dan handler
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
        getStatusStyle, 
        handlePreview,
        handleExport, // Pastikan ini dikembalikan
        closeModal,
    };
};

