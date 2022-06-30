import React from "react";
import Cart from "../../components/Cart/Cart";

import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";
import BgProvider from "../../components/Shared/BgProvider/BgProvider";
import styles from "./CartNewPage.module.scss";

const CartNewPage = () => {
  return (
    <BgProvider className={`${styles.wrapper} px-md-4 px-2`}>
      <LandingNavbar page="cart" />
      <div className="d-flex justify-content-start align-items-center">
        <Cart />
      </div>
    </BgProvider>
  );
};

export default CartNewPage;
