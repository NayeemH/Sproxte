import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.scss";

const ProductCard = ({ title, img, id }) => {
  const navigate = useNavigate();
  return (
    <>
      <Card
        className={`${styles.crd} shadow-sm`}
        onClick={() => navigate(`/product/${id}`)}
      >
        <Card.Body>
          <img src={img} alt={title} className="img-fluid" />
        </Card.Body>
        <Card.Footer className={styles.footer}>
          <span className="d-block fs-5 text-center">{title}</span>
        </Card.Footer>
      </Card>
    </>
  );
};

export default ProductCard;
