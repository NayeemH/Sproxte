import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { connect } from "react-redux";
import { removeFromCart } from "../../actions/Cart.action";
import styles from "./Cart.module.scss";

const Cart = ({ cart, removeFromCart }) => {
  let totalPrice = 0;
  cart.map((item, i) => {
    totalPrice += item.price;
  });
  return (
    <div className={styles.wrapper}>
      <Container className="pt-4 px-5">
        <h2>Cart</h2>
        {cart && cart.length > 0 ? (
          <>
            <Row className="border-bottom pb-2">
              <Col xs="1">
                <span className={styles.heading}>#</span>
              </Col>
              <Col xs="4">
                <span className={styles.heading}>Product Name</span>{" "}
              </Col>
              <Col xs="3">
                <span className={styles.heading}>Quantity</span>
              </Col>
              <Col xs="3">
                <span className={styles.heading}>Price</span>
              </Col>
            </Row>
            {cart.map((item, i) => (
              <Row key={item._id} className={styles.item}>
                <Col xs="1">{i + 1}</Col>
                <Col xs="4">{item.product.name}</Col>
                <Col xs="3">Quantity</Col>
                <Col xs="3">Price</Col>
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
              <Col xs="3"></Col>
              <Col xs="3">{totalPrice}</Col>
              <Col xs="1"></Col>
            </Row>
            <Row className="py-5 text-center">
              <Col>
                <Button className={styles.btn}>Checkout</Button>
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
});

export default connect(mapStateToProps, { removeFromCart })(Cart);
