import React from "react";
import { Link } from "react-router-dom";
import LogoSq from "../../assets/logoSq.png";
import { BsFacebook } from "react-icons/bs";
import styles from "./Footer.module.scss";
import { FaLinkedinIn } from "react-icons/fa";
import { AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <div className="d-flex justify-content-around align-items-center flex-column pb-4 px-md-5 px-0">
        <img src={LogoSq} alt="" className={styles.logo} />
        <h2 className="text-center text-light">Sproxte</h2>
        <div className="d-flex justify-content-center align-items-center py-3">
          <a href="#" className={styles.icon}>
            <BsFacebook />
          </a>
          <a href="#" className={styles.icon}>
            <FaLinkedinIn />
          </a>
          <a href="#" className={styles.icon}>
            <AiFillInstagram />
          </a>
          <a href="#" className={styles.icon}>
            <AiFillTwitterCircle />
          </a>
        </div>
        <span className="d-block text-center px-md-5 px-0 pb-3 text-light lead">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
          distinctio sequi aspernatur soluta quaerat quo saepe! Cupiditate
          magnam assumenda aspernatur?
        </span>
      </div>
      <hr className="bg-light" />
      <div
        className={`d-flex justify-content-around flex-column flex-md-row align-items-center pt-4 ${styles.list}`}
      >
        <Link to="/contact">CONTACT US</Link>
        {/* <Link to="/payment-methods">PAYMENT METHODS</Link> */}
        <Link to="/refund-policy">REFUND POLICY</Link>
        <Link to="/policy">PRIVACY POLICY</Link>
        {/* <Link to="/shipping">SHIPPING INFO</Link> */}
      </div>{" "}
      <div className="text-center text-white pt-4">
        <span className="lead">
          &copy; {new Date().getFullYear()} SPROXTE. All rights reserved.
        </span>
      </div>
    </div>
  );
};

export default Footer;
