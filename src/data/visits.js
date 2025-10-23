// Mensimulasikan database
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

// --- API SIMULATION ---

// GET /api/kunjungan
export const fetchKunjunganApi = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...dataKunjunganDummy]); // Kembalikan salinan data
        }, 500); // simulasi delay 0.5 detik
    });
};

// DELETE /api/kunjungan/:id
export const deleteKunjunganApi = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = dataKunjunganDummy.findIndex(item => item.id === id);
            if (index !== -1) {
                dataKunjunganDummy = dataKunjunganDummy.filter(item => item.id !== id);
                resolve({ success: true });
            } else {
                reject(new Error("Data kunjungan tidak ditemukan"));
            }
        }, 500);
    });
};
