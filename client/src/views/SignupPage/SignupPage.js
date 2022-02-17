import React from "react";
import BottomNav from "../../components/BottomNav/BottomNav";
import Footer from "../../components/Footer/Footer";
import LandingSidebar from "../../components/LandingSidebar/LandingSidebar";
import Nav from "../../components/Nav/Nav";
import SignupForm from "../../components/SignupForm/SignupForm";

const SignupPage = () => {
  return (
    <div>
      <LandingSidebar />
      <Nav />
      <SignupForm />
      <BottomNav />
      <Footer />
    </div>
  );
};

export default SignupPage;
