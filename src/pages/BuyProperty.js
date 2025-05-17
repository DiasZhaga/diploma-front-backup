// src/components/BuyProperty.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Search from "../components/Search";
import PropertyList from "../components/PropertyList";
import HeaderCarousel from "../components/HeaderCarousel";
import "../assets/css/style.css";

const BuyProperty = () => {
  // Инициализируем фильтры: ads_type=1 — продажа
  const [filters, setFilters] = useState({
    ads_type: 1,
    keyword: "",
    type: "",
    location: ""
  });

  // При клике Search обновляем только keyword/type/location
  const handleSearch = ({ keyword, type, location }) => {
    setFilters(f => ({
      ...f,
      keyword,
      type,
      location
    }));
  };

  return (
    <div className="container-fluid p-0">
      <Navbar />

      {/* Header */}
      <div className="header bg-white header-section p-0">
        <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
          <div className="col-md-6 p-5 mt-lg-5">
            <h1 className="display-5 animated fadeIn mb-4">Buy Property</h1>
            <nav aria-label="breadcrumb" className="animated fadeIn">
              <ol className="breadcrumb text-uppercase mb-0">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/buy-property">Property</Link>
                </li>
                <li
                  className="breadcrumb-item text-body active"
                  aria-current="page"
                >
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

      {/* Search with callback */}
      <Search onSearch={handleSearch} initialFilters={filters} />

      {/* PropertyList, принимает объект фильтров */}
      <PropertyList filters={filters} />

      <Footer />
    </div>
  );
};

export default BuyProperty;
