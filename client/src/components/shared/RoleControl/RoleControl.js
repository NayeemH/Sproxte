import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useJwt } from "react-jwt";
import { getRefreshToken, setRole } from "../../../actions/Dashboard.action";

const RoleControl = ({ children }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.dashboard.role);
  const { decodedToken, isExpired } = useJwt(token);

  if (isExpired) {
    dispatch(getRefreshToken());
  } else {
    dispatch(setRole(decodedToken.userType));
  }
  return <>{role === "admin" ? children : <></>}</>;
};

export default RoleControl;
