import React from "react";
import { Badge, Button, Card, Spinner, Table } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteType } from "../../actions/Landing.action";
import { IMAGE_PATH } from "../../constants/URL";
import swal from "sweetalert";
import styles from "./TypeList.module.scss";

const TypeList = ({ deleteType }) => {
  const list = useSelector((state) => state.landing.types);
  const navigate = useNavigate();

  const deleteHandeler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Delete this Type?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteType(id);
      }
    });
  };

  return (
    <div className={styles.wrapper}>
      <Card className="crd shadow">
        <Card.Body>
          <Table striped bordered hover responsive variant="light">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Template</th>
                <th>Back Image</th>
                <th>Sizes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {list === [] ? (
                <div
                  className="bg-dark d-flex justify-content-center align-items-center"
                  style={{ minHeight: "calc(100vh - 150px)", zIndex: 999 }}
                >
                  <Spinner animation="border" variant="light" />
                </div>
              ) : (
                list.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>
                      <div className={styles.img_wrapper}>
                        <img
                          src={`${IMAGE_PATH}small/${item.pngImageFront}`}
                          alt={item.name}
                          className={styles.img}
                        />
                      </div>
                    </td>
                    <td>
                      <div className={styles.img_wrapper}>
                        {item.pngImageBack ? (
                          <img
                            src={`${IMAGE_PATH}small/${item.pngImageBack}`}
                            alt={item.name}
                            className={styles.img}
                          />
                        ) : (
                          <span className="text-danger">Not Set</span>
                        )}
                      </div>
                    </td>
                    <td>
                      {item.sizes.map((size, j) => (
                        <Badge
                          key={j}
                          bg="var(--orange)"
                          className={styles.badge}
                        >
                          {size}
                        </Badge>
                      ))}
                    </td>
                    <td>
                      <Button
                        size="sm"
                        className="me-3"
                        onClick={() => navigate(`/template/edit/${item._id}`)}
                      >
                        <AiFillEdit /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => deleteHandeler(item._id)}
                      >
                        {" "}
                        <BsTrash /> Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default connect(null, { deleteType })(TypeList);
