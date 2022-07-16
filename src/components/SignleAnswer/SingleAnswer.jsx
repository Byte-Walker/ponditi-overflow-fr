import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { UserContext } from "../../ContextAPI/UserContext";
import useGetUserFollowing from "../../Hooks/useGetUserFollowing";
import Feed from "../Feed/Feed";
import NavBar from "../NavBar/NavBar";
import { Spinner } from "flowbite-react";

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

  const { followingUser: following, followingUserRefetchUser: followingRefetch } =
    useGetUserFollowing(user?.user_email);

  return (
    <>
      <NavBar />
      <div className="homePageContainer mx-auto mt-8">
        {isLoading && (
          <div className="p-5 centerXY">
            <Spinner color="info" aria-label="Info spinner example" size="xl" />
          </div>
        )}
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
