import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Modal, Button, Carousel } from "react-bootstrap";
import propertyMain from "../assets/img/Liberty_Apart.jpg";
import img1 from "../assets/img/detailedphoto1.jpg";
import img2 from "../assets/img/detailedphoto2.jpg";
import img3 from "../assets/img/detailedphoto3.jpg";
import img4 from "../assets/img/detailedphoto4.jpg";
import img5 from "../assets/img/detailedphoto5.jpg";
import img6 from "../assets/img/detailedphoto6.jpg";
import img7 from "../assets/img/detailedphoto7.jpg";
import img8 from "../assets/img/detailedphoto8.jpg";
import img9 from "../assets/img/detailedphoto9.jpg";
import "../assets/css/style.css";

const PropertyDetails = () => {
  const thumbnails = [
    propertyMain,
    img1, img2, img3, img4, img5, img6, img7, img8, img9
  ];
  const [mainImage, setMainImage] = useState(propertyMain);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="container-fluid p-0 bg-white">
      <Navbar />

      <div className="container py-5 mt-5">
      <div className="row g-5">
        <div className="col-lg-7">
          {/* Main Image */}
          <img
            src={mainImage}
            alt="Main"
            className="img-fluid mb-3 rounded"
            style={{
              width: "750px",
              height: "470px",
              objectFit: "cover",
              cursor: "pointer",
            }}
            onClick={() => setModalOpen(true)}
          />

          {/* Thumbnail Images */}
          <div className="d-flex flex-wrap gap-2">
            {thumbnails.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Thumbnail ${i + 1}`}
                onMouseEnter={() => setMainImage(img)}
                onClick={() => {
                  setMainImage(img);
                  setModalOpen(true);
                }}
                style={{
                  width: "110px",
                  height: "75px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  cursor: "pointer",
                  border: mainImage === img ? "2px solid #0dcaf0" : "none",
                }}
              />
            ))}
          </div>
          </div>

        {/* Image Modal */}
        <Modal show={modalOpen} onHide={() => setModalOpen(false)} size="xxxl" centered>
        <Modal.Body className="p-0 d-flex justify-content-center align-items-center" style={{ height: "70vh"}}>
          <Carousel
            interval={null}
            activeIndex={thumbnails.indexOf(mainImage)}
            onSelect={(selectedIndex) => setMainImage(thumbnails[selectedIndex])}
          >
            {thumbnails.map((img, i) => (
              <Carousel.Item key={i}>
                <img
                  src={img}
                  alt={`Slide ${i}`}
                  className="d-block w-100"
                  style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
        <Button
          variant="light"
          onClick={() => setModalOpen(false)}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1051, 
            fontSize: "1.5rem",
            background: "white",
            border: "none"
          }}
        >
          &times;
        </Button>
        </Modal.Footer>
      </Modal>

          {/* Right Column - Price + Specs */}
          <div className="col-lg-5">
            <h1 className="fw-bold mb-3">2-room apartment • 52 m² • 7/11 floor</h1>
            <h3 className="text-success mb-4">₸38 500 000</h3>
            <p><strong>City:</strong> Astana, Esil district, Kayim Mukhamedkhanova St., 11/3</p>
            <hr />
            <div className="row">
              <div className="col-sm-6">
                <p><strong>Building Type:</strong> Monolithic</p>
                <p><strong>Complex:</strong> Liberty</p>
                <p><strong>Built:</strong> 2021</p>
                <p><strong>Door:</strong> Armored</p>
              </div>
              <div className="col-sm-6">
                <p><strong>Floor:</strong> 7 of 11</p>
                <p><strong>Size:</strong> 52 m²</p>
                <p><strong>Condition:</strong> Renovated</p>
                <p><strong>Internet:</strong> Fiber optic</p>
              </div>
              <div className="col-sm-6">
                <p><strong>Parking:</strong> Covered</p>
                <p><strong>Furnished:</strong> Fully</p>
              </div>
              <div className="col-sm-6">
                <p><strong>Ceiling height:</strong> 3 m</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-5">
          <h4 className="mb-3">Location on map</h4>
          <iframe
            title="Map"
            src="https://yandex.com/map-widget/v1/?um=constructor%3Ad08b3387a2cde7b927663a79b5559b53a2fdfe5a565e5ae6c08391855d3a81bb&amp;source=constructor"
            width="100%"
            height="300"
            frameBorder="0"
            style={{ borderRadius: "8px" }}
          ></iframe>
        </div>

        {/* Description */}
        <div className="mt-5">
          <h4 className="mb-3">Description</h4>
          <p style={{ lineHeight: 1.7 }}>
          Plastic Windows, non-angular, improved, isolated rooms, built-in kitchen, new plumbing, storage room, counters, quiet courtyard, convenient for commerce.

          Exclusive apartment in an Elite-class residential complex.
          The apartment is in perfect condition!
          Fully ready to move in!
          The documents are in order, the mortgage is being processed.
          </p>
        </div>
      </div>

      {/* Hidden Feedback Section */}
      <div className="container mt-5">
        <h4 className="mb-4">Hidden insights</h4>

        <div className="blurred-box">
        <div className="blurred-text">
        The roof is leaking during spring thaw. Neighbors report frequent heating problems in winter.
        KSK rarely responds to maintenance requests. The area is noisy due to a nightclub operating nearby until 3am.
        Several residents mentioned ongoing issues with plumbing and occasional water pressure drops.
        Internet outages have been reported due to old cabling infrastructure, and cellular reception is weak in lower floors.
        One resident mentioned mold in the underground parking and lack of proper ventilation in stairwells.
        Additionally, local shops play loud music late in the evenings on weekends.
        </div>
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