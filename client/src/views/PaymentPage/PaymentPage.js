import React from "react";
import { Payment } from "../../components/Payment";
import Footer from "../../components/Footer/Footer";
import LandingSidebar from "../../components/LandingSidebar/LandingSidebar";
import Nav from "../../components/Nav/Nav";

const PaymentPage = () => {
  return (
    <div>
      <LandingSidebar />
      <Nav />
      <Payment />
      <Footer />
    </div>
  );
};

export default PaymentPage;
