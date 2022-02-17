import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./BottomNav.module.scss";

const BottomNav = () => {
  return (
    <div className={styles.wrapper}>
      <div className="d-flex justify-content-center align-items-center">
        <NavLink to="/">Design</NavLink>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <NavLink to="/discover">Discover</NavLink>
      </div>
    </div>
  );
};

export default BottomNav;
