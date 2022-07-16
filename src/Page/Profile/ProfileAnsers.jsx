import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Feed from "../../components/Feed/Feed";
import { useQuery } from "react-query";
import { UserContext } from "../../ContextAPI/UserContext";

const ProfileAnsers = () => {
  const { user_email_id } = useParams();
  const { user } = useContext(UserContext);
  // const answers = useUserAnswer(user_email_id);
  const {
    data: answers,
    isLoading: answersLoading,
    refetch: answersRefetch,
  } = useQuery(`answer_${user_email_id}`, () =>
    fetch(`http://localhost:5500/getuseranswers/${user_email_id}`).then((res) => res.json())
  );

  const { data: following, refetch: followingRefetch } = useQuery(
    `following_${user?.user_email}`,
    () => fetch(`http://localhost:5500/followings/${user?.user_email}`).then((res) => res.json())
  );

  if (answersLoading) {
    return null;
  }

  return (
    <section>
      {answers?.length === 0 && (
        <h1 className=" card p-5 text-center text-lg font-semibold">No Answer Found😞</h1>
      )}
      {answers?.map((answer, index) => (
        <Feed
          feedInfo={answer}
          key={index}
          following={following}
          followingRefetch={followingRefetch}
          feedRefetch={answersRefetch}
        />
      ))}{" "}
      {!answers && <h1 className="card p-5 text-center font-semibold text-2xl">No post found</h1>}
    </section>
  );
};

export default ProfileAnsers;
