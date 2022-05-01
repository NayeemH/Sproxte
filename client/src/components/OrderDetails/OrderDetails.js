import React, { useState } from "react";
import {
  Button,
  Card,
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

const OrderDetails = ({
  projects,
  id,
  data,
  changeProjectStatus,
  role,
  team,
}) => {
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const modals = useModals();
  const modal = useModals();

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
                <span className="d-block fw-bold ms-1">Location</span>
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
            <span className="d-block">{data.color && data.color}</span>
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
    navigate(`/payment-player/${id}/${count}/${data.playerAddPrice}/10`);
  };

  const clickHandeler = () => {
    modal.openModal({
      title: "Add Player Information",
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
      title: "How many players do you want to add?",
      closeOnClickOutside: false,

      centered: true,
      children: (
        <>
          <form onSubmit={handelAddPlayerSubmit}>
            <FormGroup className="mb-3">
              <Form.Label>Number of players</Form.Label>
              <input
                type="number"
                placeholder="Enter number of players"
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
      title: "Add Player Request",
      closeOnClickOutside: false,
      closeOnConfirm: false,
      centered: true,
      children: (
        <>
          <span className="d-block">
            You will need to pay product price plus additional charges to add
            new player.
          </span>
          <span className="d-block  pt-3">
            Additional price for each player you add is{" "}
            <b>${data.playerAddPrice}</b>
          </span>
        </>
      ),
      labels: {
        confirm: `Add Player`,
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
                {statusList.map((item) => (
                  <Dropdown.Item
                    key={item.id}
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
                onClick={() => changeProjectStatus(status, id) && setStatus("")}
              >
                Save
              </Button>
            )}
          </div>
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
      <Row>
        {projects.products &&
          projects.products.map((project, i) => (
            <Col key={project._id} md={3} className="p-3">
              <ProductCard
                title={project.name}
                img={`${IMAGE_PATH}small/${project.colorImage}`}
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
                tags={[`x${project.count}`, `$${project.price}`]}
                hidden={
                  project.type === "template" || project.type === "link"
                    ? true
                    : false
                }
              />
            </Col>
          ))}
      </Row>

      {projects && projects.count && projects.count > 0 ? (
        <Row>
          <Col className={`text-center pt-4`}>
            <Button onClick={clickHandeler} className="btn_primary">
              Add Player Information
            </Button>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col className={`text-center pt-4`}>
            <Button onClick={clickHandelerReq} className="btn_primary">
              Add Player Request
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  projects: state.project.selected_project,
  role: state.auth.user.userType,
});

export default connect(mapStateToProps, {
  getProjectDetails,
  changeProjectStatus,
})(OrderDetails);
