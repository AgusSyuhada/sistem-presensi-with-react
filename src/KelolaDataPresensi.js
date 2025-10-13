import React, { useState } from "react";
import Sidebar from "./components/Sidebar";

const dataDummy = [
    {
        pegid: "123 456 789",
        nama: "Lorem Ipsum",
        tanggal: "12-08-2025",
        waktu: "09:16",
        status: "Presensi",
    },
    // ...tambahkan data lain
];

const statusOptions = [
    { value: "Presensi", label: "Presensi", bg: "bg-green-200", color: "text-green-800" },
    { value: "Izin", label: "Izin", bg: "bg-blue-200", color: "text-blue-800" },
    { value: "Sakit", label: "Sakit", bg: "bg-yellow-200", color: "text-yellow-800" },
    { value: "Alpa", label: "Alpa", bg: "bg-red-200", color: "text-red-800" }
];

function getStatusStyle(status) {
    const opt = statusOptions.find((o) => o.value === status) || statusOptions[0];
    return `${opt.color} ${opt.bg}`;
}

export default function KelolaDataPresensi() {
    const [editingIdx, setEditingIdx] = useState(null);
    const [presensi, setPresensi] = useState(dataDummy.map(d => ({ ...d })));
    const [editStatus, setEditStatus] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Edit
    const handleEdit = (idx) => {
        setEditingIdx(idx);
        setEditStatus(presensi[idx].status);
    };

    // Simpan perubahan
    const handleSave = (idx) => {
        const updated = [...presensi];
        updated[idx].status = editStatus;
        setPresensi(updated);
        setEditingIdx(null);
        alert(`Status berhasil diubah menjadi: ${editStatus}`);
    };

    // Batal edit
    const handleCancel = () => setEditingIdx(null);

    // Hapus
    const handleDelete = (idx) => {
        if (window.confirm("Yakin ingin menghapus data ini?")) {
            setPresensi(presensi.filter((_, i) => i !== idx));
            setEditingIdx(null);
            alert("Data berhasil dihapus!");
        }
    };

    return (
        <div className="font-sans flex flex-col h-screen">
            {/* Header */}
            <header className="h-16 bg-[#4caf50] flex items-center px-4 z-20 shrink-0 relative">
                {/* Hamburger */}
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
                {/* Logo + Title Desktop */}
                <div className="hidden md:flex items-center">
                    <img
                        alt="MI ALFAIZEIN Logo"
                        className="h-8 w-8 mr-3"
                        src="/asset/logo-mi-al-faizein.png"
                    />
                    <span className="text-white text-xl font-bold">MI AL FAIZEIN</span>
                </div>
                {/* Title Mobile di header DIHAPUS */}
            </header>

            <div className="flex flex-1 overflow-hidden">
                <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} activeMenu="kelola-presensi" />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-[#f5f5f5] p-4 md:p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-[#18181B]">KELOLA PRESENSI</h1>
                    </div>
                    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md overflow-x-auto">
                        <table className="w-full min-w-[800px] text-left text-sm border-collapse border border-[#E4E4E7]">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-4 font-medium text-[#18181B] border border-[#E4E4E7]">No</th>
                                    <th className="p-4 font-medium text-[#18181B] border border-[#E4E4E7]">PEGID</th>
                                    <th className="p-4 font-medium text-[#18181B] border border-[#E4E4E7]">Nama</th>
                                    <th className="p-4 font-medium text-[#18181B] border border-[#E4E4E7]">Tanggal Presensi</th>
                                    <th className="p-4 font-medium text-[#18181B] border border-[#E4E4E7]">Waktu Presensi</th>
                                    <th className="p-4 font-medium text-[#18181B] border border-[#E4E4E7]">Status Presensi</th>
                                    <th className="p-4 font-medium text-[#18181B] border border-[#E4E4E7]">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {presensi.map((row, idx) => (
                                    <tr key={idx} className="border-b border-[#E4E4E7]">
                                        <td className="p-4 text-[#18181B] border border-[#E4E4E7]">{idx + 1}</td>
                                        <td className="p-4 text-[#18181B] border border-[#E4E4E7]">{row.pegid}</td>
                                        <td className="p-4 text-[#18181B] border border-[#E4E4E7]">{row.nama}</td>
                                        <td className="p-4 text-[#18181B] border border-[#E4E4E7]">{row.tanggal}</td>
                                        <td className="p-4 text-[#18181B] border border-[#E4E4E7]">{row.waktu}</td>
                                        <td className="p-4 border border-[#E4E4E7]">
                                            {editingIdx === idx ? (
                                                <select
                                                    className="status-select w-full p-1 text-xs border rounded"
                                                    value={editStatus}
                                                    onChange={e => setEditStatus(e.target.value)}
                                                >
                                                    {statusOptions.map(opt => (
                                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(row.status)}`}>
                                                    {row.status}
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 border border-[#E4E4E7] text-center">
                                            <div className="flex justify-center space-x-2">
                                                {editingIdx === idx ? (
                                                    <>
                                                        <button
                                                            className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition"
                                                            onClick={() => handleSave(idx)}
                                                            title="Simpan"
                                                        >
                                                            <span className="material-icons text-sm">save</span>
                                                        </button>
                                                        <button
                                                            className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center hover:bg-gray-600 transition"
                                                            onClick={handleCancel}
                                                            title="Batal"
                                                        >
                                                            <span className="material-icons text-sm">close</span>
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            className="edit-btn w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600 transition"
                                                            onClick={() => handleEdit(idx)}
                                                            title="Edit"
                                                        >
                                                            <span className="material-icons text-sm">edit</span>
                                                        </button>
                                                        <button
                                                            className="delete-btn w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition"
                                                            onClick={() => handleDelete(idx)}
                                                            title="Hapus"
                                                        >
                                                            <span className="material-icons text-sm">delete</span>
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {presensi.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="text-center p-6 text-gray-400">Tidak ada data presensi</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
}