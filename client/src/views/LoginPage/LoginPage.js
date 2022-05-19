import React from "react";
import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";
import LoginForm from "../../components/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <div className="mh bg_custom">
      <LandingNavbar page={"login"} />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
