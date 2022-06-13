import React from "react";
import { Container } from "react-bootstrap";
import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";
import RefundPolicy from "../../components/RefundPolicy/RefundPolicy";

const RefundPolicyPage = () => {
  return (
    <div className="mh bg_custom">
      <LandingNavbar page={"refund"} />
      <Container className="crd shadow px-0 ">
        <RefundPolicy />
      </Container>
    </div>
  );
};

export default RefundPolicyPage;
