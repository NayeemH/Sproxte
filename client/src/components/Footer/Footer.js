import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <div className="d-flex justify-content-around align-items-center">
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
