import React, { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

/**
 * Global Input Component for forms, styled with Tailwind CSS.
 *
 * @param {string} label - The text displayed above the input.
 * @param {string} type - The input type (e.g., 'text', 'email', 'password', 'number').
 * @param {string} name - The HTML name attribute (CRUCIAL for form state management).
 * @param {any} value - The current value of the input field.
 * @param {function} onChange - The handler function for value changes.
 * @param {boolean} required - HTML required attribute.
 * @param {boolean} showToggle - Whether to show the password visibility toggle.
 * @param {object} props - Semua properti HTML lainnya (min, max, placeholder, dll.)
 */
const InputForm = ({
  label,
  type,
  name, // ⭐️ Ditambahkan: Penting untuk handleChange universal ⭐️
  value,
  onChange,
  required = false,
  showToggle = false,
  // ⭐️ Menggunakan rest props untuk fleksibilitas (misal: min, max, placeholder) ⭐️
  ...props
}) => {
  // Hanya kelola visibility toggle jika type awal adalah 'password'
  const isPassword = type === "password";
  const [inputType, setInputType] = useState(type);

  const toogleVisibility = () => {
    // Pastikan hanya mengubah tipe antara 'text' dan 'password'
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <div className="relative mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={isPassword && showToggle ? inputType : type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        {...props}
        className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                   transition duration-150 ease-in-out"
      />

      {isPassword && showToggle && (
        <button
          type="button"
          onClick={toogleVisibility}
          className="absolute right-0 top-1/2 mt-2 transform -translate-y-1/2 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-indigo-600"
          aria-label={
            inputType === "password" ? "Show password" : "Hide password"
          }
        >
          {inputType === "password" ? <MdVisibility /> : <MdVisibilityOff />}
        </button>
      )}
    </div>
  );
};

export default InputForm;
