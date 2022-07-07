import React, { Children } from "react";
import DpMaker from "../DpMaker/DpMaker";

const UserDP = ({ dimension, img_url, user_name, children, onClick }) => {
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
      {!img_url && <DpMaker name={user_name} />}
      {children}
    </div>
  );
};

export default UserDP;
