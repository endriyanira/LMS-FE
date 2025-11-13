// src/hooks/useDebounce.js

import { useState, useEffect } from "react";

/**
 * Custom hook untuk menunda (debounce) pembaruan nilai.
 * Berguna untuk menunda request API saat user mengetik di input search.
 * * @param {any} value - Nilai yang ingin di-debounce (misal: searchTerm)
 * @param {number} delay - Waktu tunda dalam milidetik (misal: 500)
 * @returns {any} Nilai yang sudah di-debounce
 */
function useDebounce(value, delay) {
  // State untuk menyimpan nilai yang di-debounce
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Atur timer yang akan memanggil setDebouncedValue setelah delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function: Penting!
    // Jika 'value' (searchTerm) berubah sebelum 'delay' berakhir,
    // timer sebelumnya akan di-clear dan timer baru akan diatur.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Hanya jalankan effect jika value atau delay berubah

  return debouncedValue;
}

export default useDebounce;
