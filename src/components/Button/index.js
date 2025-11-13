import React from "react";

/**
 * Komponen Tombol Modular
 *
 * @param {string} type - Tipe tombol HTML ('button', 'submit', 'reset'). Default: 'button'.
 * @param {boolean} isLoading - Menunjukkan state loading (mengubah teks dan menonaktifkan tombol).
 * @param {boolean} disabled - Menonaktifkan tombol secara paksa.
 * @param {string} variant - Menentukan warna/gaya (misal: 'primary', 'secondary', 'danger'). Default: 'primary'.
 * @param {string} className - Kelas tambahan untuk kustomisasi.
 * @param {boolean} fullWidth - Apakah tombol harus mengambil lebar penuh (w-full).
 * @param {function} onClick - Event handler saat tombol diklik.
 * @param {React.ReactNode} children - Isi tombol (teks atau ikon).
 */
const Button = ({
  type = "button",
  isLoading = false,
  disabled = false,
  variant = "primary",
  className = "",
  fullWidth = false,
  onClick,
  children,
  ...props
}) => {
  const baseStyles =
    "py-2 px-6 rounded-md shadow-sm text-sm font-medium transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2";

  let variantStyles = "";

  switch (variant) {
    case "outline":
      variantStyles =
        "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-indigo-500";
      break;
    case "secondary":
      variantStyles =
        "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500";
      break;
    case "danger":
      variantStyles = "bg-red-600 hover:bg-red-700 focus:ring-red-500";
      break;
    case "primary":
    default:
      variantStyles = "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500";
      break;
  }

  const stateStyles =
    isLoading || disabled
      ? "bg-gray-400 cursor-not-allowed pointer-events-none"
      : variantStyles;

  const widthStyle = fullWidth ? "w-full" : "inline-flex justify-center";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`${baseStyles} ${widthStyle} ${stateStyles} ${className}`}
      {...props}
    >
      {isLoading ? "Memproses..." : children}
    </button>
  );
};

export default Button;
