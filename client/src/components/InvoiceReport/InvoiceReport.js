import React, { useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logoSqNew.png";
import jsPDF from "jspdf";
import { DateRangePicker } from "@mantine/dates";
import html2canvas from "html2canvas";
import styles from "./InvoiceReport.module.scss";
import { MdDateRange } from "react-icons/md";

const InvoiceReport = (data) => {
  const [value, setValue] = useState([null, null]);
  const navigate = useNavigate();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const download = () => {
    document.querySelector("#heading").style.display = "none";
    html2canvas(document.querySelector("#capture"), {
      imageTimeout: 2000,
      useCORS: true,
      width: window.innerWidth + 20,
      height: window.innerHeight,
      scale: 0.7,
    }).then((canvas) => {
      //document.body.appendChild(canvas); // if you want see your screenshot in body.
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({});
      pdf.addImage(imgData, "PNG", 1, 1);
      pdf.save("download.pdf");
      document.querySelector("#heading").style.display = "block";
    });
  };
  return (
    <div id="capture">
      <Container className="pb-5">
        <Row className="py-4" id={"heading"}>
          <Col className="d-flex justify-content-between align-items-center">
            <Button
              className="btn_primary d-flex align-items-center"
              onClick={() => navigate(-1)}
            >
              <IoIosArrowBack className="me-2" /> Go Back
            </Button>
            <form className="">
              <DateRangePicker
                placeholder="Pick dates range"
                icon={<MdDateRange />}
                value={value}
                onChange={setValue}
                dropdownType="modal"
                amountOfMonths={2}
                maxDate={new Date()}
              />
            </form>
            <Button
              className="btn_primary d-flex align-items-center"
              onClick={() => download()}
            >
              <AiOutlineCloudDownload className="me-2" /> Download
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="d-flex flex-column justify-content-center">
            <span className="d-block fs-4">
              <span className="fw-bold">Name:</span> Tanvir Mahin
            </span>
            <span className="d-block fs-5">
              <span className="fw-bold">Email:</span> tanvirmahin24@gmail.com
            </span>
            <span className="d-block fs-5">
              <span className="fw-bold">Date:</span>{" "}
              <Moment format="DD MMMM YYYY">{Date.now()}</Moment>
            </span>
            <span className="d-block fs-5">
              <span className="fw-bold">Time:</span>{" "}
              <Moment format="h:mmA">{Date.now()}</Moment>
            </span>
          </Col>
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center flex-column"
          >
            <img src={logo} className={styles.logo} alt="sportsveins" />
            <span className="d-block fs-4">Sportsveins</span>
          </Col>
        </Row>
        {data.data ? (
          <Row className="">
            <Col xs={12}>
              <span className="d-block fs-4 fw-bold pb-3">Invoice</span>
            </Col>
            <Col xs={12}>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Year</th>
                    <th>Month</th>
                    <th>Image Processed</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.data.collections
                    .filter((dt) =>
                      value[0] === null || value[1] === null
                        ? dt
                        : new Date(dt.year, dt.month - 1) >= value[0] &&
                          new Date(dt.year, dt.month - 1) <= value[1]
                        ? dt
                        : null
                    )
                    .map((item, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{item.year}</td>
                        <td>{months[item.month - 1]}</td>
                        <td>{item.count}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        ) : (
          <div>
            <span className="fs-3 d-block text-center pt-5">
              No Data Found...
            </span>
          </div>
        )}
      </Container>
    </div>
  );
};

export default InvoiceReport;
