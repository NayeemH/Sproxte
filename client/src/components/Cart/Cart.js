import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { connect } from "react-redux";
import { removeFromCart } from "../../actions/Cart.action";
import { createOrder, setPaymentKey } from "../../actions/Payment.acton";
import CardForm from "./CardForm";
import styles from "./Cart.module.scss";

const Cart = ({
  cart,
  removeFromCart,
  setPaymentKey,

  user,
}) => {
  useEffect(() => {
    setPaymentKey();
  }, []);

  let totalPrice = 0;
  cart.map((item) => {
    totalPrice +=
      (item.product.price * (100 - item.product.discount) * item.quantity) /
      100;
  });

  return (
    <div className={styles.wrapper}>
      <Container className="pt-4 px-5">
        <h2 className="text-center pb-3">Cart</h2>
        {cart && cart.length > 0 ? (
          <>
            <Row className="border-bottom pb-2">
              <Col xs="1">
                <span className={styles.heading}>#</span>
              </Col>
              <Col xs="6">
                <span className={styles.heading}>Product Name</span>{" "}
              </Col>
              <Col xs="2">
                <span className={styles.heading}>Quantity</span>
              </Col>
              <Col xs="2">
                <span className={styles.heading}>Price</span>
              </Col>
            </Row>
            {cart.map((item, i) => (
              <Row key={i} className={styles.item}>
                <Col xs="1">{i + 1}</Col>
                <Col xs="6">
                  {item.product.name}
                  {item.product.discount && item.product.discount > 0 ? (
                    <span className="fw-bold ms-3 text-danger">
                      (-{item.product.discount}%)
                    </span>
                  ) : (
                    ""
                  )}
                </Col>
                <Col xs="2">{item.quantity}</Col>
                <Col xs="2">
                  $
                  {(
                    (item.product.price *
                      (100 - item.product.discount) *
                      item.quantity) /
                    100
                  ).toFixed(2)}
                </Col>
                <Col xs="1">
                  <span
                    className={styles.close}
                    onClick={() => removeFromCart(i)}
                  >
                    <AiOutlineClose />
                  </span>
                </Col>
              </Row>
            ))}

            <Row className={`${styles.item} border-top`}>
              <Col xs="1"></Col>
              <Col xs="4">
                <span className={styles.heading}>Total Price</span>
              </Col>
              <Col xs="4"></Col>
              <Col xs="2">${totalPrice.toFixed(2)}</Col>
            </Row>

            <Row className="py-5 text-center">
              <Col md={3}></Col>
              <Col md={6}>
                <Card className={`${styles.crd} shadow`}>
                  <Card.Body>
                    <h3>Shipping Information</h3>
                    <CardForm cart={cart} />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        ) : (
          <div>No items in cart</div>
        )}
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  auth: state.auth.token,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  removeFromCart,
  setPaymentKey,
  createOrder,
})(Cart);
