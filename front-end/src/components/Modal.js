import React from "react";

/**
 * Komponen Modal pengganti alert/confirm
 * @param {object} props
 * @param {boolean} props.isOpen - Tampilkan modal atau tidak
 * @param {() => void} props.onClose - Fungsi untuk menutup modal
 * @param {string} props.title - Judul modal
 * @param {React.ReactNode} props.children - Konten modal (pesan, form, dll)
 */
export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>
      
      {/* Konten Modal */}
      <div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#1F2937] p-6 rounded-lg shadow-xl z-50 w-full max-w-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header Modal */}
        <div className="flex justify-between items-center mb-4">
          <h2 id="modal-title" className="text-xl font-bold text-[#18181B] dark:text-[#F9FAFB]">
            {title}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
            aria-label="Tutup modal"
          >
            <span className="material-icons">close</span>
          </button>
        </div>
        
        {/* Body Modal */}
        <div>
          {children}
        </div>
      </div>
    </>
  );
}
