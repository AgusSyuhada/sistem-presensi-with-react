// Impor fungsi spesifik dari sumber data terpusat
import {
    getAllAttendanceData,
    updateAttendanceData,
    deleteAttendanceData,
    createAttendanceData, // Baru
    fetchAttendanceById, // Baru
    statusOptions as sharedStatusOptions, // Gunakan alias agar jelas
    getStatusStyle as sharedGetStatusStyle
} from "./attendanceData";

// Ekspor kembali helper agar bisa digunakan controller presensi
export const statusOptions = sharedStatusOptions;
export const getStatusStyle = sharedGetStatusStyle;

// --- API SIMULATION WRAPPERS ---
// Fungsi-fungsi ini sekarang hanya membungkus panggilan ke sumber data terpusat
// dengan simulasi delay (Promise + setTimeout)

// GET /api/presensi
export const fetchPresensiApi = () => {
    console.log("Fetching all attendance data..."); // Logging
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = getAllAttendanceData();
            console.log("Fetched data:", data); // Logging
            resolve(data);
        }, 300); // delay 0.3 detik
    });
};

// GET /api/presensi/:id (baru)
export const fetchPresensiByIdApi = (id) => {
    console.log(`Fetching attendance by ID: ${id}`); // Logging
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const attendance = fetchAttendanceById(id);
                console.log("Fetched attendance:", attendance); // Logging
                resolve(attendance);
            } catch (error) {
                console.error("Fetch by ID failed:", error); // Logging
                reject(error);
            }
        }, 300); // delay
    });
};

// POST /api/presensi (baru)
export const createPresensiApi = (newData) => {
    console.log("Creating new attendance:", newData); // Logging
    return new Promise((resolve) => {
        setTimeout(() => {
            const newAttendance = createAttendanceData(newData);
            console.log("Created attendance:", newAttendance); // Logging
            resolve(newAttendance);
        }, 500); // delay lebih lama untuk simulasi create
    });
};

// PUT /api/presensi/:id
export const updatePresensiApi = (id, newStatus) => {
    console.log(`Updating attendance ID: ${id} to status: ${newStatus}`); // Logging
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const updatedItem = updateAttendanceData(id, newStatus);
                console.log("Update successful:", updatedItem); // Logging
                resolve(updatedItem);
            } catch (error) {
                console.error("Update failed:", error); // Logging
                reject(error);
            }
        }, 300); // delay
    });
};

// DELETE /api/presensi/:id
export const deletePresensiApi = (id) => {
    console.log(`Deleting attendance ID: ${id}`); // Logging
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const result = deleteAttendanceData(id);
                console.log("Delete successful:", result); // Logging
                resolve(result);
            } catch (error) {
                console.error("Delete failed:", error); // Logging
                reject(error);
            }
        }, 300); // delay
    });
};