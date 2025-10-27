// Simulated database
let dataKunjunganDummy = [
    { id: "k001", nama: "Lorem Ipsum", instansi: "Lorem Ipsum", tujuan: "Lorem Ipsum" },
    { id: "k002", nama: "Lorem Ipsum", instansi: "Lorem Ipsum", tujuan: "Lorem Ipsum" },
    { id: "k003", nama: "Lorem Ipsum", instansi: "Lorem Ipsum", tujuan: "Lorem Ipsum" },
    { id: "k004", nama: "Lorem Ipsum", instansi: "Lorem Ipsum", tujuan: "Lorem Ipsum" },
    { id: "k005", nama: "Lorem Ipsum", instansi: "Lorem Ipsum", tujuan: "Lorem Ipsum" },
    { id: "k006", nama: "Lorem Ipsum", instansi: "Lorem Ipsum", tujuan: "Lorem Ipsum" },
    { id: "k007", nama: "Lorem Ipsum", instansi: "Lorem Ipsum", tujuan: "Lorem Ipsum" },
    { id: "k008", nama: "Lorem Ipsum", instansi: "Lorem Ipsum", tujuan: "Lorem Ipsum" },
    { id: "k009", nama: "Lorem Ipsum", instansi: "Lorem Ipsum", tujuan: "Lorem Ipsum" },
    { id: "k010", nama: "Lorem Ipsum", instansi: "Lorem Ipsum", tujuan: "Lorem Ipsum" },
    { id: "k011", nama: "Lorem Ipsum", instansi: "Lorem Ipsum", tujuan: "Lorem Ipsum" },
    { id: "k012", nama: "Lorem Ipsum", instansi: "Lorem Ipsum", tujuan: "Lorem Ipsum" },
    { id: "k013", nama: "Lorem Ipsum", instansi: "Lorem Ipsum", tujuan: "Lorem Ipsum" },
    { id: "k014", nama: "Lorem Ipsum", instansi: "Lorem Ipsum", tujuan: "Lorem Ipsum" },
    { id: "k015", nama: "Lorem Ipsum", instansi: "Lorem Ipsum", tujuan: "Lorem Ipsum" },
];

// Validate visit data
export const validateVisitData = (data) => {
    const { nama, instansi, tujuan } = data;
    if (!nama || !instansi || !tujuan) {
        return { isValid: false, message: "All fields are required" };
    }
    return { isValid: true };
};

// POST /api/kunjungan
export const createVisitApi = (visitData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newVisit = {
                ...visitData,
                id: `k${Math.floor(Math.random() * 1000) + 10}`, // Generate random ID
            };
            dataKunjunganDummy.unshift(newVisit); // Add to the beginning of the array
            resolve(newVisit);
        }, 500); // Simulate API delay
    });
};

// GET /api/kunjungan/:id
export const fetchVisitByIdApi = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const visit = dataKunjunganDummy.find((item) => item.id === id);
            if (visit) {
                resolve({ ...visit }); // Return a copy of the data
            } else {
                reject(new Error("Data kunjungan tidak ditemukan"));
            }
        }, 300); // Simulate faster API response
    });
};

// GET /api/kunjungan
export const fetchKunjunganApi = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...dataKunjunganDummy]); // Return a copy of the data
        }, 500); // Simulate delay 0.5 seconds
    });
};

// DELETE /api/kunjungan/:id
export const deleteKunjunganApi = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = dataKunjunganDummy.findIndex((item) => item.id === id);
            if (index !== -1) {
                dataKunjunganDummy = dataKunjunganDummy.filter((item) => item.id !== id);
                resolve({ success: true });
            } else {
                reject(new Error("Data kunjungan tidak ditemukan"));
            }
        }, 500);
    });
};