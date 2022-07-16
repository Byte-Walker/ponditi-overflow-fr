import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import QuestionFeed from "../../components/QuestionFeed/QuestionFeed";
import { useQuery } from "react-query";

const ProfileQuesions = () => {
  const { user_email_id } = useParams();
  const { data: questions, refetch } = useQuery(`userQuestion${user_email_id}`, () =>
    fetch(`http://localhost:5500/getuserquestions/${user_email_id}`).then((res) => res.json())
  );
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <section>
      <div className="homePageContainer card p-5 mx-auto mb-5">
        <h1 className="font-semibold border-b pb-2">Your Questions</h1>
        {questions?.length === 0 && (
          <h1 className="pt-3 text-center text-lg font-semibold">No Question Found😞</h1>
        )}
        {questions?.map((question, index) => (
          <QuestionFeed questionData={question} key={index} user_email_id={user_email_id} />
        ))}
      </div>
    </section>
  );
};

export default ProfileQuesions;
