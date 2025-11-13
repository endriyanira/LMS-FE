import React from "react";

const DashboardPage = () => {
  return (
    <main>
      <h2 className="text-2xl font-bold mb-6">Status Perpustakaan</h2>
      {/* Card Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-500">Total Buku</p>
          <p className="text-3xl font-extrabold text-indigo-600 mt-1">1,250</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-500">Anggota Aktif</p>
          <p className="text-3xl font-extrabold text-green-600 mt-1">480</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-500">Buku Dipinjam</p>
          <p className="text-3xl font-extrabold text-yellow-600 mt-1">65</p>
        </div>
      </div>

      {/* Nanti kita akan tambahkan Recent Activity, Charts, dll. di sini */}
    </main>
  );
};

export default DashboardPage;
