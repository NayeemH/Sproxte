import React from "react";
import { Container } from "react-bootstrap";
import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";

import { Policy } from "../../components/Policy";
import BgProvider from "../../components/Shared/BgProvider/BgProvider";

const PolicyPage = () => {
  return (
    <BgProvider className="mh  pb-4">
      <LandingNavbar page={"policy"} />
      <Container className="crd shadow px-0">
        <Policy />
      </Container>
    </BgProvider>
  );
};

export default PolicyPage;
