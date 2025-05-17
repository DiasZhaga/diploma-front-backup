import React from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import Search from "./Search";
import PropertyTypes from "./PropertyTypes";
import PropertyList from "./PropertyList";
import About from "./About";
import SubscriptionPromo from "./SubscriptionPromo";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <Search />
      <PropertyTypes />
      <About />
      <PropertyList />
      <SubscriptionPromo />
      <Footer />
    </div>
  );
};

export default Home;
