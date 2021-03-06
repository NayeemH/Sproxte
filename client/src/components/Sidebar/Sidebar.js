import React from "react";
import { MdOutlineClose, MdSpaceDashboard } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { FiLogOut, FiUserPlus } from "react-icons/fi";
import { BiCog, BiLayer, BiLayerPlus } from "react-icons/bi";
import { VscTypeHierarchySub } from "react-icons/vsc";
import { connect, useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  logout,
  toogleSidebarVisibility,
} from "../../actions/Dashboard.action";
import styles from "./Sidebar.module.scss";

const Sidebar = ({ logout }) => {
  let { sidebar_visible } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.user.userType);

  const handeleClick = () => {
    dispatch(toogleSidebarVisibility(false));
  };

  const logoutHandeler = async () => {
    handeleClick();
    let check = await logout();
    if (check === true) {
      navigate("/");
    }
  };
  return (
    <div className={`${styles.wrapper} ${sidebar_visible && styles.active}`}>
      <div className="text-end">
        <span className={styles.ham} onClick={handeleClick}>
          <MdOutlineClose />
        </span>
      </div>
      <div className="">
        <div className={styles.item}>
          <div className={styles.sidenavigation_links}>
            <div className={styles.link_base}>
              <div></div>
              <NavLink to="/dashboard" onClick={handeleClick}>
                <span>
                  <MdSpaceDashboard />
                </span>
                Dashboard
              </NavLink>
            </div>
            {role === "admin" && (
              <>
                <div className={styles.link_base}>
                  <div></div>
                  <h3>
                    <span>
                      <AiFillHome />
                    </span>
                    Overview
                  </h3>
                </div>
                <div className={styles.link_group}>
                  <NavLink to="/manager-list" onClick={handeleClick}>
                    Individual Orders
                  </NavLink>
                  <NavLink to="/developer-list" onClick={handeleClick}>
                    Team Orders
                  </NavLink>
                  <NavLink to="/client-list" onClick={handeleClick}>
                    Compeleted Orders
                  </NavLink>
                </div>
              </>
            )}

            {role === "admin" && (
              <>
                <div className={styles.link_base}>
                  <div></div>
                  <NavLink to="/category" onClick={handeleClick}>
                    <span>
                      <VscTypeHierarchySub />
                    </span>
                    Categories
                  </NavLink>
                </div>
                <div className={styles.link_base}>
                  <div></div>
                  <NavLink to="/templates" onClick={handeleClick}>
                    <span>
                      <BiLayerPlus />
                    </span>
                    Templates
                  </NavLink>
                </div>

                <div className={styles.link_base}>
                  <div></div>
                  <NavLink to="/products" onClick={handeleClick}>
                    <span>
                      <BiLayer />
                    </span>
                    Products
                  </NavLink>
                </div>
                <div className={styles.link_base}>
                  <div></div>
                  <NavLink to="/add-iep" onClick={handeleClick}>
                    <span>
                      <FiUserPlus />
                    </span>
                    Invite IEP
                  </NavLink>
                </div>
              </>
            )}
            <div className={styles.link_base}>
              <div></div>
              <NavLink to="/settings" onClick={handeleClick}>
                <span>
                  <BiCog />
                </span>
                Settings
              </NavLink>
            </div>
            <div className={styles.link_base}>
              <div></div>
              <NavLink
                to="/"
                onClick={() => {
                  logoutHandeler();
                }}
              >
                <span>
                  <FiLogOut />
                </span>
                Logout
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { logout })(Sidebar);
