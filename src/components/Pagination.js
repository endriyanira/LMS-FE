import React from "react";

const Pagination = ({ currentPage, totalPages, goToPage }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    // Tambahkan titik-titik di awal jika startPage > 1
    if (startPage > 1) {
      pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Tambahkan titik-titik di akhir jika endPage < totalPages
    if (endPage < totalPages) {
      pages.push("...");
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center px-4 py-3  sm:px-6 ">
      <nav
        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
      >
        {/* Tombol Pertama (First) */}
        <button
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
        >
          &laquo;
        </button>

        {/* Tombol Sebelumnya */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
        >
          &larr;
        </button>

        {/* Nomor Halaman */}
        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
              </span>
            ) : (
              <button
                onClick={() => goToPage(page)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition duration-150 
                  ${
                    page === currentPage
                      ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        {/* Tombol Selanjutnya */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
        >
          &rarr;
        </button>

        {/* Tombol Terakhir (Last) */}
        <button
          onClick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
        >
          &raquo;
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
