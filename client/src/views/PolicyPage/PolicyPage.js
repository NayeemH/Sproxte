import React from "react";
import { Container } from "react-bootstrap";
import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";

import { Policy } from "../../components/Policy";

const PolicyPage = () => {
  return (
    <div className="mh bg_custom  pb-4">
      <LandingNavbar page={"policy"} />
      <Container className="crd shadow px-0">
        <Policy />
      </Container>
    </div>
  );
};

export default PolicyPage;
