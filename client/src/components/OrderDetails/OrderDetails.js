import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  FormGroup,
  Row,
} from "react-bootstrap";
import ProductCard from "../Shared/ProductCard/ProductCard";
import styles from "./OrderDetails.module.scss";
import { getProjectDetails } from "../../actions/Project.action";
import { connect } from "react-redux";
import { IMAGE_PATH } from "../../constants/URL";
import statusList from "../../config/StatusList";
import { changeProjectStatus } from "../../actions/Payment.acton";
import { useModals } from "@mantine/modals";
import { MdDateRange } from "react-icons/md";
import Moment from "react-moment";
import { BiColorFill } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import { AiOutlineTeam } from "react-icons/ai";
import { FaIcons } from "react-icons/fa";
import { saveAs } from "file-saver";
import AddPlayerInfo from "../AddPlayerInfo/AddPlayerInfo";
import { useNavigate } from "react-router-dom";
import packageTypes from "../../constants/fedexPackageType";
import { Text } from "@mantine/core";
import { downloadLabel, markasPaid } from "../../actions/Dashboard.action";
import TrackingInfo from "../TrackingInfo/TrackingInfo";
import colors from "../../config/Colors";
import { RiCheckboxBlankFill } from "react-icons/ri";

const OrderDetails = ({
  projects,
  id,
  data,
  changeProjectStatus,
  role,
  team,
  downloadLabel,
  markasPaid,
  user,
}) => {
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const modals = useModals();
  const modal = useModals();

  const handelPackage = (type, name) => {
    modals.openConfirmModal({
      title: "Packaging Type",
      centered: true,
      children: (
        <Text size="md">
          Selected Type: <b>{name}</b>
        </Text>
      ),
      labels: { confirm: "Download", cancel: "Cancel" },
      confirmProps: { color: "red" },
      zIndex: 10000000,
      onCancel: () => {},
      onConfirm: () => downloadLabel(type, projects.orderId),
    });
  };
  const markHandeler = () => {
    modals.openConfirmModal({
      title: "Mark this order as paid",
      centered: true,
      children: (
        <Text size="md">Are you sure you want to mark this order as paid?</Text>
      ),
      labels: { confirm: "Mark as paid", cancel: "Cancel" },
      zIndex: 10000000,
      onCancel: () => {},
      onConfirm: () => markasPaid(projects.orderId, projects._id),
    });
  };

  const viewHandeler = () =>
    modals.openModal({
      title: "Order Information",
      centered: true,
      children: (
        <>
          <div className="d-flex justify-content-between align-items-center border-bottom py-2">
            <div className="d-flex align-items-center justify-content-center">
              <span className="d-block pb-1 text_primary">
                <MdDateRange />
              </span>
              <span className="d-block fw-bold ms-1">Date</span>
            </div>
            <span className="d-block">
              <Moment format="DD MMMM YYYY">
                {data.createdAt && data.createdAt}
              </Moment>
            </span>
          </div>
          <div className="d-flex justify-content-between align-items-center border-bottom py-2">
            <div className="d-flex align-items-center justify-content-center">
              <span className="d-block pb-1 text_primary">
                <AiOutlineTeam />
              </span>
              <span className="d-block fw-bold ms-1">Team Name</span>
            </div>
            <span className="d-block">{data.teamName && data.teamName}</span>
          </div>
          {data.location && (
            <div className="d-flex justify-content-between align-items-center border-bottom py-2">
              <div className="d-flex align-items-center justify-content-center">
                <span className="d-block pb-1 text_primary">
                  <GoLocation />
                </span>
                <span className="d-block fw-bold ms-1">Team Mascot Name</span>
              </div>
              <span className="d-block">{data.location && data.location}</span>
            </div>
          )}
          <div className="d-flex justify-content-between align-items-center border-bottom py-2">
            <div className="d-flex align-items-center justify-content-center">
              <span className="d-block pb-1 text_primary">
                <BiColorFill />
              </span>
              <span className="d-block fw-bold ms-1">Color</span>
            </div>
            <span className="d-block">
              {data.color &&
                data.color.split(",").map((cl) => (
                  <span className="d-block">
                    <RiCheckboxBlankFill style={{ color: `${cl}` }} />{" "}
                    {colors.filter((item) => item.hex === cl)[0].name}({cl})
                  </span>
                ))}
            </span>
          </div>
          <div className="d-flex justify-content-between align-items-center py-2 ">
            <div className="d-flex align-items-center justify-content-center">
              <span className="d-block pb-1 text_primary">
                <FaIcons />
              </span>
              <span className="d-block fw-bold ms-1">Team Logo</span>
            </div>
            {data.logo && (
              <Button
                className="btn_primary"
                onClick={() =>
                  saveAs(
                    `${IMAGE_PATH}small/${data.logo}`,
                    `${data.teamName} Logo`
                  )
                }
              >
                Download
              </Button>
            )}
          </div>
          <div className="text-center">
            <img
              src={` ${IMAGE_PATH}small/${data.logo}`}
              alt=""
              style={{ maxWidth: 40, maxHeight: 40 }}
            />
          </div>
        </>
      ),
      labels: { confirm: "Cancel" },
    });

  const handelAddPlayerSubmit = (e) => {
    e.preventDefault();
    let count = e.target.elements[0].value;
    modals.closeAll();
    navigate(
      `/payment-player/${id}/${count}/${data.playerAddPrice}/${data.singleProductPrice}`
    );
  };

  const clickHandeler = () => {
    modal.openModal({
      title: "Add Athlete Information",
      closeOnClickOutside: false,
      closeOnEscape: false,
      centered: true,
      children: (
        <>
          <AddPlayerInfo
            project={projects}
            count={projects.count}
            modals={modal}
          />
        </>
      ),
    });
  };

  const newHandeler = () => {
    modals.openModal({
      title: "How many athlete do you want to add?",
      closeOnClickOutside: false,

      centered: true,
      children: (
        <>
          <form onSubmit={handelAddPlayerSubmit}>
            <FormGroup className="mb-3">
              <Form.Label>Number of Athlete</Form.Label>
              <input
                type="number"
                placeholder="Enter number of athlete"
                className="form-control"
              />
            </FormGroup>
            <Button type="submit" className="btn_primary">
              Submit
            </Button>
          </form>
        </>
      ),
    });
  };

  const clickHandelerReq = () => {
    modals.openConfirmModal({
      title: "Add Athlete Request",
      closeOnClickOutside: false,
      closeOnConfirm: false,
      centered: true,
      children: (
        <>
          <span className="d-block">
            You will need to pay product price plus additional charges to add
            new athlete.
          </span>
          <span className="d-block  pt-3">
            Single product price is <b>${data.singleProductPrice}</b>
          </span>
          <span className="d-block">
            Additional price for each athlete you add is{" "}
            <b>${data.playerAddPrice}</b>
          </span>
          <hr />
          <span className="d-block">
            Total price for each athlete is{" "}
            <b>${data.playerAddPrice + data.singleProductPrice}</b>
          </span>
        </>
      ),
      labels: {
        confirm: `Add Athlete`,
        cancel: "Cancel",
      },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => {
        modals.closeAll();
        newHandeler();
      },
    });
  };

  const trackingModal = () => {
    modals.openModal({
      title: "Tracking",
      closeOnClickOutside: false,
      closeOnEscape: false,
      centered: true,
      children: (
        <TrackingInfo
          id={projects.orderId}
          tracking={projects.masterTrackingNumber}
        />
      ),
      zIndex: 9999991,
    });
  };

  return (
    <Container className={styles.wrapper}>
      {role && (role === "admin" || role === "iep") && (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center pb-3">
          <div
            className={`${styles.active_btn}`}
            style={{
              textTransform: "capitalize",
            }}
          >
            Current Status:{" "}
            <span
              className="fw-bold"
              style={{
                textTransform: "capitalize",
              }}
            >
              {data.status}
            </span>
          </div>
          {role === "admin" ? (
            <>
              <div className="d-flex">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    className={`${styles.active_btn} mt-3 mt-md-0`}
                  >
                    {status === "" ? "Select Status" : status}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {statusList.map((item, i) => (
                      <Dropdown.Item
                        key={i}
                        onClick={() => setStatus(item.name)}
                        style={{ textTransform: "capitalize" }}
                      >
                        {item.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                {status === "" ? null : (
                  <Button
                    className={styles.btn}
                    onClick={() =>
                      changeProjectStatus(status, id) && setStatus("")
                    }
                  >
                    Save
                  </Button>
                )}
              </div>
              {projects.isShippingLabel === true ? (
                <></>
              ) : (
                <div className="d-flex">
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      className={`${styles.active_btn} mt-3 mt-md-0`}
                    >
                      Select Package Type
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {packageTypes.map((item) => (
                        <Dropdown.Item
                          key={item.id}
                          onClick={() => handelPackage(item.value, item.label)}
                          style={{ textTransform: "capitalize" }}
                        >
                          {item.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      )}

      {data.type && data.type === "team" && (
        <Row className="">
          <Col>
            <Button className="btn_primary" onClick={() => viewHandeler()}>
              View Order Information
            </Button>
          </Col>
        </Row>
      )}

      {data.type && data.type === "team" && projects.products.length === 0 ? (
        <div className="text-center py-5">
          <h3>Please Add Athlete Information</h3>
        </div>
      ) : (
        <></>
      )}
      <Row>
        {projects.products &&
          projects.products.map((project, i) => (
            <Col key={project._id} md={3} className="p-3">
              <ProductCard
                imgLink={project.type === "template" ? false : true}
                title={project.name}
                img={`${IMAGE_PATH}small/${
                  project.type === "template"
                    ? project.finalImage
                      ? project.finalImage
                      : project.image.front
                    : project.type === "team" || project.type === "custom"
                    ? project.finalImage
                      ? project.finalImage
                      : project.colorImage
                    : project.colorImage
                }`}
                description={project.createdAt}
                dashboard={`${team === true ? "team-" : ""}dashboard/${
                  project.type === "template" ? "product" : `${id}`
                }/${project._id}`}
                status={
                  project.type === "template"
                    ? "ready made"
                    : project.type === "link"
                    ? "Ready Made"
                    : "template"
                }
                bottom={project.status}
                tags={[`x${project.count}`]}
                hidden={
                  project.type === "template" || project.type === "link"
                    ? true
                    : false
                }
              />
            </Col>
          ))}
      </Row>
      {projects.type === "normal" ? (
        <></>
      ) : projects.status === "delivered" ? (
        <></>
      ) : (
        <>
          {projects && projects.count && projects.count > 0 ? (
            <Row>
              <Col className={`text-center pt-4`}>
                <Button onClick={clickHandeler} className="btn_primary">
                  Add Athlete Information
                </Button>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col className={`text-center pt-4`}>
                <Button onClick={clickHandelerReq} className="btn_primary">
                  Add Athlete Request
                </Button>
              </Col>
            </Row>
          )}
        </>
      )}
      <div className="d-flex justify-content-center pt-4">
        <Button className="btn_primary me-3" onClick={() => navigate(-1)}>
          Go Back
        </Button>
        {projects.isShippingLabel === true ? (
          <Button className="btn_primary" onClick={() => trackingModal()}>
            Track Now
          </Button>
        ) : (
          <></>
        )}

        {/* ::::: TODO */}
        {role === "admin" && projects?.userId === user._id ? (
          <Button
            className="btn_primary ms-3"
            onClick={() => navigate(`/admin/order/${projects.orderId}`)}
          >
            View Invoice
          </Button>
        ) : (
          <></>
        )}
        {role === "admin" &&
        projects?.isAdmin === true &&
        projects?.isPaid === false ? (
          <Button className="btn_primary ms-3" onClick={() => markHandeler()}>
            Mark As Paid
          </Button>
        ) : (
          <></>
        )}
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  projects: state.project.selected_project,
  role: state.auth.user.userType,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getProjectDetails,
  changeProjectStatus,
  downloadLabel,
  markasPaid,
})(OrderDetails);
