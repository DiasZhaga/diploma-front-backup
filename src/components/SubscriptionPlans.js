import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/css/style.css";

const SubscriptionPlans = () => {
  return (
    <div className="container-fluid p-0 bg-light">
      <Navbar />

      {/* Header Section */}
      <div className="container py-5 mt-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold">Choose Your Potolok Subscription</h1>
          <p className="text-muted">Unlock full access to hidden insights and verified property reports.</p>
        </div>

        {/* Plans Section */}
        <div className="row g-4 justify-content-center">
          {/* Potolok Plus */}
          <div className="col-md-4">
            <div className="bg-white border rounded p-4 text-center h-100">
              <h4 className="mb-3">Potolok Plus</h4>
              <div className="display-5 text-primary fw-bold">₸5 000</div>
              <p className="text-muted">/ month</p>
              <ul className="list-unstyled my-4">
                <li>Enhanced data analytics</li>
                <li>Dedicated support</li>
                <li>Access to Hidden insights</li>
              </ul>
              <button className="btn btn-outline-primary">Subscribe to View</button>
            </div>
          </div>

          {/* Potolok Pro */}
          <div className="col-md-4">
            <div className="bg-white border border-primary rounded p-4 text-center h-100 shadow">
              <h4 className="mb-3">Potolok Pro</h4>
              <div className="display-5 text-success fw-bold">₸12 000</div>
              <p className="text-muted">/ month</p>
              <ul className="list-unstyled my-4">
                <li>Everything in Plus</li>
                <li>Neighborhood insights</li>
                <li>Advanced analytics.</li>
              </ul>
              <button className="btn btn-success">Get Full Access Now</button>
            </div>
          </div>

          {/* Potolok Ultra */}
          <div className="col-md-4">
            <div className="bg-white border rounded p-4 text-center h-100">
              <h4 className="mb-3">Potolok Ultra</h4>
              <div className="display-5 text-danger fw-bold">₸25 000</div>
              <p className="text-muted">/ month</p>
              <ul className="list-unstyled my-4">
                <li>Everything in Pro</li>
                <li>Provides market insights</li>
                <li>premium placement</li>
              </ul>
              <button className="btn btn-outline-danger">Learn More</button>
            </div>
          </div>
        </div>

        {/* Potolok Premium Info */}
        <div className="mt-5 p-5 bg-white rounded shadow">
          <h3 className="mb-3 fw-bold">What is Potolok Premium?</h3>
          <p style={{ lineHeight: 1.7 }}>
            Potolok Premium is your all-access pass to the real story behind any property. While traditional listings only show surface-level details, Potolok Premium dives deeper:
          </p>
          <ul style={{ lineHeight: 1.8 }}>
            <li><strong>Noise & Environment Insights:</strong> Know if there's a nightclub, frequent construction, or heavy traffic before you move in.</li>
            <li><strong>Maintenance History:</strong> Learn about elevator breakdowns, poor plumbing, or heating issues reported by residents.</li>
            <li><strong>Community Vibe:</strong> Get real opinions from people already living in the building or neighborhood.</li>
            <li><strong>Safety Alerts:</strong> Find out about past incidents or risky zones nearby, verified through public sources and platforms like 2GIS.</li>
            <li><strong>PDF Reports (Ultra only):</strong> Export clean, comprehensive property evaluations.</li>
          </ul>
          <p className="mt-3">
            Don't risk unexpected surprises. With Potolok Premium, you're not just buying a property — you're buying peace of mind.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SubscriptionPlans;
