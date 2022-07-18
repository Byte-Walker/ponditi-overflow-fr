import { Spinner } from "flowbite-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import QuestionFeed from "../../components/QuestionFeed/QuestionFeed";
import useGetUserQuestions from "../../Hooks/useGetUserQuestions";

const ProfileQuesions = () => {
  const { user_email_id } = useParams();
  const { userQuestion, userQuestionLoading, userQuestionRefetch } =
    useGetUserQuestions(user_email_id);

  useEffect(() => {
    userQuestionRefetch();
  }, [userQuestionRefetch, user_email_id]);

  return (
    <section>
      <div className="homePageContainer card p-5 mx-auto mb-5">
        <h1 className="font-semibold border-b pb-2">All Questions</h1>
        {userQuestionLoading ? (
          <div className="p-5 centerXY">
            <Spinner color="info" aria-label="Info spinner example" size="xl" />
          </div>
        ) : (
          <>
            {userQuestion?.length === 0 && (
              <h1 className="pt-3 text-center text-lg font-semibold">No Question Found😞</h1>
            )}
            {userQuestion?.map((question, index) => (
              <QuestionFeed questionData={question} key={index} user_email_id={user_email_id} />
            ))}
          </>
        )}
        {/* {userQuestion?.length === 0 && (
          <h1 className="pt-3 text-center text-lg font-semibold">No Question Found😞</h1>
        )}
        {userQuestion?.map((question, index) => (
          <QuestionFeed questionData={question} key={index} user_email_id={user_email_id} />
        ))} */}
      </div>
    </section>
  );
};

export default ProfileQuesions;
