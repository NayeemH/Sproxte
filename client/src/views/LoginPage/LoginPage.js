import React from "react";
import BottomNav from "../../components/BottomNav/BottomNav";
import Footer from "../../components/Footer/Footer";
import LandingSidebar from "../../components/LandingSidebar/LandingSidebar";
import LoginForm from "../../components/LoginForm/LoginForm";
import Nav from "../../components/Nav/Nav";

const LoginPage = () => {
  return (
    <div>
      <LandingSidebar />
      <Nav />
      <LoginForm />
      <BottomNav />
      <Footer />
    </div>
  );
};

export default LoginPage;
