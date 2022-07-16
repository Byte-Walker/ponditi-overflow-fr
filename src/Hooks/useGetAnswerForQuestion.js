import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const useGetAnswerForQuestion = (question_id) => {
  const [answersForQuestion, setAnswersForQuestion] = useState([]);
  const { data: userQuestions, refetch: userQuestionRefecth } = useQuery(
    `userQuestion_${user_email_id}`,
    () =>
      fetch(`https://ponditi-overflow.herokuapp.com/getuserquestions/${user_email_id}`).then(
        (res) => res.json()
      )
  );
  useEffect(() => {
    const url = `https://ponditi-overflow.herokuapp.com/answers/${question_id}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => setAnswersForQuestion(res));
  }, [question_id]);
  return answersForQuestion;
};

export default useGetAnswerForQuestion;
