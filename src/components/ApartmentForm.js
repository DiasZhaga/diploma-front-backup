// src/components/ApartmentForm.js
import React, { useState, useRef, useEffect } from "react";

const ApartmentForm = ({
  actionType    = "sell",    // "sell" or "rent"
  initialForm   = null,      // existing ad data in edit mode
  editMode      = false,     // POST vs PUT
  adId,                      // used for PUT URL
  onSuccess                  // callback after success
}) => {
  const defaultForm = {
    title:             "",
    name_appartment:   "",
    square:            "",
    num_rooms:         "",
    floor:             "",
    year_construction: "",
    address:           "",
    price:             "",
    ceiling_height:    "",
    city:              "",     // id of city
    district:          "",     // id of district
    description:       "",
    bank:              false,
    pledge:            false,
  };

  const [form, setForm]         = useState(initialForm || defaultForm);
  const [cities, setCities]     = useState([]);
  const [districts, setDistricts] = useState([]);
  const [complexes, setComplexes] = useState([]);

  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const photosRef               = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  // load cities once
  useEffect(() => {
    fetch("/api/v1/locations/cities", { credentials: "include" })
      .then(r => r.json())
      .then(setCities)
      .catch(console.error);
  }, []);

  // if editing, when initialForm arrives, load districts+complexes
  useEffect(() => {
    if (!initialForm) return;
    setForm(initialForm);

    // load districts for that city
    if (initialForm.city) {
      fetch(`/api/v1/locations/districts?city_id=${initialForm.city}`, { credentials: "include" })
        .then(r => r.json())
        .then(setDistricts)
        .catch(console.error);
    }
    // load complexes for that district
    if (initialForm.district) {
      fetch(`/api/v1/content/appartments?district_id=${initialForm.district}`, { credentials: "include" })
        .then(r => r.json())
        .then(setComplexes)
        .catch(console.error);
    }
  }, [initialForm]);

  // when user picks city → load districts
  const onCityChange = e => {
    const cityId = e.target.value;
    setForm(f => ({ ...f, city: cityId, district: "", name_appartment: "" }));
    setDistricts([]);
    setComplexes([]);
    if (!cityId) return;
    fetch(`/api/v1/locations/districts?city_id=${cityId}`, { credentials: "include" })
      .then(r => r.json())
      .then(setDistricts)
      .catch(console.error);
  };

  // when user picks district → load complexes
  const onDistrictChange = e => {
    const districtId = e.target.value;
    setForm(f => ({ ...f, district: districtId, name_appartment: "" }));
    setComplexes([]);
    if (!districtId) return;
    fetch(`/api/v1/content/appartments?district_id=${districtId}`, { credentials: "include" })
      .then(r => r.json())
      .then(setComplexes)
      .catch(console.error);
  };

  const handleChange = e => {
    const { name, type, checked, value } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        if (typeof val === "boolean") data.append(key, val ? "1" : "0");
        else if (val != null)             data.append(key, val);
      });
      data.set("ads_type", actionType === "sell" ? "1" : "2");

      Array.from(photosRef.current?.files || [])
           .forEach(f => data.append("photos", f));

      const url    = editMode
        ? `/api/v1/content/ads/my/${adId}`
        : `/api/v1/content/ads`;
      const method = editMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method, credentials: "include", body: data
      });
      if (res.status === 401) throw new Error("Please sign in");
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `Server error: ${res.status}`);
      }
      onSuccess?.();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
  <form className="mt-5" onSubmit={handleSubmit} encType="multipart/form-data">
    {error && <div className="text-danger mb-3">Error: {error.message}</div>}

    {/* Listing Title */}
    <div className="row g-3 mb-3">
      <div className="col-md-8">
        <label className="form-label">Listing Title *</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>
    </div>

    {/* City → District → Complex */}
    <div className="row g-3 mb-3">
      <div className="col-md-4">
        <label className="form-label">City *</label>
        <select
          name="city"
          className="form-select"
          value={form.city}
          onChange={onCityChange}
          required
        >
          <option value="">— select city —</option>
          {cities.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      <div className="col-md-4">
        <label className="form-label">District *</label>
        <select
          name="district"
          className="form-select"
          value={form.district}
          onChange={onDistrictChange}
          required
          disabled={!districts.length}
        >
          <option value="">— select district —</option>
          {districts.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </div>
      <div className="col-md-4">
        <label className="form-label">Complex *</label>
        <select
          name="name_appartment"
          className="form-select"
          value={form.name_appartment}
          onChange={handleChange}
          required
          disabled={!complexes.length}
        >
          <option value="">— select complex —</option>
          {complexes.map(a => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
      </div>
    </div>

    {/* Area, Rooms, Floor */}
    <div className="row g-3">
      <div className="col-md-4">
        <label className="form-label">Area (m²) *</label>
        <input
          type="text"
          name="square"
          className="form-control"
          value={form.square}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-4">
        <label className="form-label">Number of Rooms *</label>
        <input
          type="number"
          name="num_rooms"
          className="form-control"
          value={form.num_rooms}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-4">
        <label className="form-label">Floor *</label>
        <input
          type="text"
          name="floor"
          className="form-control"
          value={form.floor}
          onChange={handleChange}
          required
        />
      </div>
    </div>

    {/* Year Built & Address */}
    <div className="row g-3 mt-3">
      <div className="col-md-4">
        <label className="form-label">Year Built *</label>
        <input
          type="number"
          name="year_construction"
          className="form-control"
          value={form.year_construction}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-8">
        <label className="form-label">Address *</label>
        <input
          type="text"
          name="address"
          className="form-control"
          value={form.address}
          onChange={handleChange}
          required
        />
      </div>
    </div>

    {/* Price, Ceiling Height */}
    <div className="row g-3 mt-3">
      <div className="col-md-4">
        <label className="form-label">Price *</label>
        <input
          type="text"
          name="price"
          className="form-control"
          value={form.price}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-4">
        <label className="form-label">Ceiling Height *</label>
        <input
          type="text"
          name="ceiling_height"
          className="form-control"
          value={form.ceiling_height}
          onChange={handleChange}
          required
        />
      </div>
    </div>

    {/* Description */}
    <div className="row g-3 mt-3">
      <div className="col-md-12">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          className="form-control"
          value={form.description}
          onChange={handleChange}
          rows="3"
        />
      </div>
    </div>

    {/* Bank & Mortgage */}
    <div className="form-check mt-3">
      <input
        className="form-check-input"
        type="checkbox"
        id="bank"
        name="bank"
        checked={form.bank}
        onChange={handleChange}
      />
      <label className="form-check-label" htmlFor="bank">
        Bank financing available
      </label>
    </div>
    <div className="form-check mt-2">
      <input
        className="form-check-input"
        type="checkbox"
        id="pledge"
        name="pledge"
        checked={form.pledge}
        onChange={handleChange}
      />
      <label className="form-check-label" htmlFor="pledge">
        Mortgage available
      </label>
    </div>

    {/* Photos */}
    <div className="mt-4">
      <label className="form-label">Photos</label>
      <div
        className={`upload-box border border-2 rounded p-4 text-center ${
          dragActive ? "border-primary bg-light" : "border-secondary"
        }`}
        style={{ cursor: "pointer", borderStyle: "dashed" }}
        onClick={() => photosRef.current.click()}
        onDragEnter={e => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={e => { e.preventDefault(); setDragActive(false); }}
        onDragOver={e => { e.preventDefault(); }}
        onDrop={e => {
          e.preventDefault();
          setDragActive(false);
          photosRef.current.files = e.dataTransfer.files;
        }}
      >
        <p>Drag & drop photos here, or click to select</p>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={e => { e.stopPropagation(); photosRef.current.click(); }}
        >
          Choose Photos
        </button>
        <input
          type="file"
          name="photos"
          multiple
          ref={photosRef}
          className="d-none"
        />
      </div>
    </div>

    {/* Submit */}
    <button
      type="submit"
      className="btn btn-primary mt-4"
      disabled={loading}
    >
      {loading ? "Publishing…" : "Publish"}
    </button>
  </form>
);
};

export default ApartmentForm;