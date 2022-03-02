import React from "react";
import { GoThreeBars } from "react-icons/go";
import styles from "./Topbar.module.css";
import UserInfoTopbar from "./UserInfoTopbar/UserInfoTopbar";
import { useDispatch, useSelector } from "react-redux";
import { toogleSidebarVisibility } from "../../actions/Dashboard.action";
import { useNavigate } from "react-router-dom";
import logoSq from "../../assets/logoSq.png";

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.user.userType);

  return (
    <nav className={`${styles.wrapper} ${role === "admin" && styles.admin}`}>
      <span
        className={styles.ham}
        onClick={() => dispatch(toogleSidebarVisibility(true))}
      >
        <GoThreeBars />
      </span>
      <img
        src={logoSq}
        className={styles.logo}
        alt="Sproxte"
        onClick={() => navigate("/dashboard")}
      />
      <UserInfoTopbar />
    </nav>
  );
};

export default Topbar;
