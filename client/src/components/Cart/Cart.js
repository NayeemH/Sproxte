import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { removeFromCart } from "../../actions/Cart.action";
import { createOrder, setPaymentKey } from "../../actions/Payment.acton";
import styles from "./Cart.module.scss";

const Cart = ({ cart, removeFromCart, setPaymentKey, createOrder, auth }) => {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setPaymentKey();
  }, []);

  let totalPrice = 0;
  cart.map((item) => {
    totalPrice +=
      (item.product.price * (100 - item.product.discount) * item.quantity) /
      100;
  });

  const submitHandeler = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("first");
    if (auth === "") {
      toast.error("You must be logged in to place an order");
      navigate("/login");
      setLoading(false);
      return;
    }
    if (address.length === 0 || phone.length === 0) {
      toast.error("Please fill shipping details");
      setLoading(false);
      return;
    } else {
      let check = await createOrder(address, phone, cart);
      if (check === true) {
        navigate("/payment");
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

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
              <Row key={item._id} className={styles.item}>
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
                  {(item.product.price *
                    (100 - item.product.discount) *
                    item.quantity) /
                    100}
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
              <Col xs="2">${totalPrice}</Col>
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
                  <Button
                    disabled={loading}
                    type="submit"
                    className={styles.btn}
                    // onClick={() => setLoading(true)}
                  >
                    {loading ? "Loading..." : "Checkout"}
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
  auth: state.auth.token,
});

export default connect(mapStateToProps, {
  removeFromCart,
  setPaymentKey,
  createOrder,
})(Cart);
