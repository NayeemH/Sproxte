import React from "react";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import { PaymentSuccessAddPlayer } from "../../components/PaymentSuccessAddPlayer";

const PlayerRequestCompletePage = () => {
  return (
    <div>
      <Nav />
      <PaymentSuccessAddPlayer />

      <Footer />
    </div>
  );
};

export default PlayerRequestCompletePage;
