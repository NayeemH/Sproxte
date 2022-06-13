import React from "react";
import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";
import ResetLinkForm from "../../components/ResetLinkForm/ResetLinkForm";

const ResetPasswordPage = () => {
  return (
    <div className="mh bg_custom">
      <LandingNavbar page={"login"} />
      <ResetLinkForm />
    </div>
  );
};

export default ResetPasswordPage;
