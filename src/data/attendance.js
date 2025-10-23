// Impor fungsi spesifik dari sumber data terpusat
import { 
    getAllAttendanceData, 
    updateAttendanceData, 
    deleteAttendanceData,
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
           } catch(error){
               console.error("Delete failed:", error); // Logging
               reject(error);
           }
        }, 300); // delay
    });
};

