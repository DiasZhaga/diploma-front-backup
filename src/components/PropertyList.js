import React, { useState } from "react";
import { Link } from "react-router-dom";
import property1 from "../assets/img/OsloResidence_RC.png";
import property2 from "../assets/img/Liberty_Apart.jpg";
import property3 from "../assets/img/Ospanova_Cottage.jpg";
import property4 from "../assets/img/MangilikEl_Apart.jpg";
import property5 from "../assets/img/SouthEast_Cottage.jpg";
import property6 from "../assets/img/SeparateHouse_Cottage.jpg";

const PropertyList = () => {
  const [activeTab, setActiveTab] = useState("Featured");

  const properties = [
    { img: property1, label: "Residential", status: "For Sell", price: "₸29 400 000", title: "Oslo Residence", location: "Almaty, Auezovsky district, Shchepkina street", size: "42 m²", bed: "2 Bed", bath: "1 Bath" },
    { img: property2, label: "Residential", status: "For Sell", price: "₸38 500 000", title: "2-room apartment", location: "Astana, Kayim Mukhamedkhanova Street, 11/3", size: "52 m²", bed: "3 Bed", bath: "2 Bath" },
    { img: property3, label: "Cottage", status: "For Sell", price: "₸1 250 000 000", title: "Luxury cottage for sale", location: "Almaty, Ospanova Street, 85", size: "700 m²", bed: "8 Bed", bath: "3 Bath" },
    { img: property4, label: "Residential", status: "For Rent", price: "₸400 000/month", title: "3-room apartment", location: "Astana, Mangilik el Street, 49, Arc de Triomphe", size: "135 m²", bed: "3 Bed", bath: "1 Bath" },
    { img: property5, label: "Penthouse", status: "For Rent", price: "₸70 000/day", title: "Penthouse in the Southeast for rent", location: "Astana, Kordai street, 56", size: "450 m²", bed: "5 Bed", bath: "2 Bath" },
    { img: property6, label: "Village", status: "For Sell", price: "₸300 000 000", title: "Cottage town of business class", location: "Astana, Yesilsky district, Budapest 32", size: "230 m²", bed: "8 Bed", bath: "4 Bath" },
  ];

  const filteredProperties = activeTab === "Featured"
    ? properties
    : properties.filter(p => p.status === activeTab);

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-0 gx-5 align-items-end">
          <div className="col-lg-6">
            <div className="text-start mx-auto mb-5 wow slideInLeft" data-wow-delay="0.1s">
              <h1 className="mb-3">Property Listing</h1>
              <p>
              </p>
            </div>
          </div>
          <div className="col-lg-6 text-start text-lg-end wow slideInRight" data-wow-delay="0.1s">
            <ul className="nav nav-pills d-inline-flex justify-content-end mb-5">
              {["Featured", "For Sell", "For Rent"].map(tab => (
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

        <div className="row g-4">
          {filteredProperties.map((d, index) => (
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={`${0.1 + index * 0.2}s`} key={index}>
              <div className="property-item d-flex flex-column h-100 rounded overflow-hidden">
                <div className="position-relative overflow-hidden">
                  <a href="#"><img className="img-fluid" src={d.img} alt={d.label} /></a>
                  <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">{d.status}</div>
                  <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">{d.label}</div>
                </div>
                <div className="p-4 pb-0">
                  <h5 className="text-primary mb-3">{d.price}</h5>
                  <a className="d-block h5 mb-2" href="#">
                  <Link 
                  to={`/property-details/${index}`} 
                  state={{ property: d }}
                  className="property-link d-block h5 mb-2"
                >
                  {d.title}
                </Link>
                  </a>
                  <p><i className="fa fa-map-marker-alt text-primary me-2"></i>{d.location}</p>
                </div>
                <div className="d-flex border-top">
                  <small className="flex-fill text-center border-end py-2"><i className="fa fa-ruler-combined text-primary me-2"></i>{d.size}</small>
                  <small className="flex-fill text-center border-end py-2"><i className="fa fa-bed text-primary me-2"></i>{d.bed}</small>
                  <small className="flex-fill text-center py-2"><i className="fa fa-bath text-primary me-2"></i>{d.bath}</small>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-12 text-center wow fadeInUp mt-4" data-wow-delay="0.1s">
          <a className="btn btn-primary py-3 px-5" href="#">Browse More Property</a>
        </div>
      </div>
    </div>
  );
};

export default PropertyList;
