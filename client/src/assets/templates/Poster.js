import React from "react";

const Poster = ({ color = "#fff" }) => {
  return (
    <div>
      <svg
        viewBox="0 0 33 40"
        fill="transparent"
        height={65}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="0.5"
          width="31.0887"
          height="39"
          rx="0.5"
          style={{ stroke: color }}
          strokeWidth="1"
        ></rect>
        <rect
          x="2.125"
          y="2.125"
          width="27.75"
          height="35.75"
          style={{ stroke: color }}
          strokeWidth="1"
        ></rect>
      </svg>
    </div>
  );
};

export default Poster;
