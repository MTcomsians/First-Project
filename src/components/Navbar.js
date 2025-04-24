import React, { useState } from 'react';
import { Link, useLocation, useHistory } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  let history = useHistory();
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleLogout = () => {
    setShowModal(true); // Show the modal when "Logout" is clicked
  };

  const confirmLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
    setShowModal(false); // Hide the modal after logging out
  };

  const cancelLogout = () => {
    setShowModal(false); // Close the modal if "No" is clicked
  };

  let location = useLocation();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <i className="fas fa-book"></i> INotebook {/* Added an icon */}
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">
                  <i className="fas fa-home"></i> Home {/* Added an icon */}
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">
                  <i className="fas fa-info-circle"></i> About {/* Added an icon */}
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token') ? (
              <form className="d-flex" role="search">
                <Link className="btn btn-primary mx-1" to="/login" role="button">
                  <i className="fas fa-sign-in-alt"></i> Login {/* Added an icon */}
                </Link>
                <Link className="btn btn-primary mx-1" to="/signup" role="button">
                  <i className="fas fa-user-plus"></i> Signup {/* Added an icon */}
                </Link>
              </form>
            ) : (
              <button onClick={handleLogout} className="btn btn-primary">
                <i className="fas fa-sign-out-alt"></i> Logout {/* Added an icon */}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Modal */}
      {showModal && (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Logout</h5>
                <button type="button" className="btn-close" onClick={cancelLogout}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to Logout?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cancelLogout}>No</button>
                <button type="button" className="btn btn-primary" onClick={confirmLogout}>Yes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
