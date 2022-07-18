import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Spinner } from "flowbite-react";
import FollowList from "../../components/FollowList/FollowList";

const Followers = () => {
  const { user_email_id } = useParams();
  const {
    data: followerList,
    refetch: followerListRefecth,
    isLoading: followerListLoading,
  } = useQuery(`followers_${user_email_id}`, () =>
    fetch(`https://ponditi-overflow.herokuapp.com/followers/${user_email_id}`).then((res) =>
      res.json()
    )
  );

  useEffect(() => {
    followerListRefecth();
  }, [followerListRefecth, user_email_id]);

  return (
    <section className="card p-5 ">
      <h1 className="font-semibold border-b pb-2">Followers</h1>
      {followerListLoading && (
        <div className="p-5 centerXY">
          <Spinner color="info" aria-label="Info spinner example" size="xl" />
        </div>
      )}
      <div>
        {followerList &&
          Object.keys(followerList).map((follower, index) => (
            <FollowList key={index} user_email_id={follower} />
          ))}
        {followerList && Object.keys(followerList).length === 0 && (
          <h1 className="pt-3 text-center text-lg font-semibold">No Followers Found😞</h1>
        )}
      </div>
    </section>
  );
};

export default Followers;
