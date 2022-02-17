import { connect } from "react-redux";
import React from "react";
import { FaTimes } from "react-icons/fa";
import styles from "./LandingSidebar.module.scss";
import { toggleLandingSidebar } from "../../actions/Landing.action";
import { NavLink } from "react-router-dom";

const LandingSidebar = ({ sidebarActive, toggleLandingSidebar }) => {
  return (
    <div className={`${styles.wrapper} ${sidebarActive && styles.active}`}>
      <div className="d-flex justify-content-between align-items-center p-3">
        <span className={styles.name}>SPROXTE</span>
        <span className={styles.close} onClick={toggleLandingSidebar}>
          <FaTimes />
        </span>
      </div>
      <div className={styles.content}>
        <NavLink to="/">Design</NavLink>
        <NavLink to="/discover">Discover</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        <NavLink to="/contact">Contact Us</NavLink>
        <NavLink to="/payment-methods">Payment Methods</NavLink>
        <NavLink to="/policy">Refund Policy</NavLink>
        <NavLink to="/shipping">Shipping Info</NavLink>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  sidebarActive: state.landing.sidebarActive,
});

export default connect(mapStateToProps, { toggleLandingSidebar })(
  LandingSidebar
);
