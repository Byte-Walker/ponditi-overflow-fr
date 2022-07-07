import React from "react";
import DpMaker from "../DpMaker/DpMaker";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiShare } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Feed = ({ feedInfo }) => {
  const {
    user_name,
    user_email,
    job,
    question_description,
    answer_description,
    question_id,
    love,
    comment,
    share,
    time,
  } = feedInfo;
  const path = useNavigate();
  return (
    <section className="mb-2 card">
      {/* Card */}
      <div className="p-5 ">
        {/* user info starts*/}
        <div
          className="flex gap-3 centerY mb-4 cursor-pointer"
          onClick={() => path(`/profile/${user_email}`)}
        >
          <DpMaker name={user_name} height="40px" color="#DC2626" />
          <div>
            {/* by clicking here any user can visit this user's profile */}
            <p
              className="font-bold cursor-pointer hover:underline"
              onClick={() => path(`/profile/${user_email}`)}
            >
              {user_name}
            </p>
            <p className="text-sm text-gray-500">
              <span className="text-gray-500 font-semibold">{job}</span> {job && "-"} {time}
            </p>
          </div>
        </div>
        {/* user info ends*/}
        {/* question start */}
        <h1
          className="font-semibold mb-2 cursor-default hover:underline"
          onClick={() => path(`/question/${question_id}`)}
        >
          {question_description}
        </h1>
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
