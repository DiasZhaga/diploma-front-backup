// src/components/Search.js
import React, { useState } from "react";

const Search = ({ onSearch, initialFilters = {} }) => {
  const [keyword, setKeyword]   = useState(initialFilters.keyword   || "");
  const [type,    setType]      = useState(initialFilters.type      || "");
  const [location,setLocation]  = useState(initialFilters.location  || "");

  const handleSearch = () => {
    // отправляем фильтры в родительский компонент
    onSearch({ keyword, type, location });
  };

  return (
    <div
      className="container-fluid bg-primary mb-5 wow fadeIn"
      data-wow-delay="0.1s"
      style={{ padding: "35px" }}
    >
      <div className="container">
        <div className="row g-2">
          {/* Фильтры */}
          <div className="col-md-10">
            <div className="row g-2">
              {/* Поиск по ключевому слову */}
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control border-0 py-3"
                  placeholder="Search Keyword"
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                />
              </div>

              {/* Тип недвижимости */}
              <div className="col-md-4">
                <select
                  className="form-select border-0 py-3"
                  value={type}
                  onChange={e => setType(e.target.value)}
                >
                  <option value="">All Property Types</option>
                  {/* 
                    TODO: заменить эти опции на реальные данные из API 
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    …
                  */}
                </select>
              </div>

              {/* Локация */}
              <div className="col-md-4">
                <select
                  className="form-select border-0 py-3"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                >
                  <option value="">All Locations</option>
                  {/* 
                    TODO: заменить на реальные районы/города из API 
                    <option value="almaty">Almaty</option>
                    <option value="astana">Astana</option>
                    …
                  */}
                </select>
              </div>
            </div>
          </div>

          {/* Кнопка поиска */}
          <div className="col-md-2">
            <button
              className="btn btn-dark border-0 w-100 py-3"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
