import React from "react";
import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";
import BgProvider from "../../components/Shared/BgProvider/BgProvider";

import SignupForm from "../../components/SignupForm/SignupForm";

const SignupPage = () => {
  return (
    <BgProvider className="mh">
      <LandingNavbar page={"login"} />
      <SignupForm />
    </BgProvider>
  );
};

export default SignupPage;
