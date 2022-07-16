import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { UserContext } from "../../ContextAPI/UserContext";
import Feed from "../Feed/Feed";
import NavBar from "../NavBar/NavBar";

const SingleAnswer = () => {
  const { answer_id } = useParams();
  const { user } = useContext(UserContext);

  const {
    data: answer,
    isLoading,
    refetch: answerRefetch,
  } = useQuery(`answer_${answer_id}`, () =>
    fetch(`https://ponditi-overflow.herokuapp.com/answer/${answer_id}`).then((res) => res.json())
  );
  const { data: following, refetch: followingRefetch } = useQuery(
    `following_${user?.user_email}`,
    () =>
      fetch(`https://ponditi-overflow.herokuapp.com/followings/${user?.user_email}`).then((res) =>
        res.json()
      )
  );

  if (isLoading) {
    return null;
  }

  return (
    <>
      <NavBar />
      <div className="homePageContainer mx-auto mt-8">
        {answer && (
          <Feed
            feedInfo={answer[0]}
            feedRefetch={answerRefetch}
            following={following}
            followingRefetch={followingRefetch}
          />
        )}
      </div>
    </>
  );
};

export default SingleAnswer;
