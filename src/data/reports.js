// Impor fungsi spesifik dari sumber data terpusat
import { 
    getAttendanceDataByDateRange,
    statusOptions as sharedStatusOptions, // Gunakan alias
    getStatusStyle as sharedGetStatusStyle 
} from "./attendanceData"; 

// Ekspor kembali helper agar bisa digunakan controller laporan
export const statusOptions = sharedStatusOptions;
export const getStatusStyle = sharedGetStatusStyle;

// --- API SIMULATION WRAPPER ---

// GET /api/laporan?mulai=...&akhir=...
export const fetchLaporanApi = (tanggalMulai, tanggalAkhir) => {
    console.log(`Fetching report data from ${tanggalMulai} to ${tanggalAkhir}`); // Logging
    return new Promise((resolve, reject) => { // Tambahkan reject untuk penanganan error
        setTimeout(() => {
            try {
                // Panggil fungsi terpusat
                const data = getAttendanceDataByDateRange(tanggalMulai, tanggalAkhir); 
                console.log("Fetched report data:", data); // Logging
                resolve(data); 
            } catch (error) {
                console.error("Failed to fetch report data:", error); // Logging
                reject(new Error("Gagal mengambil data laporan")); // Kirim error
            }
        }, 500); // delay 0.5 detik
    });
};

