import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonGroup, Button, Dropdown, DropdownButton } from "react-bootstrap";
import { BsThreeDots, BsListStars } from "react-icons/bs";
import styles from "./FilterDashboard.module.css";
import {
  toogleDashboardProjectStyle,
  toogleSidebarVisibility,
} from "../../actions/Dashboard.action";
import { useNavigate } from "react-router-dom";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import UserInfoTopbar from "../Topbar/UserInfoTopbar/UserInfoTopbar";
import { GoThreeBars } from "react-icons/go";
import { useEffect } from "react";
import logoImg from "../../assets/logoSq.png";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";

const FilterDashboard = ({ selectedFilter }) => {
  const listStyleGrid = useSelector((state) => state.dashboard.projectListGrid);
  const role = useSelector((state) => state.auth.user.userType);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirectToApprove = () => {
    navigate("/approved");
  };
  useEffect(() => {
    if (window.innerWidth < 768) {
      toogleDashboardProjectStyle("grid");
    }
  }, []);
  const redirectToDashboard = () => {
    navigate("/dashboard");
  };
  return (
    <>
      <div className={styles.wrapper}>
        <div className="d-flex justify-content-center align-items-center">
          {role === "admin" && (
            <span
              className={`${styles.ham}  pe-4 d-flex justify-content-center align-items-center`}
              style={{ fontSize: 24 }}
              onClick={() => dispatch(toogleSidebarVisibility(true))}
            >
              <GoThreeBars />
            </span>
          )}
          <DropdownButton
            variant="transparent"
            className={styles.dropdown}
            title={
              <span
                className="text-light d-flex justify-content-center align-items-center"
                style={{ fontSize: 24 }}
              >
                <BsFillGrid3X3GapFill />
              </span>
            }
            id="input-group-dropdown-1"
          >
            <Dropdown.Item
              className={styles.dropdown_item}
              href="#"
              onClick={() => navigate("/")}
            >
              <AiOutlineHome className="me-2" /> Home
            </Dropdown.Item>
            <Dropdown.Divider className={styles.divider} />
            <Dropdown.Item
              href="#"
              onClick={() => navigate("/discover")}
              className={styles.dropdown_item}
            >
              <AiOutlineSearch className="me-2" /> Discover
            </Dropdown.Item>
          </DropdownButton>
          <img
            src={logoImg}
            className={styles.logo}
            alt="Sproxte"
            onClick={() => navigate("/dashboard")}
          />
          <span className={`${styles.projects} gradient_title fw-bold`}>
            Sproxte
          </span>
        </div>
        <div className="d-flex align-items-center flex-column flex-md-row">
          <span className="">Filter Projects</span>
          <ButtonGroup
            className="ms-3 me-3 mb-3 mb-md-0"
            aria-label="First group"
          >
            {/* TODO::: FETCH PROJECT DATA DEPENDING ON THE SELECTED FILTER   */}
            <Button
              className={
                selectedFilter === "active" ? styles.active_btn : styles.btn
              }
              onClick={() => redirectToDashboard()}
            >
              Active
            </Button>
            <Button
              className={
                selectedFilter === "approved" ? styles.active_btn : styles.btn
              }
              onClick={() => redirectToApprove()}
            >
              Finished
            </Button>
          </ButtonGroup>
          {selectedFilter !== "approved" && (
            <ButtonGroup
              className={`${styles.btn__grp} my-3`}
              aria-label="First group"
            >
              {/* TODO::: FETCH PROJECT DATA DEPENDING ON THE SELECTED FILTER   */}
              <Button
                className={
                  listStyleGrid === "grid" ? styles.active_btn : styles.btn
                }
                onClick={() => dispatch(toogleDashboardProjectStyle("grid"))}
              >
                <BsListStars />
              </Button>
              <Button
                className={`${
                  listStyleGrid === "list" ? styles.active_btn : styles.btn
                } ${styles.list__icon}`}
                onClick={() => dispatch(toogleDashboardProjectStyle("list"))}
              >
                <BsThreeDots />
              </Button>
            </ButtonGroup>
          )}
          <UserInfoTopbar filter />
        </div>
      </div>
      <div className={styles.hr}></div>
    </>
  );
};

export default FilterDashboard;
