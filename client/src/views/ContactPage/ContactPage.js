import React from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";
import BgProvider from "../../components/Shared/BgProvider/BgProvider";

const ContactPage = () => {
  return (
    <BgProvider className="mh">
      <LandingNavbar page={"contact"} />
      <ContactForm />
    </BgProvider>
  );
};

export default ContactPage;
