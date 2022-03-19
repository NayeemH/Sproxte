import React from "react";
import { Card } from "react-bootstrap";
import styles from "./ModalCard.module.scss";
import cardImg from "../../../assets/up.png";

const ModalCard = ({ title, children }) => {
  return (
    <div className={styles.modal}>
      <Card className={`${styles.card} shadow`}>
        <div className="position-relative" style={{ height: 300 }}>
          <img src={cardImg} className={styles.card_img} alt="" />
          <span className={styles.card_heading}>{title}</span>
        </div>
        {children}
      </Card>
    </div>
  );
};

export default ModalCard;
