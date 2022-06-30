import React from "react";
import LandingNavbar from "../../LandingNavbar/LandingNavbar";
import BgProvider from "../BgProvider/BgProvider";
import styles from "./NewLayout.module.scss";

const NewLayout = ({ children }) => {
  return (
    <BgProvider className={styles.wrapper}>
      <LandingNavbar />
      {children}
    </BgProvider>
  );
};

export default NewLayout;
