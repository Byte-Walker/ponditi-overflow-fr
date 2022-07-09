import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import FollowList from "../../components/FollowList/FollowList";

const Following = () => {
  const { user_email_id } = useParams();
  // * info of the user whose profile is being visited * //

  const {
    data: follwingList,
    refetch: followingRefetch,
    isLoading: followingListLoading,
  } = useQuery(`following_${user_email_id}`, () =>
    fetch(`http://localhost:5500/followings/${user_email_id}`).then((res) => res.json())
  );

  useEffect(() => {
    followingRefetch();
  }, [followingRefetch, user_email_id]);

  if (followingListLoading) {
    return null;
  }
  return (
    <section className="card p-5 ">
      <h1 className="font-semibold border-b pb-2">Your Followings</h1>
      <div>
        {Object.keys(follwingList).map((following, index) => (
          <FollowList key={index} user_email_id={following} />
        ))}
        {Object.keys(follwingList).length === 0 && (
          <h1 className="pt-3 text-center text-lg font-semibold">Your Are Following None</h1>
        )}
      </div>
    </section>
  );
};

export default Following;
