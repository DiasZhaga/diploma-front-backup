// src/components/PropertyList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PropertyList = ({ filters = {} }) => {
  const [items, setItems]       = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [activeTab, setActiveTab] = useState("Featured");

  // Собираем query-string из фильтров + таба
  const getQueryParams = () => {
    const params = new URLSearchParams();

    // Общие фильтры
    if (filters.keyword)   params.append("keyword", filters.keyword);
    if (filters.type)      params.append("property_type", filters.type);
    if (filters.location)  params.append("city", filters.location);

    // Тип объявления из родителя (например, ads_type=1 для BuyProperty)
    if (filters.ads_type)  params.append("ads_type", filters.ads_type);

    // Таб-фильтрация: For Sell / For Rent
    if (activeTab === "For Sell") params.set("ads_type", 1);
    if (activeTab === "For Rent") params.set("ads_type", 2);

    // Featured — не трогаем ads_type
    return params.toString();
  };

  // Запрашиваем список при изменении filters или tabs
  useEffect(() => {
  setLoading(true);
  setError(null);

  // Собираем query-параметры прямо здесь
  const params = new URLSearchParams();
  if (filters.keyword)   params.append("keyword", filters.keyword);
  if (filters.type)      params.append("property_type", filters.type);
  if (filters.location)  params.append("city", filters.location);
  if (filters.ads_type)  params.append("ads_type", filters.ads_type);
  if (activeTab === "For Sell") params.set("ads_type", 1);
  if (activeTab === "For Rent") params.set("ads_type", 2);

  const queryString = params.toString();
  const url = `http://localhost:8080/api/v1/content/ads?${queryString}`;

  fetch(url, {
    headers: { "Accept": "application/json" }
  })
    .then(res => {
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      return res.json();
    })
    .then(data => {
      setItems(data);
      setLoading(false);
    })
    .catch(err => {
      setError(err);
      setLoading(false);
    });
}, [filters, activeTab]);


  const tabs = ["Featured", "For Sell", "For Rent"];

  return (
    <div className="container-xxl py-5">
      <div className="container">
        {/* Заголовок + Таб-фильтры */}
        <div className="row g-0 gx-5 align-items-end mb-4">
          <div className="col-lg-6">
            <h1 className="mb-3">Property Listing</h1>
          </div>
          <div className="col-lg-6 text-lg-end">
            <ul className="nav nav-pills d-inline-flex mb-3">
              {tabs.map(tab => (
                <li className="nav-item me-2" key={tab}>
                  <button
                    className={`btn btn-outline-primary ${activeTab === tab ? "active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Статусы загрузки / ошибки / пустого списка */}
        {loading && <p>Loading properties...</p>}
        {error && <p className="text-danger">Error: {error.message}</p>}
        {!loading && !error && items.length === 0 && <p>No properties found.</p>}

        {/* Сетка карточек */}
        <div className="row g-4">
          {!loading && !error && items.map((d) => (
            <div className="col-lg-4 col-md-6" key={d.id}>
              <div className="property-item d-flex flex-column h-100 rounded overflow-hidden">
                <div className="position-relative overflow-hidden">
                  <Link to={`/property-details/${d.id}`}>
                    <img
                      className="img-fluid"
                      src={d.url_photos?.[0] || ""}
                      alt={d.title}
                    />
                  </Link>
                  <span className="bg-primary text-white badge position-absolute top-0 start-0 m-3">
                    {d.ads_type === 1 ? "For Sell" : "For Rent"}
                  </span>
                  <span className="bg-white text-primary badge position-absolute bottom-0 start-0 m-3">
                    {d.property_type}
                  </span>
                </div>
                <div className="p-4 pb-0">
                  <h5 className="text-primary mb-3">{d.price}</h5>
                  <Link to={`/property-details/${d.id}`} className="d-block h5 mb-2">
                    {d.title}
                  </Link>
                  <p><i className="fa fa-map-marker-alt text-primary me-2"></i>{d.location}</p>
                </div>
                <div className="d-flex border-top">
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-ruler-combined text-primary me-2"></i>
                    {d.size} m²
                  </small>
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-bed text-primary me-2"></i>
                    {d.bedrooms} Bed
                  </small>
                  <small className="flex-fill text-center py-2">
                    <i className="fa fa-bath text-primary me-2"></i>
                    {d.bathrooms} Bath
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Кнопка «Browse More» */}
        <div className="text-center mt-4">
          <button className="btn btn-primary py-3 px-5">Browse More Property</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyList;
