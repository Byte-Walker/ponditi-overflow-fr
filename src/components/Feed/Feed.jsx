import React from "react";
import DpMaker from "../DpMaker/DpMaker";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiShare } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
const Feed = ({ feedInfo }) => {
  const { user_name, question_description, answer_description, love, comment, share, time } =
    feedInfo;
  // const { img_url } = user;
  return (
    <section className="mb-3 card">
      {/* Card */}
      <div className="p-5 ">
        {/* user info starts*/}
        <div className="flex gap-3 centerY mb-4">
          <DpMaker name={user_name} height="40px" color="#d35400" />
          <div>
            <p className="font-bold">{user_name}</p>
            <p className="text-sm text-gray-500">{time}</p>
          </div>
        </div>
        {/* user info ends*/}
        {/* question start */}
        <h1 className="font-semibold mb-2">{question_description}</h1>
        <p className="mb-3">{answer_description}</p>
        {/* question ends */}
        {/* reactions, comments and share starts */}
        <div className="flex gap-5">
          <button className="iconButton">
            {true ? <AiFillHeart className="iconSize" /> : <AiOutlineHeart className="iconSize" />}
            {love}
          </button>
          <button className="iconButton">
            <BiShare className="iconSize" /> {share}
          </button>
          <button className="iconButton">
            <FaRegComment className="iconSize" /> {comment}
          </button>
        </div>
        {/* reactions, comments and share ends */}
      </div>
    </section>
  );
};

export default Feed;
