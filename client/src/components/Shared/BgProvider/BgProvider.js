import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getBgOne } from "../../../actions/Bg.action";
import { BASE_URL } from "../../../constants/URL";
import styles from "./BgProvider.module.scss";

const BgProvider = ({ bg, getBgOne, children, className }) => {
  useEffect(() => {
    if (bg === null) {
      getBgOne();
    }
  }, [bg]);

  return bg === null ? (
    <></>
  ) : (
    <div
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        background: `${`url(${BASE_URL}/image/small/${bg})`}`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
      className={`${className} ${styles.wrapper}`}
    >
      {children}
    </div>
  );
};

const mapStateToProps = (state) => ({
  bg: state.landing.bg,
});

export default connect(mapStateToProps, { getBgOne })(BgProvider);
