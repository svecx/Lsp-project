import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showAdminNav, setShowAdminNav] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const successLogin = localStorage.getItem("successLogin");
    setShowAdminNav(successLogin === "true");
  }, []);

  useEffect(() => {
    const successLogin = localStorage.getItem("successLogin");
    setShowAdminNav(successLogin === "true");
  }, [showAdminNav]);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    localStorage.setItem("successLogin", "false");
    setShowAdminNav(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const storedPosts = JSON.parse(localStorage.getItem("post")) || [];
    const searchResults = storedPosts.filter((post) =>
      post.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    // Menggunakan searchResults di sini jika diperlukan
    console.log("Search Results:", searchResults);

    // Menyimpan nilai pencarian ke dalam local storage
    localStorage.setItem("search", searchInput);

    // Memuat ulang halaman
    window.location.reload();
  };

  useEffect(() => {
    // Mengambil nilai pencarian dari local storage saat komponen dimuat
    const storedSearch = localStorage.getItem("search");
    setSearchInput(storedSearch || "");
  }, []);

  useEffect(() => {
    // Mendaftarkan event listener untuk storage event
    const handleStorageChange = (e) => {
      if (e.key === "search") {
        setSearchInput(e.newValue || "");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      // Membersihkan event listener saat komponen tidak lagi digunakan
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

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
            {showAdminNav && (
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/tambah">
                  Tambah
                </Link>
              </li>
            )}
            <li className="nav-item">
              {showAdminNav ? (
                <Link className="nav-link text-dark" to="/" onClick={handleLogout}>
                  Keluar
                </Link>
              ) : (
                <Link className="nav-link text-dark" to="/masuk">
                  Masuk
                </Link>
              )}
            </li>
            {showAdminNav && (
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/admin">
                  Admin
                </Link>
              </li>
            )}
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </form>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
