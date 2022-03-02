import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RedirectComp = () => {
  const redirect = useSelector((state) => state.redirect.reirectTo);
  const navigate = useNavigate();
  useEffect(() => {
    if (redirect !== "") {
      navigate(redirect);
      console.log(redirect);
    }
  }, [redirect]);
  return <></>;
};

export default RedirectComp;
