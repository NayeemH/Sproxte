import React from "react";
import styles from "./TeamPlayers.module.scss";

const TeamPlayers = ({ team }) => {
  return (
    <div>
      <h2>{team.teamName}</h2>
    </div>
  );
};

export default TeamPlayers;
