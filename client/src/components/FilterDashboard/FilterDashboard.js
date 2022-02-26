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
import { IMAGE_PATH } from "../../constants/URL";
import UserInfoTopbar from "../Topbar/UserInfoTopbar/UserInfoTopbar";
import { GoThreeBars } from "react-icons/go";
import { useEffect } from "react";

const FilterDashboard = ({ selectedFilter }) => {
  const listStyleGrid = useSelector((state) => state.dashboard.projectListGrid);
  const domain = useSelector((state) => state.domain);
  const role = useSelector((state) => state.dashboard.role);
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
              className={`${styles.ham} pt-1 pe-4`}
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
              <span className="text-light pt-2" style={{ fontSize: 24 }}>
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
              My Projects
            </Dropdown.Item>
            <Dropdown.Divider className={styles.divider} />
            <Dropdown.Item href="#" className={styles.dropdown_item}>
              3D Model Library
            </Dropdown.Item>
            <Dropdown.Divider className={styles.divider} />
            <Dropdown.Item href="#" className={styles.dropdown_item}>
              visit www.website.com
            </Dropdown.Item>
          </DropdownButton>
          <img
            src={`${IMAGE_PATH}small/${domain.logo}`}
            className={styles.logo}
            alt="company"
            onClick={() => navigate("/dashboard")}
          />
          <span className={styles.projects}>Projects</span>
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
