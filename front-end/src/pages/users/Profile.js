import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // <-- 1. IMPORT useNavigate
import Sidebar from "../../components/Sidebar";
import { useProfileController } from "../../hooks/useProfileController";

/**
 * Helper function untuk memformat tanggal
 */
const formatDate = (isoString) => {
    if (!isoString) return "-";
    const date = new Date(isoString);
    return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

/**
 * Helper component baru untuk menampilkan field data
 */
const ProfileField = ({ label, value }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            {label}
        </label>
        <div className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md cursor-not-allowed">
            {value || "-"}
        </div>
    </div>
);

const sidebarMenu = [
    {
        key: "riwayat-presensi",
        label: "Riwayat Presensi",
        icon: "history",
        href: "/dashboard/attendance-history",
    },
    {
        key: "profil",
        label: "Profil",
        icon: "person",
        href: "/dashboard/profile",
    },
];

export default function Profil() {
    const { profileData, isLoading, error, sidebarOpen, setSidebarOpen } =
        useProfileController();
    const navigate = useNavigate(); // <-- 2. INISIALISASI useNavigate

    useEffect(() => {
        document.title = "Sistem Presensi | Profil";
    }, []);

    // --- Fungsi baru untuk menangani klik tombol ---
    const handleRegisterClick = () => {
        navigate("/dashboard/register-face");
    };

    // --- Tampilan Loading / Error (Tidak berubah) ---
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                Memuat profil...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen text-red-500">
                {error}
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                Data profil tidak tersedia.
            </div>
        );
    }
    // --- Akhir Tampilan Loading / Error ---

    // --- Nama Lengkap dengan Gelar (Tidak berubah) ---
    const { nama, gelar_depan, gelar_belakang } = profileData;
    let formattedName = nama;
    if (gelar_depan) {
        formattedName = `${gelar_depan} ${formattedName}`;
    }
    if (gelar_belakang) {
        formattedName = `${formattedName}, ${gelar_belakang}`;
    }

    const hasFaceData = profileData.data_wajah !== null;
    const buttonText = hasFaceData ? "Ganti Data Wajah" : "Registrasi Wajah";
    // --- Akhir ---

    return (
        <div className="font-sans flex flex-col h-screen bg-[#f5f5f5] dark:bg-[#1F2937]">
            {/* Header (Tidak berubah) */}
            <header className="h-16 bg-[#4caf50] flex items-center px-4 z-20 shrink-0 relative">
                <button
                    className="md:hidden text-white mr-3 focus:outline-none"
                    onClick={() => setSidebarOpen((v) => !v)}
                    id="hamburger"
                    aria-label={sidebarOpen ? "Tutup menu" : "Buka menu"}
                    type="button"
                >
                    <span className="material-icons" id="hamburger-icon">
                        menu
                    </span>
                </button>
                <div className="hidden md:flex items-center">
                    <img
                        alt="MI ALFAIZEIN Logo"
                        className="h-8 w-8 mr-3"
                        src="/asset/logo-mi-al-faizein.png"
                    />
                    <span className="text-white text-xl font-bold">MI AL FAIZEIN</span>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar (Tidak berubah) */}
                <Sidebar
                    open={sidebarOpen}
                    setOpen={setSidebarOpen}
                    menuList={sidebarMenu}
                    activeMenu="profil"
                />

                {/* Overlay (mobile only) (Tidak berubah) */}
                {sidebarOpen && (
                    <div
                        id="overlay"
                        className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                )}

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-[#f5f5f5] dark:bg-[#374151] p-4 md:p-6">
                    {/* Judul + Tombol Face ID */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-[#18181B] dark:text-[#F9FAFB]">
                            PROFIL
                        </h1>

                        {/* --- 3. TAMBAHKAN onClick --- */}
                        <button
                            onClick={handleRegisterClick}
                            className="md:flex items-center hidden bg-[#4caf50] text-white px-4 py-2 rounded-lg">
                            <span className="material-icons mr-2">face</span>
                            {buttonText} {/* Terapkan teks dinamis */}
                        </button>
                        <button
                            onClick={handleRegisterClick}
                            className="md:hidden bg-[#4caf50] text-white w-10 h-10 rounded-lg flex items-center justify-center"
                        >
                            <span className="material-icons">face</span>
                        </button>
                    </div>

                    {/* Tampilan Data (Tidak berubah) */}
                    <div className="bg-white dark:bg-[#1F2937] p-4 md:p-6 rounded-lg shadow-md">
                        <div className="flex justify-center mb-6">
                            <img
                                alt="Foto Profil"
                                className="h-24 w-24 md:h-32 md:w-32 rounded-full object-cover"
                                src={profileData.foto_profil}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ProfileField label="Nama Lengkap" value={formattedName} />
                            <ProfileField label="PEGID" value={profileData.id_tendik} />
                            <ProfileField label="Jabatan" value={profileData.nama_jabatan} />
                            <ProfileField label="Status" value={profileData.status_tendik} />
                            <ProfileField label="Golongan" value={profileData.golongan} />
                            <ProfileField
                                label="Tanggal Masuk"
                                value={formatDate(profileData.tanggal_masuk)}
                            />
                            <ProfileField
                                label="Tempat Lahir"
                                value={profileData.tempat_lahir}
                            />
                            <ProfileField
                                label="Tanggal Lahir"
                                value={formatDate(profileData.tanggal_lahir)}
                            />
                            <ProfileField
                                label="Jenis Kelamin"
                                value={profileData.jenis_kelamin}
                            />
                            <ProfileField label="Agama" value={profileData.agama} />
                            <ProfileField label="Email" value={profileData.email} />
                            <ProfileField label="No. Telepon" value={profileData.no_telp} />
                            <ProfileField
                                label="Pendidikan Terakhir"
                                value={profileData.pendidikan}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}