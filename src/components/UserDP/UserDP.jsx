import React from "react";
import DpMaker from "../DpMaker/DpMaker";

const UserDP = ({ dimension, img_url, user_name, onClick, fontSize }) => {
  return (
    <div
      className="rounded-full relative cursor-pointer"
      style={{
        backgroundImage: `url(${img_url})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: dimension,
        width: dimension,
      }}
      onClick={onClick}
    >
      {(img_url == "null" || img_url == "") && (
        <DpMaker name={user_name} height={dimension} fontSize={fontSize} />
      )}
    </div>
  );
};

export default UserDP;
