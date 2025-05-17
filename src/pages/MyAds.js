// src/pages/MyAds.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import { Link } from "react-router-dom";

function MyAds() {
  const { user } = useAuth();
  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    fetch("http://localhost:8080/api/v1/content/ads/my", {
      headers: { "Accept": "application/json" }
    })
      .then(r => {
        if (!r.ok) throw new Error(r.statusText);
        return r.json();
      })
      .then(data => setAds(data))
      .catch(err => setError(err));
  }, [user]);

  if (!user) {
    return <p>Please sign in to view your ads.</p>;
  }

  if (error) return <p className="text-danger">Error: {error.message}</p>;

  return (
    <div className="container py-5">
      <h1 className="mb-4">My Listings</h1>
      <div className="row g-4">
        {ads.map(ad => (
          <div className="col-md-6 col-lg-4" key={ad.id}>
            <div className="card h-100">
              <img src={ad.photos?.[0]} className="card-img-top" alt={ad.title}/>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{ad.title}</h5>
                <p className="card-text">₸{ad.price}</p>
                <div className="mt-auto">
                  <Link to={`/edit-ad/${ad.id}`} className="btn btn-sm btn-outline-primary me-2">
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => {
                      fetch(`http://localhost:8080/api/v1/content/ads/${ad.id}/deactivate`, { method: "PATCH" })
                        .then(() => setAds(a => a.filter(x => x.id !== ad.id)));
                    }}
                  >
                    Deactivate
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {ads.length === 0 && <p className="text-muted">You have no active ads.</p>}
      </div>
    </div>
  );
}

export default MyAds;