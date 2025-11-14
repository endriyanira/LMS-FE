import axios from "axios";
import React, { useState, useEffect } from "react";
import API_ENDPOINTS from "../config/apiConfig";
import SpinnerAnimate from "../components/Icon/SpinnerAnimate";
import Pagination from "../components/Pagination";
import KebabMenu from "../components/KebabMenu";
import useDebounce from "../utils/useDebounce";
import EmptyStateRow from "../components/EmptyStateRow";
import SearchIcon from "../components/Icon/SearchIcon";
import { getUserRole } from "../utils/auth";
import { Link } from "react-router-dom";

const BookTableHeaderItems = ({ label }) => {
  return (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
      {label}
    </th>
  );
};

const BookData = ({ cat, data }) => {
  return (
    <td
      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
        cat === "title" && "font-medium"
      }`}
    >
      {data}
    </td>
  );
};

const BookManagementPage = () => {
  const userRole = getUserRole();
  const isAdmin = userRole === "admin";
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce 500ms
  const ITEMS_PER_PAGE = 25;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const ALL_CATEGORIES = [
    "All Category", // Opsi default untuk menghapus filter
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
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES[0]);

  const headerItems = [
    "Cover",
    "Book Title",
    "Author",
    "Category",
    "Published Year",
    "Stock",
    "Action",
  ];

  const fetchBooks = async (page = 1, search = "", category = "") => {
    setLoading(true);
    setError("");

    const searchTermParam = search.trim() === "" ? undefined : search.trim();
    const categoryParam =
      category === "All Category" || category.trim() === ""
        ? undefined
        : category;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        // ⭐️ HANYA BASE URL ⭐️
        `${API_ENDPOINTS.book}`, // Atau gunakan API_BASE_URL/books
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },

          // ⭐️ KONFIGURASI PARAMS DENGAN OBJECT AXIOS ⭐️
          params: {
            search: searchTermParam,
            category: categoryParam,
            page: page,
            limit: ITEMS_PER_PAGE, // Pastikan ITEMS_PER_PAGE didefinisikan
          },
        }
      );
      const data = response.data;
      setBooks(data.books || []);
      setCurrentPage(data.currentPage);
      setTotalItems(data.total);
    } catch (error) {
      setError("Gagal memuat data buku. Silakan cek koneksi API.");
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  // ⭐️ Handler Aksi (Definisi fungsi) ⭐️
  const handleViewDetails = (id) => {
    alert(`Lihat detail untuk Buku ID: ${id}`);
    // Logika nyata: navigate(`/admin/books/${id}`)
  };

  const handleEdit = (id) => {
    alert(`Edit Buku ID: ${id}`);
    // Logika nyata: buka modal edit atau navigate ke form edit
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      `Apakah Anda yakin ingin menghapus Buku ID: ${id}?`
    );
    if (confirmDelete) {
      // Logika nyata: panggil API DELETE dan refresh data
      alert(`Buku ID ${id} dihapus (simulasi).`);
    }
  };

  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      fetchBooks(1, debouncedSearchTerm, selectedCategory);
    }
  }, [debouncedSearchTerm, selectedCategory]);

  useEffect(() => {
    fetchBooks(currentPage, debouncedSearchTerm, selectedCategory);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      if (pageNumber !== currentPage) {
        setCurrentPage(pageNumber);
      }
    }
  };

  if (loading && totalItems === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <SpinnerAnimate size="4" color="indigo" />
        <span className="ml-3 text-lg text-gray-600">Memuat data buku...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10 text-red-600 border border-red-200 bg-red-50 rounded-lg">
        <p className="font-semibold">{error}</p>
        <button
          onClick={() => fetchBooks(currentPage)}
          className="mt-3 px-3 py-1 text-sm bg-red-100 rounded hover:bg-red-200"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Manage Book ({totalItems}) total
        </h2>

        <div className="flex justify-end items-center space-x-4">
          <div className="relative w-1/3 text-sm">
            <input
              type="text"
              placeholder="Cari Judul atau Penulis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              // ⭐️ KELAS PENTING: pl-10 (Padding kiri untuk ikon) ⭐️
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
            />

            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => {
              setCurrentPage(1);
              setSelectedCategory(e.target.value);
            }}
            className="px-4 py-2 border border-gray-300 bg-white rounded-lg text-gray-700 
                   focus:ring-indigo-500 focus:border-indigo-500 transition 
                   appearance-none pr-8 text-sm"
          >
            {ALL_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Tombol Tambah Buku Baru */}

          {isAdmin && (
            <Link
              to="/admin/books/add"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition duration-150 text-sm"
            >
              Add Book
            </Link>
          )}
        </div>
      </div>

      <div
        className={`bg-white shadow-lg rounded-lg overflow-x-auto mb-4 relative transition duration-300
        ${loading ? "opacity-50 pointer-events-none" : "opacity-100"}`}
        style={{ minHeight: "400px" }}
      >
        {/* ⭐️ GUNAKAN KOMPONEN MODULAR DI SINI ⭐️ */}
        <table className="min-w-full divide-y divide-gray-200 rounded-t-lg">
          <thead className="rounded-t-lg bg-gray-200">
            <tr>
              {headerItems.map((item, idx) => (
                <BookTableHeaderItems
                  key={`book-header-table-${idx}`}
                  label={item}
                />
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {books.length === 0 && error && !loading ? (
              <EmptyStateRow message={error} colSpan={7} />
            ) : (
              books.map((book) => (
                <tr key={book._id}>
                  <td className="px-6 py-4">
                    <img
                      src={book.coverImage} // ⭐️ Menggunakan URL dari backend
                      alt={`Cover of ${book.title}`}
                      className="w-10 h-16 object-cover rounded shadow-md" // Styling Tailwind CSS
                      onError={(e) => {
                        // Fallback jika gambar gagal dimuat (opsional)
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/40x64?text=No+Cover";
                      }}
                    />
                  </td>
                  <BookData data={book.title} cat={"title"} />
                  <BookData data={book.author} cat={"author"} />
                  <BookData data={book.category} cat={"category"} />
                  <BookData data={book.publishedYear} cat={"publishedYear"} />
                  <BookData data={book.stock} cat={"stock"} />
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-left font-medium">
                    {/* ⭐️ Gantikan tombol Edit/Hapus lama dengan Kebab Menu ⭐️ */}
                    <KebabMenu
                      bookId={book._id}
                      onViewDetails={handleViewDetails}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {books.length === 0 && !loading && (
          <p className="text-center py-4 text-gray-500">
            Tidak ada buku untuk ditampilkan.
          </p>
        )}
      </div>

      {/* KOMPONEN PAGINATION */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages} // Menggunakan totalPages yang dihitung dari totalItems
        goToPage={goToPage}
      />
    </div>
  );
};

export default BookManagementPage;
