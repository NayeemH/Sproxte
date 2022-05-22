import React from "react";
import OrderDescription from "./OrderDescription/OrderDescription";
import styles from "./ReadyUpload.module.scss";

const ReadyUpload = ({ product, type }) => {
  return (
    <div className={styles.wrapper}>
      {type ? (
        <OrderDescription type={type} sizes={product.sizes} product={product} />
      ) : (
        <OrderDescription sizes={product.sizes} product={product} />
      )}
    </div>
  );
};

export default ReadyUpload;
