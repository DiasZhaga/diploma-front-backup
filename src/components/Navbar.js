import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import LogoPotolok from "../assets/img/PotolokKz.png";
import SignInModal from "./SignInModal"; 

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="container-fluid nav-bar bg-white fixed-top shadow-sm py-2 bg-transparent">
        <nav className="navbar navbar-expand-lg bg-white navbar-light py-0 px-4 fixed-top">
          <Link to="/" className="navbar-brand d-flex align-items-center text-center">
            <div className="icon p-2 me-2">
              <img className="img-fluid" src={LogoPotolok} alt="Icon" style={{ width: "30px", height: "30px" }} />
            </div>
            <h1 className="m-0 text-primary">Potolok.kz</h1>
          </Link>
          <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto">
              <NavLink to="/" className={({ isActive }) => `nav-item nav-link ${isActive ? "active" : ""}`}>Home</NavLink>
              <NavLink to="/subscribe" className={({ isActive }) => `nav-item nav-link ${isActive ? "active" : ""}`}>Premium</NavLink>
              <div className="nav-item dropdown">
                <Link to="/" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Property</Link>
                <div className="dropdown-menu rounded-0 m-0">
                  <NavLink to="/buy-property" className="dropdown-item">Buy property</NavLink>
                  <NavLink to="/sell-property" className="dropdown-item">Sell property</NavLink>
                </div>
              </div>
              <div className="nav-item dropdown">
                <NavLink to="/pages" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</NavLink>
                <div className="dropdown-menu rounded-0 m-0">
                  <NavLink to="/testimonial" className="dropdown-item">Testimonial</NavLink>
                  <NavLink to="/404" className="dropdown-item">404 Error</NavLink>
                </div>
              </div>
              <button onClick={() => setShowModal(true)} className="nav-item nav-link">Sign in</button>
            </div>
          </div>
        </nav>
      </div>

      {/* Sign In Modal */}
      {showModal && <SignInModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Navbar;
