import React from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { IoIosTimer } from "react-icons/io";
import { RiTeamLine } from "react-icons/ri";
import { BiHash } from "react-icons/bi";
import styles from "./ProductCard.module.scss";
import Moment from "react-moment";
import { hexToBase64 } from "../../../utils/hexToBase";

const ProductCard = ({
  title,
  img,
  id,
  template,
  discount,
  price,
  description,
  order,
  status,
  noshadow,
  h,
  dashboard,
  tags,
  bottom,
  hidden,
  notitle,
  imgLink,
  team,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Card
        className={`${styles.crd} ${!h && "h-100"} ${
          !noshadow ? "shadow" : ""
        }`}
      >
        <Card.Body>
          <Row>
            <Col xs={12} style={{ position: "relative" }}>
              {price && (
                <span className={styles.price}>
                  <span>${price}</span>
                </span>
              )}
              {status && (
                <span className={styles.status}>
                  <span>{status}</span>
                </span>
              )}
              <img
                src={img}
                alt={title}
                className={`w-100 ${imgLink ? styles.img__link : ""}`}
                onClick={() =>
                  imgLink
                    ? navigate(
                        `/${
                          dashboard
                            ? dashboard
                            : template
                            ? "template"
                            : order
                            ? "order"
                            : "product"
                        }/${id ? id : ""}`
                      )
                    : null
                }
              />
              {discount && discount > 0 ? (
                <span className={styles.discount}>-{discount}%</span>
              ) : null}
              {bottom ? <span className={styles.bottom}>{bottom}</span> : null}
            </Col>
            <Col md={!hidden ? 9 : 12}>
              {!notitle ? (
                <span
                  className={`d-block fs-5 text-start  d-flex align-items-center pt-2 ${styles.title}`}
                >
                  {title}
                </span>
              ) : (
                <></>
              )}
              {id ? (
                <span className={`d-block fs-6 text-dark text-start fw-bold`}>
                  <BiHash className="me-1" />
                  {hexToBase64(id.slice(0, 8)).slice(0, 6)}
                </span>
              ) : null}
              {team && (
                <span
                  className={`d-block fs-6 text-warning text-start fw-bold`}
                >
                  <RiTeamLine className="me-1" />
                  {team}
                </span>
              )}

              {description && (
                <span className={`d-block fs-6 text-secondary text-start`}>
                  <IoIosTimer className="me-1" />{" "}
                  <Moment format="DD-MM-YYYY">{description}</Moment>
                </span>
              )}

              {tags &&
                tags.length > 0 &&
                tags.map((tag, i) => (
                  <Badge key={i} className={styles.bdg}>
                    {tag}{" "}
                  </Badge>
                ))}
            </Col>
            {!hidden && (
              <Col
                md={3}
                className="d-flex justify-content-end align-items-center pt-2"
              >
                <span
                  className={styles.arrow}
                  onClick={() =>
                    navigate(
                      `/${
                        dashboard
                          ? dashboard
                          : template
                          ? "template"
                          : order
                          ? "order"
                          : "product"
                      }/${id ? id : ""}`
                    )
                  }
                >
                  <AiOutlineArrowRight />
                </span>
              </Col>
            )}
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCard;
