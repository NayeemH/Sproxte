import React from "react";
import BottomNav from "../../components/BottomNav/BottomNav";
import Footer from "../../components/Footer/Footer";
import HeroLanding from "../../components/HeroLanding/HeroLanding";
import LandingSidebar from "../../components/LandingSidebar/LandingSidebar";
import Nav from "../../components/Nav/Nav";
import TemplateSelect from "../../components/TemplateSelect/TemplateSelect";

const LandingPage = () => {
  return (
    <div>
      <Nav />
      <HeroLanding />
      {/* <LandingSidebar />
      <BottomNav />
      <TemplateSelect />
      <Footer /> */}
    </div>
  );
};

export default LandingPage;
