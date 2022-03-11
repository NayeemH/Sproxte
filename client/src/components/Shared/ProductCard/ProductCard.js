import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.scss";

const ProductCard = ({ title, img, id, template, discount, price }) => {
  const navigate = useNavigate();
  return (
    <>
      <Card
        className={`${styles.crd} shadow-sm`}
        onClick={() => navigate(`/${template ? "template" : "product"}/${id}`)}
      >
        <Card.Body style={{ position: "relative" }}>
          {price && (
            <span className={styles.price}>
              <span>${price}</span>
            </span>
          )}
          <img src={img} alt={title} className="w-100" />
          {discount && discount > 0 && (
            <span className={styles.discount}>-{discount}%</span>
          )}
        </Card.Body>
        <Card.Footer className={styles.footer}>
          <span className="d-block fs-5 text-center">{title}</span>
        </Card.Footer>
      </Card>
    </>
  );
};

export default ProductCard;
