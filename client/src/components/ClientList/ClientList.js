import React from "react";
import { Badge, Spinner, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IMAGE_PATH } from "../../constants/URL";
import styles from "./ClientList.module.scss";

const ClientList = () => {
  const list = useSelector((state) => state.dashboard.list);
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Projects</th>
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
                <td>
                  <div className={styles.img_wrapper}>
                    <img
                      src={`${IMAGE_PATH}small/${item.image}`}
                      alt={item.name}
                      className={styles.img}
                    />
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  {item.projects.map((projItem, j) => (
                    <Badge
                      key={j}
                      bg="info"
                      className={styles.badge}
                      onClick={() => navigate(`/project/${projItem._id}`)}
                    >
                      {projItem.name}
                    </Badge>
                  ))}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ClientList;
