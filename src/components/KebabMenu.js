// src/components/KebabMenu.js

import React, { useState, useRef, useEffect } from "react";

// Ikon Titik Tiga Vertikal (Kebab Menu Icon)
const KebabIcon = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
  </svg>
);

const KebabMenu = ({ bookId, onEdit, onDelete, onViewDetails }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Fungsi untuk menutup menu saat mengklik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  // Handler aksi (menggabungkan penutupan menu dan pemanggilan prop)
  const handleAction = (action) => {
    action(bookId); // Panggil fungsi aksi dengan bookId
    setIsOpen(false); // Tutup menu
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Tombol Kebab */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-center items-center w-full rounded-md
                   px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        aria-expanded={isOpen}
      >
        <KebabIcon className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg 
                     bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 z-10"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1" role="none">
            {/* Opsi Lihat Detail */}
            <button
              onClick={() => handleAction(onViewDetails)}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Lihat Detail
            </button>

            {/* Opsi Edit */}
            <button
              onClick={() => handleAction(onEdit)}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Edit
            </button>
          </div>
          <div className="py-1" role="none">
            {/* Opsi Hapus */}
            <button
              onClick={() => handleAction(onDelete)}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              role="menuitem"
            >
              Hapus
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KebabMenu;
