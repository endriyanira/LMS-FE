# 📚 Library Management System (LMS) - Frontend

Aplikasi _frontend_ ini adalah _dashboard_ administrasi untuk mengelola koleksi buku (CRUD) dan anggota perpustakaan. Dibangun menggunakan **ReactJS** dan distyle dengan **Tailwind CSS** .

## Fitur Utama

Aplikasi ini berfokus pada pengalaman Pustakawan (Admin) dengan implementasi utama:

1. **Sistem Otentikasi Penuh:** Login/Logout dengan proteksi JWT.
2. **Auth Guard:** Melindungi rute admin, hanya pengguna terotentikasi yang dapat mengakses _dashboard_ .
3. **Admin Layout:** Tata letak yang konsisten (Sidebar & Header) untuk navigasi _dashboard_ .
4. **Manajemen Buku (CRUD: Read):**
   - Mengambil dan menampilkan 500+ data buku dari API.
   - **Server-Side Pagination:** Efisien memuat data (25 _item_ per halaman) untuk performa optimal.
   - Fitur Pencarian dan Filter (Siap diimplementasikan di _frontend_ ).
5. **Desain Responsif:** Dibuat dengan Tailwind CSS untuk tampilan yang bersih dan modern.

## 🛠️ Teknologi yang Digunakan

- **Framework:** React.js
- **Styling:** Tailwind CSS (untuk _styling_ cepat dan _mobile-first_ )
- **Routing:** React Router DOM (v6+)
- **HTTP Client:** Axios (untuk interaksi dengan REST API _backend_ )

## 🚀 Instalasi dan Menjalankan Proyek

Ikuti langkah-langkah ini untuk menjalankan proyek secara lokal.

#### Prasyarat

Pastikan Anda memiliki Node.js (disarankan versi LTS) dan npm/yarn terinstal.

1. Clone Repository:

   ```bash
   git clone [URL_REPOSITORY_ANDA]
   cd [NAMA_FOLDER_PROYEK]
   ```

2. Instal Dependensi:

   ```bash
   npm install
   # ATAU
   yarn install
   ```

3. Konfigurasi Variabel Lingkungan

   ```bash
   # .env
   REACT_APP_API_BASE_URL=http://localhost:8080/api
   ```

   (Pastikan port ini sesuai dengan port tempat _backend_ Anda berjalan)

4. Jalankan Aplikasi:

   ```bash
   npm start
   # ATAU
   yarn start
   ```
