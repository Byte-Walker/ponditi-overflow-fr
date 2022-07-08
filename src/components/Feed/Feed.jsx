import React, { useContext } from "react";
import { ImArrowUp } from "react-icons/im";
import { TbArrowBigTop } from "react-icons/tb";
import { RiShareForwardLine, RiShareForwardFill } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useGetUpvote from "../../Hooks/useGetUpvote";
import { UserContext } from "../../ContextAPI/UserContext";
import handleUpvote from "../UlitiyFunctions/handleUpvote";
import UserDP from "../UserDP/UserDP";
import { useQuery } from "react-query";

const Feed = ({ feedInfo, following, followingRefetch }) => {
  const {
    answer_id,
    user_name: post_user_name,
    user_email: post_user_email,
    job,
    img_url,
    question_description,
    answer_description,
    question_id,
    time,
  } = feedInfo;

  const { user } = useContext(UserContext);
  const [upvoteInfo, setUpvoteInfo] = useGetUpvote(answer_id);
  const path = useNavigate();
  const upvoteContent = { answer_id, user_email: user?.user_email };

  const { data: sharers, refetch: sharersRefetch } = useQuery(`sharers_${answer_id}`, () =>
    fetch(`http://localhost:5500/sharers/${answer_id}`).then((res) => res.json())
  );

  // * following * //
  const modFollow = ({ followed, follower, mode }) => {
    const followData = { followed, follower, mode };
    const url = `http://localhost:5500/modifyfollower`;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(followData),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          followingRefetch();
        }
      });
  };

  // * handleShare * //
  const handleShare = ({ user_email, answer_id }) => {
    const shareInfo = { user_email, answer_id };
    const url = `http://localhost:5500/createshare`;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(shareInfo),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          sharersRefetch();
        }
      });
  };

  return (
    <section className="mb-2 card">
      {/* Card */}
      <div className="p-5 ">
        {/* user info starts*/}
        <div className="flex gap-3 centerY mb-4">
          <UserDP
            img_url={img_url}
            user_name={post_user_name}
            dimension="40px"
            onClick={() => path(`/profile/${post_user_email}`)}
          />
          <div>
            {/* by clicking here any user can visit this user's profile */}
            <div className="centerY gap-3">
              {/* user_name */}
              <p
                className="font-bold cursor-pointer hover:underline"
                onClick={() => path(`/profile/${post_user_email}`)}
              >
                {post_user_name}
              </p>
              {/* following , follow option */}
              {user?.user_email !== post_user_email && (
                <>
                  {/* if doesn't follow then follow option */}
                  {!following[post_user_email] && (
                    <p
                      className="text-blue-500 text-sm font-semibold cursor-pointer hover:underline"
                      onClick={() =>
                        modFollow({
                          followed: post_user_email,
                          follower: user?.user_email,
                          mode: "add",
                        })
                      }
                    >
                      Follow
                    </p>
                  )}
                  {/* if follow show following */}
                  {following[post_user_email] && (
                    <p className="text-gray-500 text-sm font-semibold">Following</p>
                  )}
                </>
              )}
            </div>
            {/* designation */}
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
          <button
            className={`iconButton  ${
              sharers && sharers[user?.user_email] ? "btnDisabled" : "bubleOnHOver"
            }`}
            onClick={() => handleShare({ user_email: user?.user_email, answer_id })}
            style={{
              cursor: sharers && sharers[user?.user_email] ? "not-allowed" : "pointer",
              backgroundColor: sharers && sharers[user?.user_email] ? "#DBEAFE" : "",
              color: sharers && sharers[user?.user_email] ? "#2563EB" : "",
            }}
          >
            <RiShareForwardLine className="iconSize" /> {sharers && Object.keys(sharers).length}
          </button>
          <button className="iconButton bubleOnHOver">
            <FaRegComment className="iconSize" />
          </button>
        </div>
        {/* reactions, comments and share ends */}
      </div>
    </section>
  );
};

export default Feed;
