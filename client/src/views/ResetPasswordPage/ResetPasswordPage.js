import React from "react";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import ResetLinkForm from "../../components/ResetLinkForm/ResetLinkForm";

const ResetPasswordPage = () => {
  return (
    <div>
      <Nav />
      <ResetLinkForm />
      <Footer />
    </div>
  );
};

export default ResetPasswordPage;
