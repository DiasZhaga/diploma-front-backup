import React, { useState, useEffect } from "react"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Spinner from "./components/Spinner";
import 'animate.css/animate.min.css';
import WOW from 'wowjs';
import BuyProperty from "./components/BuyProperty";
import PropertyDetails from "./components/PropertyDetails";
import SubscriptionPlans from './components/SubscriptionPlans'; 
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Router>
      <ScrollToTop />
      {loading ? <Spinner /> : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buy-property" element={<BuyProperty />} />
            <Route path="/property-details/:id" element={<PropertyDetails />} />
            <Route path="/subscribe" element={<SubscriptionPlans />} />
          </Routes>
  
          {showButton && (
            <button
              className="btn btn-lg btn-primary btn-lg-square back-to-top"
              onClick={scrollToTop}
            >
              <i className="bi bi-arrow-up"></i>
            </button>
          )}
        </>
      )}
    </Router>
  );
};

export default App;
