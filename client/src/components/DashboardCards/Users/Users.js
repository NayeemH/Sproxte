import React from "react";
import { OverlayTrigger } from "react-bootstrap";
import { IMAGE_PATH } from "../../../constants/URL";
import styles from "./Users.module.css";

const Users = ({ item }) => {
  return (
    <div className={styles.users}>
      {item.projectUser.length > 0 &&
        item.projectUser.map((user, i) => (
          <div key={i} className={styles.wrapper}>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={
                <div className={styles.tooltiptext}>
                  <span className="d-block fw-bold">{user.username}</span>
                  <span className="d-block ">Role: {user.userType}</span>
                  <span className="d-block">{user.email}</span>
                </div>
              }
            >
              <div
                className={styles.img_wrapper}
                style={
                  user.userType === "client"
                    ? {
                        border: "2px solid var(--primary)",
                      }
                    : user.userType === "developer"
                    ? {
                        border: "2px solid var(--secondary)",
                      }
                    : {
                        border: "2px solid var(--light)",
                      }
                }
              >
                <img
                  src={`${IMAGE_PATH}small/${user.image}`}
                  alt={user.username}
                />
              </div>
            </OverlayTrigger>
          </div>
        ))}
    </div>
  );
};

export default Users;
