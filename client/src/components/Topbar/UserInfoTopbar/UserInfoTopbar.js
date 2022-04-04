import React, { useEffect } from "react";
import { getAuthUser } from "../../../actions/Auth.action";
import { switchMode } from "../../../actions/Coach.action";
import { IMAGE_PATH } from "../../../constants/URL";
import { useNavigate } from "react-router-dom";
import { DropdownButton, Dropdown } from "react-bootstrap";
import styles from "./UserInfoTopbar.module.css";
import { connect } from "react-redux";
import { logout } from "../../../actions/Dashboard.action";
import { FiLogOut } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { CgArrowsExchangeAlt } from "react-icons/cg";

const UserInfoTopbar = ({
  user,
  logout,
  getAuthUser,
  switchMode,
  name = false,
  filter = false,
}) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/settings");
  };

  const logoutHandeler = async () => {
    let check = await logout();
    if (check === true) {
      navigate("/");
    }
  };

  const switchCoachMode = async () => {
    if (user.userType === "client") {
      switchMode("coach");
    } else {
      switchMode("client");
    }
  };

  useEffect(() => {
    getAuthUser();
  }, []);
  return (
    <div className={`${styles.wrapper} ${filter && styles.active}`} id="user">
      <DropdownButton
        variant="transparent"
        className={styles.dropdown}
        title={
          <div className={styles.img_wrapper}>
            <img
              src={`${IMAGE_PATH}small/${user.image}`}
              className={styles.image}
              alt={`${user?.username}'s profile`}
            />
          </div>
        }
        id="input-group-dropdown-1"
      >
        <Dropdown.Item
          className={styles.dropdown_item}
          href="#"
          onClick={() => navigate("/dashboard")}
        >
          <MdOutlineSpaceDashboard />{" "}
          <span className="d-block ms-2">Dashboard</span>
        </Dropdown.Item>

        <Dropdown.Divider className={styles.divider} />
        <Dropdown.Item
          className={styles.dropdown_item}
          href="#"
          onClick={switchCoachMode}
        >
          <CgArrowsExchangeAlt />{" "}
          <span className="d-block ms-2">
            {" "}
            {user && user.userType === "client" ? "Coach" : "Client"} Mode
          </span>
        </Dropdown.Item>
        <Dropdown.Divider className={styles.divider} />
        <Dropdown.Item
          className={styles.dropdown_item}
          href="#"
          onClick={clickHandler}
        >
          <FaRegUserCircle /> <span className="d-block ms-2">Profile</span>
        </Dropdown.Item>
        <Dropdown.Divider className={styles.divider} />

        <Dropdown.Item
          href="#"
          className={styles.dropdown_item}
          onClick={logoutHandeler}
        >
          <FiLogOut /> <span className="d-block ms-2">Logout</span>
        </Dropdown.Item>
      </DropdownButton>
      {name && <span className={styles.name}>{user.name}</span>}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout, getAuthUser, switchMode })(
  UserInfoTopbar
);
