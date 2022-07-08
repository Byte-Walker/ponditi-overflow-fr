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

  const { data: userInfo, refetch } = useQuery(`userInfo_${user_email_id}`, () =>
    fetch(`http://localhost:5500/profile/${user_email_id}`).then((res) => res.json())
  );

  // * getting follwing list logged in user's * //
  const { data: following, refetch: followingRefetch } = useQuery(
    `following_${user?.user_email}`,
    () => fetch(`http://localhost:5500/followings/${user?.user_email}`).then((res) => res.json())
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
          followingRefetch();
        }
      });
  };

  // * unfollow * //

  useEffect(() => {
    refetch();
    followingRefetch();
    document.title = `${userInfo?.user_name} | Ponditi-Overflow`;
  }, [refetch, followingRefetch, userInfo]);

  return (
    <>
      <NavBar />
      <section className="homePageContainer mx-auto">
        <div className="relative mt-20 card">
          <div className="topDp mx-auto">
            <UserDP
              dimension={"100px"}
              img_url={userInfo?.img_url}
              user_name={userInfo?.user_name}
              fontSize="60px"
            />
          </div>
          <h1 className="text-center text-3xl mt-16 font-semibold">{userInfo?.user_name}</h1>
          <p className="text-center text-gray-400 mt-2">{userInfo?.job}</p>
          <div className="border-b border-gray-300 mt-4 pb-3 text-center ">
            {user?.user_email !== user_email_id && (
              <div>
                {following[user_email_id] && (
                  <button
                    className="btn-red w-fit rounded-full"
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
                {!following[user_email_id] && (
                  <button
                    className="btn-red w-fit rounded-full"
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
          {/* all links */}
          <div className="w-fit mx-auto pt-2 flex gap-3">
            <CustomNavLink to={`/profile/${user_email_id}`} fontSize="16px">
              About
            </CustomNavLink>
            <CustomNavLink to={"answers"} fontSize="16px">
              Answers
            </CustomNavLink>
            <CustomNavLink to={"questions"} fontSize="16px">
              Questions
            </CustomNavLink>
            <CustomNavLink to={"followers"} fontSize="16px">
              Followers
            </CustomNavLink>
            <CustomNavLink to={"followings"} fontSize="16px">
              Followings
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
