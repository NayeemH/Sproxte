import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import styles from "./ProductCard.module.scss";

const ProductCard = ({
  title,
  img,
  id,
  template,
  discount,
  price,
  description,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Card className={`${styles.crd} shadow`}>
        <Card.Body>
          <Row>
            <Col xs={12} style={{ position: "relative" }}>
              {price && (
                <span className={styles.price}>
                  <span>${price}</span>
                </span>
              )}
              <img src={img} alt={title} className="w-100" />
              {discount && discount > 0 && (
                <span className={styles.discount}>-{discount}%</span>
              )}
            </Col>
            <Col md={9}>
              <span
                className={`d-block fs-5 text-start h-100 d-flex align-items-center pt-2 ${styles.title}`}
              >
                {title}
              </span>
            </Col>
            <Col
              md={3}
              className="d-flex justify-content-end align-items-center pt-2"
            >
              <span
                className={styles.arrow}
                onClick={() =>
                  navigate(`/${template ? "template" : "product"}/${id}`)
                }
              >
                <AiOutlineArrowRight />
              </span>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCard;
