import React from "react";
import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";

import SignupForm from "../../components/SignupForm/SignupForm";

const SignupPage = () => {
  return (
    <div className="mh bg_custom">
      <LandingNavbar page={"login"} />
      <SignupForm />
    </div>
  );
};

export default SignupPage;
