import React from "react";
import BottomNav from "../../components/BottomNav/BottomNav";
import ContactForm from "../../components/ContactForm/ContactForm";
import Footer from "../../components/Footer/Footer";
import LandingSidebar from "../../components/LandingSidebar/LandingSidebar";
import Nav from "../../components/Nav/Nav";

const ContactPage = () => {
  return (
    <div>
      <LandingSidebar />
      <Nav />
      <ContactForm />
      {/* <BottomNav /> */}
      <Footer />
    </div>
  );
};

export default ContactPage;
