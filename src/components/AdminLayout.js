import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { FiGrid, FiBookOpen, FiUsers, FiRepeat } from "react-icons/fi";
import SpinnerAnimate from "./Icon/SpinnerAnimate";

const LinkItem = ({ link, label, icon: IconComponent }) => {
  const location = useLocation();
  const isActive =
    location.pathname === link || location.pathname.startsWith(`${link}/`);

  const inactiveClasses =
    "bg-indigo-800 text-indigo-300 hover:bg-indigo-700 hover:text-white font-small";
  const activeClasses =
    "bg-indigo-600 text-white font-medium border-l-4 border-indigo-300";

  return (
    <Link
      to={link}
      className={`block p-4 transition duration-200 
        ${isActive ? activeClasses : inactiveClasses} text-sm flex`} // Terapkan kelas kondisional
    >
      {IconComponent && <IconComponent className="mr-3 h-5 w-5" />}
      {label}
    </Link>
  );
};

const AdminLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      navigate("/", { replace: true });
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex">
      {/* SIDEBAR / NAVIGATION */}
      <div className="w-64 bg-indigo-800 text-white flex-shrink-0">
        <div className="p-4 text-2xl font-bold border-b border-indigo-700">
          LMS Admin
        </div>
        <nav className="space-y-2">
          <LinkItem link="/admin/dashboard" label="Dashboard" icon={FiGrid} />
          <LinkItem link="/admin/books" label="Kelola Buku" icon={FiBookOpen} />
          <LinkItem
            link="/admin/members"
            label="Kelola Anggota"
            icon={FiUsers}
          />
          <LinkItem link="/admin/loans" label="Peminjaman" icon={FiRepeat} />
        </nav>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 bg-gray-50 overflow-y-auto">
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
          <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
          <div className="flex items-center space-x-3">
            <span className="text-gray-600">Halo, Pustakawan!</span>
            <button
              onClick={handleLogout}
              disabled={loading}
              className={`text-sm py-1 px-3 rounded transition duration-150 
                          ${
                            loading
                              ? "bg-red-200 text-red-500 cursor-not-allowed"
                              : "bg-transparent text-red-500 hover:bg-red-50"
                          }`}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <SpinnerAnimate color="red" size="4" />
                  <span>Logging Out...</span>
                </div>
              ) : (
                "Logout"
              )}
            </button>
          </div>
        </header>

        {/* OUTLET: Tempat komponen anak di-render (DashboardPage, BookManagement, dll.) */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
