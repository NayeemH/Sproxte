import React from "react";
import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";
import ResetPasswordForm from "../../components/ResetPasswordForm/ResetPasswordForm";
import BgProvider from "../../components/Shared/BgProvider/BgProvider";

const PasswordResetChangePage = () => {
  return (
    <BgProvider className="mh">
      <LandingNavbar page={"login"} />
      <ResetPasswordForm />
    </BgProvider>
  );
};

export default PasswordResetChangePage;
