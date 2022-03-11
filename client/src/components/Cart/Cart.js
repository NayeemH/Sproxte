import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { removeFromCart } from "../../actions/Cart.action";
import styles from "./Cart.module.scss";

const Cart = ({ cart, removeFromCart }) => {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  let totalPrice = 0;
  cart.map((item, i) => {
    totalPrice += item.price;
  });

  const submitHandeler = (e) => {
    e.preventDefault();
    if (address.length === 0 || phone.length === 0) {
      toast.error("Please fill all the fields");
      return;
    }
    console.log(address, phone);
  };

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
              <Col md={3}></Col>
              <Col md={6}>
                <h3>Shipping Information</h3>
                <Form onSubmit={submitHandeler}>
                  <Form.Group controlId="formBasicPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Phone"
                      value={phone}
                      className={styles.input}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail" className="py-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Address"
                      value={address}
                      className={styles.input}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Group>
                  <Button type="submit" className={styles.btn}>
                    Checkout
                  </Button>
                </Form>
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
