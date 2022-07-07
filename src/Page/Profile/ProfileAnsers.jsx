import React from "react";
import { useParams } from "react-router-dom";
import Feed from "../../components/Feed/Feed";
import useUserAnswer from "../../Hooks/useUserAnswers";
const ProfileAnsers = () => {
  const { user_email_id } = useParams();
  const answers = useUserAnswer(user_email_id);

  return (
    <section>
      {answers.map((answer, index) => (
        <Feed feedInfo={answer} key={index} />
      ))}
    </section>
  );
};

export default ProfileAnsers;
