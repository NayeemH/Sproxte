import React from "react";
import Footer from "../../components/Footer/Footer";
import LandingSidebar from "../../components/LandingSidebar/LandingSidebar";
import LoginForm from "../../components/LoginForm/LoginForm";
import Nav from "../../components/Nav/Nav";

const LoginPage = () => {
  return (
    <div>
      <Nav />
      <LoginForm />
      <Footer />
    </div>
  );
};

export default LoginPage;
