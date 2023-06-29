import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showAdminNav, setShowAdminNav] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
    const inputValue = e.target.value;
    setSearchInput(inputValue);

    const storedPosts = JSON.parse(localStorage.getItem("post")) || [];
    const results = storedPosts.filter((post) =>
      post.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSearchResults(results);
    localStorage.setItem("search", inputValue);
  };

  useEffect(() => {
    const storedSearch = localStorage.getItem("search");
    setSearchInput(storedSearch || "");
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "search") {
        setSearchInput(e.newValue || "");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
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
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchInput}
                onInput={handleSearch}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </form>
          </ul>
        </div>
      </div>
      {searchResults.length > 0 && (
        <div className="container mt-2">
          <div className="card">
            <div className="card-body">
              <h5>Search Results:</h5>
              <ul>
                {searchResults.map((post) => (
                  <li key={post.id}>
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
