import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Feed from "../../components/Feed/Feed";
import { UserContext } from "../../ContextAPI/UserContext";
import useGetUserFollowing from "../../Hooks/useGetUserFollowing";
import { Spinner } from "flowbite-react";

const Shared = () => {
  const { user_email_id } = useParams();
  const { user } = useContext(UserContext);

  // * Shared Post * //
  const {
    data: shared,
    isLoading: sharedLoading,
    refetch: sharedRefetch,
  } = useQuery(`shared_${user_email_id}`, () =>
    fetch(`https://ponditi-overflow.herokuapp.com/shares/${user_email_id}`).then((res) =>
      res.json()
    )
  );

  // * Follower Info * //
  const {
    followingUser: following,
    followingUserLoading,
    followingUserRefetchUser: followingRefetch,
  } = useGetUserFollowing(user?.user_email);

  useEffect(() => {
    sharedRefetch();
  }, [sharedRefetch]);

  if (followingUserLoading || sharedLoading) {
    return (
      <div className="p-5 centerXY card">
        <Spinner color="info" aria-label="Info spinner example" size="xl" />
      </div>
    );
  }

  return (
    <section>
      <>
        {shared?.length === 0 && (
          <h1 className=" card p-5 text-center text-lg font-semibold">Nothing Found😞</h1>
        )}
        {shared?.map((answer, index) => (
          <Feed
            feedInfo={answer}
            key={index}
            following={following}
            followingRefetch={followingRefetch}
            feedRefetch={sharedRefetch}
          />
        ))}
      </>
    </section>
  );
};

export default Shared;
