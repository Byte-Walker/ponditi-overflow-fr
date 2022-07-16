import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import FollowList from "../../components/FollowList/FollowList";

const Followers = () => {
  const { user_email_id } = useParams();
  const {
    data: followerList,
    refetch: followerListRefecth,
    isLoading: followerListLoading,
  } = useQuery(`followers_${user_email_id}`, () =>
    fetch(`http://localhost:5500/followers/${user_email_id}`).then((res) => res.json())
  );

  useEffect(() => {
    followerListRefecth();
  }, [followerListRefecth, user_email_id]);

  if (followerListLoading) {
    return null;
  }

  return (
    <section className="card p-5 ">
      <h1 className="font-semibold border-b pb-2">Your Followers</h1>
      <div>
        {Object.keys(followerList).map((follower, index) => (
          <FollowList key={index} user_email_id={follower} />
        ))}
        {Object.keys(followerList).length === 0 && (
          <h1 className="pt-3 text-center text-lg font-semibold">None Followed You Yet😞</h1>
        )}
      </div>
    </section>
  );
};

export default Followers;
