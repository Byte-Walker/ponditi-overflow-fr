import { useEffect, useState } from "react";

const useGetQuestionInfo = (question_id) => {
  const [question, setQuestion] = useState();
  useEffect(() => {
    const url = `http://localhost:5500/question/${question_id}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => setQuestion(res));
  }, [question_id]);

  return question;
};

export default useGetQuestionInfo;
