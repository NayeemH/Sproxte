import React, { useState } from "react";
import { Form, Col, Row, InputGroup, Button } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import styles from "./TeamFormFill.module.scss";

const TeamFormFill = ({ user }) => {
  const [players, setPlayers] = useState([
    { name: "", email: "", image: undefined },
  ]);

  //ONSELECT FILE HANDELER
  const onSelectFilePlayer = (e, i) => {
    if (!e.target.files || e.target.files.length === 0) {
      setPlayers(
        players.map((item, index) =>
          index === i ? { ...item, image: undefined } : item
        )
      );
      return;
    }
    if (e.target.files[0].size > 2000000) {
      toast.error("File size is too big");
      return;
    }
    setPlayers(
      players.map((item, index) =>
        index === i ? { ...item, image: e.target.files[0] } : item
      )
    );
    console.log(players);
  };

  return (
    <>
      {user && user.userType === "coach" && (
        <div className={styles.wrapper}>
          <Form>
            {players.map((item, i) => (
              <Row className="pb-3">
                <Col xs={3}>
                  <InputGroup className=" d-flex flex-column">
                    <Form.Control
                      placeholder="Name"
                      type="text"
                      value={item.name}
                      onChange={(e) =>
                        setPlayers([
                          ...players.map((itemRaw, p) =>
                            p === i
                              ? { ...itemRaw, name: e.target.value }
                              : itemRaw
                          ),
                        ])
                      }
                      className={`form-control w-100`}
                    />
                  </InputGroup>
                </Col>
                <Col xs={4}>
                  <InputGroup className=" d-flex flex-column">
                    <Form.Control
                      placeholder="Guardian Email"
                      type="email"
                      value={item.email}
                      onChange={(e) =>
                        setPlayers([
                          ...players.map((itemRaw, p) =>
                            p === i
                              ? { ...itemRaw, email: e.target.value }
                              : itemRaw
                          ),
                        ])
                      }
                      className={`form-control w-100`}
                    />
                  </InputGroup>
                </Col>
                <Col xs={4}>
                  <input
                    type="file"
                    name="image"
                    className="form-control w-100"
                    onChange={(e) => onSelectFilePlayer(e, i)}
                    id=""
                  />
                </Col>
                <Col
                  xs={1}
                  className="d-flex justufy-content-center align-items-center"
                >
                  {i !== 0 && (
                    <span
                      className={`${styles.del} text-danger`}
                      onClick={() =>
                        setPlayers([...players.filter((it, j) => j !== i)])
                      }
                    >
                      <BiTrash />
                    </span>
                  )}
                </Col>
              </Row>
            ))}
            <Row className="pb-4">
              <Col xs={12}>
                <span
                  className={`${styles.plus}`}
                  onClick={() =>
                    setPlayers([
                      ...players,
                      {
                        image: undefined,
                        name: "",
                        email: "",
                      },
                    ])
                  }
                >
                  <AiOutlinePlus /> Add Player
                </span>
              </Col>
            </Row>

            <div className="text-center pb-5">
              <Button variant="primary" className="btn_primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(TeamFormFill);
