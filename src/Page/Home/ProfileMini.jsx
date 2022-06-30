import React from "react";
import DpMaker from "../../components/DpMaker/DpMaker";

const ProfileMini = ({ isOPen }) => {
  if (!isOPen) {
    return null;
  }
  return (
    <section
      className="absolute top-[60px] right-0 bg-white p-3 w-[350px] rounded-md"
      style={{ display: isOPen ? "block" : "none" }}
    >
      <div className="flex items-center gap-5">
        <div>{false ? <img src="" alt="" /> : <DpMaker name={"Faisal Ahmed"} />}</div>
        <h1>Faisal Ahmed</h1>
      </div>
      <button className="btn-red">Logout</button>
    </section>
  );
};

export default ProfileMini;
