import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Feed from "../../components/Feed/Feed";
import { useQuery } from "react-query";
import { UserContext } from "../../ContextAPI/UserContext";
import { Spinner } from "flowbite-react";
import useGetUserFollowing from "../../Hooks/useGetUserFollowing";

const ProfileAnsers = () => {
  const { user_email_id } = useParams();
  const { user } = useContext(UserContext);

  const {
    followingUser: following,
    followingUserLoading,
    followingUserRefetchUser: followingRefetch,
  } = useGetUserFollowing(user?.user_email);
  // const answers = useUserAnswer(user_email_id);
  const {
    data: answers,
    isLoading: answersLoading,
    refetch: answersRefetch,
  } = useQuery(`answer_${user_email_id}`, () =>
    fetch(`https://ponditi-overflow.herokuapp.com/getuseranswers/${user_email_id}`).then((res) =>
      res.json()
    )
  );

  if (followingUserLoading || answersLoading) {
    return (
      <div className="p-5 centerXY card">
        <Spinner color="info" aria-label="Info spinner example" size="xl" />
      </div>
    );
  }

  return (
    <section>
      {answers?.length === 0 ? (
        <h1 className=" card p-5 text-center text-lg font-semibold">No Answer Found😞</h1>
      ) : (
        <>
          {answers?.map((answer, index) => (
            <Feed
              feedInfo={answer}
              key={index}
              following={following}
              followingRefetch={followingRefetch}
              feedRefetch={answersRefetch}
            />
          ))}
        </>
      )}
      {!answers && <h1 className="card p-5 text-center font-semibold text-2xl">No post found</h1>}
    </section>
  );
};

export default ProfileAnsers;
