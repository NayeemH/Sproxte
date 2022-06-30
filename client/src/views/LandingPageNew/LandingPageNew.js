import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";
import LandingSlider from "../../components/LandingSlider/LandingSlider";
import BgProvider from "../../components/Shared/BgProvider/BgProvider";
import styles from "./LandingPageNew.module.scss";
const queryString = require("query-string");

const LandingPageNew = () => {
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  useEffect(() => {
    if (parsed.payment && parsed.payment === "success") {
      toast.success("Payment Successful!");
    }
  }, []);

  return (
    <BgProvider className={`${styles.wrapper} px-md-4 px-2`}>
      <LandingNavbar />
      <div className="d-flex justify-content-start align-items-center">
        <LandingSlider />
      </div>
    </BgProvider>
  );
};

export default LandingPageNew;
