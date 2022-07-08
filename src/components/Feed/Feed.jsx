import React, { useContext } from "react";
import DpMaker from "../DpMaker/DpMaker";
import { ImArrowUp } from "react-icons/im";
import { TbArrowBigTop } from "react-icons/tb";
import { BiShare } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useGetUpvote from "../../Hooks/useGetUpvote";
import { UserContext } from "../../ContextAPI/UserContext";
import handleUpvote from "../UlitiyFunctions/handleUpvote";

const Feed = ({ feedInfo }) => {
  const {
    answer_id,
    user_name: post_user_name,
    user_email: post_user_email,
    job,
    question_description,
    answer_description,
    question_id,
    comment,
    share,
    time,
  } = feedInfo;
  const [upvoteInfo, setUpvoteInfo] = useGetUpvote(answer_id);
  const path = useNavigate();
  const { user } = useContext(UserContext);
  const upvoteContent = { answer_id, user_email: user?.user_email };
  return (
    <section className="mb-2 card">
      {/* Card */}
      <div className="p-5 ">
        {/* user info starts*/}
        <div
          className="flex gap-3 centerY mb-4 cursor-pointer"
          onClick={() => path(`/profile/${post_user_email}`)}
        >
          <DpMaker name={post_user_name} height="40px" color="#DC2626" />
          <div>
            {/* by clicking here any user can visit this user's profile */}
            <p
              className="font-bold cursor-pointer hover:underline"
              onClick={() => path(`/profile/${post_user_email}`)}
            >
              {post_user_name}
            </p>
            <p className="text-sm text-gray-500">
              <span className="text-gray-500 font-semibold">{job}</span> {job && "-"} {time}
            </p>
          </div>
        </div>
        {/* user info ends*/}
        {/* question start */}
        <h1
          className="font-semibold mb-2 hover:underline cursor-pointer"
          onClick={() => path(`/question/${question_id}`)}
        >
          {question_description}
        </h1>
        <p className="mb-3">{answer_description}</p>
        {/* question ends */}
        {/* reactions, comments and share starts */}
        <div className="flex gap-5">
          {/* upvote */}
          <button
            className="iconButton bubleOnHOver"
            // * handeling upvote * //
            onClick={() =>
              handleUpvote({ upvoteContent, upvoteInfo, setUpvoteInfo, answer_id, user })
            }
            style={{
              backgroundColor: upvoteInfo[user?.user_email] ? "#DBEAFE" : " ",
              color: upvoteInfo[user?.user_email] ? "#2563EB" : "",
            }}
            //
          >
            {!upvoteInfo[user?.user_email] ? (
              <TbArrowBigTop className="iconSize" />
            ) : (
              <ImArrowUp className="iconSize" />
            )}
            {Object.keys(upvoteInfo).length}
          </button>
          <button className="iconButton bubleOnHOver">
            <BiShare className="iconSize" /> {share}
          </button>
          <button className="iconButton bubleOnHOver">
            <FaRegComment className="iconSize" /> {comment}
          </button>
        </div>
        {/* reactions, comments and share ends */}
      </div>
    </section>
  );
};

export default Feed;
