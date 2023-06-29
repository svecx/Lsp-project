import React, { useState } from "react";

const LoginRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegistering) {
      // Register logic
      const admin = {
        username,
        password,
      };
      const admins = JSON.parse(localStorage.getItem("listAdmin")) || [];
      admins.push(admin);
      localStorage.setItem("listAdmin", JSON.stringify(admins));
      setUsername("");
      setPassword("");
      setIsRegistering(false);
    } else {
      // Login logic
      const admins = JSON.parse(localStorage.getItem("listAdmin")) || [];
      const matchedAdmin = admins.find(
        (admin) =>
          admin.username === username && admin.password === password
      );
      if (matchedAdmin) {
        // Redirect to dashboard
        setShowModal(true);
        setIsLoggedIn(true); // Set isLoggedIn to true
        localStorage.setItem("successLogin", "true"); // Simpan nilai isLoggedIn ke dalam localStorage
        setModalMessage("Logged in successfully");
      } else {
        setShowModal(true);
        setModalMessage("Invalid username or password");
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
    window.location.href = "/"; // Ganti "/beranda" dengan URL halaman beranda yang sesuai
  };


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h3 className="card-title text-center">
                {isRegistering ? "Register" : "Login"}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-2">
                  {isRegistering ? "Register" : "Login"}
                </button>
                <p className="mt-3">
                  {isRegistering
                    ? "Already have an account?"
                    : "Don't have an account?"}
                  <button
                    type="button"
                    className="btn btn-link btn-sm"
                    onClick={() => setIsRegistering(!isRegistering)}
                  >
                    {isRegistering ? "Login here" : "Register here"}
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Message</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>{modalMessage}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginRegister;
