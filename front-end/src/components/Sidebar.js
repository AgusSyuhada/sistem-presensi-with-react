import React, { useState } from "react"; // <-- 1. Impor useState
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Modal from "./Modal"; // <-- 2. Impor Modal

export default function Sidebar({ open, setOpen, menuList = [], activeMenu = "" }) {

    // 3. Dapatkan fungsi logout dari AuthContext
    const { logout } = useAuth();

    // 4. Tambahkan state untuk modal
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const renderNavItem = (menu) =>
        menu.key === activeMenu ? (
            <button
                key={menu.key}
                className="flex items-center px-4 py-2 text-white bg-[#4caf50] rounded-lg shadow-sm w-full cursor-default"
                tabIndex={-1}
                type="button"
            >
                <span className="material-icons mr-3">{menu.icon}</span>
                {menu.label}
            </button>
        ) : (
            <Link
                key={menu.key}
                to={menu.href}
                className="flex items-center px-4 py-2 text-black hover:bg-[#4caf50] hover:text-white rounded-lg"
                onClick={() => setOpen(false)}
            >
                <span className="material-icons mr-3">{menu.icon}</span>
                {menu.label}
            </Link>
        );

    // 5. Ganti nama fungsi ini menjadi yang Buka Modal
    const handleLogoutClick = () => {
        setIsLogoutModalOpen(true); // Hanya buka modal
    };

    // 6. Buat fungsi baru untuk menjalankan logout
    const performLogout = () => {
        logout(); // Panggil fungsi logout dari context
        setOpen(false); // Tutup sidebar
        setIsLogoutModalOpen(false); // Tutup modal
        // Navigasi ke /login akan ditangani otomatis oleh ProtectedRoute
    };

    return (
        <>
            <aside
                className={`
          fixed md:static inset-y-0 left-0 z-30 w-64 bg-[#D7F8E5] flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
                id="sidebar"
            >
                {/* ... existing code ... */}
                <div className="bg-[#4caf50] h-16 flex items-center justify-between px-4 text-white md:hidden">
                    <span className="font-bold">MI AL FAIZEIN</span>
                    <button
                        className="text-white focus:outline-none"
                        onClick={() => setOpen(false)}
                        aria-label="Tutup sidebar"
                        type="button"
                    >
                        <span className="material-icons">close</span>
                    </button>
                </div>
                <nav className="flex-1 p-6 space-y-2">
                    {menuList.map(renderNavItem)}
                </nav>
                <div className="p-6">
                    {/* 7. Ubah onClick untuk memanggil pembuka modal */}
                    <button
                        type="button"
                        className="flex items-center px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg w-full text-left"
                        onClick={handleLogoutClick}
                    >
                        <span className="material-icons mr-3">logout</span>
                        Keluar
                    </button>
                </div>
            </aside>
            {/* ... existing code ... */}
            <div
                id="overlay"
                className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden transition-opacity ${open ? "" : "hidden"
                    }`}
                onClick={() => setOpen(false)}
            />

            {/* 8. Tambahkan Modal Konfirmasi Logout */}
            <Modal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                title="Konfirmasi Keluar"
            >
                <p className="text-gray-700 dark:text-gray-300">
                    Apakah Anda yakin ingin keluar dari akun Anda?
                </p>
                <div className="flex justify-end gap-3 mt-5">
                    <button
                        onClick={() => setIsLogoutModalOpen(false)}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                    >
                        Batal
                    </button>
                    <button
                        onClick={performLogout}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                        Ya, Keluar
                    </button>
                </div>
            </Modal>
        </>
    );
}

