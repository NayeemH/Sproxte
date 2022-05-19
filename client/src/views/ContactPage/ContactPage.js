import React from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";

const ContactPage = () => {
  return (
    <div className="mh bg_custom">
      <LandingNavbar page={"contact"} />
      <ContactForm />
    </div>
  );
};

export default ContactPage;
