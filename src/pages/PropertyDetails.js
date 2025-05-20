// src/pages/PropertyDetails.js
import React, { useState, useEffect } from "react";
import { useParams }        from "react-router-dom";
import Navbar               from "../components/Navbar";
import Footer               from "../components/Footer";
import PropertyGallery      from "../components/PropertyGallery";

const PropertyDetails = () => {
  const { id } = useParams();
  const [ad, setAd]           = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/v1/content/ads/${id}`, {
          credentials: "include",
          headers: { Accept: "application/json" },
        });
        if (res.status === 401) {
          throw new Error("Please sign in to view details");
        }
        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.error || `Server error: ${res.status}`);
        }
        setAd(await res.json());
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <p className="text-center py-5">Loading…</p>;
  if (error)   return <p className="text-danger text-center py-5">Error: {error.message}</p>;
  if (!ad)     return <p className="text-center py-5">No data</p>;

  // Собираем location из address, city, district
  const location = [
    ad.address,
    ad.city,
    ad.district
  ].filter(Boolean).join(", ");

  // Готовим массив URL для PropertyGallery
  const photoUrls = (ad.url_photos || []).map(p => {
      // если это уже полный URL — оставляем
      if (p.url.startsWith("http")) return p.url;
      // иначе делаем точно такой же префикс, как в PropertyList
      return `/ads-photos/${p.url}`;
  });

  return (
    <div className="container-fluid p-0 bg-white">
        <Navbar />

        <div className="container py-5 mt-5">
              <div className="row g-5">
          {/* Галерея (PropertyGallery сам рендерит col-lg-7) */}
          <PropertyGallery
            thumbnails={photoUrls}
            initialMain={photoUrls[0] || "/placeholder.png"}
          />

          {/* Основная информация */}
          <div className="col-lg-5">
            <h1 className="fw-bold mb-3">{ad.title}</h1>
            <h3 className="text-success mb-4">
              ₸{Number(ad.price).toLocaleString("ru-RU")}
            </h3>
            <p><strong>Address:</strong> {location}</p>
            <hr />

            <div className="row">
              <div className="col-sm-6">
                <p><strong>Size:</strong> {ad.square} m²</p>
                <p><strong>Rooms:</strong> {ad.num_rooms}</p>
                <p><strong>Floor:</strong> {ad.floor}</p>
                <p><strong>Ceiling height:</strong> {ad.ceiling_height} m</p>
              </div>
              <div className="col-sm-6">
                <p><strong>Year built:</strong> {ad.year_construction}</p>
                <p><strong>Type:</strong> {ad.ads_type === "1" ? "For Sell" : "For Rent"}</p>
              </div>
            </div>

            {/* ==== Карточка автора: прямо под характеристиками ==== */}
            <div className="card border-0 shadow-sm p-4 mt-4">
              <h5 className="mb-3">Author of the ad</h5>
              <div className="d-flex align-items-center">
                <i
                  className="fa fa-user-circle fa-2x me-3"
                  style={{ color: "var(--primary)" }}
                />
                <div>
                  <p className="mb-1 fw-semibold">{ad.author.name}</p>
                  <p className="text-muted mb-0">{ad.author.login}</p>
                </div>
              </div>
            </div>
            </div>

            {/* ==== Описание объявления ==== */}
            <div className="mt-5">
              <h4>Description</h4>
              <p style={{ lineHeight: 1.7 }}>{ad.description}</p>
            </div>

          </div>
        </div>
      

      <Footer />
    </div>
  );
};

export default PropertyDetails;
