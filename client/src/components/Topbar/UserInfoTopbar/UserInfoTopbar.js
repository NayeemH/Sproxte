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
import { useModals } from "@mantine/modals";
import { Text } from "@mantine/core";

const UserInfoTopbar = ({
  user,
  logout,
  getAuthUser,
  switchMode,
  name = false,
  filter = false,
}) => {
  const navigate = useNavigate();
  const modals = useModals();
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
      labels: { confirm: "Checkout", cancel: "Cancel" },
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
        {user && user.userType !== "admin" ? (
          <>
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
          </>
        ) : (
          <></>
        )}
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
