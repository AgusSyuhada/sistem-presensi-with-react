// Mensimulasikan database
let dataGuruDummy = [
    { id: "g001", pegid: "123 456 789", nama: "Lorem Ipsum", jabatan: "Lorem Ipsum" },
    { id: "g002", pegid: "123 456 789", nama: "Lorem Ipsum", jabatan: "Lorem Ipsum" },
    { id: "g003", pegid: "123 456 789", nama: "Lorem Ipsum", jabatan: "Lorem Ipsum" },
    { id: "g004", pegid: "123 456 789", nama: "Lorem Ipsum", jabatan: "Lorem Ipsum" },
    { id: "g005", pegid: "123 456 789", nama: "Lorem Ipsum", jabatan: "Lorem Ipsum" },
    { id: "g006", pegid: "123 456 789", nama: "Lorem Ipsum", jabatan: "Lorem Ipsum" },
    { id: "g007", pegid: "123 456 789", nama: "Lorem Ipsum", jabatan: "Lorem Ipsum" },
    { id: "g008", pegid: "123 456 789", nama: "Lorem Ipsum", jabatan: "Lorem Ipsum" },
    { id: "g009", pegid: "123 456 789", nama: "Lorem Ipsum", jabatan: "Lorem Ipsum" },
    { id: "g010", pegid: "123 456 789", nama: "Lorem Ipsum", jabatan: "Lorem Ipsum" },
    { id: "g011", pegid: "123 456 789", nama: "Lorem Ipsum", jabatan: "Lorem Ipsum" },
    { id: "g012", pegid: "123 456 789", nama: "Lorem Ipsum", jabatan: "Lorem Ipsum" },
    { id: "g013", pegid: "123 456 789", nama: "Lorem Ipsum", jabatan: "Lorem Ipsum" },
    { id: "g014", pegid: "123 456 789", nama: "Lorem Ipsum", jabatan: "Lorem Ipsum" },
];

// --- API SIMULATION ---

// GET /api/guru
export const fetchGuruApi = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...dataGuruDummy]); // Kembalikan salinan data
        }, 500); // simulasi delay 0.5 detik
    });
};

// DELETE /api/guru/:id
export const deleteGuruApi = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = dataGuruDummy.findIndex(item => item.id === id);
            if (index !== -1) {
                dataGuruDummy = dataGuruDummy.filter(item => item.id !== id);
                resolve({ success: true });
            } else {
                reject(new Error("Data guru tidak ditemukan"));
            }
        }, 500);
    });
};

// BARU: GET /api/guru/:id
export const fetchGuruByIdApi = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const guru = dataGuruDummy.find(item => item.id === id);
            if (guru) {
                resolve({ ...guru }); // Kembalikan salinan data
            } else {
                reject(new Error("Data guru tidak ditemukan"));
            }
        }, 300); // Delay lebih cepat untuk ambil data
    });
};

// BARU: POST /api/guru
export const createGuruApi = (dataGuruBaru) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const guruBaru = {
                ...dataGuruBaru,
                id: `g${Math.floor(Math.random() * 1000) + 10}`, // ID acak baru
            };
            dataGuruDummy.unshift(guruBaru); // Tambahkan ke awal array
            resolve(guruBaru);
        }, 500);
    });
};

// BARU: PUT /api/guru/:id
export const updateGuruApi = (id, dataUpdate) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = dataGuruDummy.findIndex(item => item.id === id);
            if (index !== -1) {
                // Update data di array
                dataGuruDummy[index] = { ...dataGuruDummy[index], ...dataUpdate };
                resolve({ ...dataGuruDummy[index] });
            } else {
                reject(new Error("Data guru tidak ditemukan"));
            }
        }, 500);
    });
};