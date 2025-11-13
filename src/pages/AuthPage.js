import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import API_ENDPOINTS from "../config/apiConfig";
import axios from "axios";
import InputForm from "../components/Input/inputForm";
import { jwtDecode } from "jwt-decode";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // State untuk berpindah mode
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
    score: 0, // Nilai 0-4
  });

  const MAX_SCORE = 4;

  const checkPasswordStrength = (pw) => {
    const rules = {
      length: pw.length >= 8,
      uppercase: /[A-Z]/.test(pw),
      number: /[0-9]/.test(pw),
      specialChar: /[^A-Za-z0-9]/.test(pw),
    };

    const score = Object.values(rules).filter(Boolean).length;
    setPasswordStrength({ ...rules, score });
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFullname("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!isLogin && password !== confirmPassword) {
      setError("Password dan Konfirmasi Password tidak cocok!");
      setLoading(false);
      return;
    }

    const endpoint = isLogin ? API_ENDPOINTS.login : API_ENDPOINTS.register;

    const payload = isLogin
      ? { email, password }
      : { fullname, email, password };

    try {
      const response = await axios.post(endpoint, payload);
      if (isLogin) {
        localStorage.setItem("token", response.data.token);
        const decodedToken = jwtDecode(response.data.token);
        const userRole = decodedToken.role;
        localStorage.setItem("userRole", userRole);

        navigate("/admin/dashboard", { replace: true });
      } else {
        alert("Registrasi Berhasil! Silakan Login.");
        setIsLogin(true);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        `Gagal ${isLogin ? "Login" : "Registrasi"}.`;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const PasswordGuidance = () => {
    const rulesList = [
      { key: "length", text: "Minimal 8 karakter" },
      { key: "uppercase", text: "Satu huruf kapital (A-Z)" },
      { key: "number", text: "Satu angka (0-9)" },
      { key: "specialChar", text: "Satu karakter spesial" },
    ];

    return (
      <>
        <p className="font-semibold text-sm mb-1 text-gray-800">
          Password harus:
        </p>
        <ul className="text-xs space-y-1">
          {rulesList.map((rule) => {
            const isMet = passwordStrength[rule.key];

            return (
              <li
                key={rule.key}
                className={isMet ? "text-green-600" : "text-gray-500"}
              >
                {isMet ? "✓" : "•"} {rule.text}
              </li>
            );
          })}
        </ul>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md transition-all duration-500 ease-in-out transform">
        <h2 className="text-3xl text-left font-extrabold text-gray-900 mb-6">
          {isLogin ? "Login Pustakawan" : "Daftar Akun Baru"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out bg-transparent
                         ${
                           !isLogin
                             ? "max-h-24 opacity-100"
                             : "max-h-0 opacity-0 mb-0"
                         }`}
          >
            {/* Note: Input.js sudah memiliki mb-4, kita perlu sedikit penyesuaian jika perlu */}
            <InputForm
              label="Nama Lengkap"
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required={!isLogin}
            />
          </div>
          {/* Input Email */}
          <InputForm
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* Input Password */}
          <div className="relative mb-6">
            <InputForm
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                checkPasswordStrength(e.target.value);
              }}
              required
              showToggle={password}
            />
            {!isLogin &&
              passwordStrength.score === MAX_SCORE &&
              password.length > 0 && (
                <FaCheckCircle
                  className="absolute right-10 top-[34px] text-green-500 z-20 w-5 h-5"
                  title="Strong Password"
                />
              )}
            {!isLogin &&
              password.length > 0 &&
              passwordStrength.score < MAX_SCORE && (
                <div
                  // Position: absolute, z-10 untuk di atas komponen lain
                  className="absolute left-0 top-full ml-4 p-3 w-60 bg-white border border-gray-200 
                           rounded-lg shadow-xl z-10 
                           transform transition-opacity duration-300 text-left"
                >
                  <PasswordGuidance passwordStrength={passwordStrength} />

                  <div className="absolute left-3 -top-2 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-200" />
                </div>
              )}
          </div>
          {/* Confirm Password */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out bg-transparent
                         ${
                           !isLogin
                             ? "max-h-24 opacity-100"
                             : "max-h-0 opacity-0 mb-0"
                         }`}
          >
            <InputForm
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required={!isLogin}
              showToggle={confirmPassword}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded-md text-sm">
              {error}
            </div>
          )}
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md font-semibold text-white transition duration-150 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            }`}
          >
            {loading ? "Memproses..." : isLogin ? "Login" : "Daftar"}
          </button>
        </form>

        {/* Switch Link */}
        <div className="mt-6 text-center">
          <button
            onClick={switchMode}
            className="text-sm text-indigo-600 hover:text-indigo-500 focus:outline-none"
          >
            {isLogin
              ? "Belum punya akun? Daftar di sini."
              : "Sudah punya akun? Login di sini."}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
