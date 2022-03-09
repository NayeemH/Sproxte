import React from "react";
import BottomNav from "../../components/BottomNav/BottomNav";
import Discover from "../../components/Discover/Discover";
import Footer from "../../components/Footer/Footer";
import LandingSidebar from "../../components/LandingSidebar/LandingSidebar";
import Nav from "../../components/Nav/Nav";

const DiscoverPage = () => {
  return (
    <div>
      <LandingSidebar />
      <Nav />
      <Discover />
      {/* <BottomNav /> */}
      <Footer />
    </div>
  );
};

export default DiscoverPage;
