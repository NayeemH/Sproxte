import React, { useState } from "react";
import styles from "./LandingNavbar.module.scss";
import logo from "../../assets/logoLg.png";
import { BsFacebook } from "react-icons/bs";
import {
  AiFillLinkedin,
  AiFillInstagram,
  AiFillTwitterCircle,
  AiOutlineShoppingCart,
  AiOutlineUserAdd,
  AiOutlineClose,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { connect } from "react-redux";
import { logout } from "../../actions/Dashboard.action";
import { Text } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { switchMode } from "../../actions/Coach.action";

const LandingNavbar = ({
  page,
  isAuthenticated,
  user,
  logout,
  switchMode,
  cart,
}) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const modals = useModals();
  const switchCoachMode = async () => {
    modals.openConfirmModal({
      title: `You are about to switch to ${
        user.userType === "coach" ? "client" : "coach"
      } mode.`,
      centered: true,
      children: (
        <Text size="md">
          <b>Note:</b>{" "}
          {`${
            user.userType === "coach"
              ? "In client mode you can order custom and readymade products."
              : "In coach mode you can order only custom products for your whole team."
          }`}
        </Text>
      ),
      labels: {
        confirm: `Switch to ${
          user.userType === "coach" ? "client" : "coach"
        } mode`,
        cancel: "Cancel",
      },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => switchModeAction(),
    });
  };

  const switchModeAction = () => {
    if (user.userType === "coach") {
      switchMode("client");
    } else {
      switchMode("coach");
    }
  };
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
            <a target="_blank" href="https://facebook.com">
              <BsFacebook />
            </a>
          </div>
          <div className={styles.icon}>
            <a href="https://facebook.com" target="_blank">
              <AiFillLinkedin />
            </a>
          </div>
          <div className={styles.icon}>
            <a href="https://facebook.com" target="_blank">
              <AiFillInstagram />
            </a>
          </div>
          <div className={styles.icon}>
            <a href="https://facebook.com" target="_blank">
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
        <div
          className={`shadow-sm ${styles.box} d-none d-md-flex align-items-center postion-relative`}
        >
          <div
            className={`${
              page === "cart" ? styles.active : styles.link
            } position-relative`}
          >
            {cart && cart.length > 0 ? (
              <div className={`${styles.dot}`}></div>
            ) : (
              <></>
            )}
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
      <div className={styles.ham}>
        {show ? (
          <AiOutlineClose
            size={24}
            className="text-dark"
            onClick={() => setShow(false)}
          />
        ) : (
          <FaBars
            size={24}
            className="text-dark"
            onClick={() => setShow(true)}
          />
        )}
      </div>
      <div className={`${show ? styles.active : ""} ${styles.sidebar_mobile}`}>
        <div className={` align-items-center my-md-0 my-2 d-flex flex-column`}>
          <img src={logo} alt="" style={{ maxWidth: 190 }} />
          <div className="d-flex py-3">
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
          <div className="d-flex justify-content-cneter align-items-center flex-column border-top">
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
        </div>
        {user && user.userType !== "admin" && user.userType !== "iep" ? (
          <div
            className={`${
              page === "sda" ? styles.active : styles.link
            } fw-bold border-top pt-4`}
          >
            <span style={{ fontSize: 22 }} onClick={switchCoachMode}>
              Switch to{" "}
              {user && user.userType === "client" ? "Coach" : "Client"} Mode
            </span>
          </div>
        ) : (
          <></>
        )}
        <div className={`d-md-flex align-items-center`}>
          <div className={page === "cart" ? styles.active : styles.link}>
            <Link to="/cart" style={{ fontSize: 22 }}>
              Cart
            </Link>
          </div>
          <div className={page === "login" ? styles.active : styles.link}>
            <Link to="/login" style={{ fontSize: 22 }}>
              {isAuthenticated ? `Dashboard` : "Login"}
            </Link>
          </div>
          {isAuthenticated ? (
            <div
              className={`${
                page === "logout" ? styles.active : styles.link
              } fw-bold`}
            >
              <span style={{ fontSize: 22 }} onClick={() => logout()}>
                Logout
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  cart: state.cart.cart,
});

export default connect(mapStateToProps, { logout, switchMode })(LandingNavbar);
