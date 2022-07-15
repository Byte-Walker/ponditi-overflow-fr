import React, { useContext, useState } from "react";
import { ImArrowUp } from "react-icons/im";
import { TbArrowBigTop } from "react-icons/tb";
import { RiShareForwardLine, RiShareForwardFill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useGetUpvote from "../../Hooks/useGetUpvote";
import { UserContext } from "../../ContextAPI/UserContext";
import handleUpvote from "../UlitiyFunctions/handleUpvote";
import UserDP from "../UserDP/UserDP";
import { useQuery } from "react-query";
import Modal from "../Modal/Modal";
import { BsThreeDots } from "react-icons/bs";
import { Dropdown } from "flowbite-react";
import createNotification from "../UlitiyFunctions/createNotification";
import useGetTags from "../../Hooks/useGetTags";

const Feed = ({ feedInfo, following, followingRefetch, feedRefetch }) => {
  const [openModal, setOpenModal] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const { user } = useContext(UserContext);

  const path = useNavigate();
  const [upvoteInfo, setUpvoteInfo] = useGetUpvote(feedInfo?.answer_id);
  const upvoteContent = { answer_id: feedInfo?.answer_id, user_email: user?.user_email };

  // * geting sharers information * //
  const { data: sharers, refetch: sharersRefetch } = useQuery(
    `sharers_${feedInfo?.answer_id}`,
    () => fetch(`http://localhost:5500/sharers/${feedInfo?.answer_id}`).then((res) => res.json())
  );

  // * follow or unfollow * //
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
          if ((mode = "add")) {
            createNotification({
              provoker: follower,
              receiver: followed,
              mode: "follow",
              seen: false,
            });
          }
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
          createNotification({
            provoker: user?.user_email,
            receiver: feedInfo?.user_email,
            mode: "share",
            answer_id,
            seen: false,
          });
        }
      });
  };

  // * handle delete * //
  const handleDete = ({ answer_id, feedRefetch }) => {
    const url = `http://localhost:5500/answers/${answer_id}`;
    fetch(url, { method: "DELETE" })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          console.log("deleted");
          feedRefetch();
          setOpenModal(false);
        }
      });
  };

  return (
    <section className="mb-2 shadow-lg card">
      {/* Card */}
      <div className="pt-5 pb-4">
        <div className="px-5">
          <div className="flex justify-between">
            {/* user info starts*/}
            <div className="flex gap-3 centerY mb-4">
              <UserDP
                img_url={feedInfo?.img_url}
                user_name={feedInfo?.user_name}
                dimension="40px"
                onClick={() => path(`/profile/${feedInfo?.user_email}`)}
              />
              <div>
                {/* by clicking here any user can visit this user's profile */}
                <div className="centerY gap-3">
                  {/* user_name */}
                  <p
                    className="font-bold text-blue-900 cursor-pointer hover:underline"
                    onClick={() => path(`/profile/${feedInfo?.user_email}`)}
                  >
                    {feedInfo?.user_name}
                  </p>
                  {/* following , follow option */}
                  {user?.user_email !== feedInfo?.user_email && (
                    <>
                      {/* if doesn't follow then follow option */}
                      {!following[feedInfo?.user_email] && (
                        <p
                          className="text-blue-500 text-sm font-semibold cursor-pointer hover:underline"
                          onClick={() =>
                            modFollow({
                              followed: feedInfo?.user_email,
                              follower: user?.user_email,
                              mode: "add",
                            })
                          }
                        >
                          Follow
                        </p>
                      )}
                      {/* if follow show following */}
                      {following[feedInfo?.user_email] && (
                        <p className="text-gray-500 text-sm font-semibold">Following</p>
                      )}
                    </>
                  )}
                </div>
                {/* designation */}
                <p className="text-sm text-gray-500">
                  <span className="text-gray-500 font-medium">{feedInfo?.job}</span>{" "}
                  {feedInfo?.job && "-"} {feedInfo?.time}
                </p>
              </div>
            </div>

            <div>
              <Dropdown
                arrowIcon={false}
                inline={true}
                label={<BsThreeDots className="text-2xl m-0 p-0" />}
              >
                <Dropdown.Item onClick={() => path(`/question/${feedInfo?.question_id}`)}>
                  See all answers
                </Dropdown.Item>

                {user?.user_email === feedInfo?.user_email && (
                  <>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => setOpenModal(true)}>
                      <button className="flex items-center text-red-600">
                        <AiFillDelete className="mr-1 text-lg" />
                        Delete Post
                      </button>
                    </Dropdown.Item>
                  </>
                )}
              </Dropdown>
            </div>
            {/* user info ends*/}
          </div>

          {/* question start */}
          <h1
            className="font-semibold mb-2 hover:underline cursor-pointer"
            onClick={() => path(`/question/${feedInfo?.question_id}`)}
          >
            {feedInfo?.question_description}
          </h1>
          <p className="mb-3 text-sm">
            {feedInfo?.answer_description && showFull
              ? feedInfo?.answer_description
              : `${feedInfo?.answer_description.slice(0, 300)}`}
            {feedInfo?.answer_description.length > 300 ? (
              <span>
                ...
                <button
                  onClick={() => setShowFull(showFull ? false : true)}
                  className="text-sm ml-3 px-2 py-px bg-blue-100 text-blue-700 rounded-lg hover:underline"
                >
                  {showFull ? "Less" : "More"}
                </button>
              </span>
            ) : (
              ""
            )}
          </p>
          {/* question ends */}
        </div>
        {/* taglist showing */}
        <div className="px-5">
          <ShowTaglist list={feedInfo?.tags} />
        </div>
        {/* Separator */}
        <div className="w-full h-px bg-blue-100 mb-3 mt-4"></div>

        <div className="px-5">
          {/* reactions, comments and share starts */}
          <div className="flex gap-5">
            {/* upvote */}
            <button
              className="iconButton bubleOnHOver"
              // * handeling upvote * //
              onClick={() =>
                handleUpvote({
                  upvoteContent,
                  upvoteInfo,
                  setUpvoteInfo,
                  answer_id: feedInfo?.answer_id,
                  user,
                  receiver: feedInfo?.user_email,
                })
              }
              style={{
                backgroundColor: upvoteInfo[user?.user_email] ? "#DBEAFE" : " ",
                color: upvoteInfo[user?.user_email] ? "#2563EB" : "",
              }}
              //
            >
              {!upvoteInfo[user?.user_email] ? (
                <>
                  <TbArrowBigTop className="iconSize" />
                </>
              ) : (
                <>
                  <ImArrowUp className="iconSize" />
                </>
              )}

              {/* Vertical separator */}
              <span
                className={`h-4 w-px ${
                  upvoteInfo[user?.user_email] ? "bg-blue-600" : "bg-gray-400"
                }`}
              ></span>
              {Object.keys(upvoteInfo).length}
            </button>

            <button
              className={`iconButton  ${
                sharers && sharers[user?.user_email] ? "btnDisabled" : "bubleOnHOver"
              }`}
              onClick={() =>
                handleShare({
                  user_email: user?.user_email,
                  answer_id: feedInfo?.answer_id,
                })
              }
              style={{
                cursor: sharers && sharers[user?.user_email] ? "not-allowed" : "pointer",
                backgroundColor: sharers && sharers[user?.user_email] ? "#DBEAFE" : "",
                color: sharers && sharers[user?.user_email] ? "#2563EB" : "",
              }}
            >
              {sharers && sharers[user?.user_email] ? (
                <>
                  <RiShareForwardFill />
                </>
              ) : (
                <>
                  <RiShareForwardLine />
                </>
              )}
              {/* Vertical separator */}
              <span
                className={`h-4 w-px ${
                  upvoteInfo[user?.user_email] ? "bg-blue-600" : "bg-gray-400"
                }`}
              ></span>
              {sharers && Object.keys(sharers).length}
            </button>
          </div>
          {/* reactions, comments and share ends */}
        </div>
      </div>
      <Modal openModal={openModal} setOpenModal={setOpenModal} title={"Delete This post?"}>
        <div className="p-5">
          <p className="">
            You delete this post, it will be gone forever. Even if cry till you death it will be
            gone for good.
          </p>
          <div className="w-fit ml-auto flex gap-5 mt-3">
            <button
              className="px-3 py-1 hover:bg-gray-400 hover:text-white rounded hover"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded hover"
              onClick={() => handleDete({ answer_id: feedInfo?.answer_id, feedRefetch })}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

const ShowTaglist = ({ list }) => {
  const tagList = list && list.split(",");
  const { tags } = useGetTags();
  const allTags = {};
  for (let i = 0; i < tags?.length; i++) {
    allTags[tags[i].tag_name] = tags[i].tag_color;
  }
  return (
    <div className="flex flex-wrap gap-2 mb-2 cursor-pointer">
      {tagList?.map((tag, index) => (
        <p
          key={index}
          className="p-1 rounded text-white text-[10px] font-semibold uppercase"
          style={{ backgroundColor: allTags && allTags[tag] }}
        >
          {tag}
        </p>
      ))}
    </div>
  );
};

export default Feed;
