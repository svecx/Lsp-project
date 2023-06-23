import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showAdminNav, setShowAdminNav] = useState(false); // Tambahkan state showAdminNav

  useEffect(() => {
    // Cek nilai "successLogin" dalam localStorage saat komponen Navbar dimuat
    const successLogin = localStorage.getItem("successLogin");
    setShowAdminNav(successLogin === "true"); // Set showAdminNav berdasarkan nilai "successLogin"
  }, []);

  useEffect(() => {
    // Perbarui nilai showAdminNav saat successLogin berubah
    const successLogin = localStorage.getItem("successLogin");
    setShowAdminNav(successLogin === "true");
  }, [localStorage.getItem("successLogin")]); // Tambahkan dependency successLogin

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    localStorage.setItem("successLogin", "false"); // Set successLogin menjadi false saat logout
    setShowAdminNav(false); // Set showAdminNav menjadi false
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-white text-dark "
      style={{ backgroundColor: "#e3f2fd" }}
      data-bs-theme="dark"
    >
      <div className="container">
        <Link className="navbar-brand text-dark" to="/">
          virno
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isCollapsed ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={handleToggle}
        >
          <span
            className={`navbar-toggler-icon ${isCollapsed ? "" : "dark"}`}
          ></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isCollapsed ? "" : "show"}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/">
                Beranda
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link text-dark" to="/kontak">
                Kontak
              </Link>
            </li> */}
            {showAdminNav && ( // Tampilkan menu Tambah hanya jika isLoggedIn dan showAdminNav bernilai true
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/tambah">
                  Tambah
                </Link>
              </li>
            )}
            <li className="nav-item">
              {showAdminNav ? ( // Ubah tulisan "Masuk" menjadi "Keluar" jika showAdminNav bernilai true
                <Link className="nav-link text-dark" to="/" onClick={handleLogout}>
                  Keluar
                </Link>
              ) : (
                <Link className="nav-link text-dark" to="/masuk">
                  Masuk
                </Link>
              )}
            </li>
            {showAdminNav && ( // Tampilkan menu Admin hanya jika isLoggedIn dan showAdminNav bernilai true
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/admin">
                  Admin
                </Link>
              </li>
            )}
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-dark" type="submit">
                Search
              </button>
            </form>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
