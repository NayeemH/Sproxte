import React from "react";
import BottomNav from "../../components/BottomNav/BottomNav";
import Footer from "../../components/Footer/Footer";
import LandingSidebar from "../../components/LandingSidebar/LandingSidebar";
import Nav from "../../components/Nav/Nav";
import PaymentMethods from "../../components/PaymentMethods/PaymentMethods";

const PaymentMethodsPage = () => {
  return (
    <div>
      <LandingSidebar />
      <Nav />
      <PaymentMethods />
      <BottomNav />
      <Footer />
    </div>
  );
};

export default PaymentMethodsPage;
