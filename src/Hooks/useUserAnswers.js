import { useState, useEffect } from "react";

const useUserAnswer = (user_email_id) => {
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    const url = `http://localhost:5500/getuseranswers/${user_email_id}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setAnswers(res);
      });
  }, [user_email_id]);
  return answers;
};

export default useUserAnswer;
