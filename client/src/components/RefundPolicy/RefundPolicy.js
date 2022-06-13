import React from "react";
import { Container } from "react-bootstrap";
import styles from "./RefundPolicy.module.scss";

const RefundPolicy = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className="text-center fw-dark py-3 ">Refund Policy</h1>
      <Container>
        <span className="d-block fs-4 fw-dark text-center pb-5 px-4">
          How can I return something? Due to the nature of the items being
          customized, all purchases are final. We do not accept returns unless a
          product has a manufactured flaw upon receipt. Please email us at
          orders@sproxte.com with a photo of the defect for return approval.
          Purchases made during any promotional sale are final and cannot be
          refunded or returned unless there is a manufacturer defect. Should you
          wish to return an item that is not customized, you will be responsible
          for shipping the item back to us and charged a 15% processing and
          restocking fee. If I want to return something, how long will it take
          for my return to be processed? All returns must be made within 10 days
          from purchase. No exceptions. Once we have received your return at our
          warehouse, it should take approximately 7 business days to complete
          depending on your bank. Do I have to pay shipping for my return items?
          Yes, you will be responsible for getting the item back to us, but if
          approved, any exchange items will be shipped back to you free of
          charge. What if my order is not correct? We try our best to make sure
          that a proof is emailed out prior to printing to avoid these types of
          mistakes. However; every so often mistakes do happen, but we do our
          best to fix them and correct any issues you may have. If you have
          noticed that we have made a mistake with your order, please email us
          at{" "}
          <a href="mailto: orders@sproxte.com" className={styles.link}>
            orders@sproxte.com
          </a>{" "}
          and we will look into it. Please include your order references at all
          times when e-mailing our customer service team.
        </span>
      </Container>
    </div>
  );
};

export default RefundPolicy;
