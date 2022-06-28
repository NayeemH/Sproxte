import React, { useEffect } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import Moment from "react-moment";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logoSqNew.png";
import { hexToBase64 } from "../../utils/hexToBase";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import styles from "./AdminInvoice.module.scss";
import { AiOutlineDownload } from "react-icons/ai";
import { getPrice } from "../../utils/getPrice";
import { getDiscount } from "../../utils/getDiscount";

const AdminInvoice = ({ data, country, user, isAuthenticated }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated === false && user.userType !== "admin") {
      navigate("/");
    }
  }, [isAuthenticated]);

  const download = () => {
    html2canvas(document.querySelector("#adminInvoice"), {
      imageTimeout: 2000,
      useCORS: true,
      width: window.innerWidth + 20,
      height: window.innerHeight,
      scale: 0.7,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({});
      pdf.addImage(imgData, "PNG", 1, 1);
      pdf.save("download.pdf");
    });
  };
  return (
    <Container className=" bg-light shadow">
      <div className="text-center py-4">
        <Button className="btn_primary" onClick={download}>
          <AiOutlineDownload />
          Download PDF
        </Button>
      </div>
      <div className={styles.wrapper} id="adminInvoice">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Invoice</h2>
          <img src={logo} className={styles.img} alt="" />
        </div>
        <Row className="">
          <Col md={2}>Order No:</Col>
          <Col md={6} className="fw-bold">
            #{hexToBase64(data._id.slice(0, 8)).slice(0, 6)}
          </Col>
        </Row>
        <Row className="">
          <Col md={2}>Order Date:</Col>
          <Col md={6}>
            <Moment format="DD-MMMM-YYYY">{data.createdAt}</Moment>
          </Col>
        </Row>
        <Row className="">
          <Col md={2}>Payment Date:</Col>
          <Col md={6}>
            <Moment format="DD-MMMM-YYYY">{data.updatedAt}</Moment>
          </Col>
        </Row>
        <Row className="pt-5">
          <Col md={6}>
            <span className="d-block fs-5 fw-bold">Sportsveins</span>
            <span className="d-block">424 Sapphire Band</span>
            <span className="d-block">Riverdale, Georgia 30296</span>
            <span className="d-block">United States</span>
            <span className="d-block">+1 404-585-1512</span>
            <span className="d-block">orders@sproxte.com</span>
          </Col>
          <Col md={6}>
            <span className="d-block fs-5 fw-bold">Bill to</span>
            <span className="d-block">
              {data.firstName} {data.lastName}
            </span>
            <span className="d-block">{data.address}</span>
            <span className="d-block">
              {data.city}, {data.state} {data.zip}
            </span>
            <span className="d-block">
              {country.filter((item) => item.value === data.country)[0].label}
            </span>
            <span className="d-block">{data.email}</span>
            <span className="d-block">{data.phone}</span>
          </Col>
        </Row>
        <div className="py-4 d-flex justify-content-between align-items-center">
          <h2>
            ${data.price + data.shippingCost}{" "}
            {data.paymentStatus === "due" ? "due" : "paid"}
          </h2>
          {data.isShippingLabel === true ? (
            <h2>Tracking: {data.masterTrackingNumber}</h2>
          ) : (
            ""
          )}
        </div>
        <div className="">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Unit price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.orders?.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.count}</td>
                  <td>
                    ${getPrice(item.priceArray, item.count).toFixed(2)}{" "}
                    {getDiscount(item.discount, item.count) > 0 ? (
                      <span className="fw-bold text-danger fs-6">
                        {" "}
                        (-{getDiscount(item.discount, item.count)}%)
                      </span>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    $
                    {(
                      (getPrice(item.priceArray, parseInt(item.count)) *
                        (100 - getDiscount(item.discount, item.count)) *
                        item.count) /
                      100
                    ).toFixed(2)}
                  </td>
                </tr>
              ))}

              <tr>
                <td colSpan={3}>Subtotal</td>
                <td>${data.price.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan={3}>Shipping cost</td>
                <td>${data.shippingCost.toFixed(2)}</td>
              </tr>
              <tr className="bg-primary" style={{ height: 2 }}></tr>
              <tr>
                <td colSpan={3} className="fw-bold">
                  Total
                </td>
                <td className="fw-bold">
                  ${(data.shippingCost + data.price).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(AdminInvoice);
