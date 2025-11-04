// Data Dummy Terpusat
// Tanggal sudah dibuat bervariasi untuk pengujian filter laporan
// Menggunakan 'let' agar bisa dimodifikasi oleh fungsi delete dan create
let dataDummy = [
    { id: "p001", pegid: "123456789", nama: "Budi Santoso", tanggal: "2025-10-20", waktu: "09:16", status: "Presensi", lokasi: "MI Al Faizein" },
    { id: "p002", pegid: "123457890", nama: "Dewi Lestari", tanggal: "2025-10-20", waktu: "09:17", status: "Presensi", lokasi: "MI Al Faizein" },
    { id: "p003", pegid: "123458901", nama: "Agus Setiawan", tanggal: "2025-10-20", waktu: "09:18", status: "Izin", lokasi: "MI Al Faizein" },
    { id: "p004", pegid: "123456789", nama: "Budi Santoso", tanggal: "2025-10-21", waktu: "09:15", status: "Presensi", lokasi: "MI Al Faizein" },
    { id: "p005", pegid: "123457890", nama: "Dewi Lestari", tanggal: "2025-10-21", waktu: "09:16", status: "Sakit", lokasi: "MI Al Faizein" },
    { id: "p006", pegid: "123458901", nama: "Agus Setiawan", tanggal: "2025-10-21", waktu: "09:17", status: "Presensi", lokasi: "MI Al Faizein" },
    { id: "p007", pegid: "123456789", nama: "Budi Santoso", tanggal: "2025-10-22", waktu: "09:16", status: "Presensi", lokasi: "MI Al Faizein" },
    { id: "p008", pegid: "123457890", nama: "Dewi Lestari", tanggal: "2025-10-22", waktu: "09:17", status: "Presensi", lokasi: "MI Al Faizein" },
    { id: "p009", pegid: "123458901", nama: "Agus Setiawan", tanggal: "2025-10-22", waktu: "00:00", status: "Alpa", lokasi: "MI Al Faizein" },
    { id: "p010", pegid: "123456789", nama: "Budi Santoso", tanggal: "2025-10-23", waktu: "09:16", status: "Presensi", lokasi: "MI Al Faizein" },
    { id: "p011", pegid: "123457890", nama: "Dewi Lestari", tanggal: "2025-10-23", waktu: "09:17", status: "Presensi", lokasi: "MI Al Faizein" },
    { id: "p012", pegid: "123458901", nama: "Agus Setiawan", tanggal: "2025-10-23", waktu: "09:18", status: "Presensi", lokasi: "MI Al Faizein" },
];

// Opsi status (Shared)
export const statusOptions = [
    { value: "Presensi", label: "Presensi", bg: "bg-green-200", color: "text-green-800" },
    { value: "Izin", label: "Izin", bg: "bg-blue-200", color: "text-blue-800" },
    { value: "Sakit", label: "Sakit", bg: "bg-yellow-200", color: "text-yellow-800" },
    { value: "Alpa", label: "Alpa", bg: "bg-red-200", color: "text-red-800" },
];

// Helper Style (Shared)
export function getStatusStyle(status) {
    const opt = statusOptions.find((o) => o.value === status) || statusOptions[0]; // Default ke Presensi jika tidak ditemukan
    return `${opt.color} ${opt.bg}`;
}

// Fungsi untuk mendapatkan semua data (digunakan oleh attendance.js)
export const getAllAttendanceData = () => {
    // Kembalikan salinan array agar data asli tidak termutasi secara tidak sengaja
    return [...dataDummy];
};

// Fungsi untuk mendapatkan data berdasarkan rentang tanggal (digunakan oleh laporan.js)
export const getAttendanceDataByDateRange = (tanggalMulai, tanggalAkhir) => {
    // Validasi input tanggal
    if (!tanggalMulai || !tanggalAkhir) {
        return []; // Kembalikan array kosong jika tanggal tidak valid
    }

    try {
        // Ubah string tanggal 'YYYY-MM-DD' menjadi objek Date untuk perbandingan yang akurat
        // Tambahkan waktu untuk memastikan inklusivitas rentang
        const tglMulai = new Date(tanggalMulai + "T00:00:00");
        const tglAkhir = new Date(tanggalAkhir + "T23:59:59"); // Akhir hari

        const filteredData = dataDummy.filter(item => {
            const tglItem = new Date(item.tanggal + "T00:00:00");
            // Pastikan perbandingan tanggal valid
            return tglItem instanceof Date && !isNaN(tglItem) &&
                tglMulai instanceof Date && !isNaN(tglMulai) &&
                tglAkhir instanceof Date && !isNaN(tglAkhir) &&
                tglItem >= tglMulai && tglItem <= tglAkhir;
        });

        return [...filteredData]; // Kembalikan salinan data yang difilter
    } catch (error) {
        console.error("Error filtering data by date range:", error);
        return []; // Kembalikan array kosong jika terjadi error
    }
};

// Fungsi untuk fetch data by ID (baru, untuk response page)
export const fetchAttendanceById = (id) => {
    const attendance = dataDummy.find(item => item.id === id);
    if (attendance) {
        return { ...attendance }; // Kembalikan salinan
    }
    throw new Error("Data presensi tidak ditemukan");
};

// Fungsi untuk create data baru (baru, untuk user presensi)
export const createAttendanceData = (newData) => {
    const newId = `p${Math.floor(Math.random() * 1000) + 13}`; // Generate ID acak (mulai dari p013)
    const newAttendance = {
        id: newId,
        ...newData,
    };
    dataDummy.unshift(newAttendance); // Tambahkan ke awal array
    return { ...newAttendance }; // Kembalikan salinan
};

// Fungsi untuk update data (digunakan oleh attendance.js)
export const updateAttendanceData = (id, newStatus) => {
    const index = dataDummy.findIndex(item => item.id === id);
    if (index !== -1) {
        // Update data di array asli
        dataDummy[index].status = newStatus;
        // Kembalikan salinan objek yang diupdate
        return { ...dataDummy[index] };
    }
    // Lemparkan error jika ID tidak ditemukan
    throw new Error("Data presensi tidak ditemukan");
};

// Fungsi untuk delete data (digunakan oleh attendance.js)
export const deleteAttendanceData = (id) => {
    const initialLength = dataDummy.length;
    // Filter array asli untuk menghapus item
    dataDummy = dataDummy.filter(item => item.id !== id);
    // Periksa apakah ada item yang dihapus
    if (dataDummy.length === initialLength) {
        throw new Error("Data presensi tidak ditemukan");
    }
    // Kembalikan status sukses
    return { success: true };
};