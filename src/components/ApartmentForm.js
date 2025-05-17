// src/components/ApartmentForm.js
import React, { useState, useRef } from "react";

const ApartmentForm = ({ actionType = "sell", onSuccess }) => {
  const [form, setForm] = useState({
    title: "",
    name_apartment: "", 
    square: "",
    num_rooms: "",
    floor: "",
    year_construction: "",
    address: "",
    price: "",
    ceiling_height: "",
    description: "",
    city: "",
    district: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const photosRef = useRef();
  const [dragActive, setDragActive] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      photosRef.current.files = e.dataTransfer.files;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();
      // Required fields
      data.append("title", form.title);
      data.append("name_apartment", form.name_apartment);
      data.append("square", form.square);
      data.append("num_rooms", form.num_rooms);
      data.append("floor", form.floor);
      data.append("year_construction", form.year_construction);
      data.append("address", form.address);
      data.append("price", form.price);
      data.append("ceiling_height", form.ceiling_height);
      data.append("ads_type", actionType === "sell" ? "1" : "2");
      data.append("city", form.city);
      data.append("district", form.district);

      // Optional
      if (form.description) {
        data.append("description", form.description);
      }

      // Photos (multiple)
      const files = photosRef.current.files;
      for (let i = 0; i < files.length; i++) {
        data.append("photos", files[i]);
      }

      const res = await fetch("http://localhost:8080/api/v1/content/ads", {
        method: "POST",
        body: data
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error ${res.status}: ${text}`);
      }
      onSuccess?.();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-5" onSubmit={handleSubmit}>
      {error && <div className="text-danger mb-3">Error: {error.message}</div>}

      {/* Title & Complex ID */}
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
        <div className="col-md-4">
          <label className="form-label">Complex ID *</label>
          <input
            type="text"
            name="name_apartment"
            className="form-control"
            value={form.name_apartment}
            onChange={handleChange}
            required
          />
        </div>
      </div>

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
        <div className="col-md-4">
          <label className="form-label">City ID *</label>
          <input
            type="text"
            name="city"
            className="form-control"
            value={form.city}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="row g-3 mt-3">
        <div className="col-md-4">
          <label className="form-label">District ID *</label>
          <input
            type="text"
            name="district"
            className="form-control"
            value={form.district}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-8">
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

      <div className="mt-4">
        <label className="form-label">Photos</label>
        <div
          className={`upload-box border border-2 rounded p-4 text-center ${
            dragActive ? 'border-primary bg-light' : 'border-secondary'
          }`}
          style={{ cursor: 'pointer', borderStyle: 'dashed' }}
          onClick={() => photosRef.current.click()}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <p className="mb-2">
            Drag &amp; drop photos here, or click to select
          </p>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => photosRef.current.click()}
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

      <button
        type="submit"
        className="btn btn-primary mt-4"
        disabled={loading}
      >
        {loading ? 'Publishing...' : 'Publish'}
      </button>
    </form>
);
};

export default ApartmentForm;