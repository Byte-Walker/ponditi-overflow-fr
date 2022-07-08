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
    fetch(`http://localhost:5500/shares/${user_email_id}`).then((res) => res.json())
  );
  // * Follower Info * //
  const {
    data: following,
    isLoading,
    refetch: followingRefetch,
  } = useQuery(`following_${user?.user_email}`, () =>
    fetch(`http://localhost:5500/followings/${user?.user_email}`).then((res) => res.json())
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
        {shared?.map((answer, index) => (
          <Feed
            feedInfo={answer}
            key={index}
            following={following}
            followingRefetch={followingRefetch}
          />
        ))}
        {shared.length === 0 && (
          <h1 className="card p-5 text-center font-semibold text-2xl">No post found</h1>
        )}
      </>
    </section>
  );
};

export default Shared;
