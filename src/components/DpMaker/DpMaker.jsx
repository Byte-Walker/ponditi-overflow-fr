import React from "react";

const DpMaker = ({ name, height, color }) => {
  return (
    <div
      className="rounded-full centerXY"
      style={{ height: height, width: height ? height : "40px", backgroundColor: color }}
    >
      <h1 className="text-white">{name[0]}</h1>
    </div>
  );
};

export default DpMaker;
