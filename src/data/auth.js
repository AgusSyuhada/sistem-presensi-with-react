// Ini adalah "Model" Anda.
// Ini mensimulasikan data source (database/API)

const DUMMY_USERS = {
  "123456789": { password: "password123", role: "admin" },
  "987654321": { password: "password123", role: "user" }
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
            role: user.role
          });
        } else {
          // Jika gagal, kirim pesan error
          reject(new Error("PEGID atau kata sandi salah!"));
        }
      }, 500);
    });
  }
};
