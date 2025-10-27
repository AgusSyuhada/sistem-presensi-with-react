// // Ini adalah "Model" Anda.
// // Ini mensimulasikan data source (database/API)

// const DUMMY_USERS = {
//   "123456789": { password: "password123", role: "user", nama: "Budi Santoso" },
//   "123457890": { password: "password123", role: "user", nama: "Dewi Lestari" },
//   "987654321": { password: "password123", role: "admin", nama: "Agus Setiawan" }
// };

// /**
//  * Mensimulasikan panggilan API untuk login.
//  * @param {string} pegid
//  * @param {string} password
//  * @returns {Promise<object>} Data pengguna jika sukses
//  */
// export const authApi = {
//   login: (pegid, password) => {
//     return new Promise((resolve, reject) => {
//       // Simulasi jeda waktu jaringan (misalnya 500ms)
//       setTimeout(() => {
//         const user = DUMMY_USERS[pegid.trim()];
        
//         if (user && user.password === password) {
//           // Jika sukses, kirim data pengguna (tanpa password)
//           resolve({
//             pegid: pegid.trim(),
//             role: user.role,
//             nama: user.nama
//           });
//         } else {
//           // Jika gagal, kirim pesan error
//           reject(new Error("PEGID atau kata sandi salah!"));
//         }
//       }, 500);
//     });
//   }
// };

// Ini adalah "Model" Anda.
// Ini mensimulasikan data source (database/API)

const DUMMY_USERS = {
  "123456789": { 
    password: "password123", 
    role: "user", 
    nama: "Budi Santoso",
    jabatan: "Guru Matematika",
    tempatLahir: "Surabaya",
    tanggalLahir: "15-05-1985",
    tanggalMasuk: "01-01-2010",
    foto: "/asset/pexels-justin-shaifer-501272-1222271.jpg" 
  },
  "123457890": { 
    password: "password123", 
    role: "user", 
    nama: "Dewi Lestari",
    jabatan: "Guru Bahasa Indonesia",
    tempatLahir: "Bandung",
    tanggalLahir: "20-11-1990",
    tanggalMasuk: "15-06-2015",
    foto: "/asset/pexels-justin-shaifer-501272-1222271.jpg" 
  },
  "987654321": { 
    password: "password123", 
    role: "admin", 
    nama: "Agus Setiawan",
    jabatan: "Kepala Sekolah",
    tempatLahir: "Jakarta",
    tanggalLahir: "10-03-1975",
    tanggalMasuk: "01-01-2005",
    foto: "/asset/pexels-justin-shaifer-501272-1222271.jpg" 
  }
};

/**
 * Mensimulasikan panggilan API untuk login.
 * @param {string} pegid
 * @param {string} password
 * @returns {Promise<object>} Data pengguna jika sukses
 */
export const authApi = {
  login: (pegid, password) => {
    return new Promise((resolve, reject) => {
      // Simulasi jeda waktu jaringan (misalnya 500ms)
      setTimeout(() => {
        const user = DUMMY_USERS[pegid.trim()];
        
        if (user && user.password === password) {
          // Jika sukses, kirim data pengguna (tanpa password)
          resolve({
            pegid: pegid.trim(),
            role: user.role,
            nama: user.nama,
            jabatan: user.jabatan,
            tempatLahir: user.tempatLahir,
            tanggalLahir: user.tanggalLahir,
            tanggalMasuk: user.tanggalMasuk,
            foto: user.foto
          });
        } else {
          // Jika gagal, kirim pesan error
          reject(new Error("PEGID atau kata sandi salah!"));
        }
      }, 500);
    });
  },
  /**
   * Mensimulasikan panggilan API untuk fetch profil lengkap berdasarkan pegid.
   * @param {string} pegid
   * @returns {Promise<object>} Data profil lengkap pengguna
   */
  fetchProfile: (pegid) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = DUMMY_USERS[pegid.trim()];
        if (user) {
          // Kembalikan data lengkap (tanpa password)
          resolve({
            pegid: pegid.trim(),
            role: user.role,
            nama: user.nama,
            jabatan: user.jabatan,
            tempatLahir: user.tempatLahir,
            tanggalLahir: user.tanggalLahir,
            tanggalMasuk: user.tanggalMasuk,
            foto: user.foto
          });
        } else {
          reject(new Error("Data pengguna tidak ditemukan"));
        }
      }, 300); // Delay lebih cepat untuk fetch profil
    });
  }
};