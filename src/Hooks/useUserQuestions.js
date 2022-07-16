import { useEffect, useState } from "react";

const useUserQuestions = (user_email_id) => {
  const [questions, setQuestions] = useState([]);
  const url = `https://ponditi-overflow.herokuapp.com/getuserquestions/${user_email_id}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => setQuestions(res));
  }, [user_email_id]);
  return questions;
};

export default useUserQuestions;
