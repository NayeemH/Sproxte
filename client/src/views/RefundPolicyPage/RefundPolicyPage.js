import React from "react";
import { Container } from "react-bootstrap";
import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";
import RefundPolicy from "../../components/RefundPolicy/RefundPolicy";
import BgProvider from "../../components/Shared/BgProvider/BgProvider";

const RefundPolicyPage = () => {
  return (
    <BgProvider className="mh">
      <LandingNavbar page={"refund"} />
      <Container className="crd shadow px-0 ">
        <RefundPolicy />
      </Container>
    </BgProvider>
  );
};

export default RefundPolicyPage;
