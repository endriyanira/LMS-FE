import React, { useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Asumsi API_ENDPOINTS dan utilitas lainnya tersedia
// import { API_ENDPOINTS } from '../config/api';
import API_ENDPOINTS from "../config/apiConfig";
import InputForm from "../components/Input/inputForm";
import Button from "../components/Button/index";

// Data Kategori - Sesuaikan dengan data yang Anda miliki
const ALL_CATEGORIES = [
  "Fiksi Ilmiah",
  "Fantasi",
  "Sejarah",
  "Biografi",
  "Thriller",
  "Romance",
  "Misteri",
  "Pengembangan Diri",
  "Bisnis",
  "Teknologi",
];

const initialBookState = {
  title: "",
  author: "",
  category: ALL_CATEGORIES[0],
  publishedYear: new Date().getFullYear(),
  stock: 1,
  coverImage: "",
};

const AddBookPage = () => {
  const [bookData, setBookData] = useState(initialBookState);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({
      ...prev,
      // Konversi ke integer untuk field numerik, default 0 jika input kosong
      [name]:
        name === "stock" || name === "publishedYear"
          ? parseInt(value) || 0
          : value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");

    try {
      // Validasi Sederhana
      if (
        !bookData.title ||
        !bookData.author ||
        !bookData.category ||
        !bookData.publishedYear ||
        bookData.stock === undefined
      ) {
        throw new Error(
          "Judul, Penulis, Kategori, Tahun Terbit, dan Stok harus diisi."
        );
      }

      // 1. TAMBAH DATA BUKU (Mendapatkan ID Buku Baru)
      const bookResponse = await axios.post(API_ENDPOINTS.book, bookData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const newBookId = bookResponse.data.book._id;

      // 2. UPLOAD COVER (Jika ada file yang dipilih)
      if (selectedFile) {
        const formData = new FormData();
        // 'cover' harus sesuai dengan upload.single('cover') di backend
        formData.append("cover", selectedFile);

        await axios.post(
          `${API_ENDPOINTS.book}/${newBookId}/upload-cover`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data", // Wajib untuk file upload
            },
          }
        );
      }

      // Berhasil: Navigasi dan notifikasi
      alert(`Buku "${bookResponse.data.book.title}" berhasil ditambahkan!`);
      navigate("/admin/books");
    } catch (err) {
      console.error("Gagal menambahkan buku:", err);
      // Tangani error khusus seperti duplikasi
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Terjadi kesalahan saat menyimpan buku.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = useMemo(() => {
    const { title, author, category, publishedYear, stock } = bookData;

    const isStringFilled =
      title.trim() !== "" && author.trim() !== "" && category.trim() !== "";

    // Memastikan angka adalah angka (> 0 untuk stok) dan tahun terbit valid
    const isNumberValid =
      publishedYear >= 1900 &&
      publishedYear <= new Date().getFullYear() &&
      stock >= 0 &&
      Number.isInteger(stock); // Stok harus bilangan bulat

    return isStringFilled && isNumberValid;
  }, [bookData]); // Hitung ulang setiap kali bookData berubah

  return (
    <div className="max-w items-start">
      <h2 className="text-xl font-bold text-gray-800 mb-3 pb-3">
        Add New Book Form
      </h2>

      {/* Display Error */}
      {error && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white shadow-xl rounded-lg p-6 "
      >
        {/* Judul Buku */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputForm
            label="Book Title"
            type="text"
            name="title" // ⭐️ Gunakan name ⭐️
            value={bookData.title}
            onChange={handleChange}
            required
            placeholder="Masukkan Judul Buku"
          />
          {/* Penulis */}
          <InputForm
            label="Book Author"
            type="text"
            name="author" // ⭐️ Gunakan name ⭐️
            value={bookData.author}
            onChange={handleChange}
            required
            placeholder="Nama Penulis"
          />
        </div>

        {/* Kategori, Tahun Terbit, Stok */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          {/* Kategori */}
          <div>
            <label
              htmlFor="category"
              className="block font-medium text-gray-700"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              value={bookData.category}
              onChange={handleChange}
              required
              className="mt-1 block w-full border px-3 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            >
              {ALL_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Tahun Terbit */}
          <InputForm
            label="Published Year"
            type="number"
            name="publishedYear"
            value={bookData.publishedYear}
            onChange={handleChange}
            required
            min="1900" // ⭐️ Properti min/max diteruskan melalui rest props ⭐️
            max={new Date().getFullYear()}
          />

          {/* Stok */}
          <InputForm
            label="Available Stock"
            type="number"
            name="stock"
            value={bookData.stock}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label
            htmlFor="coverImage"
            className="block text-sm font-medium text-gray-700"
          >
            Pilih Cover Image (Opsional)
          </label>
          <input
            type="file"
            name="coverImage"
            id="coverImage"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          {selectedFile && (
            <p className="mt-2 text-xs text-gray-500">
              File dipilih: {selectedFile.name}
            </p>
          )}
        </div>

        {/* Tombol Submit */}

        <div className="pt-4 border-t flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Batal
          </Button>

          <Button
            type="submit"
            isLoading={loading}
            variant="primary"
            disabled={!isFormValid || loading}
          >
            Simpan Buku
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddBookPage;
