import React from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { deleteCategory } from "../../actions/Category.action";
import { IMAGE_PATH } from "../../constants/URL";
import styles from "./CategoryList.module.scss";

const CategoryList = ({ deleteCategory }) => {
  const list = useSelector((state) => state.landing.product);
  const navigate = useNavigate();

  const deleteHandeler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Delete this Product?",
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
      <Table striped bordered hover responsive variant="light">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            {/* <th>Template</th> */}
            <th>Featured</th>
            <th>Front Image</th>
            <th>Price</th>
            <th>Quantity</th>
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
                <td>{item.featured}</td>

                <td>
                  <div className={styles.img_wrapper}>
                    <img
                      src={`${IMAGE_PATH}small/${item.pngImageFront}`}
                      alt={item.name}
                      className={styles.img}
                    />
                  </div>
                </td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
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
    </div>
  );
};

export default connect(null, { deleteCategory })(CategoryList);
