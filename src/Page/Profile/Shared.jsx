import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Feed from "../../components/Feed/Feed";
import { UserContext } from "../../ContextAPI/UserContext";

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
    data: following,
    isLoading,
    refetch: followingRefetch,
  } = useQuery(`following_${user?.user_email}`, () =>
    fetch(`https://ponditi-overflow.herokuapp.com/followings/${user?.user_email}`).then((res) =>
      res.json()
    )
  );
  useEffect(() => {
    sharedRefetch();
  }, [sharedRefetch]);

  if (isLoading || sharedLoading) {
    return null;
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
