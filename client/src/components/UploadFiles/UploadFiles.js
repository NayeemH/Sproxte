import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
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
      {!product || !product.name ? (
        <div
          className="d-flex justify-content-center align-items-center "
          style={{ minHeight: 700 }}
        >
          <Spinner variant="dark" animation="grow" />
        </div>
      ) : (
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
                  discount={product.discount?.discount[0]}
                />
              )}

              <Card className="crd mt-4 shadow">
                <Card.Body>
                  <span className="d-block fs-4">Discount Ranges</span>
                  <div className="pt-3">
                    <div
                      className="d-flex 
                  justify-content-between align-items-center"
                    >
                      <span className="d-block fw-bold">Range</span>
                      <span className="d-block fw-bold">Discount</span>
                    </div>
                    <hr />
                    {product && product.discount && product.discount.range ? (
                      product.discount.range.map((dis, i) => (
                        <div key={i}>
                          <div
                            className="d-flex 
                  justify-content-between align-items-center"
                          >
                            <span className="d-block fw-bold">
                              {i === 0 ? 1 : product.discount.range[i - 1] + 1}{" "}
                              - {dis}
                            </span>
                            <span className="d-block fw-bold">
                              {product.discount.discount[i]}%
                            </span>
                          </div>
                          <hr />
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                    {product &&
                    product.discount &&
                    product.discount.range &&
                    product.discount.range.length > 0 ? (
                      <>
                        <div
                          className="d-flex 
                  justify-content-between align-items-center"
                        >
                          <span className="d-block fw-bold">
                            {
                              product.discount.range[
                                product.discount.range.length - 1
                              ]
                            }
                            +
                          </span>
                          <span className="d-block fw-bold">
                            {
                              product.discount.discount[
                                product.discount.discount.length - 1
                              ]
                            }
                            %
                          </span>
                        </div>
                        <hr />
                      </>
                    ) : (
                      <>
                        <div
                          className="d-flex 
                  justify-content-between align-items-center"
                        >
                          <span className="d-block fw-bold">For all count</span>
                          <span className="d-block fw-bold">
                            {
                              product.discount.discount[
                                product.discount.discount.length - 1
                              ]
                            }
                            %
                          </span>
                        </div>
                        <hr />
                      </>
                    )}
                  </div>
                </Card.Body>
              </Card>
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
      )}
    </div>
  );
};

export default UploadFiles;
