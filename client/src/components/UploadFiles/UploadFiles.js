import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
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
      {!product || !product.name ? (
        <div
          className="d-flex justify-content-center align-items-center "
          style={{ minHeight: 700 }}
        >
          <Spinner variant="dark" animation="grow" />
        </div>
      ) : (
        <Container>
          <OrderDescription
            sizes={product.sizes}
            product={product}
            color={selectedColor ? selectedColor : null}
            selectedColor={selectedColor}
          />
        </Container>
      )}
    </div>
  );
};

export default UploadFiles;
