import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../components/Footer/Footer";
import HeroLanding from "../../components/HeroLanding/HeroLanding";
import Nav from "../../components/Nav/Nav";
import StaticLanding from "../../components/StaticLanding/StaticLanding";
const queryString = require("query-string");

const LandingPage = () => {
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  useEffect(() => {
    if (parsed.payment && parsed.payment === "success") {
      toast.success("Payment Successful!");
    }
  }, []);

  return (
    <div>
      <Nav />
      <HeroLanding />
      <StaticLanding />
      <Footer />
    </div>
  );
};

export default LandingPage;
