import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import { IMAGE_PATH } from "../../constants/URL";
import styles from "./SharePage.module.scss";

const SharePage = () => {
  const { image } = useParams();
  return (
    <div>
      <Nav />
      <Container className="py-4 text-center">
        {image && (
          <img src={`${IMAGE_PATH}small/${image}`} className={styles.img} />
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default SharePage;
