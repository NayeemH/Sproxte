import React from "react";
import styles from "./LandingNavbar.module.scss";
import logo from "../../assets/logoLg.png";
import { BsFacebook } from "react-icons/bs";
import {
  AiFillLinkedin,
  AiFillInstagram,
  AiFillTwitterCircle,
} from "react-icons/ai";

const LandingNavbar = () => {
  return (
    <div className="d-flex justify-content-between align-items-center py-3">
      <img src={logo} alt="Sports Veins" className={styles.logo} />
      <div className="d-flex align-items-center">
        <div className={`shadow-sm ${styles.box} d-flex align-items-center`}>
          <div className={styles.icon}>
            <a href="https://facebook.com">
              <BsFacebook />
            </a>
          </div>
          <div className={styles.icon}>
            <a href="https://facebook.com">
              <AiFillLinkedin />
            </a>
          </div>
          <div className={styles.icon}>
            <a href="https://facebook.com">
              <AiFillInstagram />
            </a>
          </div>
          <div className={styles.icon}>
            <a href="https://facebook.com">
              <AiFillTwitterCircle />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingNavbar;
