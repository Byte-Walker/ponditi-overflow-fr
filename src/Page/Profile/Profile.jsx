import React from "react";
import { Outlet, useParams } from "react-router-dom";
import CustomNavLink from "../../components/CustomNavLink/CustomNavLink";
import DpMaker from "../../components/DpMaker/DpMaker";
import NavBar from "../../components/NavBar/NavBar";
import useUserInfo from "../../Hooks/useUserInfo";

const Profile = () => {
  const { user_email_id } = useParams();
  const userInfo = useUserInfo(user_email_id);
  return (
    <>
      <NavBar />
      <section className="homePageContainer mx-auto">
        <div className="relative mt-20 card">
          <div className="topDp mx-auto">
            {false ? (
              <img src={userInfo?.img_url} alt="" />
            ) : (
              <DpMaker name={userInfo?.user_name} height="100px" fontSize={"60px"} />
            )}
          </div>
          <h1 className="text-3xl text-center mt-16 font-semibold">{userInfo?.user_name}</h1>
          <p className="text-center text-gray-400 mt-2 border-b border-gray-300 pb-3">
            {userInfo?.job}
          </p>
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
