import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./Layout.module.scss";
import logo from "../../../assets/logoLg.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { VscHome, VscTypeHierarchySub } from "react-icons/vsc";
import { TiCogOutline } from "react-icons/ti";
import { BsArrowLeftRight } from "react-icons/bs";
import { MdPeopleAlt } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { logout } from "../../../actions/Dashboard.action";
import { connect } from "react-redux";
import UserInfoTopbar from "../../Topbar/UserInfoTopbar/UserInfoTopbar";
import { FiLogOut, FiUsers } from "react-icons/fi";
import { GoThreeBars } from "react-icons/go";
import { MdDownloadDone } from "react-icons/md";
import { BiLayer, BiLayerPlus } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { ImStatsBars } from "react-icons/im";

const Layout = ({ logout, children, role, title }) => {
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);

  const logoutHandeler = async () => {
    let check = await logout();
    if (check === true) {
      navigate("/");
    }
  };
  return (
    <div>
      <Container fluid>
        <Row className="position-relative">
          <Col
            md={2}
            className={`px-4 ${styles.wrapper} ${show ? styles.active : ""}`}
          >
            <div className="d-flex justify-content-between align-items-center w-100">
              <Link
                to="/"
                className="d-flex align-items-center py-3 text-decoration-none text-dark"
              >
                <img src={logo} alt="" className={styles.logo} />
                {/* <span className="d-block fs-5 fw-bolder pb-2">
                  SPORTS VEINS
                </span> */}
              </Link>
              <div
                className={`${styles.ham}  ms-auto`}
                onClick={() => setShow(!show)}
              >
                <GoThreeBars />
              </div>
            </div>
            <div className={styles.nav}>
              <NavLink to="/dashboard" className={styles.nav__item}>
                <span className={styles.icon}>
                  <VscHome />
                </span>
                <span className={styles.nav__item_text}>Dashboard</span>
              </NavLink>
            </div>
            {role === "admin" || role === "iep" || role === "coach" ? (
              <div className={styles.nav}>
                <NavLink to="/team-dashboard" className={styles.nav__item}>
                  <span className={styles.icon}>
                    <MdPeopleAlt />
                  </span>
                  <span className={styles.nav__item_text}>Team Dashboard</span>
                </NavLink>
              </div>
            ) : (
              <></>
            )}
            {role === "admin" && (
              <>
                <div className={styles.nav}>
                  <NavLink to="/report" className={styles.nav__item}>
                    <span className={styles.icon}>
                      <ImStatsBars />
                    </span>
                    <span className={styles.nav__item_text}>Report</span>
                  </NavLink>
                </div>

                <div className={styles.nav}>
                  <NavLink to="/users" className={styles.nav__item}>
                    <span className={styles.icon}>
                      <FiUsers />
                    </span>
                    <span className={styles.nav__item_text}>User & IEP</span>
                  </NavLink>
                </div>
                <div className={styles.nav}>
                  <NavLink to="/compeleted-orders" className={styles.nav__item}>
                    <span className={styles.icon}>
                      <MdDownloadDone />
                    </span>
                    <span className={styles.nav__item_text}>
                      Compeleted Orders
                    </span>
                  </NavLink>
                </div>
                <div className={styles.nav}>
                  <NavLink to="/category" className={styles.nav__item}>
                    <span className={styles.icon}>
                      <VscTypeHierarchySub />
                    </span>
                    <span className={styles.nav__item_text}>Categories</span>
                  </NavLink>
                </div>
                <div className={styles.nav}>
                  <NavLink to="/templates" className={styles.nav__item}>
                    <span className={styles.icon}>
                      <BiLayerPlus />
                    </span>
                    <span className={styles.nav__item_text}>Templates</span>
                  </NavLink>
                </div>
                <div className={styles.nav}>
                  <NavLink to="/products" className={styles.nav__item}>
                    <span className={styles.icon}>
                      <BiLayer />
                    </span>
                    <span className={styles.nav__item_text}>Products</span>
                  </NavLink>
                </div>
                <div className={styles.nav}>
                  <NavLink to="/add-iep" className={styles.nav__item}>
                    <span className={styles.icon}>
                      <MdDownloadDone />
                    </span>
                    <span className={styles.nav__item_text}>Add IEP</span>
                  </NavLink>
                </div>
                <div className={styles.nav}>
                  <NavLink to="/contact-list" className={styles.nav__item}>
                    <span className={styles.icon}>
                      <HiOutlineMail />
                    </span>
                    <span className={styles.nav__item_text}>
                      Contact Submission
                    </span>
                  </NavLink>
                </div>
                <div className={styles.nav}>
                  <NavLink to="/orders" className={styles.nav__item}>
                    <span className={styles.icon}>
                      <BsArrowLeftRight />
                    </span>
                    <span className={styles.nav__item_text}>Orders</span>
                  </NavLink>
                </div>
              </>
            )}

            <div className={styles.nav}>
              <NavLink to="/notification" className={styles.nav__item}>
                <span className={styles.icon}>
                  <IoMdNotificationsOutline />
                </span>
                <span className={styles.nav__item_text}>Notifications</span>
              </NavLink>
            </div>
            <div className={styles.nav}>
              <NavLink to="/settings" className={styles.nav__item}>
                <span className={styles.icon}>
                  <TiCogOutline />
                </span>
                <span className={styles.nav__item_text}>Settings</span>
              </NavLink>
            </div>

            <div className={styles.nav}>
              <div className={styles.nav__item} onClick={logoutHandeler}>
                <span className={styles.icon}>
                  <FiLogOut />
                </span>
                <span className={styles.nav__item_text}>Logout</span>
              </div>
            </div>
          </Col>
          <Col md={10}>
            <div className="d-flex justify-content-end align-items-center py-3">
              <div
                className={`${styles.ham}  me-auto`}
                onClick={() => setShow(!show)}
              >
                <GoThreeBars />
              </div>
              {title && (
                <h3 className="me-auto ps-4 fs-3 my-auto text-dark">{title}</h3>
              )}
              <NavLink to="/notification" className={styles.right__item}>
                <IoMdNotificationsOutline />
              </NavLink>
              <NavLink to="/settings" className={styles.right__item}>
                <TiCogOutline />
              </NavLink>
              <UserInfoTopbar />
            </div>
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
const mapStateToProps = (state) => ({
  role: state.auth.user.userType,
});

export default connect(mapStateToProps, { logout })(Layout);
