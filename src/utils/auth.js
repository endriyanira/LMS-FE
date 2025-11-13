import { jwtDecode } from "jwt-decode";

/**
 * Mendekode token JWT yang tersimpan di localStorage.
 * Memeriksa masa berlaku token.
 * @returns {string|null} Peran pengguna ('admin', 'member', atau null jika tidak valid/expired).
 */
export const getUserRole = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode(token);

    if (decoded.exp * 1000 < Date.now()) {
      // Hapus token yang sudah expired
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      return null;
    }
    return decoded.role;
  } catch (error) {
    console.error("Gagal mendekode token:", error);
    return null;
  }
};

/**
 * Mengecek apakah pengguna sudah terautentikasi (memiliki token valid).
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!getUserRole();
};
