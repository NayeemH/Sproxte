import React from "react";
import BottomNav from "../../components/BottomNav/BottomNav";
import Footer from "../../components/Footer/Footer";
import LandingSidebar from "../../components/LandingSidebar/LandingSidebar";
import Nav from "../../components/Nav/Nav";
import RefundPolicy from "../../components/RefundPolicy/RefundPolicy";

const RefundPolicyPage = () => {
  return (
    <div>
      <LandingSidebar />
      <Nav />
      <RefundPolicy />
      <BottomNav />
      <Footer />
    </div>
  );
};

export default RefundPolicyPage;
