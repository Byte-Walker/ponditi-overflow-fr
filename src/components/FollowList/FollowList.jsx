import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../ContextAPI/UserContext";
import UserDP from "../UserDP/UserDP";
import { FaUserPlus, FaUserCheck } from "react-icons/fa";
import useGetUserInfo from "../../Hooks/useGetUserInfo";
import useGetUserFollowing from "../../Hooks/useGetUserFollowing";

const FollowList = ({ user_email_id }) => {
  const { user } = useContext(UserContext);
  const path = useNavigate();
  const { userInfo, userInfoRefetch } = useGetUserInfo(user_email_id);
  const { followingUser: followListUser, followingUserRefetchUser: followListUserRefetch } =
    useGetUserFollowing(user?.user_email);

  // * follow or unfollow * //
  const modFollow = ({ followed, follower, mode }) => {
    const followData = { followed, follower, mode };
    const url = `https://ponditi-overflow.herokuapp.com/modifyfollower`;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(followData),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          followListUserRefetch();
        }
      });
  };

  useEffect(() => {
    userInfoRefetch();
    followListUserRefetch();
  }, [userInfoRefetch, followListUserRefetch]);

  return (
    <div className="py-3 border-b centerY justify-between">
      {/* userInfo */}
      <div className="centerY gap-3">
        <UserDP
          dimension={"40px"}
          img_url={userInfo?.img_url}
          user_name={userInfo?.user_name}
          onClick={() => path(`/profile/${userInfo?.user_email}`)}
        />
        <div>
          <h1
            className="font-semibold cursor-pointer"
            onClick={() => path(`/profile/${userInfo?.user_email}`)}
          >
            {userInfo?.user_name}
          </h1>
          <p className="text-sm text-gray-500">{userInfo?.job}</p>
        </div>
      </div>
      {/* follow button */}
      {userInfo?.user_email !== user?.user_email && (
        <>
          {followListUser &&
          Object.keys(followListUser).length !== 0 &&
          !followListUser[userInfo?.user_email] ? (
            <button
              className="btnBlue centerXY gap-2"
              onClick={() =>
                modFollow({
                  followed: userInfo?.user_email,
                  follower: user?.user_email,
                  mode: "add",
                })
              }
            >
              <FaUserPlus /> Follow
            </button>
          ) : (
            <button
              className="btnGray centerXY gap-2"
              onClick={() =>
                modFollow({
                  followed: userInfo?.user_email,
                  follower: user?.user_email,
                  mode: "delete",
                })
              }
            >
              <FaUserCheck /> Unfollow
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default FollowList;
