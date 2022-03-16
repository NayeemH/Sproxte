import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IMAGE_PATH } from "../../constants/URL";
import ProductCard from "../Shared/ProductCard/ProductCard";
import OrderDescription from "./OrderDescription/OrderDescription";
import styles from "./UploadFiles.module.scss";

const UploadFiles = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  useEffect(() => {
    if (
      product &&
      product.imageData &&
      product.imageData.length > 0 &&
      !selectedColor
    ) {
      setSelectedColor(product.imageData[0].color);
    }
  }, [product]);
  return (
    <div className={styles.wrapper}>
      <Container>
        <Row>
          <Col md={5} className="py-md-5 py-3">
            {product && product.imageData && (
              <ProductCard
                title={product.name}
                h
                img={
                  selectedColor
                    ? `${IMAGE_PATH}small/${
                        product.imageData.filter(
                          (item) => item.color === selectedColor
                        )[0].image
                      }`
                    : `${IMAGE_PATH}small/${product.pngImageFront}`
                }
                id={product._id}
                template
                price={product.price}
                discount={product.discount}
              />
            )}
            {product.imageData && product.imageData.length > 0 && (
              <>
                <h5 className="mt-5">Select Color</h5>
                <small>Image will change based on the color.</small>
                <div className={styles.colors}>
                  {product.imageData.map((image, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedColor(image.color)}
                      className={`${styles.clr} ${
                        selectedColor === image.color ? styles.active : ""
                      } shadow `}
                      style={{ background: `${image.color}` }}
                    ></div>
                  ))}
                </div>
              </>
            )}
          </Col>
          <Col md={7} className="py-md-5 py-3">
            <OrderDescription
              sizes={product.sizes}
              product={product}
              color={selectedColor ? selectedColor : null}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UploadFiles;
