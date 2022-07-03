import React from "react";

const DpMaker = ({ name, height, color, onClick, fontSize }) => {
  return (
    <div
      className="rounded-full centerXY cursor-pointer"
      style={{
        height: height ? height : "40px",
        width: height ? height : "40px",
        backgroundColor: color ? color : "#DC2626",
      }}
      onClick={onClick}
    >
      <h1 className={`text-white`} style={{ fontSize: fontSize ? fontSize : "20px" }}>
        {name && name[0]}
      </h1>
    </div>
  );
};

export default DpMaker;
