import React from "react";
import { memo } from "react";
import { BASE_URL, IMAGE_PATH } from "../../../constants/URL";
import styles from "./AnimatedBG.module.css";

const AnimatedBG = memo((h) => {
  // get random number between 1-5 to select random image

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.background}
        style={{
          background: `url(${BASE_URL}/background/${
            Math.floor(Math.random() * 5) + 1
          }.jpg) no-repeat center center fixed`,
          backgroundSize: "cover",
          height: h ? h : "100vh",
        }}
      >
        {/* <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span> */}
      </div>
    </div>
  );
});

export default AnimatedBG;
