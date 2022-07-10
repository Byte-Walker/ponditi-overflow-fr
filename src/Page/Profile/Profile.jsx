import React, { useContext, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import CustomNavLink from "../../components/CustomNavLink/CustomNavLink";
import NavBar from "../../components/NavBar/NavBar";
import UserDP from "../../components/UserDP/UserDP";
import { useQuery } from "react-query";
import { UserContext } from "../../ContextAPI/UserContext";

const Profile = () => {
  const { user_email_id } = useParams();
  const { user } = useContext(UserContext);

  const { data: userInfo, refetch: userInfoRefetch } = useQuery(`userInfo_${user_email_id}`, () =>
    fetch(`http://localhost:5500/profile/${user_email_id}`).then((res) => res.json())
  );

  // * getting follwing list logged in user's * //
  const { data: followingUser, refetch: followingRefetchUser } = useQuery(
    `following_${user?.user_email}`,
    () => fetch(`http://localhost:5500/followings/${user?.user_email}`).then((res) => res.json())
  );

  // * following list of the user whose profile is being visited * //
  const { data: followingList, refetch: followingListRefetch } = useQuery(
    `following_${user_email_id}`,
    () => fetch(`http://localhost:5500/followings/${user_email_id}`).then((res) => res.json())
  );
  // * followers list of user whose profile is being visited * //
  const { data: followersList, refetch: followersListRefetch } = useQuery(
    `followers_${user_email_id}`,
    () => fetch(`http://localhost:5500/followers/${user_email_id}`).then((res) => res.json())
  );

  // * follower or unfollow * //
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
          followingRefetchUser();
          followersListRefetch();
        }
      });
  };

  useEffect(() => {
    userInfoRefetch();
    followingRefetchUser();
    followingListRefetch();
    followersListRefetch();
    document.title = `${userInfo?.user_name} | Ponditi-Overflow`;
  }, [userInfoRefetch, followingListRefetch, followingRefetchUser, followersListRefetch, userInfo]);

  return (
    <>
      <NavBar />
      <section className="homePageContainer mx-auto">
        {/* entire card of profile */}
        <div className="mt-16 card">
          <div className="flex items-end justify-between px-20 py-5 border-b border-gray-200">
            <div className="flex gap-10 items-end">
              <UserDP
                dimension={"100px"}
                img_url={userInfo?.img_url}
                user_name={userInfo?.user_name}
                fontSize="60px"
              />
              <div>
                <h1 className="text-3xl text-blue-900 font-semibold mb-1">{userInfo?.user_name}</h1>
                <p className="text-gray-400">{userInfo?.job}</p>
              </div>
            </div>

            <div className="border-gray-300 mt-4 pb-3 text-center ">
              {user?.user_email !== user_email_id && (
                <div>
                  {followingUser && followingUser[user_email_id] && (
                    <button
                      className="btn-red w-fit"
                      onClick={() =>
                        modFollow({
                          followed: user_email_id,
                          follower: user?.user_email,
                          mode: "delete",
                        })
                      }
                    >
                      Unfollow
                    </button>
                  )}
                  {followingUser && !followingUser[user_email_id] && (
                    <button
                      className="btn-red w-fit"
                      onClick={() =>
                        modFollow({
                          followed: user_email_id,
                          follower: user?.user_email,
                          mode: "add",
                        })
                      }
                    >
                      Follow
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* all links */}
          <div className="w-fit mx-auto pt-2 flex gap-3">
            <CustomNavLink to={`/profile/${user_email_id}`} fontSize="16px">
              About
            </CustomNavLink>
            <CustomNavLink to={"answers"} fontSize="16px">
              Answers
            </CustomNavLink>
            <CustomNavLink to={"shared"} fontSize="16px">
              Shared
            </CustomNavLink>
            <CustomNavLink to={"questions"} fontSize="16px">
              Questions
            </CustomNavLink>
            <CustomNavLink to={"followers"} fontSize="16px">
              Followers ({followersList && Object.keys(followersList).length})
            </CustomNavLink>
            <CustomNavLink to={"followings"} fontSize="16px">
              Followings ({followingList && Object.keys(followingList).length})
            </CustomNavLink>
          </div>
        </div>
        <div className="mt-5 ">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default Profile;
