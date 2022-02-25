import React from "react";
import styles from "./Nav.module.scss";
import { AiOutlineAlignLeft, AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserPlus } from "react-icons/bi";
import { connect } from "react-redux";
import { toggleLandingSidebar } from "../../actions/Landing.action";
import { Link, useNavigate } from "react-router-dom";

const Nav = ({ toggleLandingSidebar, count }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      {/* <div className={styles.ham} onClick={toggleLandingSidebar}>
        <AiOutlineAlignLeft />
      </div> */}
      <div className="">
        <span
          className={`${styles.title} gradient_title`}
          onClick={() => navigate("/")}
        >
          SPROXTE
        </span>
      </div>
      <div className="">
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <Link to="/discover" className={styles.link}>
          Discover
        </Link>
        <Link to="/contact" className={styles.link}>
          Contact
        </Link>
        <Link to="/about" className={styles.link}>
          About
        </Link>
      </div>
      <div
        className={`${styles.cart} d-flex justify-content-around align-items-around`}
      >
        <span
          className={`${styles.link} fs-3 text-light`}
          onClick={() => navigate("/cart")}
        >
          <AiOutlineShoppingCart />
        </span>
        <span
          className={`${styles.link} fs-3 text-light`}
          onClick={() => navigate("/signup")}
        >
          <BiUserPlus />
        </span>
        {count > 0 && <div className={styles.count}>{count}</div>}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  count: state.cart.cart.length,
});

export default connect(mapStateToProps, { toggleLandingSidebar })(Nav);
