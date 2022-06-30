import React from "react";
import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";
import ResetLinkForm from "../../components/ResetLinkForm/ResetLinkForm";
import BgProvider from "../../components/Shared/BgProvider/BgProvider";

const ResetPasswordPage = () => {
  return (
    <BgProvider className="mh">
      <LandingNavbar page={"login"} />
      <ResetLinkForm />
    </BgProvider>
  );
};

export default ResetPasswordPage;
