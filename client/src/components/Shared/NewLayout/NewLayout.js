import React from "react";
import LandingNavbar from "../../LandingNavbar/LandingNavbar";
import styles from "./NewLayout.module.scss";

const NewLayout = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <LandingNavbar />
      {children}
    </div>
  );
};

export default NewLayout;
