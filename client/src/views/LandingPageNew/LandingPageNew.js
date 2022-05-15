import Aos from "aos";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../components/Footer/Footer";
import HeroLanding from "../../components/HeroLanding/HeroLanding";
import LandingSlider from "../../components/LandingSlider/LandingSlider";
import Nav from "../../components/Nav/Nav";
import StaticLanding from "../../components/StaticLanding/StaticLanding";
const queryString = require("query-string");

const LandingPageNew = () => {
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  useEffect(() => {
    if (parsed.payment && parsed.payment === "success") {
      toast.success("Payment Successful!");
    }
    Aos.init({
      duration: 2000,
    });
  }, []);

  return (
    <div>
      <LandingSlider />
    </div>
  );
};

export default LandingPageNew;
