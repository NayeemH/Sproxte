import React from "react";
import { Badge, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import data from "../../stub/users/users";
import styles from "./ManagerList.module.scss";

const ManagerList = () => {
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
          {data.map((item, i) => (
            <tr>
              <td>{item.id}</td>
              <td>
                <img src={item.image} alt={item.name} className={styles.img} />
              </td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                {item.projects.map((projItem, j) => (
                  <Badge
                    key={j}
                    bg="info"
                    className={styles.badge}
                    onClick={() => navigate(`/project/${projItem.id}`)}
                  >
                    {projItem.name}
                  </Badge>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManagerList;
