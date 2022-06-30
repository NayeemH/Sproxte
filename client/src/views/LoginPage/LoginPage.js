import React from "react";
import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";
import LoginForm from "../../components/LoginForm/LoginForm";
import BgProvider from "../../components/Shared/BgProvider/BgProvider";

const LoginPage = () => {
  return (
    <BgProvider className="mh">
      <LandingNavbar page={"login"} />
      <LoginForm />
    </BgProvider>
  );
};

export default LoginPage;
