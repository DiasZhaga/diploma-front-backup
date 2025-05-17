import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Search from "../components/Search";
import PropertyList from "../components/PropertyList";
import HeaderCarousel from "../components/HeaderCarousel";
import "../assets/css/style.css";

const BuyProperty = () => {
  return (
    <div className="container-fluid p-0">
      <Navbar />

      {/* Header Start */}
      <div className="header bg-white" style={{ marginTop: "55px" }}>
        <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
          <div className="col-md-6 p-5 mt-lg-5">
            <h1 className="display-5 animated fadeIn mb-4">Buy Property</h1>
            <nav aria-label="breadcrumb animated fadeIn">
              <ol className="breadcrumb text-uppercase">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Property</a>
                </li>
                <li className="breadcrumb-item text-body active" aria-current="page">
                  Buy Property
                </li>
              </ol>
            </nav>
          </div>
          <div className="col-md-6 animated fadeIn">
            <HeaderCarousel />
          </div>
        </div>
      </div>
      {/* Header End */}

      <Search />
      <PropertyList filter="for sell" />
      <Footer />
    </div>
  );
};

export default BuyProperty;
