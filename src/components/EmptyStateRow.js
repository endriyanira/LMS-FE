// src/components/EmptyStateRow.js

import React from "react";

/**
 * Komponen Baris Kosong untuk Tabel (Tampilan "Tidak Ditemukan")
 * @param {object} props
 * @param {string} props.message - Pesan utama (misal: "Tidak ada buku yang ditemukan.")
 * @param {number} [props.colSpan=7] - Jumlah kolom yang harus direntang (default: 7)
 */
const EmptyStateRow = ({ message, colSpan = 7 }) => {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="px-6 py-10 text-center text-lg text-gray-500"
      >
        <p className="font-semibold mb-2">{message} 🔍</p>
        <p className="text-sm">
          Coba ubah kata kunci pencarian atau filter kategori Anda.
        </p>
      </td>
    </tr>
  );
};

export default EmptyStateRow;
