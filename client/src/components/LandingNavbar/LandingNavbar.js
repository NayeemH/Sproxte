import React from "react";
import styles from "./LandingNavbar.module.scss";
import logo from "../../assets/logoLg.png";
import { BsFacebook } from "react-icons/bs";
import {
  AiFillLinkedin,
  AiFillInstagram,
  AiFillTwitterCircle,
  AiOutlineShoppingCart,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const LandingNavbar = ({ page }) => {
  const navigate = useNavigate();
  return (
    <div className={`py-3 ${styles.wrapper}`}>
      <img
        src={logo}
        alt="Sports Veins"
        className={styles.logo}
        onClick={() => navigate("/")}
      />
      <div className="d-flex align-items-center flex-md-row flex-column">
        <div
          className={`shadow-sm ${styles.box} align-items-center my-md-0 my-2 d-md-flex d-none`}
        >
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
          <div className={page === "contact" ? styles.active : styles.link}>
            <Link to="/contact">Contact Us</Link>
          </div>
          <div className={page === "policy" ? styles.active : styles.link}>
            <Link to="/policy">Privacy Policy</Link>
          </div>
          <div className={page === "refund" ? styles.active : styles.link}>
            <Link to="/refund-policy">Refund Policy</Link>
          </div>
        </div>
        <div className={`shadow-sm ${styles.box} d-flex align-items-center`}>
          <div className={page === "cart" ? styles.active : styles.link}>
            <Link to="/cart" style={{ fontSize: 22 }}>
              <AiOutlineShoppingCart />
            </Link>
          </div>
          <div className={page === "login" ? styles.active : styles.link}>
            <Link to="/login" style={{ fontSize: 22 }}>
              <AiOutlineUserAdd />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingNavbar;
