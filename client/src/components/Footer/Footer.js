import React from "react";
import { Link } from "react-router-dom";
import LogoSq from "../../assets/logoSq.png";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <div className="d-flex justify-content-around align-items-center flex-column pb-4 px-5">
        <img src={LogoSq} alt="" className={styles.logo} />
        <h2 className="text-center text-light">Sproxte</h2>
        <span className="d-block text-center px-md-5 pb-3 text-light lead">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
          distinctio sequi aspernatur soluta quaerat quo saepe! Cupiditate
          magnam assumenda aspernatur?
        </span>
      </div>
      <hr className="bg-light" />
      <div className="d-flex justify-content-around align-items-center pt-4">
        <Link to="/contact">CONTACT US</Link>
        <Link to="/payment-methods">PAYMENT METHODS</Link>
        <Link to="/policy">REFUND POLICY</Link>
        <Link to="/shipping">SHIPPING INFO</Link>
      </div>

      <div className="text-center text-white pt-4">
        <span className="lead">
          &copy; {new Date().getFullYear()} SPROXTE. All rights reserved.
        </span>
      </div>
    </div>
  );
};

export default Footer;
