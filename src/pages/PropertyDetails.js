// src/components/PropertyDetails.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyGallery from "../components/PropertyGallery"; // вынесенная галерея
import "../assets/css/style.css";

const PropertyDetails = () => {
  const { id } = useParams();
  const [ad, setAd]           = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/v1/content/ads/${id}`, {
      headers: { "Accept": "application/json" }
    })
      .then(res => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setAd(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center py-5">Loading…</p>;
  if (error)   return <p className="text-danger text-center py-5">Error: {error.message}</p>;
  if (!ad)     return <p className="text-center py-5">No data</p>;

  const {
    title,
    price,
    location,
    url_photos = [],
    description,
    specs = {},
    map_embed_url
  } = ad;

  return (
    <div className="container-fluid p-0 bg-white">
      <Navbar />

      <div className="container py-5 mt-5">
        <div className="row g-5">
          {/* Gallery */}
          <PropertyGallery
            thumbnails={url_photos}
            initialMain={url_photos[0]}
          />

          {/* Details */}
          <div className="col-lg-5">
            <h1 className="fw-bold mb-3">{title}</h1>
            <h3 className="text-success mb-4">{price}</h3>
            <p><strong>Address:</strong> {location}</p>
            <hr />

            <div className="row">
              {/*
                Для каждого свойства из specs
                можно рендерить отдельный <p>
                Например: specs.building_type, specs.floor, specs.size и т.д.
              */}
              <div className="col-sm-6">
                <p><strong>Building Type:</strong> {specs.building_type}</p>
                <p><strong>Complex:</strong> {specs.complex}</p>
                <p><strong>Built:</strong> {specs.year_built}</p>
                <p><strong>Door:</strong> {specs.door}</p>
              </div>
              <div className="col-sm-6">
                <p><strong>Floor:</strong> {specs.floor_current} of {specs.floor_total}</p>
                <p><strong>Size:</strong> {specs.size} m²</p>
                <p><strong>Condition:</strong> {specs.condition}</p>
                <p><strong>Internet:</strong> {specs.internet}</p>
              </div>
              {specs.parking && (
                <div className="col-sm-6">
                  <p><strong>Parking:</strong> {specs.parking}</p>
                </div>
              )}
              {specs.ceiling_height && (
                <div className="col-sm-6">
                  <p><strong>Ceiling height:</strong> {specs.ceiling_height} m</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Map */}
        {map_embed_url && (
          <div className="mt-5">
            <h4 className="mb-3">Location on map</h4>
            <iframe
              title="Map"
              src={map_embed_url}
              width="100%"
              height="300"
              frameBorder="0"
              style={{ borderRadius: "8px" }}
            />
          </div>
        )}

        {/* Description */}
        <div className="mt-5">
          <h4 className="mb-3">Description</h4>
          <p style={{ lineHeight: 1.7 }}>{description}</p>
        </div>
      </div>

      {/* Hidden Feedback */}
      <div className="container mt-5">
        <h4 className="mb-4">Hidden insights</h4>
        <div className="blurred-box">
          <div className="blurred-text">{ad.hidden_insights}</div>
          <div className="overlay-message">
            <p className="fw-semibold mb-2 text-dark">
              This information is available only to <span className="text-primary">subscribers</span>.
            </p>
            <Link to="/subscribe" className="btn btn-primary btn-sm">
              Subscribe to View
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetails;
