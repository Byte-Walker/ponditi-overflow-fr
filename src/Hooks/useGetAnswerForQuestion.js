import { useEffect, useState } from "react";

const useGetAnswerForQuestion = (question_id) => {
  const [answersForQuestion, setAnswersForQuestion] = useState([]);
  useEffect(() => {
    const url = `http://localhost:5500/answers/${question_id}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => setAnswersForQuestion(res));
  }, [question_id]);
  return answersForQuestion;
};

export default useGetAnswerForQuestion;
