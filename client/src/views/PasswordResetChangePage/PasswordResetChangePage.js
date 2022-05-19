import React from "react";
import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";
import ResetPasswordForm from "../../components/ResetPasswordForm/ResetPasswordForm";

const PasswordResetChangePage = () => {
  return (
    <div className="mh bg_custom">
      <LandingNavbar page={"login"} />
      <ResetPasswordForm />
    </div>
  );
};

export default PasswordResetChangePage;
