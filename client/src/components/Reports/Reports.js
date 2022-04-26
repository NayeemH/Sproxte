import React, { useEffect } from "react";
import { getReportData } from "../../actions/Payment.acton";
import { connect } from "react-redux";
import styles from "./Reports.module.scss";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import moment from "moment";
import Chart from "react-apexcharts";
import { BsCart4, BsCurrencyDollar } from "react-icons/bs";
import { RiPaintFill } from "react-icons/ri";
import { IoMdDoneAll } from "react-icons/io";
import GReport from "./GReport/GReport";

const Reports = ({ getReportData, data }) => {
  useEffect(() => {
    getReportData();
  }, []);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let totalIncome = 0;
  let totalCompletedOrders = 0;
  let totalRunningOrders = 0;
  let totalOrders = 0;

  const options = {
    dropShadow: {
      enabled: true,
      top: 0,
      left: 0,
      blur: 3,
      opacity: 0.5,
    },
    theme: {
      monochrome: {
        enabled: true,
        color: "#ffa602",
        shadeTo: "dark",
        shadeIntensity: 0.65,
      },
    },
  };

  let monthArrayCollection = [];
  let collectionsData = [];
  if (data !== null && data.collections && data.collections.length > 0) {
    data.collections.forEach((element) => {
      collectionsData.push(parseInt(element.count));
      monthArrayCollection.push(`${months[element.month - 1]} ${element.year}`);
    });
  }

  let monthArrayCurrentProjects = [];
  let collectionsDataCurrentProjects = [];
  if (data !== null && data.projects && data.projects.length > 0) {
    data.projects
      .filter((item) => item.status.toLowerCase() !== "delivered")
      .forEach((element) => {
        let month = `${moment(element.createdAt).format("MMMM")} ${moment(
          element.createdAt
        ).format("YYYY")}`;
        if (!monthArrayCurrentProjects.includes(month)) {
          monthArrayCurrentProjects.push(month);
          collectionsDataCurrentProjects.push(0);
        }
        collectionsDataCurrentProjects[
          monthArrayCurrentProjects.indexOf(month)
        ] =
          collectionsDataCurrentProjects[
            monthArrayCurrentProjects.indexOf(month)
          ] + element.price;
        totalRunningOrders = totalRunningOrders + 1;
      });
  }
  let monthArrayCompletedProjects = [];
  let collectionsDataCompletedProjects = [];
  if (data !== null && data.projects && data.projects.length > 0) {
    data.projects
      .filter((item) => item.status.toLowerCase() === "delivered")
      .forEach((element) => {
        let month = `${moment(element.createdAt).format("MMMM")} ${moment(
          element.createdAt
        ).format("YYYY")}`;
        if (!monthArrayCompletedProjects.includes(month)) {
          monthArrayCompletedProjects.push(month);
          collectionsDataCompletedProjects.push(0);
        }
        collectionsDataCompletedProjects[
          monthArrayCompletedProjects.indexOf(month)
        ] =
          collectionsDataCompletedProjects[
            monthArrayCompletedProjects.indexOf(month)
          ] + element.price;

        totalCompletedOrders = totalCompletedOrders + 1;
        totalIncome = totalIncome + element.price;
      });
  }

  let monthArrayProjects = [];
  let collectionsDataProjects = [];
  if (data !== null && data.projects && data.projects.length > 0) {
    data.projects.forEach((element) => {
      let month = `${moment(element.createdAt).format("MMMM")} ${moment(
        element.createdAt
      ).format("YYYY")}`;
      if (!monthArrayProjects.includes(month)) {
        monthArrayProjects.push(month);
        collectionsDataProjects.push(0);
      }
      collectionsDataProjects[monthArrayProjects.indexOf(month)] =
        collectionsDataProjects[monthArrayProjects.indexOf(month)] +
        element.price;
      totalOrders = totalOrders + 1;
    });
  }

  return (
    <div>
      {data === null ? (
        <div
          className="d-flex justify-content-center align-items-center crd"
          style={{ minHeight: "100vh" }}
        >
          <Spinner variant="dark" animation="grow" />
        </div>
      ) : (
        <Container className="pb-4">
          <Row>
            <Col xs={6} md={3} className="mb-3">
              <Card className="crd shadow hov__card">
                <Card.Body>
                  <Row>
                    <Col
                      xs={4}
                      className="d-flex justify-content-center align-items-center py-3"
                    >
                      <span className={`${styles.icon}`}>
                        <BsCart4 />
                      </span>
                    </Col>
                    <Col
                      xs={8}
                      className="d-flex justify-content-center flex-column"
                    >
                      <span className="d-block fs-5">Total Orders </span>
                      <span className="d-block fw-bold">{totalOrders}</span>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={6} md={3} className="mb-3">
              <Card className="crd shadow hov__card">
                <Card.Body>
                  <Row>
                    <Col
                      xs={4}
                      className="d-flex justify-content-center align-items-center py-3"
                    >
                      <span className={`${styles.icon}`}>
                        <RiPaintFill />
                      </span>
                    </Col>
                    <Col
                      xs={8}
                      className="d-flex justify-content-center flex-column"
                    >
                      <span className="d-block fs-5">Running Orders </span>
                      <span className="d-block fw-bold">
                        {totalRunningOrders}
                      </span>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={6} md={3} className="mb-3">
              <Card className="crd shadow hov__card">
                <Card.Body>
                  <Row>
                    <Col
                      xs={4}
                      className="d-flex justify-content-center align-items-center py-3"
                    >
                      <span className={`${styles.icon}`}>
                        <IoMdDoneAll />
                      </span>
                    </Col>
                    <Col
                      xs={8}
                      className="d-flex justify-content-center flex-column"
                    >
                      <span className="d-block fs-5">Completed Orders </span>
                      <span className="d-block fw-bold">
                        {totalCompletedOrders}
                      </span>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={6} md={3} className="mb-3">
              <Card className="crd shadow hov__card">
                <Card.Body>
                  <Row>
                    <Col
                      xs={4}
                      className="d-flex justify-content-center align-items-center py-3"
                    >
                      <span className={`${styles.icon}`}>
                        <BsCurrencyDollar />
                      </span>
                    </Col>
                    <Col
                      xs={8}
                      className="d-flex justify-content-center flex-column"
                    >
                      <span className="d-block fs-5">Total Income </span>
                      <span className="d-block fw-bold">
                        ${totalIncome.toFixed(0)}
                      </span>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="my-2">
              <Card className="crd shadow hov__card">
                <Card.Body>
                  <h5 className="pb-3 text-center">Image Processed </h5>
                  <Chart
                    options={{
                      chart: {
                        id: "orders",
                      },
                      ...options,

                      xaxis: {
                        categories: [...monthArrayCollection],
                      },
                    }}
                    series={[
                      {
                        name: "Image Processed",
                        data: [...collectionsData],
                      },
                    ]}
                    type="line"
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="my-2">
              <Card className="crd shadow hov__card">
                <Card.Body>
                  <h5 className="pb-3 text-center">All Order Report</h5>
                  <Chart
                    options={{
                      chart: {
                        id: "all-order-sell",
                      },
                      ...options,
                      xaxis: {
                        categories: monthArrayProjects,
                      },
                    }}
                    series={[
                      {
                        name: "Sell (USD)",
                        data: collectionsDataProjects,
                      },
                    ]}
                    type="line"
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="my-2">
              <Card className="crd shadow hov__card">
                <Card.Body>
                  <h5 className="pb-3 text-center">Running Order Report</h5>
                  <Chart
                    options={{
                      chart: {
                        id: "running-order-sell",
                      },
                      xaxis: {
                        categories: monthArrayCurrentProjects,
                      },
                      ...options,
                    }}
                    series={[
                      {
                        name: "Sell (USD)",
                        data: collectionsDataCurrentProjects,
                      },
                    ]}
                    type="line"
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="my-2">
              <Card className="crd shadow hov__card">
                <Card.Body>
                  <h5 className="pb-3 text-center">
                    Completed Order Sell Report
                  </h5>
                  <Chart
                    options={{
                      chart: {
                        id: "completed-order-sell",
                      },
                      ...options,
                      xaxis: {
                        categories: monthArrayCompletedProjects,
                      },
                    }}
                    series={[
                      {
                        name: "Sell (USD)",
                        data: collectionsDataCompletedProjects,
                      },
                    ]}
                    type="line"
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col md={12} className="my-2">
              <GReport />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.dashboard.report,
});

export default connect(mapStateToProps, { getReportData })(Reports);
