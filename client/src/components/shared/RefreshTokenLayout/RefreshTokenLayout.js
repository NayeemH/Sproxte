import React from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

const RefreshTokenLayout = (props) => {
  const loading = useSelector((state) => state.auth.loading);
  return (
    <>
      {loading ? (
        <div
          className="bg_dark d-flex justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <Spinner animation="border" variant="light" />
        </div>
      ) : (
        props.children
      )}
    </>
  );
};

export default RefreshTokenLayout;
