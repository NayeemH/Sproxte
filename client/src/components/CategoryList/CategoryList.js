import React from "react";
import { Button, Card, Spinner, Table } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { deleteCategory } from "../../actions/Category.action";
import { IMAGE_PATH } from "../../constants/URL";
import styles from "./CategoryList.module.scss";

const CategoryList = ({ deleteCategory }) => {
  const list = useSelector((state) => state.landing.category);
  const navigate = useNavigate();

  const deleteHandeler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Delete this Category?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteCategory(id);
      }
    });
  };

  return (
    <div className={styles.wrapper}>
      <Card className="crd shadow">
        <Card.Body className="w-100">
          <Table striped bordered hover responsive variant="light">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Mockup</th>
                <th>Thumbnail</th>
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
                          src={`${IMAGE_PATH}small/${item.svgImage}`}
                          alt={item.name}
                          className={styles.img}
                        />
                      </div>
                    </td>
                    <td>
                      <div className={styles.img_wrapper}>
                        <img
                          src={`${IMAGE_PATH}small/${item.pngImage}`}
                          alt={item.name}
                          className={styles.img}
                        />
                      </div>
                    </td>

                    <td>
                      <Button
                        size="sm"
                        className="me-3"
                        onClick={() => navigate(`/category/edit/${item._id}`)}
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

export default connect(null, { deleteCategory })(CategoryList);
